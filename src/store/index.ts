import { create } from 'zustand';

export type Cart = {
  id: string;
  quantity: number;
  stock:number
};

type CartState = {
  carts: Cart[];
  setCarts: (carts: Cart[]) => void;
  updateCarts: (cart: Cart) => void;
  resetCarts: () => void;
  deleteCart: (index: number) => void
  outInFlag: "OUT" | "IN";
  setOutInFlag:(payload:"OUT" | "IN") => void
};

const useCartStore = create<CartState>((set) => ({
  carts: [],
  setCarts: (carts) => set((state) => ({ carts: [...state.carts, ...carts] })),
  updateCarts: (value:Cart) => set((state) => ({carts:state.carts.map((cart) => (cart.id === value.id ? { ...cart, quantity: value.quantity } : cart))})),
  resetCarts: () => set(() => ({ carts: [] })),
  deleteCart: (index: number) => set((state) => ({ carts: state.carts.filter((_, idx: number) => (idx !== index)) })),
  outInFlag: "OUT",
  setOutInFlag: (flag) => set(() => ({ outInFlag: flag }))
})
);

export default useCartStore;