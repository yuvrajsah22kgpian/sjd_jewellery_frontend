"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center md:text-left">
          <a href="/contact" className="text-gray-700 hover:text-black text-sm">
            Contact
          </a>
          <a href="/track-order" className="text-gray-700 hover:text-black text-sm">
            Track Order
          </a>
          <a href="/about" className="text-gray-700 hover:text-black text-sm">
            About
          </a>
          <a href="/careers" className="text-gray-700 hover:text-black text-sm">
            Careers
          </a>
          <a href="/faqs" className="text-gray-700 hover:text-black text-sm">
            FAQs
          </a>
          <a href="/legal-policies" className="text-gray-700 hover:text-black text-sm">
            Legal & Policies
          </a>
          <a href="/disclaimer" className="text-gray-700 hover:text-black text-sm">
            Disclaimer
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
}