import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";
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
            {error && (
                <div className="m-2">
                    <ChatPermissionError />
                </div>
            )}

            {/**chat list */}
            <ChatList />
        </div>
    );
}

export default ChatPage;
