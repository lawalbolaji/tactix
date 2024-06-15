import { Avatar, AvatarFallback, AvatarImage } from "@/components/shared/avatar";
import { Separator } from "@/components/shared/separator";
import { Button } from "@/components/shared/button";
import { PhoneIcon } from "@/components/shared/icons/phone";
import { BriefcaseIcon } from "@/components/shared/icons/briefcase";
import { BuildingIcon } from "@/components/shared/icons/building";
import { MailIcon } from "@/components/shared/icons/mail";
import Image from "next/image";

export default function ApplicationDetailsPage({ params }: { params: { id: string; applicationId: string } }) {
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Applicant Details</h1>
                    <p className="text-gray-500">Review the applicant&apos;s information and preview their CV.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 md:mt-0">
                    <Button size="sm" variant="outline">
                        Schedule Interview
                    </Button>
                    <Button className="bg-red-500 text-white hover:bg-red-600" size="sm" variant="outline">
                        Reject Application
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                        <Avatar className="mr-4 mb-4 sm:mb-0">
                            <AvatarImage alt="Applicant" src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-bold">John Doe</h2>
                            <p className="text-gray-500">Software Engineer</p>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Contact</h3>
                            <p className="text-gray-500">
                                <MailIcon className="w-4 h-4 inline-block mr-2" />
                                john.doe@example.com
                            </p>
                            <p className="text-gray-500">
                                <PhoneIcon className="w-4 h-4 inline-block mr-2" />
                                +1 (555) 123-4567
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Experience</h3>
                            <p className="text-gray-500">
                                <BriefcaseIcon className="w-4 h-4 inline-block mr-2" />
                                5+ years as a Software Engineer
                            </p>
                            <p className="text-gray-500">
                                <BuildingIcon className="w-4 h-4 inline-block mr-2" />
                                Worked at Acme Inc. for 3 years
                            </p>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About</h3>
                        <p className="text-gray-500">
                            John is a highly skilled software engineer with a passion for building innovative and
                            user-friendly applications. He has extensive experience in full-stack development, with a
                            strong focus on JavaScript, React, and Node.js. John is a quick learner, a team player, and
                            always strives to deliver high-quality work.
                        </p>
                    </div>
                </div>
                <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col items-center justify-center h-full">
                        <Image
                            alt="Applicant CV"
                            className="w-full max-w-[300px] h-auto rounded-lg object-cover"
                            height={500}
                            src="https://placehold.co/500x400/png"
                            style={{
                                aspectRatio: "400/500",
                                objectFit: "cover",
                            }}
                            width={400}
                        />
                        <Button className="my-4" size="sm" variant="outline">
                            Preview CV
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
