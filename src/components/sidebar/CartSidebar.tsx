import { useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import useCartStore, { Cart } from "../../store";
import CartCard from "../card/CartCard";
import { supabase } from "../../utils/supabaseClient";
import OutInToggle from "../OutInToggle";

const CartSidebar = () => {
  const carts = useCartStore((state) => state.carts);
  const deleteCart = useCartStore((state) => state.deleteCart);
  const resetCarts = useCartStore((state) => state.resetCarts);
  const outInFlag = useCartStore((state) => state.outInFlag);
  const [dateInput, setDateInput] = useState("");

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
  };

  const onUpdateSkus = async () => {
    switch (outInFlag) {
      case "OUT":
        await updateOutSkus(carts);
        await addHistory();
        break;
      case "IN":
        await updateInSkus(carts);
        await addHistory();
        break;
    }
  };

  const updateOutSkus = async (carts: Cart[]) => {
    carts.map(async (cart) => {
      const { error } = await supabase
        .from("skus")
        .update([{ stock: cart.stock - cart.quantity }])
        .eq("id", cart.id);
      if (error) {
        console.log("skus", error);
      }
    });
    resetCarts();
  };

  const updateInSkus = async (carts: Cart[]) => {
    carts.map(async (cart) => {
      const { error } = await supabase
        .from("skus")
        .update([{ stock: cart.stock + cart.quantity }])
        .eq("id", cart.id);
      if (error) {
        console.log("skus", error);
      }
    });
    resetCarts();
  };

  const addHistory = async () => {
    const fieldName =
      outInFlag === "OUT" ? "outgoing_date_time" : "Incoming_date_time";
    const tableName =
      outInFlag === "OUT" ? "outgoing_history" : "incoming_history";

    const { data, error } = await supabase
      .from(tableName)
      .insert([{ [fieldName]: new Date(dateInput) || new Date() }])
      .select()
      .single();
    if (error) {
      console.log(tableName, error);
    }
    if (data) {
      addDetails(data?.id, carts);
    }
  };

  const addDetails = async (id: string, carts: Cart[]) => {
    const fieldName =
      outInFlag === "OUT" ? "outgoing_history_id" : "incoming_history_id";
    const tableName =
      outInFlag === "OUT" ? "outgoing_details" : "incoming_details";

    const newArray = carts.map((cart) => ({
      [fieldName]: id,
      sku_id: cart.id,
      quantity: cart.quantity,
    }));
    const { error } = await supabase.from(tableName).insert(newArray).select();
    if (error) {
      console.log(tableName, error);
    }
  };

  return (
    <Box w="full" minH="calc(100vh - 100px)" maxW={500}>
      <OutInToggle />
      {carts.length > 0 && (
        <Box mt={6} p={3} bg="white" rounded="md" boxShadow="md">
          {carts.map((cart, idx: number) => (
            <CartCard
              key={cart.id + idx}
              cart={cart}
              deleteCart={deleteCart.bind(null, idx)}
            />
          ))}
          <Box my={3}>
            <Input type="date" value={dateInput} onChange={handleDateInput} />
          </Box>
          <Flex w="full" gap={3}>
            <Button w="full" onClick={resetCarts}>
              キャンセル
            </Button>
            <Button w="full" colorScheme="linkedin" onClick={onUpdateSkus}>
              確定
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CartSidebar;
