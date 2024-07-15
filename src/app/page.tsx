"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import Resize from "./my-components/Resize";
import { Button } from "@/components/ui/button";
import { Dashboard } from "./my-components/Dashboard";

export default function Home() {
  return (
    <>
      <Dashboard />
      {/* <Resize /> */}

      <Unauthenticated>
        <p>Please log in to remove the bg and emojisize images</p>
      </Unauthenticated>
    </>
  );
}
