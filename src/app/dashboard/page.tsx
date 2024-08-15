"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/lib/cognitoActions";

export default function DashboardPage() {
    const router = useRouter();

    return <div className="h-screen flex items-center justify-center">
        Welcome to the Dashboard!
        <Button onClick={() => handleSignOut(router)}>Logout</Button>
    </div>
}