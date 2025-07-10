import { Metadata } from "next";
import SignUp from "./client";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className="flex flex-col items-center">
          <SignUp />
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
