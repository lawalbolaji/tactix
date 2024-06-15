import { Label } from "@/components/shared/label";
import { Input } from "@/components/shared/input";
import { Textarea } from "@/components/shared/textarea";
import { Button } from "@/components/shared/button";
import { createJobPosting } from "./action";

/* /dashboard/jobs/[id] */

// to create a new job, just pass id of new to this page
export default async function JobPostingDetailsPage({ params }: { params: { id: string } }) {
    // check if existing job id exists
    return (
        <main className="flex-1 px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Create a new job posting</h1>
                    <p className="text-gray-500 ">Fill out the form below to create a new job posting.</p>
                </div>
                <form className="space-y-6" action={createJobPosting}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" name="title" placeholder="Software Engineer" />
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
                    <div className="flex justify-end">
                        <Button className="w-full sm:w-auto" type="submit">
                            Publish Job Posting
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
