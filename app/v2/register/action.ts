"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function signUp(prevState: any, formData: FormData) {
    const authSchema = z.object({
        email: z.string().email(),
        password: z.string(),
        confirm_password: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        company_url: z.string().url(),
        company_name: z.string(),
    });

    const {
        success,
        error: validationError,
        data: authPayload,
    } = authSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        company_url: formData.get("company_url"),
        company_name: formData.get("company_name"),
    });

    if (!success) {
        console.log(validationError.flatten().fieldErrors);
        return { error: { fields: validationError.flatten().fieldErrors, type: "VALIDATION_ERROR" } };
    }

    /* revalidate that password and confirmPassword match */
    if (authPayload.password !== authPayload.confirm_password) {
        return { error: { message: "passwords do not match", type: "OTHER" } };
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
        email: authPayload.email,
        password: authPayload.password,
        options: {
            data: {
                name: `${authPayload.firstname} ${authPayload.lastname}`,
                company_name: authPayload.company_name,
                company_url: authPayload.company_url,
            },
        },
    });

    if (authError) {
        /* needs my attention, nothing the user can really do, we'll just tell em there's a problem */
        console.log(authError);
        return { error: { message: authError.message, type: authError.name } };
    }

    revalidatePath("/v2/dashboard", "layout");
    redirect("/v2/dashboard?newUser=true");
}
