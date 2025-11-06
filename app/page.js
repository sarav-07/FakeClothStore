"use client";

import React, { useEffect, useState } from "react";
import UserLogin from "./userLogin";
import { useGlobalStore } from "./useGlobalStore";
import axios from "axios";
import ProductCard from "./components/productCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const userDetails = useGlobalStore((state) => state.userDetails);
  const setUserDetails = useGlobalStore((state) => state.setUserDetails);
  const products = useGlobalStore((state) => state.products);
  const setProducts = useGlobalStore((state) => state.setProducts);
  const [isChecking, setIsChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return;
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products, setProducts]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setUserDetails(parsedUser);
        }
      } catch (err) {
        console.error("Error parsing userDetails from localStorage", err);
      }
    }
    setIsChecking(false);
  }, [setUserDetails]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Checking user session...
      </div>
    );
  }

  if (!userDetails || !userDetails.email) {
    return <UserLogin />;
  }

  return (
    <div className="p-4 flex flex-col items-center font-nunito">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onCardPress={() => router.push(`/products/${product?.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
