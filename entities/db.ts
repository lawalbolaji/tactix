export type Job = {
    id: number;
    author: string;
    title: string;
    description: string;
    location: string;
    salary: string;
    is_open: boolean;
    is_published: boolean;

    /* we need to add total_applicants, and other columns we want to sort by in the UI */
};

export type Application = {};
