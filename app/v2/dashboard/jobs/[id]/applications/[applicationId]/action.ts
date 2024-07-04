"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function UpdateApplicationStatus(
    update: { type: "reject" | "approve"; applicationId: number },
    _: FormData
) {
    const supabase = createClient();
    const { error } = await supabase
        .from("applications")
        .update({ status: update.type === "approve" ? "approved" : "rejected" })
        .eq("id", update.applicationId);

    if (error) console.log(error);
    revalidatePath("/dashboard", "layout");
}
