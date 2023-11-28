"use client";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

function SubscriptionProvider({ children }: Props) {
    const { data: session } = useSession();
    const setSubscription = useSubscriptionStore(
        (state) => state.setSubscription
    );
    useEffect(() => {
        if (!session) return;
        return onSnapshot(
            subscriptionRef(session?.user.id),
            (snapshot) => {
                if (snapshot.empty) {
                    console.log("user has no subcription");
                    setSubscription(null);
                    return;
                } else {
                    console.log("User has subscription");
                    setSubscription(snapshot.docs[0].data());
                }

                //  set subscription
            },
            (error) => {
                console.log("Error getting document: ", error);
            }
        );
    }, [session]);
    return <>{children}</>;
}

export default SubscriptionProvider;
