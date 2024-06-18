// prettier-ignore
import { Footprints, ShareIcon, HardHat, Waypoints, GlobeLock, ReceiptText, Handshake } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { Button } from "@/components/ui/button";
import { GenerateButton } from "@/components/ai/generate-btn";
import { Editor } from "@/components/ai/editor";
import { EmploymentTypeSelect } from "@/components/ai/employment-type";
import { ExperienceSelect } from "@/components/ai/experience";
import { createNewJobPosting } from "./action";
import { SubmitButton } from "../../../../../components/ai/submitbtn";

export const employmentTypes = ["Contract", "Permanent", "Part/time"] as const;
export const employmentTypeIcons: Record<(typeof employmentTypes)[number], JSX.Element> = {
    Contract: <Handshake />,
    Permanent: <GlobeLock />,
    "Part/time": <ReceiptText />,
};

export const experienceLevels = ["Entry Level", "Mid/Intermediate Level", "Expert"] as const;
export const experienceLevelIcons: Record<(typeof experienceLevels)[number], JSX.Element> = {
    Expert: <HardHat />,
    "Entry Level": <Footprints />,
    "Mid/Intermediate Level": <Waypoints />,
};

export default async function CreateNewJobPage() {
    return (
        <div className="flex flex-col">
            <form action={createNewJobPosting}>
                <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 bg-background px-4">
                    <h1 className="text-xl font-semibold pl-[1%] pt-[2%]">Create a new job</h1>
                    <SubmitButton />
                </header>
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 md:border md:rounded-md md:shadow-md md:mx-[2%] md:mt-[1%]">
                    <div
                        className="relative hidden flex-col items-start gap-8 md:flex h-[80vh] overflow-auto hide-scrollbar"
                        x-chunk="dashboard-03-chunk-0"
                    >
                        <div className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="title">Job title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        name="title"
                                        required
                                        aria-required
                                        placeholder="Senior software engineer"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <ExperienceSelect />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3 text-left">
                                        <EmploymentTypeSelect />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="salary">Salary</Label>
                                        <Input
                                            id="salary"
                                            name="salary"
                                            required
                                            aria-required
                                            type="text"
                                            placeholder="₦ 20,000,000"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="qualifications">Min. Qualifications</Label>
                                    <Input
                                        id="qualifications"
                                        type="text"
                                        name="qualifications"
                                        required
                                        aria-required
                                        placeholder="BSc. Technology"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            required
                                            aria-required
                                            type="text"
                                            placeholder="Contract"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="expires_at">Job expiry date</Label>
                                        <Input
                                            id="expires_at"
                                            name="expires_at"
                                            required
                                            aria-required
                                            type="text"
                                            placeholder="tomorrow"
                                        />
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">Confirmation Message</legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="email-subject">Subject</Label>
                                    <Input
                                        id="email_subject"
                                        type="text"
                                        name="email_subject"
                                        required
                                        aria-required
                                        // TODO: add default value from server
                                        placeholder="Thank you for applying at {{user.company}}"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email-message">Message</Label>
                                    <Textarea
                                        id="email_message"
                                        name="email_message"
                                        required
                                        aria-required
                                        // add default value from server
                                        placeholder="Dear {{application.name}}"
                                        className="min-h-[9.5rem]"
                                    />
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                        <GenerateButton />
                        <div className="flex-1" />
                        <Editor />
                    </div>
                </main>
            </form>
        </div>
    );
}
