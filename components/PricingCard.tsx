"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
type Props = { redirect: boolean };

const tiers = [
    {
        name: "Starter",
        id: null,
        href: "#",
        priceMonthly: "Free",
        description: "Get chatting right away with anyone, anywhere",
        features: [
            "28 message Chat Limit in Chats",
            "2 participant limit in Chats",
            "3 Chat Rooms limit",
            "Supports 2 languages",
            "48-hour support response time",
        ],
    },
    {
        name: "Pro",
        id: "null",
        href: "#",
        priceMonthly: "₹699.99",
        description: "Unlock the Full Potential with Pro!",
        features: [
            "Unlimited Messages in Chats",
            "unlimited Participants in Chats",
            "unlimited Chat Rooms",
            "Supports up to 10 languages",
            "Multimedia support in chats (coming soon)",
            "1-hour, dedicated support response time",
            "Early access to New Features",
        ],
    },
];

export default function PricingCard({ redirect }: Props) {
    const { data: session } = useSession();
    const router = useRouter();

    const createCheckoutSession = async () => {
        if (!session) return;
        // push a document into firebase

        // .. stripe extension on firebase will create a checkout sesion

        // redirect user to checkout page
    };
    return (
        <div className="flex flex-col lg:flex-row w-[85%] lg:w-[55%] h-full gap-y-3 lg:gap-x-3 items-center">
            {tiers.map((tier, index) => {
                return (
                    <Card
                        key={index}
                        className="w-[85%] lg:w-1/2 h-[27rem] rounded-2xl bg-black dark:bg-white dark:text-black text-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
                    >
                        <CardHeader>
                            <CardTitle className="text-violet-500">
                                {tier.name}
                            </CardTitle>
                            <CardDescription>
                                {tier.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-y-4 mt-2 gap-x-1">
                            <span className="flex flex-row items-end">
                                <p className="text-3xl font-semibold">
                                    {tier.priceMonthly}
                                </p>
                                <p className="">/month</p>
                            </span>
                            {redirect ? (
                                <Button
                                    onClick={() => router.push("/register")}
                                    className=" bg-white dark:bg-black dark:text-white text-black shadow-md"
                                >
                                    Get Started Today
                                </Button>
                            ) : tier.id ? (
                                <Button
                                    onClick={() => createCheckoutSession()}
                                    className=" bg-white dark:bg-black dark:text-white text-black shadow-md"
                                >
                                    Subscribe
                                </Button>
                            ) : (
                                <Button
                                    disabled
                                    className=" bg-white dark:bg-black dark:text-white text-black shadow-md"
                                >
                                    Current Plan
                                </Button>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-y-1">
                            {tier.features.map((qoute, i) => (
                                <span
                                    key={i}
                                    className="flex items-center gap-x-2 text-sm lg:text-base"
                                >
                                    <Check className="w-4 h-4" />
                                    {qoute}
                                </span>
                            ))}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
