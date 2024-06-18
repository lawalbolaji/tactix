"use client";

import { useState } from "react";
import { Label } from "../shared/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { employmentTypes, employmentTypeIcons } from "../jobs/data";

export function EmploymentTypeSelect() {
    const [employmentType, setEmploymentType] = useState<(typeof employmentTypes)[number]>("Permanent");
    return (
        <>
            <Label htmlFor="employment_type">Employment type</Label>
            <input type="text" hidden aria-hidden name="employment_type" required value={employmentType} />
            <Select
                onValueChange={(val) => {
                    setEmploymentType(val as (typeof employmentTypes)[number]);
                }}
            >
                <SelectTrigger
                    id="employment_type"
                    name="employment_type"
                    className="items-start [&_[data-description]]:hidden text-left"
                >
                    <SelectValue placeholder="Choose employment type" />
                </SelectTrigger>
                <SelectContent>
                    {employmentTypes.map((type, idx: number) => (
                        <SelectItem value={type} key={idx} className="w-full pl-4">
                            <div className="flex items-start gap-3 text-muted-foreground w-full">
                                {employmentTypeIcons[type]}
                                <div className="flex items-center justify-center">
                                    <p>{type}</p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
}
