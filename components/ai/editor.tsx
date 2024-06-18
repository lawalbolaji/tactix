"use client";

import { Label } from "../shared/label";
import { Textarea } from "../shared/textarea";

export function Editor() {
    return (
        <div
            className="relative overflow-hidden h-full rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring z-0"
            x-chunk="dashboard-03-chunk-1"
        >
            <Label htmlFor="description" className="sr-only">
                Message
            </Label>
            <Textarea
                id="description"
                name="description"
                required
                aria-required
                placeholder="Enter job description here, or click the magic button to generate with AI"
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 h-full"
            />
        </div>
    );
}
