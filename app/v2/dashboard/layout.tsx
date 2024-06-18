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

    if (error || !user) {
        redirect("/login");
    }

    return (
        <>
            <Header />
            <div className="flex h-screen overflow-auto">
                <Sidebar />
                <main className="flex-1 pt-14 overflow-hidden">{children}</main>
            </div>
        </>
    );
}
