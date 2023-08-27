import { FC, useEffect, useState } from 'react';
import { Card, Heading, Text, Flex, Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image } from '@chakra-ui/react';
import { supabase } from '../../utils/supabaseClient';
import { FaTrashCan } from "react-icons/fa6";
import useCartStore from '../../store';

type Props = {
  cart: { id: string, quantity: number; stock: number; };
  deleteCart: () => void;
};

const CartCard: FC<Props> = ({ cart, deleteCart }) => {
  const carts = useCartStore((state) => state.carts);
  const updateCarts = useCartStore((state) => state.updateCarts);
  const outInFlag = useCartStore((state) => state.outInFlag);
  const [skus, setSkus] = useState<any>();
  const [image, setImage] = useState<any | null>(null);
  const [inputData, setInputData] = useState({
    id: "",
    quantity: cart.quantity,
    stock: cart.stock
  });

  useEffect(() => {
    const getItem = async () => {
      const { data, error } = await supabase.from('skus')
        .select(`*,items(products(*),sizes(size_name),colors(color_name))`)
        .eq('id', cart.id)
        .single();
      if (error) {
        console.log(error);
      }
      setSkus(data);
    };
    getItem();
  }, [cart.id, carts]);

  useEffect(() => {
    const getImage = async (files: string[] = []) => {
      if (!files) return;
      const { data, error } = await supabase.storage
        .from("items")
        .createSignedUrl(files[0], 600);
      if (error) return;
      setImage(data?.signedUrl);
    };
    if (skus?.items?.products?.images)
      getImage(skus.items.products.images);
  }, [skus]);

  const handleNumber = (e: number, id: string, stock: number) => {
    setInputData({ quantity: Number(e), id: id, stock });
    updateCarts({ quantity: Number(e), id: id, stock });
  };

  if (!skus) return;

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      mb={3}
      boxShadow="sm"
    >
      <Image
        objectFit='cover'
        w="80px"
        h="80px"
        mr={1}
        src={image}
        alt=''
      />

      <Flex justify="space-between" w="full">
        <Flex px={3} align="flex-start" justify="center" direction="column" gap={1}>
          <Heading size='sm'>{skus.items.products.product_number}
            <Box as="span" ml={6}>{skus.items.sizes.size_name}</Box>
          </Heading>
          <Text fontSize={2}>
            {skus.items.products.product_name} <Box as="span" ml={3}>{skus.items.colors.color_name}</Box>
          </Text>
        </Flex>
        <Flex align="center">
          <Box>
            <Box fontSize="xs">在庫数</Box>
            <Box>{skus.stock}</Box>
          </Box>
        </Flex>

        <Flex gap={3} align="center">
          <Box>
            <NumberInput
              w="80px"
              min={0}
              max={outInFlag ? skus.stock : 10000}
              value={inputData.quantity}
              onChange={(e) => handleNumber(Number(e), skus.id, skus.stock)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box w={7}><FaTrashCan cursor="pointer" onClick={deleteCart} /></Box>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CartCard;