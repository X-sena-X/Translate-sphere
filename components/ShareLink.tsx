"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "./ui/use-toast";
import { Copy } from "lucide-react";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    chatId: string;
};

function ShareLink({ isOpen, setIsOpen, chatId }: Props) {
    const { toast } = useToast();
    const host = window.location.host;
    const linkToChat =
        process.env.NODE_ENV === "production"
            ? `http://${host}/chat/${chatId}`
            : `https://${host}/chat/${chatId}`;

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(linkToChat);
            console.log("Text copied successfully");

            toast({
                title: "Copied link to clipboard",
                description:
                    "Share this to the user you want to chat with! (NOTE: They must be added to the chat to access it!)",
                className: "bg-green-600 text-white",
                duration: 3000,
            });
        } catch (error) {
            console.log("Failed to copy text", error);
            toast({
                title: "request failed",
                description:
                    "cannot copy link to clipboard. Please try again later..",
                variant: "destructive",
            });
        }
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            defaultOpen={isOpen}
        >
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Copy className="mr-2" />
                    Share Link
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription>
                        Any user who has been{" "}
                        <span className="text-indigo-600 font-bold">
                            granted access
                        </span>{" "}
                        can use this link
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input id="link" defaultValue={linkToChat} readOnly />
                    </div>
                    <Button
                        type="submit"
                        onClick={() => copyToClipboard()}
                        size="sm"
                        className="px-3"
                    >
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ShareLink;
