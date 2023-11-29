"use client";
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/store";
import { Loader2, MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "./UserAvatar";

type Props = {
    chatId: string;
    initialMessages: Message[];
    session: Session | null;
};

function ChatMessages({ chatId, initialMessages, session }: Props) {
    const language = useLanguageStore((state) => state.language);
    const messageEndRef = createRef<HTMLDivElement>();

    const [messages, loading, error] = useCollectionData<Message>(
        sortedMessagesRef(chatId),
        {
            initialValue: initialMessages,
        }
    );

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, messageEndRef]);

    return (
        <div className="p-5">
            {!loading && messages?.length === 0 && (
                <div className="flex flex-col justify-center items-center p-20 rounded-xl text-center space-y-2 bg-indigo-400 text-white font-extralight">
                    <MessageCircleIcon className="h-10 w-10" />
                    <h2>
                        <span className="font-bold">Invite a friend</span> &{" "}
                        <span className="font-bold">
                            Send your first message in ANY language
                        </span>{" "}
                        below to get started!
                    </h2>
                    <p className="">
                        The AI will auto-detect & translate it all for you.
                    </p>
                </div>
            )}
            {messages?.map((message) => {
                const isSender = message.user.id === session?.user.id;
                return (
                    <div key={message.id} className="flex my-2 items-end">
                        <div
                            className={cn(
                                "flex flex-col relative p-3 w-fit line-clamp-1 mx-2 rounded-lg",
                                {
                                    "ml-auto bg-violet-600 text-white rounded-br-none":
                                        isSender,
                                    "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none":
                                        !isSender,
                                }
                            )}
                        >
                            <p
                                className={cn(
                                    " text-xs italic font-extralight line-clamp-1",
                                    {
                                        "text-right": isSender,
                                        "text-left": !isSender,
                                    }
                                )}
                            >
                                {message.user.name.split(" ")[0]}
                            </p>
                            <div className="flex space-x-2">
                                <p className="">
                                    {message.translated?.[language] ||
                                        message.input}
                                </p>
                                {/* {!message.translated && (
                                    <Loader2 className=" animate-spin" />
                                )} */}
                            </div>
                        </div>
                        <UserAvatar
                            name={message.user.name}
                            image={message.user.image}
                            className={cn({ "-order-1": !isSender })}
                        />
                    </div>
                );
            })}
            <div ref={messageEndRef} />
        </div>
    );
}

export default ChatMessages;
