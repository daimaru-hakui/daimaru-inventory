import { create } from 'zustand';

type Post = {
  id: string;
  quantity: number;
};

type CartState = {
  carts: Post[];
  setCarts: (carts: Post[]) => void;
  resetCarts: () => void;
  deleteCart: (index:number) => void
};

const useCartStore = create<CartState>((set) => ({
  carts: [],
  setCarts: (carts) => set((state) => ({ carts: [...state.carts, ...carts] })),
  resetCarts: () => set(() => ({ carts: [] })),
  deleteCart: (index: number) => set((state) => {
    console.log(index)
    const result = state.carts.filter((_, idx: number) => (idx !== index));
    return {
      carts: result
    };
  })
})
);

export default useCartStore;