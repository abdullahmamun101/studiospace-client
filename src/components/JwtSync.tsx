"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";


export default function JwtSync() {
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;
    fetch("/api/jwt", { method: "POST" }).catch(() => {
     
    });
  }, [email]);

  return null;
}