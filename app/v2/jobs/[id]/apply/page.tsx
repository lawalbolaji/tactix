import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "../../../../../components/apply/submitbtn";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ApplyForJobPage({ params }: { params: { id: string } }) {
    const { success, data: jobId, error: urlValidationError } = z.number().safeParse(+params.id);
    if (!success) {
        console.log(urlValidationError);
        notFound();
    }

    async function submitJobApplication(formData: FormData) {
        "use server";

        const jobApplicationSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            cover_letter: z.string(),
            additional_info: z.string(),
            linkedin: z.string().url(),
            portfolio: z.string().url(),
            location: z.string(),
        });

        const {
            success,
            data: application,
            error: validateError,
        } = jobApplicationSchema.safeParse({
            name: `${formData.get("firstname")} ${formData.get("lastname")}`,
            email: formData.get("email"),
            cover_letter: formData.get("cover_letter"),
            additional_info: formData.get("additional_info"),
            linkedin: formData.get("linkedin"),
            portfolio: formData.get("portfolio"),
            location: formData.get("location"),
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

            /* TODO: upload resume and get source url */

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

            redirect(`/v2/jobs/${jobId}/success`);
        }

        /* DEBUGGING */
        console.log("resume blob is missing");
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center justify-center my-8">
                <h1 className="text-3xl font-bold">Senior Software Engineer, Tactix</h1>
                <p className="text-sm p-2 font-semibold">Location: Lagos, Nigeria</p>
            </div>
            <form className="md:w-[50%] w-full" action={submitJobApplication}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-gray-900">
                                    Linkedin profile
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="linkedin"
                                        id="linkedin"
                                        autoComplete="linkedin"
                                        required
                                        aria-required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="portfolio"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Portfolio Url
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="portfolio"
                                        id="portfolio"
                                        autoComplete="portfolio"
                                        required
                                        aria-required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover_letter"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Why do you want to join this company
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="cover_letter"
                                        name="cover_letter"
                                        rows={3}
                                        placeholder="tell us a bit about your background and motivation"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="resume" className="block text-sm font-medium leading-6 text-gray-900">
                                    CV / Resume
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="resume"
                                                    name="resume"
                                                    type="file"
                                                    // className="sr-only"
                                                    required
                                                    aria-required
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        required
                                        aria-required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        required
                                        aria-required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        aria-required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Location
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="location"
                                        name="location"
                                        autoComplete="location"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                                    Salary expectations
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="salary"
                                        id="salary"
                                        autoComplete="salary"
                                        required
                                        aria-required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="additional_info"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Additional information
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="additional_info"
                                        name="additional_info"
                                        rows={3}
                                        placeholder="Provide any additional bits of information that might help us learn better about you"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SubmitButton />
            </form>
        </div>
    );
}
