"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopByMaterial from "../components/MaterialGrid";
import ShopByStyle from "../components/Stylegrid";
import CategoryGrid from "../components/CategoryGrid";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "../components/Card";

// Dynamically import FilterPanel to avoid SSR issues
const FilterPanel = dynamic(() => import('../components/FilterPanel'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-3 p-6">
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  )
});
const EXAMPLE_PRODUCT = {
  id: 'shirt-001',
  name: 'Polo T-Shirt, Premium Cotton',
  images: [
    { src: '/shirt-1.jpg', alt: 'Front view' },
    { src: '/shirt-2.jpg', alt: 'Back view' },
    { src: '/shirt-3.jpg', alt: 'Collar detail' }
  ],
  originalPrice: 1299,
  salePrice: 999,
  discount: 23,
  className:"h-80 w-80"
};

export default function LandingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          suppressHydrationWarning
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {mounted && showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
                suppressHydrationWarning
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <FilterPanel />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col md:flex-row flex-1 bg-[#92bce03b]">
        
        {/* Desktop Filters */}
        
        <div className="w-full max-w-xs mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mt-1 h-fit md:sticky md:top-6">
          <FilterPanel />
        </div>



        


        {/* Main Content Area */}
        <div className="flex-1 ">
          <section className="text-center px-4 py-8 md:px-6 md:py-12">
            <h1 className="text-4xl font-medium mb-2.5 text-gray-700 font-playfair">
              SJD JEWELRY WHOLESALE
            </h1>
            <p className="mt-4 md:mt-6 text-[12px] text-[#666] max-w-sm sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Discover our exquisite collection of fine jewelry. Choose your preferred way 
              to explore our premium selection.
            </p>
          </section>
          <div className="px-4 md:px-8 pb-8">
            <ShopByMaterial/>
          </div>
          <div className="px-4 md:px-8 pb-8">
            <ShopByStyle/>
          </div>
          <div className="px-4 md:px-8 pb-8">
            <CategoryGrid />
          </div>
          {/* <div className="px-4 md:px-8 pb-8 ">
          <ProductCard {...EXAMPLE_PRODUCT} />
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
