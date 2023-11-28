"use client";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import { Loader2, StarIcon } from "lucide-react";

type Props = {
    session: Session | null;
};

export default function UserButton({ session }: Props) {
    // Subscription listener ....
    const subscription = useSubscriptionStore((state) => state.subscription);

    if (!session)
        return (
            <Button
                variant="outline"
                onClick={() => signIn()}
                className=" border-0"
            >
                Sign In
            </Button>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    name={session.user?.name!}
                    image={session.user?.image!}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center">
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>

                <DropdownMenuSeparator />
                {subscription === undefined && (
                    <DropdownMenuItem>
                        <Loader2 className=" animate-spin" />
                    </DropdownMenuItem>
                )}
                {subscription?.role === "pro" && (
                    <>
                        <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
                            <StarIcon fill="#E935C1" />
                            <p>PRO</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Manage
                            {/** ManageAccountButton */}
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
