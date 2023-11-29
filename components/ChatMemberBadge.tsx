"use client";
import useAdminId from "@/hooks/useAdminId";
import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatMembers";
import { Loader2 } from "lucide-react";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Badge } from "./ui/badge";
import UserAvatar from "./UserAvatar";

type Props = {
    chatId: string;
};

function ChatMemberBadge({ chatId }: Props) {
    const [members, loading, error] = useCollectionData<ChatMembers>(
        chatMembersRef(chatId)
    );
    const adminId = useAdminId({ chatId });
    if (loading && !members) return <Loader2 className=" animate-spin" />;

    return (
        !loading && (
            <div className="p-2 border rounded-xl m-5">
                <div className=" flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
                    {members?.map((member, i) => (
                        <Badge
                            variant="secondary"
                            key={i}
                            className="h-14 p-5 pl-2 pr-5 flex space-x-2"
                        >
                            <div className="flex items-center space-x-2">
                                <UserAvatar
                                    name={member.email}
                                    image={member.image}
                                />
                            </div>
                            <div className="">
                                <p>{member.email}</p>
                                {member.userId === adminId && (
                                    <p className="text-indigo-400 animate-pulse">
                                        Admin
                                    </p>
                                )}
                            </div>
                        </Badge>
                    ))}
                </div>
            </div>
        )
    );
}

export default ChatMemberBadge;
