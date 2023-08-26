import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Td, Tr } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
  item: any;
  handleNumber: (e: string, id: string) => void;
};

const ProductFormRow: FC<Props> = ({ item, handleNumber }) => {

  return (
    <Tr key={item.id}>
      <Td textAlign="center">{item.colors.color_name}</Td>
      <Td textAlign="center">{item.sizes.size_name}</Td>
      <Td textAlign="center">{item.price}</Td>
      {item.skus.map((sku: any) => (
        <React.Fragment key={sku.id}>
          <Td isNumeric>
            {sku.stock}
          </Td>
          <Td>
            <NumberInput min={0} w="80px" onChange={(e) => handleNumber(e, sku.id)} >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Td>
        </React.Fragment>
      ))}
    </Tr>
  );
};

export default ProductFormRow;