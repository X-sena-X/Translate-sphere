"use client";
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
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import useAdminId from "@/hooks/useAdminId";
import { useRouter } from "next/navigation";
import { boolean } from "zod";
import { useState } from "react";

type Props = {
    chatId: string;
};

export default function DeleteChatButton({ chatId }: Props) {
    const { data: sessions } = useSession();
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const adminId = useAdminId({ chatId });

    const router = useRouter();

    async function handleDelete() {
        toast({
            title: "Deleting chat",
            description: "Please wait while we delete the chat ...",
        });
        console.log("Deleting :: ", chatId);

        await fetch("/api/chat/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ chatId: chatId }),
        })
            .then(() => {
                toast({
                    title: "Deleted Successfully",
                    description: "Your chat has been deleted",
                    className: "bg-green-600 text-white",
                });
                router.replace("/chat");
            })
            .catch((error) => {
                console.error(error.message);
                toast({
                    title: "Failed to delete Chat",
                    description: "There was an error deleting your char",
                    variant: "destructive",
                });
            })
            .finally(() => setOpen(false));
    }

    return (
        sessions?.user.id === adminId && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Chat</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This will delete the chat permanently!{" "}
                            <span className="text-red-600">
                                This cannot be undone.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 space-x-2">
                        <Button variant={"destructive"} onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    );
}
