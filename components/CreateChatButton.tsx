"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { useSubscriptionStore } from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
    addChatRef,
    chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";

type Props = {
    isLarge: boolean;
};

export default function CreateChatButton({ isLarge }: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>();
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);

    const createNewChat = async () => {
        if (!session?.user.id) return;
        console.log(session);
        setLoading(true);

        toast({
            title: "Creating new chat",
            description: "Hold tight while we create your new chat",
            duration: 3000,
        });

        // TODO: ckeck if user is pro and limit them creating a new chat
        const noOfChats = (
            await getDocs(chatMembersCollectionGroupRef(session.user.id))
        ).docs.map((doc) => doc.data()).length;
        const isPro =
            subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && noOfChats >= 3) {
            toast({
                title: "Free Plan limit exceeded",
                description:
                    "You've exceeded the limit of chats for the FREE plan. Please upgrade your plan.",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")}
                    >
                        Upgrade to PRO
                    </ToastAction>
                ),
            });
            setLoading(false);
            return;
        }

        const chatId = uuidv4();
        await setDoc(addChatRef(chatId, session.user.id), {
            userId: session.user.id!,
            email: session.user.email!,
            timestamp: serverTimestamp(),
            isAdmin: true,
            chatId: chatId,
            image: session.user.image || "",
        })
            .then(() => {
                toast({
                    title: "Success",
                    description: "Your chat has been added",
                    className: "bg-green-600 text-white",
                    duration: 2000,
                });
                router.push(`/chat/${chatId}`);
            })
            .catch((error) => {
                console.error(error);
                toast({
                    title: "Error",
                    description: `There was an error creating the chat `,
                    variant: "destructive",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Button variant="ghost" onClick={() => createNewChat()}>
            <MessageSquarePlusIcon />
        </Button>
    );
}
