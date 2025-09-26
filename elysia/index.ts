import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { ip } from 'elysia-ip';
import { db } from '@/lib/db/client';
import { documents, categories, documentClicks } from '@/lib/db/schema';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { desc, eq, sql } from 'drizzle-orm';
await migrate(db, { migrationsFolder: './drizzle' });

const app = new Elysia()
    .use(cors())
    .use(ip());

app.get('/documents', async ({ query }) => {
    const categorySlug = query.category;

    let categoryFilter;
    if (categorySlug) {
        const category = await db.query.categories.findFirst({
            where: (cat, { eq }) => eq(cat.slug, categorySlug),
        });

        if (!category) {
            return new Response("Category not found", { status: 404 });
        }

        categoryFilter = category.id;
    }

    const docs = await db.query.documents.findMany({
        orderBy: (docs, { desc }) => [desc(docs.updatedAt)],
        with: {
            category: true,
        },
        where: categoryFilter
            ? (docs, { eq }) => eq(docs.categoryId, categoryFilter)
            : undefined,
    });

    return docs;
}, {
    query: t.Object({
        category: t.Optional(t.String()),
    }),
});

app.get('/categories', async () => {
    const allCategories = await db.query.categories.findMany({
        orderBy: (categories, { asc }) => [asc(categories.name)],
    });

    return allCategories;
});

app.post('/categories', async ({ body }) => {
    const { name, slug } = body;
    if (!name) return { error: 'Name is required' };
    if (!slug) return { error: 'Slug is required' };

    const [newCategory] = await db.insert(categories).values({ name, slug }).returning();
    return newCategory;
}, {
    body: t.Object({
        name: t.String(),
        slug: t.String(),
    }),
});

app.post('/documents', async ({ body, set }) => {
    const { title, link, categoryId, date, file } = body;
    if (!title || !categoryId) return { error: 'Title and categoryId are required' };

    let finalLink = link;

    // If a file is provided, upload it to the intranet server
    if (file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await fetch('http://intranet.nsp:3000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                set.status = 500;
                return { error: 'Failed to upload file to intranet server' };
            }

            const uploadResult = await uploadResponse.json();
            // Assuming the upload server returns a URL or path in the response
            finalLink = uploadResult.url || uploadResult.path || uploadResult.link;
        } catch (error) {
            console.error('File upload error:', error);
            set.status = 500;
            return { error: 'Failed to upload file' };
        }
    }

    // If no file and no link provided, return error
    if (!finalLink) {
        return { error: 'Either link or file must be provided' };
    }

    const documentData: any = { title, link: finalLink, categoryId };

    if (date) {
        const specifiedDate = new Date(date);
        documentData.createdAt = specifiedDate;
        documentData.updatedAt = specifiedDate;
    }

    const [newDoc] = await db.insert(documents).values(documentData).returning();
    return newDoc;
}, {
    body: t.Object({
        title: t.String(),
        link: t.Optional(t.String()),
        categoryId: t.Integer(),
        date: t.Optional(t.String()),
        file: t.Optional(t.File()),
    }),
});

app.get('/search', async ({ query }) => {
    const search = query.query?.trim()
    if (!search) return []

    const docs = await db.query.documents.findMany({
        where: (docs, { ilike }) => ilike(docs.title, `%${search}%`),
        limit: 10,
        orderBy: (docs, { desc }) => [desc(docs.updatedAt)],
    })

    return docs.map((d) => ({
        id: d.id,
        title: d.title,
    }))
}, {
    query: t.Object({
        query: t.String(),
    }),
});

app.get("/redirect/:id", async ({ params, set, redirect }) => {
    const id = params.id;

    const doc = await db.query.documents.findFirst({
        where: (docs, { eq }) => eq(docs.id, id),
    })

    if (!doc) {
        set.status = 404
        return { error: "Document not found" }
    }

    await db.insert(documentClicks).values({
        documentId: doc.id,
    })

    return redirect(doc.link);
}, {
    params: t.Object({
        id: t.String(),
    }),
});

app.put('/documents/:id', async ({ params, body }) => {
    const id = params.id;
    const { title, link, categoryId } = body;
    
    if (!title || !link || !categoryId) {
        return { error: 'Missing required fields' };
    }

    const [updatedDoc] = await db
        .update(documents)
        .set({ 
            title, 
            link, 
            categoryId,
            updatedAt: new Date()
        })
        .where(eq(documents.id, id))
        .returning();

    if (!updatedDoc) {
        return { error: 'Document not found' };
    }

    return updatedDoc;
}, {
    params: t.Object({
        id: t.String(),
    }),
    body: t.Object({
        title: t.String(),
        link: t.String(),
        categoryId: t.Integer(),
    }),
});

app.delete('/documents/:id', async ({ params }) => {
    const id = params.id;

    const [deletedDoc] = await db
        .delete(documents)
        .where(eq(documents.id, id))
        .returning();

    if (!deletedDoc) {
        return { error: 'Document not found' };
    }

    return { message: 'Document deleted successfully', document: deletedDoc };
}, {
    params: t.Object({
        id: t.String(),
    }),
});

app.get("/document-stats", async ({ ip }) => {
    console.log(ip);
    const stats = await db.select({
        documentId: documentClicks.documentId,
        title: documents.title,
        clickCount: sql<number>`count(*)`.as("clickCount"),
    })
        .from(documentClicks)
        .leftJoin(documents, eq(documentClicks.documentId, documents.id))
        .groupBy(documentClicks.documentId, documents.title)
        .orderBy(desc(sql`count(*)`));

    return stats;
});

app.listen(3001);
console.log('Elysia API running at http://localhost:3001');
