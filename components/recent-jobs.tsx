import { EllipsisVertical } from "lucide-react";
import { DropdownMenuTrigger } from "./shared/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./shared/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "./ui/dropdown-menu";

export function RecentJobPostings(props: { jobs: Array<any> | null }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.jobs?.map((job) => (
                    <TableRow key={job.id}>
                        <TableCell>
                            <div className="font-medium">{job.title}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">{job.location}</div>
                        </TableCell>
                        <TableCell className="">
                            <Badge className="text-xs" variant="outline">
                                {job.is_open ? "Open" : "Closed"}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <EllipsisVertical className="h-4 w-4" />
                                        <span className="sr-only">Transaction actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
                                    {/* create job url based on job id */}
                                    <DropdownMenuItem>Copy job url</DropdownMenuItem>

                                    {/* this should call a server action to update the jobStatus */}
                                    <DropdownMenuItem>Publish</DropdownMenuItem>

                                    {/* delete job with server action */}
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
