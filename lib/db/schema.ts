import { pgTable, serial, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text("slug").notNull().unique(),
});

export const documents = pgTable('documents', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    link: text('link').notNull(),
    categoryId: integer('category_id').references(() => categories.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const documentClicks = pgTable("document_clicks", {
    id: serial("id").primaryKey(),
    documentId: uuid("document_id").notNull().references(() => documents.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
    category: one(categories, {
        fields: [documents.categoryId],
        references: [categories.id],
    }),
}));

export const documentClicksRelations = relations(documentClicks, ({ one }) => ({
    document: one(documents, {
        fields: [documentClicks.documentId],
        references: [documents.id],
    }),
}));