"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "@/app/action";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Github } from "../ui/icons/github";
import { Chrome } from "../ui/icons/chrome";
import Link from "next/link";

const initialState = {
    error: {
        fields: {
            email: [],
            password: [],
        },
        type: "VALIDATION_ERROR",
    },
};

export function SignIn() {
    const [state, authAction] = useFormState(signIn, initialState);

    return (
        <form action={authAction}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="hey@tactix.com" required aria-required />
                    {state.error.type === "VALIDATION_ERROR" && state.error.fields?.email?.[0] ? (
                        <div className="text-xs text-red-500">{state.error.fields?.email?.[0]}</div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        aria-required
                    />
                    {state.error.type === "VALIDATION_ERROR" && state.error.fields?.password?.[0] ? (
                        <div className="text-xs text-red-500">{state.error.fields.password[0]}</div>
                    ) : (
                        <></>
                    )}
                </div>

                {state.error.type !== "VALIDATION_ERROR" ? (
                    <div className="text-xs text-red-500 mt-[-10px]">{state.error.message}</div>
                ) : (
                    <></>
                )}

                <SubmitButton />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                            or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size={"lg"} type="button">
                        <Github className="mr-2 h-5 w-5" />
                        GitHub
                    </Button>
                    <Button variant="outline" size={"lg"} type="button">
                        <Chrome className="mr-2 h-5 w-5" />
                        Google
                    </Button>
                </div>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/v2/register" className="underline" prefetch={true}>
                    Register
                </Link>
            </div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full">
            {pending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-[#d099d750] mr-2" />
            ) : (
                <></>
            )}
            Sign in
        </Button>
    );
}
