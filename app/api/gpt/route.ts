import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "../../../lib/supabase/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    const payload = await request.json();
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (!user || error) {
        console.log({ error });
        return NextResponse.json({ error: "user not signed in" }, { status: 401 });
    }

    const companyName = user?.user_metadata.company_name ?? "tactix";

    // call gpt 4o
    const completions = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: `
                    Give the following details, generate a job post:

                    =======
                    Job title: ${payload.title}
                    Location: ${payload.location}
                    Experience Level: ${payload.experienceLevel}
                    Skills and Competencies: ${payload.qualifications}
                    Employment Type: ${payload.employmentType}
                    Salary: ${payload.salary}
                    Company Name: ${companyName}
                    =======

                    You job post should include all the following sections:
                    - High level summary
                    - Brief description about company: About US (mission, vision, achievements so far), you can use a generic template for this
                    - What we are looking for (this should cater for Qualifications and experience): DO NOT CREATE A SEPARATE SECTION FOR EXPERIENCE
                    - What we offer: this should include details about what prospective candidates get by joining the company's mission
                    - Legalese

                    The job description should be written in clear, concise english that is non-patronizing.

                    Make sure to only return the job description as a markdown formatted string and nothing else

                    No need to include the markdown annotation string
                    `,
            },
            { role: "user", content: "" },
        ],
    });

    return NextResponse.json({ message: completions.choices[0].message.content });
}
