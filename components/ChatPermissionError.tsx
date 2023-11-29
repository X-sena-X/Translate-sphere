import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
type Props = {};

function ChatPermissionError({}: Props) {
    return (
        <Alert variant={"destructive"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex justify-between">
                <p className="font-bold">
                    🚫🚫Permission Denied!!
                    <br />
                    <span className="font-bold">
                        You do not have permission to access this chat. Ask chat
                        admin
                    </span>
                </p>
                <Link href="/chat" replace>
                    <Button variant="destructive">Dismiss</Button>
                </Link>
            </AlertDescription>
        </Alert>
    );
}

export default ChatPermissionError;
