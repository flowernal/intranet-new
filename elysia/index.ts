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

app.post('/documents', async ({ body }) => {
    const { title, link, categoryId, date } = body;
    if (!title || !link || !categoryId) return { error: 'Missing fields' };

    const documentData: any = { title, link, categoryId };

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
        link: t.String(),
        categoryId: t.Integer(),
        date: t.Optional(t.String()),
    }),
});

app.get('/search', async ({ query }) => {
    const search = query.query?.trim()
    if (!search) return []

    const docs = await db.query.documents.findMany({
        where: (docs, { ilike }) => ilike(docs.title, `%${search}%`),
        limit: 5,
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