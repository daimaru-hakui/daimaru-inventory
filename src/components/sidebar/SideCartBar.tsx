import { Box, Button, Flex } from '@chakra-ui/react';
import useCartStore from '../../store';
import CartCard from '../card/CartCard';
import { supabase } from '../../utils/supabaseClient';

const SideCartBar = () => {

  const carts = useCartStore((state) => state.carts);
  const deleteCart = useCartStore((state) => state.deleteCart);
  const resetCarts = useCartStore((state) => state.resetCarts);
  const outInFlag = useCartStore((state) => state.outInFlag);
  const setOutInFlag = useCartStore((state) => state.setOutInFlag);

  const updateOutSkus = async (carts: any) => {
    carts.map(async (cart: any) => {
      const { error } = await supabase.from('skus').update([{
        stock: cart.stock - cart.quantity
      }]).eq('id', cart.id);
      if (error) console.log(error);
    });
    resetCarts();
  };

  const updateInSkus = async (carts: any) => {
    carts.map(async (cart: any) => {
      const { error } = await supabase.from('skus').update([{
        stock: cart.stock + cart.quantity
      }]).eq('id', cart.id);
      if (error) console.log(error);
    });
    resetCarts();
  };

  return (
    <Box w='full' minH="calc(100vh - 100px)" maxW={500} >
      <Flex p={3} w="full" bg='white' rounded='md' boxShadow='md' gap={3}>
        <Button
          w="full"
          colorScheme={outInFlag ? "linkedin" : "gray"}
          opacity={outInFlag ? 1 : 0.1}
          onClick={() => setOutInFlag(true)}
        >
          出荷
        </Button>
        <Button
          w="full"
          colorScheme={!outInFlag ? "linkedin" : "gray"}
          opacity={!outInFlag ? 1 : 0.1}
          onClick={() => setOutInFlag(false)}
        >
          入荷
        </Button>
      </Flex>

      <Box mt={6} p={3} bg='white' rounded='md' boxShadow='md'>
        {carts.map((cart, idx: number) => (
          <CartCard key={cart.id + idx} cart={cart} deleteCart={deleteCart.bind(null, idx)} />
        ))}
        <Flex w="full" gap={3}>
          <Button w="full" onClick={resetCarts}>キャンセル</Button>
          <Button w="full" colorScheme="linkedin" onClick={
            outInFlag ? () => updateOutSkus(carts) : () => updateInSkus(carts)}>確定</Button>
        </Flex>
      </Box>
    </Box >
  );
};

export default SideCartBar;