import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  userDetails: null,
  setUserDetails: (val) => set({ userDetails: val }),

  products: [],
  setProducts: (list) => set({ products: list }),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));
