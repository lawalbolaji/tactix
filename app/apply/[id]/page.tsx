import { Button } from "../../../components/shared/button";
import { Textarea } from "../../../components/shared/textarea";
import { Label } from "../../../components/shared/label";
import { Input } from "../../../components/shared/input";
import { createClient } from "../../../lib/supabase/server";
import { z } from "zod";
import { notFound } from "next/navigation";
import { Job } from "../../../entities/db";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default async function ApplicationPage({ params }: { params: { id: string } }) {
    const { success, data: jobId, error: urlValidationError } = z.number().safeParse(+params.id);
    if (!success) {
        console.log(urlValidationError);
        notFound();
    }

    const supabase = createClient();
    const { data, error } = await supabase.from("jobs").select().eq("id", jobId).eq("is_published", true);

    if (!data || data.length <= 0 || error !== null) {
        error && console.log(error);
        notFound();
    }

    const jobDetails = data[0] as Job;

    async function submitJobApplication(formData: FormData) {
        "use server";

        const jobApplicationSchema = z.object({
            name: z.string(),
            email: z.string(),
            phone: z.string(),
            cover_letter: z.string(),
            additional_info: z.string(),
        });

        const {
            success,
            data: application,
            error: validateError,
        } = jobApplicationSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            cover_letter: formData.get("cover-letter"),
            additional_info: formData.get("additional"),
        });

        if (!success) {
            console.log(validateError.flatten().fieldErrors);
            return { error: { message: validateError.flatten().fieldErrors } };
        }

        // upload file
        const resume = formData.get("resume");

        if (resume instanceof Blob) {
            // TODO: PLEASE REMEMBER TO VALIDATE FILE SIZE
            console.log(resume);

            if (resume.size > MAX_FILE_SIZE) {
                console.log("file is too large");
                return ""; // TODO: give feedback to user on filesize
            }

            // submit application
            /* DO NOT REMOVE THIS INSTANCE - closing on the instance in the main server component will make next.js attempt to serialize and send it over the wire and fail remarkably */
            const supabase = createClient();
            const { error: dbError } = await supabase
                .from("applications")
                .insert([{ ...application, job_id: jobId, resume_uri: "testing_for_dev_only" }]);

            if (dbError) {
                console.log(dbError);
                return { error: { message: "unable to create application" } };
            }

            return "success"; // check next docs for how to provide this feedback to user
        }

        /* DEBUGGING */
        console.log("resume blob is missing");
    }

    return (
        <div className="w-full max-w-5xl mx-auto py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{jobDetails.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            We are looking for an experienced frontend developer to join our growing team. You will be
                            responsible for building and maintaining our web applications, ensuring a seamless user
                            experience.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Required Qualifications</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400">
                            <li>5+ years of experience in frontend development</li>
                            <li>Proficient in HTML, CSS, and JavaScript</li>
                            <li>Experience with modern JavaScript frameworks like React</li>
                            <li>Familiarity with responsive design and cross-browser compatibility</li>
                            <li>Strong problem-solving and analytical skills</li>
                            <li>Excellent communication and collaboration skills</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Benefits and Perks</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-500 dark:text-gray-400">
                            <li>Competitive salary and bonus structure</li>
                            <li>Comprehensive health insurance coverage</li>
                            <li>401(k) retirement plan with employer matching</li>
                            <li>Generous paid time off and holidays</li>
                            <li>Professional development opportunities</li>
                            <li>Flexible work arrangements</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 space-y-4">
                    <h2 className="text-xl font-bold">Apply for this role</h2>
                    <form className="space-y-4" action={submitJobApplication}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Enter your name" required aria-required />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    aria-required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                required
                                aria-required
                            />
                        </div>
                        <div>
                            <Label htmlFor="resume">Resume/CV</Label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                id="resume"
                                type="file"
                                name="resume"
                                accept=".pdf"
                                required
                                aria-required
                            />
                        </div>
                        <div>
                            <Label htmlFor="cover-letter">Cover Letter</Label>
                            <Textarea
                                id="cover-letter"
                                placeholder="Write your cover letter"
                                className="min-h-[150px]"
                                name="cover-letter"
                                required
                                aria-required
                            />
                        </div>
                        <div>
                            <Label htmlFor="additional">Additional Information (optional)</Label>
                            <Input id="additional" name="additional" placeholder="Provide any additional details" />
                        </div>
                        <Button type="submit" className="w-full">
                            Apply for this job
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
