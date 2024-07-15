"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import Resize from "./components/Resize";

export default function Home() {
  return (
    <>
      <Authenticated>
        <Resize />
      </Authenticated>

      <Unauthenticated>
        <p>Please log in to remove the bg and emojisize images</p>
      </Unauthenticated>
    </>
  );
}
