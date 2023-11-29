import ChatList from "@/components/ChatList";
import React from "react";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

function ChatPage({ searchParams: { error } }: Props) {
    return (
        <div>
            {/** chat Permission chat*/}
            {/**chat list */}
            <ChatList />
        </div>
    );
}

export default ChatPage;
