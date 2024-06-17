"use server";

import { z } from "zod";
import { createClient } from "../../../../lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewJobPosting(formData: FormData) {
    const payload = {
        title: formData.get("title"),
        location: formData.get("location"),
        description: formData.get("description"),
        salary: formData.get("salary"),
        is_published: formData.get("is_published"),
    };

    // validate form
    const jobPostingSchema = z.object({
        title: z.string(),
        location: z.string().optional(),
        salary: z.string().optional(),
        qualifications: z.string().optional(),
        description: z.string().optional(),
        // is_published: z.boolean(),
    });

    const { success, data, error: parseError } = jobPostingSchema.safeParse(payload);
    if (!success) {
        return { errors: parseError.flatten().fieldErrors };
    }

    // validate user credentials
    const supabase = createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return { error: { message: "forbidden request" } };
    }

    // save data to db
    const { error: dbError } = await supabase.from("jobs").insert([{ ...data, author_id: user.id }]);
    if (dbError) {
        console.log(dbError);
        return { error: { message: "Error processing your request, please try again later!" } };
    }

    console.log("successfully saved job to DB");

    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
}
