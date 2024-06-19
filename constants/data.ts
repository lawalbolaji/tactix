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

export const applicationReceivedResponse = `Dear {{user.name}},

We are pleased to inform you that you have been selected for the role of {{job.role}} at {{user.company}}. We congratulate you on this milestone and look forward to conquering the industry with your help.

Regards,
hr@{{user.company}}
`;

// sample markdown

const jobDescreption = `
We are seeking a highly skilled and experienced Software Engineer to join our dynamic team in Lagos. The ideal candidate will have a robust background in software development and a proven track record of working with modern technologies. You will be responsible for designing, developing, and maintaining software applications that meet our clients' needs and exceed their expectations.

### Key Responsibilities
- Design, develop, test, and maintain software applications using JavaScript.
- Collaborate with cross-functional teams to define, design, and ship new features.
- Ensure the performance, quality, and responsiveness of applications.
- Identify and correct bottlenecks and fix bugs.
- Continuously discover, evaluate, and implement new technologies to maximize development efficiency.
- Provide technical support and troubleshooting assistance for software applications.
- Manage and optimize deployment processes using AWS Cloud services.

### Skills, Qualifications, and Experience
- **JavaScript**: Extensive experience in JavaScript, including frameworks and libraries.
- **AWS Cloud**: Proficient in using AWS Cloud services for application deployment and management.
- **Tech Support Tools**: Familiarity with a range of tech support tools and practices for effective troubleshooting and support.
- **Experience**: Minimum of 5 years of professional experience in software development.
- Bachelor's degree in Computer Science, Information Technology, or a related field.
- Strong problem-solving skills and the ability to think critically and creatively.
- Excellent communication skills, both written and verbal.
- Ability to work independently and as part of a team.

### Preferred Qualifications
- Experience with front-end frameworks such as React or Angular.
- Familiarity with DevOps practices and tools.
- Knowledge of CI/CD pipelines and version control systems like Git.

## What We Offer
- Competitive salary and benefits package.
- Opportunity to work on exciting projects with a talented team.
- Continuous professional development and career growth opportunities.
- A collaborative and innovative work environment.

If you are a passionate Software Engineer looking for a challenging role in a vibrant and growing company, we would love to hear from you!

---

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
`;
