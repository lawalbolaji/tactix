import Link from "next/link";
import { MountainIcon } from "@/components/shared/icons/mountain";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./action";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center" href="/dashboard">
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Tactix</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
                        Dashboard
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Settings
                    </Link>

                    <form className="flex items-center justify-center">
                        <button formAction={signOut} className="text-sm font-medium hover:underline underline-offset-4">
                            Sign Out
                        </button>
                    </form>
                </nav>
            </header>
            {children}

            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" />
        </div>
    );
}
