import { NavItem } from "@/types";

export const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/v2/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Jobs",
        href: "/v2/dashboard/jobs",
        icon: "kanban",
        label: "Jobs",
    },
    {
        title: "SignOut",
        href: "/api/auth/signout",
        icon: "login",
        label: "Sign Out",
    },
];

const applicationReceivedResponse = `
We have received your application!
Thank you for your application. We appreciate your interest in joining our company.
We will review your application for {job-title} shortly, and get back to you as soon as possible.
Best regards,
`;

/* 
    Dear {{user.name}},

    We are pleased to inform you that you have been selected for the role of {{job.role}} at {{user.company}}. We congratulate you on this milestone and look forward to conquering the industry with your help.

    Regards,
    hr@{{user.compay}}
*/
