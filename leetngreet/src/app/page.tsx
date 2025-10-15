"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session to load

    if (session) {
      router.push("/Posts"); // logged in
    } else {
      router.push("/Hello"); // not logged in
    }
  }, [session, status, router]);

  // Optionally render a loading indicator
  return <p>Loading...</p>;
}
