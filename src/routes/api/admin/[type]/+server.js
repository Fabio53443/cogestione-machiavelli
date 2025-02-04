import { json } from "@sveltejs/kit";
import { db } from "$lib/db/db";
import { studenti, corsi, professori } from "$lib/db/models";
import { eq } from "drizzle-orm";
import { isAdmin } from "$lib/isAdmin";

export async function GET({ params, locals }) {
  if (!(await isAdmin(locals))) {
    return json({ success: false, message: "Unauthorized" }, { status: 401 });
}   

try {
    let items = [];
    switch (params.type) {
      case "students":
        items = await db.select().from(studenti);
        break;
      case "courses":
        items = await db.select().from(corsi);
        break;
      case "teachers":
        items = await db.select().from(professori);
        break;
      default:
        return json(
          { success: false, message: "Invalid type" },
          { status: 400 }
        );
    }

    return json({ success: true, items });
  } catch (error) {
    console.error("Admin API Error:", error);
    return json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
