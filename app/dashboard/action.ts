"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut(formData: FormData) {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) console.log(error);

    revalidatePath("/dashboard", "layout");
    redirect("/");
}
