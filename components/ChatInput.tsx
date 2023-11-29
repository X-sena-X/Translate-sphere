"use client";
import { useSession } from "next-auth/react";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

import {
    User,
    limitedSortedMessagesRef,
    messagesRef,
} from "@/lib/converters/Message";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Props = {
    chatId: string;
};

const formSchema = z.object({
    input: z.string().max(1000),
});

export default function ChatInput({ chatId }: Props) {
    const { data: session } = useSession();
    const subscription = useSubscriptionStore((state) => state.subscription);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const inputCopy = values.input.trim();
        form.reset();

        if (inputCopy.length === 0) return;

        if (!session?.user) return;

        // TODO check if user is pri and limit them creating a new chat
        const messages = (
            await getDocs(limitedSortedMessagesRef(chatId))
        ).docs.map((doc) => doc.data()).length;

        const isPro =
            subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && messages >= 20) {
            toast({
                title: "Free plan limit exceeded",
                description:
                    "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
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
            return;
        }
        const userToStore: User = {
            id: session.user.id,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        };
        addDoc(messagesRef(chatId), {
            input: inputCopy,
            timestamp: serverTimestamp(),
            user: userToStore,
        });
    }

    return (
        <div className="sticky bottom-0">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
                >
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        placeholder="Enter message in ANY language"
                                        className="border-none bg-transparent dark:placeholder:text-white/70"
                                        {...field}
                                        type="text"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className=" bg-violet-600 text-white">
                        Send
                    </Button>
                </form>
            </Form>
        </div>
    );
}
