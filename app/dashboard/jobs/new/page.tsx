"use client";

import { Label } from "@/components/shared/label";
import { Input } from "@/components/shared/input";
import { Textarea } from "@/components/shared/textarea";
import { Button } from "@/components/shared/button";
import { Editor } from "../../../../components/editor/editor";
import { createNewJobPosting } from "./action";
import { useState } from "react";

/* /dashboard/jobs/new */

// to create a new job, just pass id of new to this page
export default function JobPostingDetailsPage() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [qualification, setQualification] = useState("");
    const [salary, setSalary] = useState("");

    return (
        <main className="flex-1 px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Create a new job posting</h1>
                </div>
                <form className="space-y-6" action={createNewJobPosting}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Software Engineer"
                                required
                                aria-required
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setTitle(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="Lagos, Nigeria"
                                value={location}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setLocation(e.currentTarget.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="qualifications">Required Qualifications</Label>
                            <Textarea
                                id="qualifications"
                                name="qualifications"
                                placeholder="List the required qualifications for this role."
                                rows={3}
                                value={qualification}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    setQualification(e.currentTarget.value);
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary Range</Label>
                            <Input
                                id="salary"
                                name="salary"
                                placeholder="₦8,000,000 - ₦20,000,000"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setSalary(e.currentTarget.value);
                                }}
                            />
                        </div>
                    </div>

                    <Editor {...{ location, title, qualification, salary }} />

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
