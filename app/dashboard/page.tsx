import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/shared/card";
import { PlusIcon } from "@/components/shared/icons/plus";
import { BarChart } from "@/components/barchart/barchart";
import { LineChart } from "@/components/linechart/linechart";
import { Postings } from "@/components/postings/postings";
import { createClient } from "@/lib/supabase/server";
import { Job } from "@/entities/db";

export default async function Dashboard() {
    // load dashboard data

    /* will fetch this from database eventually */
    const totalApplicants = 422;
    const totalScheduledInterviews = 148;
    const successRate = totalScheduledInterviews / totalApplicants;
    const totalOpenPositions = 9;

    /* fetch job applications */
    const supabase = createClient();
    const { data: jobs, error: dbError } = await supabase.from("jobs").select().range(0, 5);

    /* TODO: check route-segments to show an empty page for the postings table for this scenario */
    if (!jobs) console.log(dbError);

    return (
        <div className="flex flex-1">
            <main className="flex-1 px-4 md:px-6 py-12">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-500 ">Overview of your job postings and applicant tracking.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Applicants</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{totalApplicants}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Success Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{Math.floor(successRate * 100)}%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Interviews</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{totalScheduledInterviews}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Open Positions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{totalOpenPositions}</div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <div className="flex items-center justify-between my-4">
                            <h2 className="text-2xl font-bold">Job Postings</h2>
                            <Link href="/dashboard/jobs/new" className="flex flex-row items-center justify-center">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Create New Posting
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Applicants by Job Posting</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BarChart className="aspect-[16/9]" />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Success Rate by Job Posting</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <LineChart className="aspect-[16/9]" />
                                </CardContent>
                            </Card>
                        </div>

                        <Postings jobs={(jobs ?? []) as Array<Job>} />
                    </div>
                </div>
            </main>
        </div>
    );
}
