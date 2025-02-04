import { json, redirect } from "@sveltejs/kit";
import PDFDocument from "pdfkit";
import { db } from "$lib/db/db";
import { studenti, corsi, iscrizioni } from "$lib/db/models";
import { eq } from "drizzle-orm";
import { isAdmin } from "$lib/isAdmin";

export async function GET({ params, locals }) {
  if (!locals.user) {
    return json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  if (!(await isAdmin(locals))) {
    throw redirect(302, '/studente/dashboard');
  }

  // Parse request body for courseId
  const courseId = parseInt(params.id, 10);

  // Fetch course details
  const [course] = await db.select().from(corsi).where(eq(corsi.id, courseId));
  if (!course) {
    return json({ success: false, message: "Course not found" }, { status: 404 });
  }

  // Fetch iscrizioni joined with studenti
  const iscrizioniRows = await db
    .select({
      // fields from iscrizioni
      giorno: iscrizioni.giorno,
      ora: iscrizioni.ora,
      // fields from studenti
      nomeCompleto: studenti.nomeCompleto,
      classe: studenti.classe,
      email: studenti.email
    })
    .from(iscrizioni)
    .innerJoin(studenti, eq(iscrizioni.idStudente, studenti.id))
    .where(eq(iscrizioni.idCorso, courseId));

  // Group iscrizioni by day and shift
  const grouped = {};
  iscrizioniRows.forEach(item => {
    const { giorno, ora } = item;
    if (!grouped[giorno]) grouped[giorno] = {};
    if (!grouped[giorno][ora]) grouped[giorno][ora] = [];
    grouped[giorno][ora].push(item);
  });

  // Create PDF document
  const doc = new PDFDocument();
  const chunks = [];
  doc.on("data", chunk => chunks.push(chunk));
  const pdfPromise = new Promise(resolve => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  // Add course details header
  doc.fontSize(18).text(course.nome, { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(`Descrizione: ${course.descrizione || "N/A"}`);
  doc.text(`Aula: ${course.aula || "N/A"}`);
  doc.moveDown();

  // Iterate through grouped iscrizioni and add details
  for (const giorno of Object.keys(grouped).sort((a, b) => a - b)) {
    doc.fontSize(16).text(`Giorno: ${Number(giorno)+1}`);
    for (const ora of Object.keys(grouped[giorno]).sort((a, b) => a - b)) {
      doc.fontSize(14).text(`  Turno: ${Number(ora)+1}`);
      doc.fontSize(12).text("Nome -- Classe -- Email", { underline: true });
      grouped[giorno][ora].forEach(item => {
        doc.text(`    • ${item.nomeCompleto} -- ${item.classe || "-"} --${item.email}`);
      });
      doc.moveDown();
    }
    doc.moveDown();
  }

  doc.end();
  const pdfBuffer = await pdfPromise;

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${course.nome}.pdf"`
    }
  });
}
