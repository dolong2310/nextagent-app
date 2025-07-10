"use client";

import useCurrentTheme from "@/hooks/useCurrentTheme";
import { SignUp as SignUpClerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignUp = () => {
  const currentTheme = useCurrentTheme();
  return (
    <SignUpClerk
      appearance={{
        elements: {
          cardBox: "border! shadow-none! rounded-lg!",
        },
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default SignUp;
