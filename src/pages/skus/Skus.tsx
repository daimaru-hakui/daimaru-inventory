import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Thead,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import Layout from "../../components/Layout/Layout";

const Skus = () => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("items")
        .select(
          `
        id,price,product_code,
        products(id,product_number,product_name),
        colors(id,color_name),
        sizes(id,size_name),
        skus(id,stock,stock_places(id,stock_place_name))`
        )
        .order("product_code", { ascending: true })
        .order("stock_place_id", { foreignTable: "skus", ascending: true });
      if (error) {
        console.error(error);
      }
      setItems(data);
    };
    getProducts();
  }, []);
  console.log(items);
  return (
    <Layout>
      <Container p={6} maxW={900} bg="white" rounded="md" boxShadow="md">
        <Box>在庫一覧</Box>
        <TableContainer mt={6}>
          <Table>
            <Thead>
              <Tr>
                <Th>品番</Th>
                <Th>商品名</Th>
                <Th>サイズ</Th>
                <Th>カラー</Th>
                <Th>価格</Th>
                <Th>配送センター</Th>
                <Th>徳島工場</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item: any) => (
                <Tr key={item.id}>
                  <Td>{item.products.product_number}</Td>
                  <Td>{item.products.product_name}</Td>
                  <Td>{item.sizes.size_name}</Td>
                  <Td>{item.colors.color_name}</Td>
                  <Td isNumeric>{item.price}円</Td>
                  {item.skus.map((sku: any) => (
                    <Td key={sku.id} isNumeric>{sku.stock}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Skus;
