"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
    const payload = {
        title: formData.get("title"),
        location: formData.get("location"),
        // description: formData.get("description"),
        qualifications: formData.get("qualifications"),
    };

    // save to db
    console.log(payload);
    revalidatePath("/dashboard", "layout");
    redirect("/dashboard");
}
