'use client'
import React from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {

    const handleSignIn = async() => {
        await authClient.signIn.social({
            provider: 'google'})
    }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60">
      <div className="bg-gray-50 rounded-xl p-6 w-[90%] max-w-md h-[50%] relative">
        <button className="absolute top-2 right-3 text-lg" onClick={onClose}>
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">Sign in to PixelRec</h3>
        <div onClick={handleSignIn} className="flex items-center gap-2 w-[20vw] mx-auto  justify-center border px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100">
          <Image src="/assets/images/google.svg" width={24} height={24} alt="Google" />
          <span>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
