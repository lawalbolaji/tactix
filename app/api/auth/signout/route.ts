import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) console.log(error);

    revalidatePath("/v2/dashboard", "layout");
    redirect("/");
}
