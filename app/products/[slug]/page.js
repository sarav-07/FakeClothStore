"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  ShoppingCart,
  Loader2,
  Tag,
  Edit,
  Save,
  X,
  Delete,
  DeleteIcon,
  LucideDelete,
  Trash2,
} from "lucide-react";
import { useGlobalStore } from "@/app/useGlobalStore";

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState({
    productDetail: false,
    updateProduct: false,
    deleteProduct: false,
  });
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const deleteProductFromStore = useGlobalStore((state) => state.deleteProduct);
  const updateProductInStore = useGlobalStore((state) => state.updateProduct);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!slug) return;
      setLoading((prev) => ({ ...prev, productDetail: true }));
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${slug}`
        );
        setProductDetail(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading((prev) => ({ ...prev, productDetail: false }));
      }
    };

    fetchProductDetails();
  }, [slug]);

  const handleUpdateProduct = async () => {
    if (!editTitle || !editPrice) {
      alert("Please fill out both fields");
      return;
    }
    if (loading.updateProduct) return;
    try {
      setLoading((prev) => ({ ...prev, updateProduct: true }));
      const response = await axios.put(
        `https://fakestoreapi.com/products/${slug}`,
        {
          title: editTitle,
          price: editPrice,
        }
      );
      if (response.status === 200) {
        alert("Product updated successfully!");
        setProductDetail((prev) => ({
          ...prev,
          title: editTitle,
          price: Number(editPrice),
        }));
        updateProductInStore(updatedData);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setLoading((prev) => ({ ...prev, updateProduct: false }));
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete this product"?`
    );
    if (!confirmDelete) return;

    try {
      setLoading((prev) => ({ ...prev, deleteProduct: true }));
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${slug}`
      );

      if (response.status === 200) {
        alert("Product deleted successfully!");
        deleteProductFromStore(productDetail.id);
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setLoading((prev) => ({ ...prev, deleteProduct: false }));
    }
  };

  if (loading.productDetail || !productDetail)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading product details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl overflow-hidden grid md:grid-cols-2 gap-8 p-6">
        <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
          <Image
            src={productDetail.image}
            alt={productDetail.title}
            width={400}
            height={400}
            className="object-contain w-full h-auto max-h-[400px] transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {productDetail.title}
            </h1>

            <p className="text-gray-600 text-sm mb-4">
              {productDetail.description}
            </p>

            <div className="flex items-center gap-2 text-sm mb-6">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 capitalize">
                {productDetail.category}
              </span>
            </div>

            <div className="text-3xl font-semibold text-gray-900 mb-6">
              ${productDetail.price.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                setEditTitle(productDetail.title);
                setEditPrice(productDetail.price);
                setShowModal(true);
              }}
              className="cursor-pointer flex items-center justify-center gap-2 bg-black text-white font-medium py-2.5 px-6 rounded-lg hover:bg-gray-900 transition-all"
            >
              <Edit className="w-5 h-5" />
              Edit Product
            </button>
            <button
              onClick={handleDeleteProduct}
              disabled={loading.deleteProduct}
              className="cursor-pointer flex items-center justify-center gap-2 bg-red-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-red-700 transition-all disabled:opacity-70"
            >
              {loading.deleteProduct ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5" />
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="text-black w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                disabled={loading.updateProduct}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-all disabled:opacity-60"
              >
                {loading.updateProduct ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
