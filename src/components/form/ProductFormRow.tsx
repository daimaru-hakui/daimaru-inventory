import { Box, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Td, Tr } from '@chakra-ui/react';
import React, { FC } from 'react';
import useCartStore from '../../store';

type Props = {
  item: any;
  handleInputNumber: (e: string, id: string, stock: number) => void;
};

const ProductFormRow: FC<Props> = ({ item, handleInputNumber }) => {
  const carts = useCartStore((state) => state.carts);
  const outInFlag = useCartStore((state) => state.outInFlag);

  const getQuantity = (id: string) => {
    const result = carts.find((cart) => (
      cart.id === id
    ));
    return result?.quantity || 0;
  };


  return (
    <Tr key={item.id}>
      <Td textAlign="center">{item.colors.color_name}</Td>
      <Td textAlign="center">{item.sizes.size_name}</Td>
      <Td textAlign="center">{item.price}円</Td>
      {item.skus.map((sku: any) => (
        <React.Fragment key={sku.id}>
          <Td isNumeric>
            {sku.stock}
          </Td>
          <Td>
            {getQuantity(sku.id) ? <Box py={2}>選択済み</Box> : (
              <NumberInput
                min={0}
                max={outInFlag === "OUT" ? sku.stock : 10000}
                w="80px"
                defaultValue={getQuantity(sku.id)}
                onChange={(e) => handleInputNumber(e, sku.id, sku.stock)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          </Td>
        </React.Fragment>
      ))}
    </Tr>
  );
};

export default ProductFormRow;