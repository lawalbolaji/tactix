import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "../../../../../lib/supabase/server";
import { z } from "zod";

export default async function ViewJobPage({ params }: { params: { id: number } }) {
    const { success, data: jobId, error: urlValidationError } = z.number().safeParse(+params.id);
    if (!success) {
        console.log(urlValidationError);
        notFound();
    }

    const supabase = createClient();
    const { data: job, error } = await supabase
        .from("jobs")
        .select("description")
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
        <>
            <div className="prose">
                <MDXRemote source={job.description} />
            </div>
            <div className="flex items-center justify-center my-16">
                <Link
                    href="./apply"
                    className="w-24 h-12 border rounded-lg bg-[rgba(79,70,229,1)] text-white text-center font-semibold flex items-center justify-center"
                >
                    Apply
                </Link>
            </div>
        </>
    );
}
