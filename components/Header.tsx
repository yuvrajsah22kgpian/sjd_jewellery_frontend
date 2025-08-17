"use client"

import { useState } from "react"

import {Search,Heart,ShoppingCart,User,Phone} from "lucide-react";

export default function Header(){
    const [search,setSearch]=useState("");

    return (
        <header className="w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Left - Phone Number */}
                <div className="flex items-center text-gray-700 gap-2 text-sm">
                <Phone size={16} />
                <span>+1-234-567-890</span>
                </div>

                {/* Center - Logo */}
                <div className="flex-1 flex justify-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-14 w-auto object-contain"
                />
                </div>

                {/* Right - Search & Links */}
                <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="flex items-center border rounded-lg px-2 py-1 bg-gray-50">
                    <Search size={18} className="text-gray-500" />
                    <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="outline-none bg-transparent px-2 py-1 w-40 md:w-56"
                    />
                </div>

                {/* Links */}
                <nav className="flex items-center gap-5 text-gray-700 text-sm font-medium">
                    <a href="/contact" className="hover:text-black">
                    Contact
                    </a>
                    <a href="/wishlist" className="hover:text-black flex items-center gap-1">
                    <Heart size={16} /> Wishlist
                    </a>
                    <a href="/cart" className="hover:text-black flex items-center gap-1">
                    <ShoppingCart size={16} /> Cart
                    </a>
                    <a href="/account" className="hover:text-black flex items-center gap-1">
                    <User size={16} /> Account
                    </a>
                </nav>
                </div>
            </div>
        </header>
    );
}