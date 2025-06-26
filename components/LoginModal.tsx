"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const handleLogin = async() => {
    await authClient.signIn.social({
          provider: 'google'
        })
   router.push('/gallery'); // Redirect to gallery after sign-in
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-2">Login Required</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please sign in to continue using screen recording features.
        </p>

        <div className="flex justify-end">
          <Button onClick={handleLogin} className="bg-[#00b4d8] cursor-pointer text-white">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
