import { Overview } from "@/components/overview";
import { RecentJobPostings } from "@/components/recent-jobs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, FileSearchIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

/* total applicants, success rate, interviews, open positions */
export const dynamic = "force-dynamic";

export default async function page() {
    /* fetch data for dashboard */
    const supabase = createClient();
    let totalApplicants = 0;
    let totalInterviews = 0;
    let totalOpenPositions = 0;
    let totalJobsCreatedThisMonth = 0;
    let jobs: Array<any> | null = [];

    const {
        data: { user },
    } = await supabase.auth.getUser();

    /* total applicants, total interviews, open positions */
    const asyncJobs = [];
    const countApplicantsAsync = supabase
        .from("applications")
        .select(
            `
                id,
                name,
                jobs (author_id)
            `,
            { count: "exact", head: true }
        )
        .eq("jobs.author_id", user?.id);

    const countInterviewsAsync = supabase
        .from("applications")
        .select(
            `
                id,
                name,
                jobs (author_id)
            `,
            { count: "exact", head: true }
        )
        .eq("jobs.author_id", user?.id)
        .eq("status", "approved");

    const countOpenPositionsAsync = supabase.from("jobs").select("*", { count: "exact" }).eq("is_published", true);
    const fetchJobsAsync = supabase
        .from("jobs")
        .select("id,location,title,is_open,is_published")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false })
        .range(0, 3);

    const firstDateOfMonth = format(new Date(), "yyyy-MM-01");
    const getJobsCreatedThisMonthAsync = supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .gt("created_at", firstDateOfMonth);

    /* DO NOT CHANGE THE ORDER OF THE JOBS */
    asyncJobs.push(countApplicantsAsync);
    asyncJobs.push(countInterviewsAsync);
    asyncJobs.push(countOpenPositionsAsync);
    asyncJobs.push(fetchJobsAsync);
    asyncJobs.push(getJobsCreatedThisMonthAsync);

    const [
        countApplicantsResult,
        countInterviewsResult,
        countOpenPositionsResult,
        fetchJobsResult,
        jobCreatedThisMonthResult,
    ] = await Promise.allSettled(asyncJobs);

    /* the supabase client always fulfills the promise; if an error occurs, it fulfills with an error value  */
    if (
        fetchJobsResult.status === "fulfilled" &&
        countApplicantsResult.status === "fulfilled" &&
        countOpenPositionsResult.status === "fulfilled" &&
        countInterviewsResult.status === "fulfilled" &&
        jobCreatedThisMonthResult.status === "fulfilled"
    ) {
        jobs = fetchJobsResult.value.data;
        totalApplicants = countApplicantsResult.value.count ?? 0;
        totalInterviews = countInterviewsResult.value.count ?? 0;
        totalOpenPositions = countOpenPositionsResult.value.count ?? 0;
        totalJobsCreatedThisMonth = jobCreatedThisMonthResult.value.count ?? 0;
    }

    const successRate = Math.floor((totalInterviews / totalApplicants) * 100);

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
                    <div className="hidden items-center space-x-2 md:flex hover:font-semibold hover:text-[#38461e]">
                        <Link href="./dashboard/jobs/new">+ Create Job</Link>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalApplicants}</div>
                                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{isNaN(successRate) ? 0 : successRate}%</div>
                                    <p className="text-xs text-muted-foreground">+10.1% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalInterviews}</div>
                                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-muted-foreground"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalOpenPositions}</div>
                                    <p className="text-xs text-muted-foreground">+5 since last hour</p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview />
                                </CardContent>
                            </Card>
                            <Card className="col-span-4 md:col-span-3">
                                <CardHeader className="flex flex-row items-center">
                                    <div className="grid gap-2">
                                        <CardTitle>Recent Jobs</CardTitle>
                                        <CardDescription>
                                            You created {totalJobsCreatedThisMonth} job
                                            {totalJobsCreatedThisMonth > 1 ? "s" : ""} this month.
                                        </CardDescription>
                                    </div>
                                    <Button asChild size="sm" className="ml-auto gap-1">
                                        <Link href="./dashboard/jobs">
                                            View All
                                            <ArrowUpRightIcon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {jobs?.length ? (
                                        <RecentJobPostings jobs={jobs} />
                                    ) : (
                                        <div className="bg-gray-100 p-6 md:p-8 flex flex-col items-center justify-center text-center h-[300px] w-full">
                                            <FileSearchIcon className="w-12 h-12 text-gray-500 mb-4" />
                                            <h2 className="text-2xl font-bold mb-2">No Job Postings Yet</h2>
                                            <p className="text-gray-500 mb-6">
                                                You have not posted any jobs yet. Check back later or consider posting a
                                                new job.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}
