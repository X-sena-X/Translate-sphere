"use client";
import LogoImage from "@logos/translatespherelogo.svg";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

type Props = {};

export default function Logo({}: Props) {
    return (
        <Link href="/" prefetch={false} className="overflow-hidden">
            <div className="flex items-center w-[24rem] h-12">
                <AspectRatio
                    ratio={16 / 9}
                    className="flex items-center justify-center"
                >
                    <Image
                        priority
                        src={LogoImage}
                        alt="ChatLogo"
                        className="rounded-full dark:filter dark:invert"
                    />
                </AspectRatio>
            </div>
        </Link>
    );
}
