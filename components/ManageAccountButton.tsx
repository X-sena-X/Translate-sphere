import React from "react";
import { Button } from "./ui/button";
import { generatePortalLink } from "@/actions/generatePortalLink";

type Props = {};

const ManageAccountButton = (props: Props) => {
    return (
        <form action={generatePortalLink}>
            <Button type="submit">Manage Billing</Button>
        </form>
    );
};

export default ManageAccountButton;
