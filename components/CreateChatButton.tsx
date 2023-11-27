"use client";
import React from "react";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

export default function CreateChatButton({}: Props) {
    const router = useRouter();
    const createNewChat = async () => {};
    return (
        <Button variant="ghost" onClick={() => createNewChat}>
            <MessageSquarePlusIcon />
        </Button>
    );
}
