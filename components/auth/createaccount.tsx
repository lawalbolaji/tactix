"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/app/v2/register/action";
import Link from "next/link";
import { ButtonHTMLAttributes, ClassAttributes, JSX, useState } from "react";

const initialState = {
    error: {
        fields: {
            email: [],
            password: [],
        },
        type: "VALIDATION_ERROR",
    },
};

export function CreateAccount() {
    const [state, authAction] = useFormState(signUp, initialState);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatchError, setIsPasswordMatchError] = useState(false);

    return (
        <form className="flex flex-col items-center justify-center gap-5" action={authAction}>
            <div className="flex items-center justify-between w-full">
                <div>
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Bolaji"
                        required
                        aria-required
                    />
                </div>
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Chukwuemeka"
                        required
                        aria-required
                    />
                </div>
            </div>

            {state?.error?.fields?.firstname || state?.error?.fields?.firstname ? (
                <div className="text-red-500 text-xs mt-[-10px] justify-self-center self-start">
                    {state.error.fields.firstname[0] || state?.error?.fields?.firstname}
                </div>
            ) : (
                <></>
            )}

            <div className="w-full">
                <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900">
                    Company Name
                </label>
                <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Tactix"
                    required
                    aria-required
                />
                {state?.error?.fields?.company_name ? (
                    <div className="text-red-500 text-xs mt-2">{state.error.fields.company_name[0]}</div>
                ) : (
                    <></>
                )}
            </div>

            <div className="w-full">
                <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900">
                    Company Url
                </label>
                <input
                    type="text"
                    name="company_url"
                    id="company_url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="https://www.tactix.com/about"
                    required
                    aria-required
                />
                {state?.error?.fields?.company_url ? (
                    <div className="text-red-500 text-xs mt-2">{state.error.fields.company_url[0]}</div>
                ) : (
                    <></>
                )}
            </div>

            <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="hey@tactix.com"
                    required
                />
                {state?.error?.fields?.email ? (
                    <div className="text-red-500 text-xs mt-2">{state.error.fields.email[0]}</div>
                ) : (
                    <></>
                )}
            </div>
            <div className="w-full">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsPasswordMatchError(false);
                        setPassword(e.currentTarget.value);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        if (password !== confirmPassword && confirmPassword !== "") {
                            setIsPasswordMatchError(true);
                        }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                />
                {state?.error?.fields?.password ? (
                    <div className="text-red-500 text-xs mt-2">{state.error.fields.password[0]}</div>
                ) : (
                    <></>
                )}
            </div>
            <div className="w-full">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm password
                </label>
                <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsPasswordMatchError(false);
                        setConfirmPassword(e.currentTarget.value);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        if (password !== confirmPassword && password !== "") {
                            setIsPasswordMatchError(true);
                        }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                />
                {state?.error?.fields?.confirm_password ? (
                    <div className="text-red-500 text-xs mt-2">{state.error.fields.confirm_password[0]}</div>
                ) : (
                    <></>
                )}
                {isPasswordMatchError ? <div className="text-red-500 text-xs mt-2">Passwords do not match</div> : <></>}
            </div>

            {state?.error?.type !== "VALIDATION_ERROR" ? (
                <div className="text-red-500 text-xs mt-[-10px] justify-self-center self-start">
                    {state.error.message}
                </div>
            ) : (
                <></>
            )}

            <div className="flex items-start w-full">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                        aria-required
                    />
                </div>
                <div className="ml-3 text-sm w-full">
                    <label htmlFor="terms" className="font-light text-gray-500 ">
                        I accept the{" "}
                        <a className="font-medium text-primary-600 hover:underline" href="#">
                            Terms and Conditions
                        </a>
                    </label>
                </div>
            </div>
            <CreateAccountButton aria-disabled={isPasswordMatchError} disabled={isPasswordMatchError} />
            <p className="text-sm font-light text-gray-500 select-none">
                Already have an account?{" "}
                <Link href="/" className="font-medium text-primary-600 hover:underline">
                    Login here
                </Link>
            </p>
        </form>
    );
}

function CreateAccountButton(
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>
) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            type="submit"
            className="w-full flex items-center justify-center disabled:bg-slate-300 disabled:opacity-40 disabled:text-black text-white bg-[hsl(222.2,47.4%,11.2%)] hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
            {pending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-[#d099d750] mr-4" />
            ) : (
                <></>
            )}
            Create an account
        </button>
    );
}
