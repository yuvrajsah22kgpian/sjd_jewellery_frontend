"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterPanel from "../components/FilterPanel";
import CategoryGrid from "../components/CategoryGrid";
import ProductBlocks from "../components/ProductBlocks";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 bg-gray-50">
        {/* Left - Filters */}
        <div className="hidden md:block">
          <FilterPanel />
        </div>

        {/* Right - Categories + Products */}
        <div className="flex-1">
        <section className="text-center px-6 py-12">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-900">
            SJD JEWELRY WHOLESALE
          </h1>

          {/* Description */}
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of fine jewelry. Choose your preferred way 
            to explore our premium selection.
          </p>
        </section>
          <CategoryGrid />
          {/* <ProductBlocks /> */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}