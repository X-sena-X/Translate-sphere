"use client";
import {
    LanguageSupportedmap,
    useLanguageStore,
    useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {};

export default function LanguageSelect({}: Props) {
    const [language, setLaguage, getLaguages, getNotSupportedLanguages] =
        useLanguageStore((state) => [
            state.language,
            state.setLaguage,
            state.getLaguages,
            state.getNotSupportedLanguages,
        ]);

    const subscription = useSubscriptionStore((state) => state.subscription);
    const isPro =
        subscription?.role === "pro" && subscription.status === "active";

    // to show this only when the route is hostURL/chat
    const pathName = usePathname();
    const isChatPage = pathName.includes("/chat");

    return (
        isChatPage && (
            <div className="">
                <Select>
                    <SelectTrigger className="w-[150px] text-black dark:text-white">
                        <SelectValue
                            placeholder={LanguageSupportedmap[language]}
                            className=""
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {subscription === undefined ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                <SelectGroup>
                                    <SelectLabel className="bg-green-400">
                                        Available
                                    </SelectLabel>
                                    {getLaguages(isPro).map((language, i) => (
                                        <SelectItem key={i} value={language}>
                                            {LanguageSupportedmap[language]}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel className="bg-red-500">
                                        Not Available
                                    </SelectLabel>

                                    {getNotSupportedLanguages(isPro).map(
                                        (language, i) => (
                                            <Link
                                                href={"/register"}
                                                key={i}
                                                prefetch={false}
                                            >
                                                <SelectItem
                                                    key={i}
                                                    value={language}
                                                    disabled
                                                    className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1 "
                                                >
                                                    {
                                                        LanguageSupportedmap[
                                                            language
                                                        ]
                                                    }{" "}
                                                    (PRO)
                                                </SelectItem>
                                            </Link>
                                        )
                                    )}
                                </SelectGroup>
                            </>
                        )}
                    </SelectContent>
                </Select>
            </div>
        )
    );
}
