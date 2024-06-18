import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-24 lg:bg-[url('/tactix.png')] lg:bg-cover lg:bg-no-repeat lg:bg-center bg-transparent">
            <div className="text:3xl lg:text-7xl font-bold line-1 anim-typewriter">Welcome to Tactix</div>
            <div className="lg:mt-8 mt-4 launch transition ease-in-out hover:-translate-y-1 hover:scale-110">
                <Link
                    href={"/dashboard"}
                    className="flex items-center h-full w-full justify-center font-bold mt-4 p-2 lg:p-4 launch border border-blue-200 rounded-lg hover:bg-blue-200"
                >
                    Go 🚀
                </Link>
            </div>
        </main>
    );
}
