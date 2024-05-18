import { relations } from "drizzle-orm";
import { text, boolean, pgTable, serial, timestamp, integer, primaryKey, varchar, smallint, json } from "drizzle-orm/pg-core";

export const heroes = pgTable('heroes', {
    id: serial('id').primaryKey(),
    heroRU: json('heroRU').notNull(),
    heroEN: json('heroEN')
})

export const admins = pgTable('admins', {
    id: text('id').unique().primaryKey()
})