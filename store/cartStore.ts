import { ProductType } from "@/app/_components/products/product.type";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (productId: string, stock: number) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCard: () => void;
  totalQuantity: () => number;
  totalPrice: (products: ProductType[]) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (productId, stock) => {
        const items = [...get().items];
        const existing = items.find((item) => item.productId === productId);

        if (existing) {
          if (existing.quantity < stock) {
            existing.quantity += 1;
          } else {
            toast.error("موجودی این محصول تمام شده!");
          }
        } else {
          if (stock > 0) {
            items.push({ productId, quantity: 1 });
            toast.success("محصول با موفقیت به سبد خرید اضافه شد");
          } else {
            toast.error("موجودی محصول تمام شده!");
          }
        }
        set({ items });
      },
      decreaseQuantity: (productId) => {
        const items = [...get().items];
        const existing = items.find((item) => item.productId === productId);

        if (!existing) return;
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          const filtered = items.filter((item) => item.productId !== productId);
          set({ items: filtered });
          toast.error("محصول با موفقیت از سبد خرید حذف شد");

          return;
        }
        set({ items });
      },
      removeFromCart: (productId) => {
        const filtered = get().items.filter((i) => i.productId !== productId);
        set({ items: filtered });
      },
      clearCard: () => {
        (set({ items: [] }),
          toast.success("خالی شدن سبد خرید"));
      },
      totalQuantity: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
      totalPrice: (products) => {
        return get().items.reduce((sum, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return sum;
          const priceAfterDiscount =
            product.price * (1 - (product.discount || 0) / 100);
          return sum + priceAfterDiscount * item.quantity;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);