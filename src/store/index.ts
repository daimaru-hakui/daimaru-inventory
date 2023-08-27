import { create } from 'zustand';

type Post = {
  id: string;
  quantity: number;
  stock:number
};

type CartState = {
  carts: Post[];
  setCarts: (carts: Post[]) => void;
  updateCarts: (cart: Post) => void;
  resetCarts: () => void;
  deleteCart: (index: number) => void
  outInFlag: boolean;
  setOutInFlag:(payload:boolean) => void
};

const useCartStore = create<CartState>((set) => ({
  carts: [],
  setCarts: (carts) => set((state) => ({ carts: [...state.carts, ...carts] })),
  updateCarts: (value:Post) => set((state) => ({carts:state.carts.map((cart) => (cart.id === value.id ? { ...cart, quantity: value.quantity } : cart))})),
  resetCarts: () => set(() => ({ carts: [] })),
  deleteCart: (index: number) => set((state) => ({ carts: state.carts.filter((_, idx: number) => (idx !== index)) })),
  outInFlag: true,
  setOutInFlag: (flag) => set(() => ({ outInFlag: flag }))
})
);

export default useCartStore;