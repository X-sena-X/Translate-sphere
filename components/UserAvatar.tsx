"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    name: string;
    image: string;
    className?: string;
};

export default function UserAvatar({ name, image, className }: Props) {
    return (
        <Avatar className={cn("bg-white text-black", className)}>
            <AvatarImage src={image} />
            {image && (
                <Image
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            )}
            <AvatarFallback
                delayMs={1000}
                className="dark:bg-white dark:text-black text-lg"
            >
                {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </AvatarFallback>
        </Avatar>
    );
}
