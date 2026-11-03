

"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Wireless Headphones", ar: "سماعات لاسلكية", price: 99, category: "Electronics", emoji: "🎧" },
  { id: 2, name: "Smart Watch", ar: "ساعة ذكية", price: 149, category: "Electronics", emoji: "⌚" },
  { id: 3, name: "Running Shoes", ar: "حذاء رياضي", price: 199, category: "Fashion", emoji: "👟" },
  { id: 4, name: "Beauty Skincare", ar: "منتجات العناية", price: 79, category: "Beauty", emoji: "🧴" },
  { id: 5, name: "Travel Backpack", ar: "حقيبة سفر", price: 119, category: "Fashion", emoji: "🎒" },
  { id: 6, name: "Coffee Maker", ar: "آلة صنع القهوة", price: 249, category: "Home", emoji: "☕" },
];

const categories = ["All", "Electronics", "Fashion", "Beauty", "Home"];

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);

  const ar = language === "ar";

  const filtered = useMemo(() => products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ar.includes(search);
    const matchesCategory =
      category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  }), [search, category]);

  return (
    <main dir={ar ? "rtl" : "ltr"} className="min-h-screen bg-[#f5f5f5] pb-24 text-gray-900">
      <header className="sticky top-0 z-20 bg-[#ffe600] p-4 shadow-sm">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-tight">
              marketplace<span className="text-blue-700">.</span>
            </h1>
            <button
              onClick={() => setLanguage(ar ? "en" : "ar")}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold"
            >
              {ar ? "English" : "العربية"}
            </button>
          </div>

          <p className="mt-2 text-xs font-semibold">
            📍 {ar ? "التوصيل إلى الرياض" : "Deliver to Riyadh, Saudi Arabia"}
          </p>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ar ? "ابحث عن المنتجات..." : "Search products, brands and more..."}
            className="mt-3 w-full rounded-xl bg-white p-3 text-sm outline-none"
          />
        </div>
      </header>

      <section className="mx-auto max-w-5xl p-4">
        <div className="rounded-2xl bg-gradient-to-r from-[#ffe600] to-[#ffbb36] p-6">
          <p className="text-sm font-bold uppercase">Marketplace deals</p>
          <h2 className="mt-2 text-3xl font-black">
            {ar ? "عروض ضخمة" : "MEGA SALE"}
          </h2>
          <p className="mt-1 font-medium">
            {ar ? "خصومات تصل إلى 50%" : "Up to 50% OFF"}
          </p>
          <button className="mt-4 rounded-full bg-black px-5 py-2 text-sm font-bold text-white">
            {ar ? "تسوق الآن" : "Shop Now"}
          </button>
        </div>

        <h2 className="mb-3 mt-7 text-lg font-extrabold">
          {ar ? "تسوق حسب الفئة" : "Shop by Category"}
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                category === item
                  ? "bg-black text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-3 mt-7 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">
            {ar ? "منتجات مميزة" : "Recommended Products"}
          </h2>
          <span className="text-xs text-gray-500">
            {filtered.length} products
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex aspect-square items-center justify-center bg-[#faf7ed] text-7xl">
                {product.emoji}
              </div>
              <div className="p-3">
                <p className="min-h-10 text-sm font-bold">
                  {ar ? product.ar : product.name}
                </p>
                <p className="mt-2 text-lg font-black">
                  SAR {product.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">⭐ 4.5 · Free delivery</p>
                <button
                  onClick={() => setCart((old) => [...old, product.id])}
                  className="mt-3 w-full rounded-lg bg-[#ffe600] py-2 text-sm font-extrabold hover:bg-[#f5d900]"
                >
                  {ar ? "أضف إلى السلة" : "Add to Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            {ar ? "لم يتم العثور على منتجات" : "No products found"}
          </p>
        )}
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white">
        <div className="mx-auto flex max-w-5xl justify-around py-3">
          <div className="text-center text-xs font-bold">🏠<p>Home</p></div>
          <div className="text-center text-xs font-bold">▦<p>Categories</p></div>
          <div className="text-center text-xs font-bold">
            🛒<p>Cart ({cart.length})</p>
          </div>
          <div className="text-center text-xs font-bold">♡<p>Wishlist</p></div>
          <div className="text-center text-xs font-bold">👤<p>Account</p></div>
        </div>
      </nav>
    </main>
  );
}
