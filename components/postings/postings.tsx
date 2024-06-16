"use client";

import { Button } from "../shared/button";
import { EyeIcon } from "../shared/icons/eye";
import { FilePenIcon } from "../shared/icons/filepen";
import { TrashIcon } from "../shared/icons/trash";
import Link from "next/link";
import { Job } from "../../entities/db";

export function Postings(props: { jobs: Array<Job> }) {
    // const [sortBy, setSortBy] = useState<keyof (typeof jobPostings)[0]>("totalApplicants");
    // const [sortDirection, setSortDirection] = useState("desc");

    // const sortedJobPostings = useMemo(() => {
    //     return [...jobPostings].sort((a, b) => {
    //         if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
    //         if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
    //         return 0;
    //     });
    // }, [sortBy, sortDirection]);

    // const handleSort = (field: keyof (typeof jobPostings)[0]) => {
    //     if (sortBy === field) {
    //         setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    //     } else {
    //         setSortBy(field);
    //         setSortDirection("desc");
    //     }
    // };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 ">
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            // onClick={() => handleSort("title")}
                        >
                            Title{" "}
                            {/* {sortBy === "title" && (
                                <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                            )} */}
                        </th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            // onClick={() => handleSort("totalApplicants")}
                        >
                            Total Applicants{" "}
                            {/* {sortBy === "totalApplicants" && (
                                <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                            )} */}
                        </th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            // onClick={() => handleSort("successRate")}
                        >
                            Success Rate{" "}
                            {/* {sortBy === "successRate" && (
                                <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                            )} */}
                        </th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            // onClick={() => handleSort("scheduledInterviews")}
                        >
                            Scheduled Interviews{" "}
                            {/* {sortBy === "scheduledInterviews" && (
                                <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                            )} */}
                        </th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            // onClick={() => handleSort("openPositions")}
                        >
                            Open Positions{" "}
                            {/* {sortBy === "openPositions" && (
                                <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                            )} */}
                        </th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.jobs.map((posting) => (
                        <tr key={posting.id} className="border-b border-gray-200 ">
                            <td className="px-4 py-3">
                                <Link href={`/dashboard/jobs/${posting.id}/applications`}>{posting.title}</Link>
                            </td>
                            <td className="px-4 py-3">{Math.floor(Math.random() * 190) + 10}</td>
                            <td className="px-4 py-3">{Math.floor(Math.random() * 100)}%</td>
                            <td className="px-4 py-3">{Math.floor(Math.random() * 25) + 10}</td>
                            <td className="px-4 py-3">{Math.floor(Math.random() * 5) + 5}</td>
                            <td className="px-4 py-3">{posting.is_published ? "open" : "close"}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 ">
                                        <EyeIcon className="w-5 h-5" />
                                        <span className="sr-only">View Posting</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 ">
                                        <FilePenIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Posting</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 ">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Posting</span>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
