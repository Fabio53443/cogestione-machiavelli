// src/db/models.js
import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const professori = pgTable("professori", {
  id: serial("id").primaryKey(),
  nomeCompleto: varchar("nome_completo", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPass: text("hashed_pass").notNull(),
});

export const studenti = pgTable("studenti", {
  id: serial("id").primaryKey(),
  nomeCompleto: varchar("nome_completo", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPass: text("hashed_pass").notNull(),
  googleId: text("google_id").notNull().unique(),
  admin: boolean("admin").notNull().default(false),
});

export const corsi = pgTable("corsi", {
  id: serial("id").primaryKey(),
  docente: integer("docente")
    .notNull()
    .references(() => professori.id),
  nome: varchar("nome", { length: 255 }).notNull(),
  descrizione: text("descrizione"),
  aula: varchar("aula", { length: 100 }),
  numPosti: integer("num_posti").notNull(),
  postiDisponibili: integer("posti_disponibili").notNull().default(0),
  length: integer("length").notNull().default(1),
  availability: integer("availability")
    .notNull()
    .array()
    .default(sql`ARRAY[]::integer[]`),
  schedule: integer("schedule")
    .notNull()
    .array()
    .default(
      sql`ARRAY[
      ARRAY[0, 0, 0, 0, 0, 0, 0], 
      ARRAY[0, 0, 0, 0, 0, 0, 0], 
      ARRAY[0, 0, 0, 0, 0, 0, 0], 
      ARRAY[0, 0, 0, 0, 0, 0, 0], 
      ARRAY[0, 0, 0, 0, 0, 0, 0]
]::integer[][]`
    ),  
});

export const iscrizioni = pgTable("iscrizioni", {
  id: serial("id").primaryKey(),
  ora: integer("ora").notNull(), // Changed to integer (1-4)
  giorno: integer("giorno").notNull(), // Changed to integer (0-4 for days)
  idStudente: integer("id_studente")
    .notNull()
    .references(() => studenti.id),
  idCorso: integer("id_corso")
    .notNull()
    .references(() => corsi.id),
  presente: boolean("presente").notNull().default(false),
});
