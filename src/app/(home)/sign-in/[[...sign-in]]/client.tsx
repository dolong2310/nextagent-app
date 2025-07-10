"use client";

import useCurrentTheme from "@/hooks/useCurrentTheme";
import { SignIn as SignInClerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = () => {
  const currentTheme = useCurrentTheme();
  return (
    <SignInClerk
      appearance={{
        elements: {
          cardBox: "border! shadow-none! rounded-lg!",
        },
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default SignIn;
