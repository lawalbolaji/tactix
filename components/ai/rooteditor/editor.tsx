"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Employment } from "../employment-type";
import { Experience } from "../experience";
import { EDITOR_NAMESPACE, EDITOR_NODES, RootEditor } from "./lexical/rooteditor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $getRoot } from "lexical";
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useEffect, useState } from "react";

type editorProps = {
    title: string;
    experienceLevel: Experience;
    employmentType: Employment;
    salary: string;
    qualifications: string;
    location: string;
};

const editorConfig = {
    namespace: EDITOR_NAMESPACE,
    nodes: EDITOR_NODES,
    editorState: null,
    theme: {
        root: "p-4 border h-auto max-h-[650px] overflow-scroll focus:outline-none relative z-10 bg-transparent",
        link: "cursor-pointer",
        text: {
            bold: "font-semibold",
            underline: "underline decoration-wavy",
            italic: "italic",
            strikethrough: "line-through",
            underlineStrikethrough: "underlined-line-through",
        },
    },
    onError: (error: unknown) => {
        console.log(error);
    },
};

export function Editor(props: editorProps) {
    const { title, location, salary, qualifications, experienceLevel, employmentType } = props;
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <GenerateButton {...{ title, location, salary, qualifications, experienceLevel, employmentType }} />
                <div className="flex-1" />
                <div className="relative overflow-hidden h-full rounded-lg border bg-background z-0">
                    <Label htmlFor="description" className="sr-only">
                        Job Description
                    </Label>
                    <RootEditor />
                </div>
            </div>
        </LexicalComposer>
    );
}

type GenerateButtonProps = {
    title: string;
    experienceLevel: Experience;
    employmentType: Employment;
    salary: string;
    qualifications: string;
    location: string;
};

type remoteRequestStatus = "idle" | "loading" | "success" | "error";

export function GenerateButton(props: GenerateButtonProps) {
    const [editor] = useLexicalComposerContext();
    const [requestStatus, setRequestStatus] = useState<remoteRequestStatus>("idle");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const markdown = $convertToMarkdownString(undefined, undefined, true);
                console.log(markdown);
                setDescription(markdown);
            });
        });
        return removeUpdateListener;
    }, [editor]);

    return (
        <>
            <textarea name="description" hidden aria-hidden value={description} className="whitespace-pre-wrap" />
            <Button
                variant="outline"
                className="absolute right-6 top-6 z-10 flex items-center justify-center"
                type="button"
                aria-disabled={requestStatus === "loading"}
                disabled={requestStatus === "loading"}
                onClick={async () => {
                    setRequestStatus("loading");
                    const response = await fetch("/api/gpt", {
                        method: "POST",
                        body: JSON.stringify(props),
                    });
                    const responseAsJson = await response.json();
                    if (response.ok) {
                        console.log(responseAsJson);

                        /* update editor state here */
                        editor.update(() => {
                            /* clean editor */
                            const root = $getRoot();
                            root.clear();

                            $convertFromMarkdownString(responseAsJson.message, TRANSFORMERS, root, true);
                        });
                        setRequestStatus("success");
                    } else {
                        setRequestStatus("error");
                        console.error(responseAsJson);
                    }
                }}
            >
                {requestStatus === "loading" ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-[#d099d750]" />
                ) : (
                    <>✨ Generate with AI</>
                )}
            </Button>
        </>
    );
}
