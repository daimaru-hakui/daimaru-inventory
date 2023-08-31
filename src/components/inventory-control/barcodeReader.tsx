import { Box, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState, FC } from "react";
import { supabase } from "../../utils/supabaseClient";
import useCartStore from "../../store";

type Props = {
  isInputFocus: boolean;
};

const BarcodeReader: FC<Props> = ({ isInputFocus }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const carts = useCartStore((state) => state.carts);
  const setCarts = useCartStore((state) => state.setCarts);
  const [barcodeInput, setBarcodeInput] = useState("");

  useEffect(() => {
    const ref = inputRef.current;
    if (ref) ref.focus();
  }, [isInputFocus]);

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeInput(e.target.value);
  };

  const handleBarcodeEnter = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.code === "Enter") {
      const { data, error } = await supabase
        .from("skus")
        .select("id,stock")
        .eq("id", barcodeInput)
        .single();
      if (error) return;
      setBarcodeInput("");
      const result = carts.find((cart) => cart.id === data.id);
      if (result) return;
      setCarts([{ id: barcodeInput, stock: data.stock, quantity: 1 }]);
    }
  };

  return (
    <Box p={6} bg="white" rounded="md" boxShadow="md">
      <Heading as="h3" fontSize="lg" textAlign="left">
        バーコード
      </Heading>
      <Input
        ref={inputRef}
        mt={3}
        value={barcodeInput}
        onChange={handleBarcodeChange}
        onKeyDown={(e) => handleBarcodeEnter(e)}
      />
    </Box>
  );
};

export default BarcodeReader;
