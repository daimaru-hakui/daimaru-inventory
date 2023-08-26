import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import useCartStore from '../../store';
import CartCard from '../card/CartCard';

const SideCartBar = () => {

  const carts = useCartStore((state) => state.carts);
  const deleteCart = useCartStore((state) => state.deleteCart);

  const resetCarts = useCartStore((state) => state.resetCarts);
  console.log('side');
  return (
    <Box p={6} w='full' minH="calc(100vh - 100px)" maxW={500} bg='white' rounded='md' boxShadow='md'>
      {carts.map((cart, idx: number) => (
        <CartCard key={cart.id + idx} cart={cart} deleteCart={deleteCart.bind(null, idx)} />
      ))}
      <ButtonGroup w="full">
        <Button w="full" onClick={resetCarts}>キャンセル</Button>
        <Button w="full" colorScheme="linkedin">確定</Button>
      </ButtonGroup>
    </Box>
  );
};

export default SideCartBar;