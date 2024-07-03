import { notFound } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export default async function JobsLayout({ children, params }: { children: React.ReactNode; params: { id: number } }) {
    const { success, data: jobId, error: urlValidationError } = z.number().safeParse(+params.id);
    if (!success) {
        console.log(urlValidationError);
        notFound();
    }

    const supabase = createClient();
    const { data: job, error } = await supabase
        .from("jobs")
        .select(
            `
            title,
            location,
            company
            `
        )
        .eq("id", jobId)
        .eq("is_published", true)
        .eq("is_deleted", false)
        .gte("expires_at", new Date().toISOString())
        .maybeSingle();

    if (!job || error !== null) {
        error && console.log(error);
        notFound();
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center justify-center my-8">
                <h1 className="text-3xl font-bold">
                    {job.title}, {job.company ?? "Acme inc."}
                </h1>
                <p className="text-sm p-2 font-semibold">{job.location}</p>
            </div>
            {children}
        </div>
    );
}
