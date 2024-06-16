import { Label } from "@/components/shared/label";
import { Input } from "@/components/shared/input";
import { Textarea } from "@/components/shared/textarea";
import { Button } from "@/components/shared/button";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "../../../../lib/supabase/server";

/* /dashboard/jobs/[id] */

// to create a new job, just pass id of new to this page
export default async function JobPostingDetailsPage({ params }: { params: { id: string } }) {
    async function createNewJobPosting(formData: FormData) {
        "use server";

        const payload = {
            title: formData.get("title"),
            location: formData.get("location"),
            // description: formData.get("description"),
            salary: formData.get("salary"),
            is_published: formData.get("is_published"),
        };

        // validate form
        const jobPostingSchema = z.object({
            title: z.string(),
            location: z.string().optional(),
            salary: z.string().optional(),
            qualifications: z.string().optional(),
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

    return (
        <main className="flex-1 px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Create a new job posting</h1>
                    <p className="text-gray-500 ">Fill out the form below to create a new job posting.</p>
                </div>
                <form className="space-y-6" action={createNewJobPosting}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" name="title" placeholder="Software Engineer" required aria-required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" placeholder="Lagos, Nigeria" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe the job responsibilities and requirements."
                            rows={6}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="qualifications">Required Qualifications</Label>
                            <Textarea
                                id="qualifications"
                                name="qualifications"
                                placeholder="List the required qualifications for this role."
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary Range</Label>
                            <Input id="salary" name="salary" placeholder="₦8,000,000 - ₦20,000,000" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button className="w-full sm:w-auto" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
