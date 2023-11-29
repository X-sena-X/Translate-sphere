"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";
import { PlusCircleIcon, SubscriptIcon } from "lucide-react";
import ShareLink from "./ShareLink";

type Props = {
    chatId: string;
};

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export default function InviteUser({ chatId }: Props) {
    const { data: sessions } = useSession();
    const { toast } = useToast();
    const adminId = useAdminId({ chatId });
    const subscription = useSubscriptionStore((state) => state.subscription);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!sessions?.user.id) return;
        toast({
            title: "Sending invite",
            description: "Please wait while we send the invite...",
        });

        // we need to get the current users count in chat
        const noOfUsersInChat = (
            await getDocs(chatMembersRef(chatId))
        ).docs.map((doc) => doc.data).length;

        // check if the user is about to exceed the pro plan which is 3 chats
        const isPro =
            subscription?.role === "pro" && subscription.status === "active";
        if (!isPro && noOfUsersInChat >= 3) {
            toast({
                title: "Free plan limit exceeded",
                description:
                    "You have exceeded the limit of users in single chat for the FREE plan. Please upgrade to PRO to continue adding users to chat!",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="upgrade"
                        onClick={() => router.push("/register")}
                    >
                        Upgrade to PRO
                    </ToastAction>
                ),
            });
            return;
        }
        const querySnapShot = await getDocs(getUserByEmailRef(values.email));

        if (!querySnapShot.docs[0]) {
            toast({
                title: "user not found",
                description:
                    "Please Enter An Email Address of a Registered User.",
                variant: "destructive",
            });
            return;
        } else {
            const user = querySnapShot.docs[0].data();
            await setDoc(addChatRef(chatId, user.id), {
                userId: user.id!,
                email: user.email!,
                timestamp: serverTimestamp(),
                chatId: chatId,
                isAdmin: false,
                image: user.image || "",
            })
                .then(() => {
                    setOpen(false);

                    toast({
                        title: "Added new member",
                        description:
                            "The user has been added to the chat successfully",
                        className: "bg-green-600 text-white",
                        duration: 3000,
                    });

                    setOpenInviteLink(true);
                })
                .catch(() => {
                    toast({
                        title: "Failed to add member",
                        description:
                            "could not add member currently. Please try again later",
                        variant: "destructive",
                    });
                    setOpen(false);
                });
        }
        form.reset();
    };

    return (
        adminId === sessions?.user.id && (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircleIcon className="mr-1" />
                            Add User To Cart
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add user to chat</DialogTitle>
                            <DialogDescription>
                                Simple enter users email to generate a new
                                invite link
                                <span className="text-indigo-600 font-bold">
                                    (Note : they must be registered)
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@gmail.com"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="ml-auto sm:w-fit w-full"
                                >
                                    Add to chat
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
                <ShareLink
                    isOpen={openInviteLink}
                    setIsOpen={setOpenInviteLink}
                    chatId={chatId}
                />
            </>
        )
    );
}
