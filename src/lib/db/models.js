// src/db/models.js
import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';

export const professori = pgTable('professori', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  nomeCompleto: varchar('nome_completo', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  hashedPass: text('hashed_pass').notNull(),
});

export const studenti = pgTable('studenti', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  nomeCompleto: varchar('nome_completo', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  hashedPass: text('hashed_pass').notNull(),
});

export const corsi = pgTable('corsi', {
  id: serial('id').primaryKey(),
  docente: varchar('docente').notNull().references(() => professori.username),
  nome: varchar('nome', { length: 255 }).notNull(),
  descrizione: text('descrizione'),
  aula: varchar('aula', { length: 100 }),
  numPosti: integer('num_posti').notNull(),
  ora: varchar('ora', { length: 100 }).notNull(),
  postiDisponibili: integer('posti_disponibili').notNull().default(0),
  length: integer('length').notNull().default(1),
  giorno: varchar('giorno', { length: 100 }).notNull(),
});

export const iscrizioni = pgTable('iscrizioni', {
  id: serial('id').primaryKey(),
  idStudente: integer('id_studente').notNull().references(() => studenti.id),
  idCorso: integer('id_corso').notNull().references(() => corsi.id),
});