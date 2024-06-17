"use client";

import { useState } from "react";
import { Label } from "../shared/label";
import { Textarea } from "../shared/textarea";

type EditorProps = {
    title: string;
    location: string;
    qualification: string;
    salary: string;
};

export function Editor(props: EditorProps) {
    const [description, setDescription] = useState("");

    /* AI params: job title, experience, credentials */

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="description">Job Description</Label>
                <button
                    className="flex items-center justify-center"
                    onClick={async () => {
                        console.log("go and fetch AI response");
                        const response = await fetch("/api/gpt", {
                            method: "POST",
                            body: JSON.stringify(props),
                        });
                        const responseAsJson = await response.json();
                        if (response.ok) {
                            console.log(responseAsJson);
                            setDescription(responseAsJson.message);
                        } else {
                            /* error */
                            console.error(responseAsJson);
                        }
                    }}
                    /* do not submit form with this click */
                    type="button"
                >
                    generate with AI
                </button>
            </div>

            <Textarea
                id="description"
                name="description"
                placeholder="Describe the job responsibilities and requirements."
                rows={6}
                value={description}
                onChange={(e) => {
                    setDescription(e.currentTarget.value);
                }}
            />
        </div>
    );
}
