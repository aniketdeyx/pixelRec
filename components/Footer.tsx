'use client'

import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import { FaCcVisa, FaCcMastercard, FaPaypal, FaApple } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#0E1525] text-gray-400 px-6 md:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {/* Left section with logo and description */}
        <div>
          <h1 className="text-white text-2xl font-bold mb-4">PixelRec</h1>
          <p className="text-sm mb-6 leading-relaxed">
            The simplest way to record and <br /> share your screen with high-quality <br /> video and audio.
          </p>
          <div className="flex gap-4 text-xl">
            <FaXTwitter />
            <FaFacebookF />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>

        {/* Links - Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>Features</li>
            <li>Pricing</li>
            <li>Integrations</li>
            <li>Changelog</li>
            <li>Roadmap</li>
          </ul>
        </div>

        {/* Links - Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Blog</li>
            <li>Help Center</li>
            <li>Tutorials</li>
            <li>API Documentation</li>
            <li>Community</li>
          </ul>
        </div>

        {/* Links - Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-8 max-w-7xl mx-auto" />

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto text-sm px-2 gap-4">
        <p>© 2025 ScreenCast Pro. All rights reserved.</p>
        <div className="flex gap-4 text-xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaPaypal />
          <FaApple />
        </div>
      </div>
    </footer>
  )
}
