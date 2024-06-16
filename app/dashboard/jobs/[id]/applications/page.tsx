"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "../../../../../components/shared/button";
import { FileSearchIcon } from "../../../../../components/shared/icons/filesearch";
import { StarIcon } from "../../../../../components/shared/icons/star";
import { applicants } from "../../../../../lib/data";

/* /dashboard/jobs/[id]/applications */

export default function ApplicationsPage({ params }: { params: { id: string } }) {
    const [sortBy, setSortBy] = useState<keyof (typeof applicants)[0]>("score");
    const [sortDirection, setSortDirection] = useState("desc");
    const sortedApplicants = useMemo(() => {
        return [...applicants].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [sortBy, sortDirection]);

    const topThreeApplicants = sortedApplicants.slice(0, 3);
    // const topThreeApplicants = [];
    const handleSort = (field: keyof (typeof applicants)[0]) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortDirection("desc");
        }
    };

    return (
        <main className="flex-1 px-4 md:px-6 py-12">
            <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
                <header className="mb-8 md:mb-10 lg:mb-12">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Senior Software Engineer
                    </h1>
                </header>
                {topThreeApplicants.length === 0 ? (
                    <div className="bg-gray-100 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center text-center">
                        <FileSearchIcon className="w-12 h-12 text-gray-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">No Applicants Yet</h2>
                        <p className="text-gray-500 mb-6">
                            There are currently no applicants for this position. Check back later or consider posting
                            the job in additional places.
                        </p>
                        {/* <Button variant="outline">Post Job</Button> */}
                    </div>
                ) : (
                    <div className="grid gap-6 md:gap-8 lg:gap-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                            <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex flex-col items-start gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-semibold">John Doe</h3>
                                        <p className="text-sm text-gray-500">10+ years of experience</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-3">
                                    John is an experienced software engineer with a strong background in full-stack web
                                    development. He has a proven track record of delivering high-quality, scalable
                                    applications and has expertise in React, Node.js, and cloud infrastructure.
                                </p>
                                <div className="flex items-center gap-2">
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-gray-300 dark:fill-gray-600" />
                                    <StarIcon className="w-5 h-5 fill-gray-300 dark:fill-gray-600" />
                                    <span className="text-sm text-gray-500 ml-2">4.2</span>
                                </div>
                                <div className="mt-auto w-full">
                                    <Button variant="link" size="sm" className="ml-auto">
                                        View Profile
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex flex-col items-start gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>JS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-semibold">Jane Smith</h3>
                                        <p className="text-sm text-gray-500">8 years of experience</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-3">
                                    Jane is a talented frontend engineer with a strong focus on building responsive,
                                    user-friendly interfaces. She has experience with modern JavaScript frameworks like
                                    React and Angular, and has a keen eye for design and user experience.
                                </p>
                                <div className="flex items-center gap-2">
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-gray-300 dark:fill-gray-600" />
                                    <span className="text-sm text-gray-500 ml-2">4.5</span>
                                </div>
                                <div className="mt-auto w-full">
                                    <Link
                                        href={`/dashboard/jobs/${params.id}/applications/1`}
                                        className="ml-auto inline-flex items-center justify-center text-sm text-gray-900 font-medium underline-offset-4 hover:underline h-9 rounded-md px-3"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex flex-col items-start gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>BJ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-semibold">Bob Johnson</h3>
                                        <p className="text-sm text-gray-500">6 years of experience</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-3">
                                    Bob is a full-stack engineer with a strong background in backend development. He has
                                    experience building scalable and secure APIs using Node.js and has also worked on
                                    frontend projects using React and other modern web technologies.
                                </p>
                                <div className="flex items-center gap-2">
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-yellow-500" />
                                    <StarIcon className="w-5 h-5 fill-gray-300 dark:fill-gray-600" />
                                    <StarIcon className="w-5 h-5 fill-gray-300 dark:fill-gray-600" />
                                    <span className="text-sm text-gray-500 ml-2">3.8</span>
                                </div>
                                <div className="mt-auto w-full">
                                    <Button variant="link" size="sm" className="ml-auto">
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                prefetch={false}
                            >
                                View All Applicants
                            </Link>
                        </div>
                    </div>
                )}
            </div>{" "}
        </main>
    );
}
