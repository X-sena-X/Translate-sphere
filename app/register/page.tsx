import { authOptions } from "@/auth";
import PricingCard from "@/components/PricingCard";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

export default async function page({}: Props) {
    const session = await getServerSession(authOptions);
    return (
        <div className="min-w-full h-fit lg:h-full items-center flex flex-col justify-center lg:gap-y-20 gap-y-10 py-10 bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 ">
            <div className="flex flex-col lg:w-[40%] w-[90%] items-center gap-y-2">
                <p className="flex text-2xl lg:text-4xl font-medium text-violet-500">
                    Lets handle your Membership{" "}
                    {session?.user?.name?.split(" ")?.[0]}!
                </p>
            </div>

            <PricingCard redirect={false} />
        </div>
    );
}
