import { authOptions } from "@/auth";
import PricingCard from "@/components/PricingCard";
import { getServerSession } from "next-auth";
import React from "react";

type TypeQuotes = Array<Array<string>>;
type Props = {};

const page = async (props: Props) => {
    const handlePayment = async () => {};

    return (
        <div className="min-w-full h-fit lg:h-full items-center flex flex-col justify-center lg:gap-y-20 gap-y-10 py-10 dark:bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 bg-white">
            <div className="flex flex-col lg:w-[40%] w-[90%] items-center gap-y-2">
                <p className="flex text-2xl lg:text-4xl font-medium text-violet-500">
                    Pricing
                </p>
                <p className="flex text-lg lg:text-3xl text-center">
                    The right price for you,whoever you are
                </p>
                <p className="flex text-xs lg:text-sm text-gray-400 text-center">
                    Were 99%, sure we have a plan to match 100% of your needs
                </p>
            </div>

            <PricingCard redirect={true} />
        </div>
    );
};

export default page;
