import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMemberBadge from "@/components/ChatMemberBadge";
import ChatMessages from "@/components/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {
    params: {
        chatId: string;
    };
};

export default async function page({ params: { chatId } }: Props) {
    const session = await getServerSession(authOptions);

    const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
        (doc) => doc.data()
    );

    return (
        <>
            {/** admin controls */}
            <AdminControls chatId={chatId} />
            {/** ChatMemberBadge */}

            {/* // shows the current members in chat */}
            <ChatMemberBadge chatId={chatId} />
            {/**ChatMessages */}
            <div className="flex-1">
                <ChatMessages
                    chatId={chatId}
                    session={session}
                    initialMessages={initialMessages}
                />
            </div>
            {/** ChatInput */}
            <ChatInput chatId={chatId} />
        </>
    );
}
