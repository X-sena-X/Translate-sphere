import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { Author } from "next/dist/lib/metadata/types/metadata-types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata({
    title = "Translate Sphere - Multilingual Chat Platform for Global Communication",
    description = "Translate Sphere is your gateway to a global community where people of any language can connect and chat seamlessly. Experience real-time language translation, break language barriers, and engage in cross-language conversations. Join our multilingual chat room and connect with users from around the world.",
    ogdescription = "Join Translate Sphere to connect with people from any language. Experience real-time language translation and break communication barriers.",
    applicationName = "Translate Sphere",
    keywords = [
        "Translation Chat Platform",
        "Language Exchange Community",
        "Multilingual Chat Room",
        "Real-time Language Translation",
        "Global Communication Hub",
        "Cross-language Chat",
        "Translate and Connect",
        "Instant Translation Messaging",
        "Language Barrier Breaker",
        "Online Multilingual Conversations",
        "Connect Across Languages",
        "Translation Networking",
        "Language Exchange Forum",
        "Chat in Any Language",
        "Real-time Multilingual Interaction",
        "Global Conversations Hub",
        "Translate and Communicate",
        "Language Bridge Chat",
        "Interact Across Borders",
        "Universal Communication Platform",
    ],

    authors = [{ name: "SenaAbhishek", url: "https://www.senaabhishek.com" }],
    image = "/thumbnail.png",
    icons = ["/favicon.ico"],
    noIndex = false,
}: {
    title?: string;
    description?: string;
    ogdescription?: string;
    applicationName?: string;
    keywords?: Array<string>;
    authors?: Array<Author>;
    image?: string;
    icons?: Array<string>;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        applicationName,
        keywords,
        authors,
        openGraph: {
            title,
            description: ogdescription,
            images: [
                {
                    url: image,
                },
            ],
            url: "https://translate-sphere.vercel.app/",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: ogdescription,
            images: [image],
            creator: "@sena_Abhishek",
        },
        icons,
        metadataBase: new URL("https://translate-sphere.vercel.app/"),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
