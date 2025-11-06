"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ProductCard({ product, onCardPress }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col">
      <div
        onClick={onCardPress}
        className="cursor-pointer w-full h-56 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain h-full w-auto"
        />
      </div>

      <div className="mt-4 flex flex-col justify-between flex-1">
        <h3
          onClick={onCardPress}
          className="cursor-pointer font-semibold text-gray-900 text-lg line-clamp-2"
        >
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 mt-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-gray-700 font-medium">
              {product.rating?.rate ?? "N/A"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCardPress}
        className="cursor-pointer mt-4 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-900 transition-all"
      >
        View
      </button>
    </div>
  );
}
