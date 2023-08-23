import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";

const Skus = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase.from("products").select(
        `id,product_number,product_name,
          items(id,price,skus(id,stock,stock_places(id,stock_place_name)),
          sizes(size_name))`
      );
      if (error) {
        console.error(error);
      }
      setProducts(data);
    };
    getProducts();
  }, []);
  console.log(products);
  return (
    <Layout>
      <Container>
        <Box>SKUS</Box>
        <TableContainer maxW={600}>
          {products.map(({ id, items, product_name, product_number }: any) => (
            <Table key={id} variant='simple' rounded="lg" bg="whiteAlpha.100">
              <Tbody>
                <Tr>
                  <Td>
                    {product_name}
                    {product_number}
                  </Td>
                  {items.map(({ id, sizes }: any) => (
                    <Td key={id}>{sizes.size_name}</Td>
                  ))}
                </Tr>
                <Tr>
                  <Th>単価</Th>
                  {items.map(({ id, price }: any) => (
                    <Td key={id}>{price}円</Td>
                  ))}
                </Tr>
                {items.map(({ skus }: any, idx: number) => (
                  <Tr key={idx}>
                    {idx === 0 && <Th>配送センター在庫</Th>}
                    {idx === 1 && <Th>徳島工場在庫</Th>}
                    {skus.map(({ stock }: any, idx: number) => (
                      <Td key={idx}>{stock}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ))}
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Skus;
