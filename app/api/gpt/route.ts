import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    const payload = await request.json();

    /* 
        - High level summary
        - Brief description about company - About US (mission, vision, achievements so far)
        - What we are looking for (Qualifications/experience)
        - What we offer
        - Legalese
    */

    // call gpt 4o
    const completions = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: `
                    Give the following details, generate a job description:

                    =======
                    Job title: ${payload.title}
                    Location: ${payload.location}
                    Experience Level: 5 years
                    Skills and Competencies: ${payload.qualifications}
                    =======

                    Add a small job description in clear english that is non-patronizing, then add a section for requirements and qualifications and highlight the experience level requirement. 
                    Wrap it up by adding a small phrase about what prospective candidates get by joining the company's mission
                    
                    Make sure to only return the job description as a markdown formatted string and nothing else
                    `,
            },
            { role: "user", content: "" },
        ],
    });

    return NextResponse.json({ message: completions.choices[0].message.content });
}
