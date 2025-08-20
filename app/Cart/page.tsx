"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Shoppingcard from "../../components/ShoppingCard";
import SummaryCart from "../../components/SummaryCart";

interface CartItemType {
  ProductId: string;
  ProductName: string;
  ImgUrl: string;
  ProductDescription: string;
  OldPrice: number;
  NewPrice: number;
  Discount: string;
  count: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItemType[]>([
    {
      ProductId: "75344d0660w14",
      ProductName: "Ring",
      ImgUrl: "/ring.jpg",
      ProductDescription: "Sapphire and Diamond Eternity Ring in 14K Yellow Gold (2.8mm)",
      OldPrice: 5300,
      NewPrice: 2300,
      Discount: "-50%",
      count: 1,
    },
    // Add more items as needed for demo
  ]);

  // Cart updates
  const handleAdd = (idx: number) => {
    setCart((prev) => prev.map((item, i) => i === idx ? { ...item, count: item.count + 1 } : item));
  };
  const handleSubtract = (idx: number) => {
    setCart((prev) => prev.map((item, i) => (i === idx && item.count > 1) ? { ...item, count: item.count - 1 } : item));
  };
  const handleRemove = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.NewPrice * item.count, 0);
  const savings = cart.reduce((sum, item) => sum + (item.OldPrice - item.NewPrice) * item.count, 0);
  const total = subtotal; // Taxes/Shipping not applied here
  const itemCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-[#e6ebf6] min-h-screen flex flex-col">
      <Header />
      <nav className="bg-gray-50 px-8 py-2 text-sm text-gray-600 border-b">
        Home / Natural Diamond Jewelry / Sapphire and Diamond Eternity Ring in 14K Yellow Gold (2.8mm) / <span className="text-black">My Cart</span>
      </nav>
      <main className="flex justify-center gap-8 pt-10 pb-16 flex-1">
        <section className="w-[580px]">
          <h2 className="text-2xl font-serif mb-5">
            My Cart <span className="text-base text-gray-500 font-normal ml-2">{itemCount} Item{itemCount !== 1 ? "s" : ""}</span>
          </h2>
          <div className="space-y-6">
            {cart.map((item, idx) => (
              <Shoppingcard
                key={item.ProductId}
                {...item}
                onAdd={() => handleAdd(idx)}
                onSubtract={() => handleSubtract(idx)}
                onRemove={() => handleRemove(idx)}
              />
            ))}
            {cart.length === 0 && (
              <div className="text-gray-500 text-center py-16 font-medium">Your cart is empty.</div>
            )}
          </div>
        </section>
        <SummaryCart
          subtotal={subtotal}
          shipping={0}
          tax={0}
          savings={savings}
          total={total}
          itemCount={itemCount}
        />
      </main>
      <Footer />
    </div>
  );
}
