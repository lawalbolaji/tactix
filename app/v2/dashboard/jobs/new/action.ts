"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { employmentTypes, experienceLevels } from "@/components/jobs/data";

export async function createNewJobPosting(formData: FormData) {
    const payload = {
        title: formData.get("title"),
        location: formData.get("location"),
        description: formData.get("description"),
        salary: formData.get("salary"),
        expires_at: formData.get("expires_at"),
        employment_type: formData.get("employment_type"),
        experience: formData.get("experience"), // entry_level, mid_level, expert
        qualifications: formData.get("qualifications"),
        email_subject: formData.get("email_subject"),
        email_message: formData.get("email_message"),
    };

    // validate form
    const jobPostingSchema = z.object({
        title: z.string(),
        location: z.string(),
        salary: z.string(),
        qualifications: z.string(),
        description: z.string(),
        expires_at: z.string(),
        employment_type: z.enum(employmentTypes),
        experience: z.enum(experienceLevels),
        email_subject: z.string(),
        email_message: z.string(),
    });

    const { success: parseSuccess, data, error: parseError } = jobPostingSchema.safeParse(payload);
    if (!parseSuccess) {
        console.log(parseError.flatten());
        return { errors: parseError.flatten().fieldErrors };
    }

    // validate user credentials
    const supabase = createClient();
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    const company = user?.user_metadata.company_name || null;

    if (authError || !user) {
        return { error: { message: "unauthorized!" } };
    }

    // save data to db
    const { error: dbError } = await supabase.from("jobs").insert([
        {
            ...data,
            author_id: user.id,
            is_published: true,
            company,
            expires_at: randomDate(new Date(2024, 0, 1), new Date(2025, 0, 1)).toISOString(),
        },
    ]);
    if (dbError) {
        console.log(dbError);
        return { error: { message: "Error processing your request, please try again later!" } };
    }

    console.log("successfully saved job to DB");

    revalidatePath("/v2/dashboard", "layout");
    redirect("/v2/dashboard");
}

function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
