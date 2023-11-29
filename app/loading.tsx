import { Loader2Icon } from "lucide-react";
import React from "react";

type Props = {};

function Loading() {
    return (
        <div className="flex flex-col items-center p-18 justify-center">
            <p className="text-4xl">
                {" "}
                Just a minute preparing your valuable chats
            </p>
            <Loader2Icon className="animate-spin h-24 w-24" />
        </div>
    );
}

export default Loading;
