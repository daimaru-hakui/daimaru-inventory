import { FC, useEffect, useState } from 'react';
import { Card, Heading, Text, Flex, Box, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Image } from '@chakra-ui/react';
import { supabase } from '../../utils/supabaseClient';
import { FaTrashCan } from "react-icons/fa6";
import useCartStore from '../../store';

type Props = {
  cart: { id: string, quantity: number; };
  deleteCart: () => void;
};

const CartCard: FC<Props> = ({ cart, deleteCart }) => {
  const carts = useCartStore();
  const [skus, setSkus] = useState<any>();
  const [image, setImage] = useState<any | null>(null);
  const [inputData, setInputData] = useState({
    id: "",
    quantity: cart.quantity
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

  const handleNumber = (e: number, id: string) => {
    setInputData({ quantity: Number(e), id: id });
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
        alt='Caffe Latte'
      />

      <Flex justify="space-between" w="full">
        <Flex px={3} align="flex-start" justify="center" direction="column">
          <Heading size='sm'>{skus.items.products.product_number}</Heading>
          <Text py='2' fontSize={2}>
            {skus.items.products.product_name} <Box as="span" ml={3}>{skus.items.colors.color_name}</Box>
          </Text>
        </Flex>
        <Flex align="center">
          {skus.items.sizes.size_name}
        </Flex>
        <Flex gap={3} align="center">
          <Box>
            <NumberInput
              min={0}
              w="80px"
              value={inputData.quantity}
              onChange={(e) => handleNumber(Number(e), skus.id)}
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