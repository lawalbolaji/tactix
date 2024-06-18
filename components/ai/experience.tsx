"use client";

import { useState } from "react";
import { experienceLevels, experienceLevelIcons } from "../../app/v2/dashboard/jobs/new/page";
import { Label } from "../shared/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function ExperienceSelect() {
    const [experienceLevel, setExperienceLevel] = useState<(typeof experienceLevels)[number]>("Entry Level");

    return (
        <>
            <Label htmlFor="experience">Experience</Label>
            <input type="text" hidden aria-hidden name="experience" value={experienceLevel} />
            <Select
                onValueChange={(val) => {
                    setExperienceLevel(val as (typeof experienceLevels)[number]);
                }}
            >
                <SelectTrigger id="experience" name="experience" className="items-start [&_[data-description]]:hidden">
                    <SelectValue placeholder="Choose experience level" />
                </SelectTrigger>
                <SelectContent>
                    {experienceLevels.map((level, idx: number) => (
                        <SelectItem value={level} key={idx}>
                            <div className="flex items-start gap-3 text-muted-foreground">
                                {experienceLevelIcons[level]}
                                <div className="flex items-center justify-center">
                                    <p>{level}</p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
}
