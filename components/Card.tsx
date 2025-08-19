// 'use client';

// import { useState } from "react";
// import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Plus, Minus } from "lucide-react";

// // Minimal classnames utility
// function classNames(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// // Accessible, stylish icon button
// const IconButton = ({
//   children,
//   className = "",
//   onClick,
//   disabled = false,
//   "aria-label": ariaLabel,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   onClick?: (e: React.MouseEvent) => void;
//   disabled?: boolean;
//   "aria-label": string;
// }) => (
//   <button
//     type="button"
//     aria-label={ariaLabel}
//     disabled={disabled}
//     onClick={onClick}
//     tabIndex={0}
//     className={classNames(
//       "inline-flex items-center justify-center rounded-full p-1",
//       "bg-white/80 backdrop-blur-lg shadow hover:bg-white",
//       "transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
//       "disabled:opacity-40 disabled:pointer-events-none",
//       className
//     )}
//   >
//     {children}
//   </button>
// );

// // Badge for discounts
// const DiscountBadge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <span className={classNames(
//     "inline-block font-bold text-xs py-1 px-2 rounded-full",
//     "bg-gradient-to-br from-rose-500 to-rose-400 text-white shadow border border-white/20",
//     className
//   )}>
//     {children}
//   </span>
// );

// interface ProductImage {
//   src: string;
//   alt: string;
// }

// interface ProductCardProps {
//   id: string;
//   name: string;
//   images: ProductImage[];
//   originalPrice: number;
//   salePrice: number;
//   discount: number;
//   className?: string;
// }

// export function ProductCard({
//   id,
//   name,
//   images,
//   originalPrice,
//   salePrice,
//   discount,
//   className = "",
// }: ProductCardProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={classNames(
//         "bg-white rounded-2xl shadow-lg border border-gray-200",
//         "hover:shadow-xl transition-all duration-300 overflow-hidden relative",
//         "group flex flex-col",
//         className
//       )}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image Section */}
//       <div className="relative aspect-square bg-gray-50 overflow-hidden">
//         <img
//           src={images[currentImageIndex]?.src}
//           alt={images[currentImageIndex]?.alt}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           style={{ minHeight: 180 }}
//           draggable={false}
//         />

//         {/* Navigation */}
//         {images.length > 1 && isHovered && (
//           <>
//             <IconButton
//               aria-label="Previous"
//               className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
//               onClick={e => {
//                 e.stopPropagation();
//                 setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
//               }}
//             >
//               <ChevronLeft className="h-5 w-5 text-gray-700" />
//             </IconButton>
//             <IconButton
//               aria-label="Next"
//               className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
//               onClick={e => {
//                 e.stopPropagation();
//                 setCurrentImageIndex(prev => (prev + 1) % images.length);
//               }}
//             >
//               <ChevronRight className="h-5 w-5 text-gray-700" />
//             </IconButton>
//           </>
//         )}

//         {/* Image dots */}
//         {images.length > 1 &&
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
//             {images.map((_, i) => (
//               <button
//                 key={i}
//                 className={classNames(
//                   "rounded-full w-2 h-2 border border-white shadow transition-colors",
//                   i === currentImageIndex ? "bg-blue-600" : "bg-white/80"
//                 )}
//                 onClick={e => {
//                   e.stopPropagation();
//                   setCurrentImageIndex(i);
//                 }}
//                 aria-label={`Show product image ${i+1}`}
//               />
//             ))}
//           </div>
//         }

//         {/* SALE badge */}
//         {discount > 0 &&
//           <DiscountBadge className="absolute top-3 left-3 z-10">
//             -{discount}%
//           </DiscountBadge>
//         }
//         {/* Wishlist button (top right) */}
//         <IconButton
//           aria-label="Add to wishlist"
//           className="absolute top-3 right-3 z-10 w-8 h-8"
//           onClick={e => {
//             e.stopPropagation();
//             setIsWishlisted(w => !w);
//           }}
//         >
//           <Heart
//             className={classNames(
//               "w-5 h-5 transition",
//               isWishlisted ? "fill-rose-500 text-rose-500 drop-shadow" : "text-gray-400"
//             )}
//           />
//         </IconButton>
//       </div>

//       {/* Product Info Area */}
//       <div className="flex flex-col flex-1 p-4">
//         <h3 className="font-semibold text-gray-900 text-base mb-1.5 line-clamp-2">{name}</h3>

//         {/* Price and Controls */}
//         <div className="flex items-end gap-2 justify-between mt-auto pt-2">
//           {/* Prices */}
//           <div>
//             <span className="font-bold text-lg text-blue-700">
//               ${salePrice.toLocaleString()}
//             </span>
//             {originalPrice > salePrice &&
//               <span className="block text-xs line-through text-gray-400">
//                 ${originalPrice.toLocaleString()}
//               </span>
//             }
//           </div>

//           {/* Quantity Selector */}
//           <div className="flex items-center bg-gray-100 rounded-md border border-gray-200 shadow-sm">
//             <IconButton
//               aria-label="Decrease"
//               disabled={quantity <= 1}
//               className="w-7 h-7 text-gray-500"
//               onClick={e => {
//                 e.stopPropagation();
//                 if (quantity > 1) setQuantity(q => q - 1);
//               }}>
//               <Minus className="h-3.5 w-3.5" />
//             </IconButton>
//             <span className="px-2 min-w-7 text-center font-medium text-sm select-none">{quantity}</span>
//             <IconButton
//               aria-label="Increase"
//               className="w-7 h-7 text-gray-500"
//               onClick={e => {
//                 e.stopPropagation();
//                 setQuantity(q => q + 1);
//               }}>
//               <Plus className="h-3.5 w-3.5" />
//             </IconButton>
//           </div>

//           {/* Cart add */}
//           <div className="relative group">
//             <IconButton
//               aria-label="Add to cart"
//               className={classNames(
//                 "w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500",
//                 "hover:from-blue-700 hover:to-cyan-600 hover:scale-105 shadow-lg",
//                 "text-white"
//               )}
//               onClick={e => {
//                 e.stopPropagation();
//                 console.log(`Added ${quantity} of ${name} to cart`);
//               }}>
//               <ShoppingCart className="w-5 h-5" />
//             </IconButton>
//             {/* Simple Tooltip */}
//             <span
//               className="pointer-events-none absolute bottom-full right-0 mb-1 bg-gray-900/95 text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow z-20"
//             >
//               Add to Cart
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Plus, Minus } from "lucide-react";

// Minimal classnames utility
function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Accessible, stylish icon button
const IconButton = ({
  children,
  className = "",
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  "aria-label": string;
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={onClick}
    tabIndex={0}
    className={classNames(
      "inline-flex items-center justify-center rounded-md",
      "transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      "disabled:opacity-40 disabled:pointer-events-none",
      className
    )}
  >
    {children}
  </button>
);

// Badge for discounts
const DiscountBadge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={classNames(
    "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-bold",
    "bg-red-500 text-white shadow-sm",
    className
  )}>
    {children}
  </span>
);

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  images: ProductImage[];
  originalPrice: number;
  salePrice: number;
  discount: number;
  className?: string;
}

export function ProductCard({
  id,
  name,
  images,
  originalPrice,
  salePrice,
  discount,
  className = "",
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classNames(
        "bg-white rounded-2xl shadow-lg border border-gray-200",
        "hover:shadow-xl transition-all duration-300 overflow-hidden relative",
        "group flex flex-col",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={images[currentImageIndex]?.src}
          alt={images[currentImageIndex]?.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ minHeight: 180 }}
          draggable={false}
        />

        {/* Navigation */}
        {images.length > 1 && isHovered && (
          <>
            <IconButton
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2"
              onClick={e => {
                e.stopPropagation();
                setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
              }}
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </IconButton>
            <IconButton
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2"
              onClick={e => {
                e.stopPropagation();
                setCurrentImageIndex(prev => (prev + 1) % images.length);
              }}
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </IconButton>
          </>
        )}

        {/* Image dots */}
        {images.length > 1 &&
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                className={classNames(
                  "rounded-full w-2 h-2 border border-white shadow transition-colors",
                  i === currentImageIndex ? "bg-white" : "bg-white/50"
                )}
                onClick={e => {
                  e.stopPropagation();
                  setCurrentImageIndex(i);
                }}
                aria-label={`Show product image ${i+1}`}
              />
            ))}
          </div>
        }
      </div>

      {/* Product Info Area */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
            {name}
          </h3>
        </div>

        {/* Bottom Row - All Controls in One Line */}
        <div className="flex items-center justify-between gap-1 text-xs">
          {/* Price Section */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              ${salePrice.toLocaleString()}
            </span>
            {originalPrice > salePrice && (
              <span className="text-xs text-gray-500 line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <DiscountBadge className="h-5">
              -{discount}%
            </DiscountBadge>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded">
            <IconButton
              aria-label="Decrease"
              disabled={quantity <= 1}
              className="h-5 w-5 rounded-r-none border-0 hover:bg-gray-100"
              onClick={e => {
                e.stopPropagation();
                if (quantity > 1) setQuantity(q => q - 1);
              }}
            >
              <Minus className="h-2 w-2" />
            </IconButton>
            <span className="px-1.5 py-0.5 text-xs font-medium min-w-[1.25rem] text-center border-x border-gray-200">
              {quantity}
            </span>
            <IconButton
              aria-label="Increase"
              className="h-5 w-5 rounded-l-none border-0 hover:bg-gray-100"
              onClick={e => {
                e.stopPropagation();
                setQuantity(q => q + 1);
              }}
            >
              <Plus className="h-2 w-2" />
            </IconButton>
          </div>

          {/* Wishlist Button */}
          <IconButton
            aria-label="Add to wishlist"
            className="h-5 w-5 hover:bg-gray-100"
            onClick={e => {
              e.stopPropagation();
              setIsWishlisted(w => !w);
            }}
          >
            <Heart
              className={classNames(
                "h-2.5 w-2.5 transition-colors",
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              )}
            />
          </IconButton>

          {/* Add to Cart Button */}
          <div className="relative group">
            <IconButton
              aria-label="Add to cart"
              className="bg-blue-600 hover:bg-blue-700 text-white h-5 w-5 p-0 relative"
              onClick={e => {
                e.stopPropagation();
                console.log(`Added ${quantity} of ${name} to cart`);
              }}
            >
              <ShoppingCart className="h-2.5 w-2.5" />
            </IconButton>
            {/* Tooltip */}
            <span className="absolute bottom-full right-0 mb-1 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              Add to Cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
