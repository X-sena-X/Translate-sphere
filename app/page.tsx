import { authOptions } from "@/auth";
import { ArrowBigRightDashIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
    return (
        <main className="">
            <div className="relative isolate pt-14 dark:bg-gray-900">
                <div
                    className="absolute inset-x-0 top-28 -z-10 transform-gpu overflow-hidden blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>

                <div className="py-12 sm:py-20 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                                Chat with Anyone, anywhere!
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-608 dark:text-gray-300">
                                You speak your language, they speak their
                                language.{" "}
                                <span className="Otext-indigo-600 dark: text-indigo-500">
                                    Let AI handle the translation.
                                </span>
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/chat"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 flex flex-row"
                                >
                                    View Pricing
                                    <span aria-hidden="true">
                                        <ArrowBigRightDashIcon />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-16 flow-root smint-24">
                            <div className="-m-2 rounded-xl Obg-gray-908/5 p-2 ring-1 ring-inset ring-gray-988/10 1g:-m-4 1g: rounded-2x1 1g:p-4">
                                <Image
                                    unoptimized
                                    src="demo.gif"
                                    alt="App screenshot"
                                    width={2432}
                                    height={1442}
                                    className="rounded-md shadow-2x1 ring-1 ring-eray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -2-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        ></div>
                    </div>
                </div>
                <div className="w-screen h-fit flex flex-col items-center lg:mt-20 gap-y-10 mb-14 pt-10">
                    <Badge className="w-fit flex gap-x-2 dark:bg-black  bg-gray-50 hover:bg-gray-50 hover:dark:bg-black text-slate-800 dark:text-white border-2 border-gray-400 py-2 px-4  text-xs lg:text-base dark:shadow-[inset_-12px_-8px_40px_#46464620] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                        PonderPageAI is built with these tools..
                    </Badge>

                    <div className="flex flex-row w-[80%] justify-evenly items-center  ">
                        <div className="w-[18%] lg:w-44 h-32 rounded-3xl ">
                            <Link href="https://nextjs.org">
                                <img
                                    src="/nextjs_logo.jpg"
                                    className="h-full w-full object-contain dark:invert"
                                />
                            </Link>
                        </div>
                        <div className="w-[18%] lg:w-44 h-[10%] lg:h-12 rounded-3xl">
                            <Link href="https://firebase.google.com">
                                <img
                                    src="/firebase.png"
                                    className="h-full w-full  object-fit dark:invert"
                                />
                            </Link>
                        </div>
                        <div className="w-[18%] lg:w-40 h-[12%] lg:h-20 rounded-3xl">
                            <Link href="https://ui.shadcn.com">
                                <img
                                    src="/shadcn.png"
                                    className="h-full w-full  object-fit invert dark:invert-0"
                                />
                            </Link>
                        </div>
                        <div className="w-[18%] lg:w-32 h-[10%] lg:h-16 rounded-3xl">
                            <Link href="https://www.stripe.com">
                                <img
                                    src="/stripe_logo.png"
                                    className="h-full w-full object-fit dark:invert"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-screen items-center text-center pb-2 text-sm lg:text-base">
                <p>© 2023 TranslateSphere. All rights reserved.</p>
                <p>
                    Crafted with love by{" "}
                    <Link
                        href="https://www.senaabhishek.com"
                        className="text-cyan-400"
                    >
                        Sena✨
                    </Link>
                </p>
            </div>
        </main>
    );
}
