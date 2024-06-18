"use client";

import { CheckCheck, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const URL_COPY_TIMEOUT = 5_000; // 5s

export function CopyJobUrlButton(props: { jobId: number }) {
    const [urlCopied, setUrlCopied] = useState(false);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-900"
            onClick={() => {
                /* generate application link and add to dashboard */
                const rootUrl = new URL(window.location.href).hostname;
                const link = `${rootUrl}/apply/${props.jobId}`;
                window.navigator.clipboard.writeText(link);
                setUrlCopied(true);
                setTimeout(() => {
                    setUrlCopied(false);
                }, URL_COPY_TIMEOUT);
            }}
        >
            {urlCopied ? (
                <>
                    <CheckCheck className="w-5 h-5 text-green-400" />
                    <span className="sr-only">Url copied</span>
                </>
            ) : (
                <>
                    <Copy className="w-5 h-5" />
                    <span className="sr-only">Copy job url</span>
                </>
            )}
        </Button>
    );
}
