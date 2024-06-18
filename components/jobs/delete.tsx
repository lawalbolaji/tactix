"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

type remoteRequestStatus = "idle" | "loading" | "success" | "error";

export function DeleteJobButton(props: { jobId: number }) {
    /* call server action to update stuff */
    const [remoteRequestStatus, setRemoteRequestStatus] = useState<remoteRequestStatus>("idle");

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-red-400"
            aria-disabled={remoteRequestStatus === "loading"}
            disabled={remoteRequestStatus === "loading"}
            onClick={async () => {
                setRemoteRequestStatus("loading");

                try {
                    const response = await fetch(`/api/jobs/${props.jobId}`, {
                        method: "POST",
                        cache: "no-cache",
                        body: JSON.stringify({ op: "SOFT_DELETE" }),
                    });

                    if (response.ok) {
                        setRemoteRequestStatus("success");
                        return;
                    }

                    const responseAsJson = await response.json();
                    setRemoteRequestStatus("error");

                    /* DEBUGGING */
                    console.log(responseAsJson);
                } catch (error) {
                    // fetch request is basically not working - network issues?
                    console.error(error);
                    setRemoteRequestStatus("error");
                }
            }}
        >
            {remoteRequestStatus === "loading" ? (
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-[#d099d750]" />
            ) : (
                <>
                    <TrashIcon className="w-5 h-5" />
                    <span className="sr-only">Publish</span>
                </>
            )}
        </Button>
    );
}
