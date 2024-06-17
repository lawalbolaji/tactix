"use client";

import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
// prettier-ignore
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/shared/pagination";
// prettier-ignore
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/shared/table";
// prettier-ignore
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/shared/dropdown-menu";
import { useMemo, useState } from "react";
import { applicants } from "@/lib/data";
import Link from "next/link";
import { MailIcon } from "@/components/shared/icons/mail";
import { ChevronDownIcon } from "@/components/shared/icons/chevrondown";
import { FileIcon } from "@/components/shared/icons/file";
import { UserIcon } from "@/components/shared/icons/user";

type sortKey = keyof (typeof applicants)[0];
type orderKey = "asc" | "des";

export default function AllApplicationsPage() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<{ key: sortKey; order: orderKey }>({
        key: "name",
        order: "asc",
    });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const legitApplicants = useMemo(() => {
        return applicants
            .filter((applicant) => {
                const searchValue = search.toLowerCase();
                return (
                    applicant.name.toLowerCase().includes(searchValue) ||
                    applicant.email.toLowerCase().includes(searchValue) ||
                    applicant.status.toLowerCase().includes(searchValue)
                );
            })
            .sort((a, b) => {
                if (sort.order === "asc") {
                    return a[sort.key] > b[sort.key] ? 1 : -1;
                } else {
                    return a[sort.key] < b[sort.key] ? 1 : -1;
                }
            })
            .slice((page - 1) * pageSize, page * pageSize);
    }, [search, sort, page, pageSize]);

    const totalPages = Math.ceil(applicants.length / pageSize);

    return (
        <div className="flex flex-col gap-4 p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                    <Input
                        type="search"
                        placeholder="Search applicants..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Sort by <ChevronDownIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup
                                value={sort.key}
                                onValueChange={(key) => setSort({ key: key as sortKey, order: "asc" })}
                            >
                                <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="email">Email</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={sort.order}
                                onValueChange={(order) => setSort({ key: sort.key, order: order as orderKey })}
                            >
                                <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {pageSize} per page <ChevronDownIcon className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup
                                value={pageSize.toString()}
                                onValueChange={(size) => setPageSize(parseInt(size))}
                            >
                                <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="overflow-auto border border-gray-200 rounded-lg dark:border-gray-800">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="w-[200px]">Email</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead className="w-[150px]">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {legitApplicants.map((applicant) => (
                            <TableRow key={applicant.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4 shrink-0" />
                                        {applicant.name}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <MailIcon className="w-4 h-4 shrink-0" />
                                        {applicant.email}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link href="#" target="_blank" prefetch={false}>
                                        <div className="flex items-center gap-2">
                                            <FileIcon className="w-4 h-4 shrink-0" />
                                            View Resume
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>{applicant.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end gap-2">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                                aria-disabled={page === 1}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setPage(pageNumber)}
                                    isActive={pageNumber === page}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                                aria-disabled={page === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
