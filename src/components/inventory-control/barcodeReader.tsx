import { Box, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import useCartStore from '../../store';

const BarcodeReader = () => {
  const [skus, setSkus] = useState<any>([]);
  const carts = useCartStore((state) => state.carts);
  const setCarts = useCartStore((state) => state.setCarts);
  const [barcodeInput, setBarcodeInput] = useState("");

  useEffect(() => {
    const getSkus = async () => {
      const { data, error } = await supabase.from('skus').select('*');
      if (error) console.log(error);
      setSkus(data);
    };
    getSkus();
  }, []);

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcodeInput(e.target.value);

  };
  const handleBarcodeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      const sku = skus.find((sku: any) => sku.id === barcodeInput);
      setBarcodeInput("");
      if (!sku) return;
      const result = carts.find((cart) => cart.id === sku.id);
      if (result) return;
      setCarts([{ id: barcodeInput, stock: sku.stock, quantity: 1 }]);
    }
  };

  return (
    <Box p={6} bg='white' rounded="md" boxShadow="md">
      <Heading as="h3" fontSize="lg" textAlign="left">バーコード</Heading>
      <Input mt={3} value={barcodeInput} onChange={handleBarcodeChange} onKeyDown={(e) => handleBarcodeEnter(e)} />
    </Box>
  );
};

export default BarcodeReader;