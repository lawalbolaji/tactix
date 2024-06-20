import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// prettier-ignore
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { createClient } from "@/lib/supabase/server";
import { FileSearchIcon } from "@/components/shared/icons/filesearch";
import Link from "next/link";
import { PublishJobButton } from "@/components/jobs/publish";
import { format, parseISO } from "date-fns";
import { DeleteJobButton } from "@/components/jobs/delete";
import { CopyJobUrlButton } from "@/components/jobs/copy";

// const REMOTE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSxxxxx";
const APP_TIME_FORMAT = "yyyy-MM-dd";
const PAGE_SIZE = 7;

export default async function JobsPage({ searchParams }: { searchParams: { offset: number } }) {
    /* fetch all job postings */
    let offset = +(searchParams.offset || 0);
    const currentPage = offset / PAGE_SIZE;
    const supabase = createClient();
    const {
        data: jobs,
        error,
        count: totalRecords,
    } = await supabase
        .from("jobs")
        .select("id,location,title,is_open,is_published,created_at,expires_at", { count: "exact" })
        .eq("is_deleted", false)
        .range(offset, offset + PAGE_SIZE - 1);

    if (jobs === null || totalRecords === null || !jobs.length || error) {
        return (
            <div className="bg-gray-100 p-6 md:p-8 flex flex-col items-center justify-center text-center h-full w-full">
                <FileSearchIcon className="w-12 h-12 text-gray-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Job Postings Yet</h2>
                <p className="text-gray-500 mb-6">
                    You have not posted any jobs yet. Check back later or consider posting a new job.
                </p>

                <Link
                    href={"./jobs/new"}
                    className="p-4 border rounded-lg bg-[hsl(222.2,47.4%,11.2%)] text-white hover:opacity-80"
                >
                    + Create new Job{" "}
                </Link>
            </div>
        );
    }

    return (
        <Card style={{ boxShadow: "none", border: "none" }}>
            <div className="flex flex-row justify-between items-center">
                <CardHeader className="px-7">
                    <CardTitle>Job Postings</CardTitle>
                    <CardDescription>All job postings you&apos;ve created.</CardDescription>
                </CardHeader>
                <div className="hidden items-center space-x-2 md:flex lg:mr-16 px-4 py-2 hover:font-semibold hover:text-[#38461e]">
                    <Link href="./jobs/new" className="">
                        + Create Job
                    </Link>
                </div>
            </div>
            <CardContent style={{ border: "none" }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead className="hidden sm:table-cell">Created On</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden md:table-cell">Expires On</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>
                                    <Link href={`./jobs/${job.id}/applications`} prefetch={false}>
                                        <div className="font-medium">{job.title}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {job.location}
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {format(parseISO(job.created_at), APP_TIME_FORMAT)}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge className="text-xs" variant="secondary">
                                        {job.is_published
                                            ? job.is_open
                                                ? new Date(job.expires_at) > new Date()
                                                    ? "Published"
                                                    : "Expired"
                                                : "Closed"
                                            : "Draft"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {format(parseISO(job.expires_at), APP_TIME_FORMAT)}
                                </TableCell>
                                <TableCell className="text-right flex justify-center items-center">
                                    <div className="flex items-center gap-2">
                                        <PublishJobButton jobId={job.id} is_published={job.is_published} />
                                        <CopyJobUrlButton jobId={job.id} />
                                        <DeleteJobButton jobId={job.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="border-t px-4 py-6 flex items-center justify-between">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    aria-disabled={currentPage < 1}
                                    href={`./jobs?offset=${(currentPage - 1) * PAGE_SIZE}`}
                                    style={
                                        currentPage < 1
                                            ? {
                                                  pointerEvents: "none",
                                                  opacity: "0.4",
                                              }
                                            : {}
                                    }
                                />
                            </PaginationItem>
                            {currentPage < 1 ? (
                                <></>
                            ) : (
                                <PaginationItem>
                                    <PaginationLink href="#">{currentPage}</PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                            {(currentPage + 1) * PAGE_SIZE < totalRecords ? (
                                <PaginationItem>
                                    <PaginationLink href="#">{currentPage + 2}</PaginationLink>
                                </PaginationItem>
                            ) : (
                                <></>
                            )}
                            <PaginationItem>
                                <PaginationNext
                                    aria-disabled={(currentPage + 1) * PAGE_SIZE >= totalRecords}
                                    style={
                                        (currentPage + 1) * PAGE_SIZE >= totalRecords
                                            ? {
                                                  pointerEvents: "none",
                                                  opacity: "0.4",
                                              }
                                            : {}
                                    }
                                    href={`./jobs?offset=${(currentPage + 1) * PAGE_SIZE}`}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>
    );
}
