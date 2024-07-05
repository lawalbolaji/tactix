import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    // get user metadata
    const username: string | undefined = user?.user_metadata.name; /* firstname surname - might be undefined */
    if (error || !user) {
        redirect("/");
    }

    return (
        <>
            <Header username={username} />
            <div className="flex h-screen overflow-auto">
                <Sidebar />
                <main className="flex-1 pt-14 overflow-hidden">{children}</main>
            </div>
        </>
    );
}
