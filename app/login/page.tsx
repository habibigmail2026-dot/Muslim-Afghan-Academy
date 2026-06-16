"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user && !loading) {
      router.push("/exams");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex flex-col font-sans select-none bg-[#F4EFE6] text-[#1E1E1E]">
      {/* Navbar Minimal */}
      <nav className="w-full p-6 md:px-12 flex justify-between absolute top-0 z-50">
        <Link href="/" className="font-bold text-sm tracking-widest uppercase">
          MUSLIM AFGHAN
        </Link>
        <Link
          href="/"
          className="text-black/80 font-medium normal-case tracking-normal hover:text-[#299A8E] transition-colors flex items-center gap-2"
        >
          &larr; <span>Back to Home</span>
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-16">
        <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden ring-4 ring-[#E27D22]/20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-3 tracking-tighter text-[#299A8E] uppercase">
              Login
            </h1>
            <p className="text-sm font-medium opacity-80 text-[#1E1E1E]">
              Log in to your account to continue to your courses and exams.
            </p>
          </div>

          <button
            disabled={loading}
            onClick={signInWithGoogle}
            className="w-full py-4 bg-[#E27D22] text-white hover:bg-[#c96c1b] flex items-center justify-center gap-3 text-base font-bold rounded-full transition-all shadow-lg focus:outline-none disabled:opacity-50 uppercase tracking-wide"
          >
            <div className="bg-white p-1 rounded-full">
              <FcGoogle size={20} />
            </div>
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}
