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

export type Application = {
    id: number;
    name: string;
    email: string;
    phone: string;
    resume: string;
    coverLetter: string;
    score: number;
    rationale: string;
    years_of_experience: number;
};

export type ApplicationList = Array<Pick<Application, "id" | "name" | "score" | "rationale" | "years_of_experience">>;
