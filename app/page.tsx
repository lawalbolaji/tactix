import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { SignIn } from "../components/auth/signin";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-row items-center justify-center lg:bg-[url('/tactix.png')] lg:bg-cover lg:bg-no-repeat lg:bg-center bg-transparent">
            <div className="hidden lg:flex min-h-screen flex-grow">{/* rest of the page */}</div>
            <div className="min-h-screen flex items-start justify-center p-12 2xl:p-28">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>Enter your credentials below to sign in</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignIn />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
