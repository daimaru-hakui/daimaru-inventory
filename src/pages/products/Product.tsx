import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import SkuNew from "./SkuNew";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const getProduct = async (slug: string = "") => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", slug)
        .single();

      if (error) {
        console.error(error);
      }
      console.log(data);
      setProduct(data);
    };
    getProduct(slug);
  }, [slug]);

  if (!product) return;

  return (
    <Layout>
      <Container maxW={600}>
        <Heading as="h1">商品詳細</Heading>
        <Stack spacing={6}>
          <Flex>
            <Box>品番</Box>
            <Box>{product.product_number}</Box>
          </Flex>
          <Flex>
            <Box>品名</Box>
            <Box>{product.product_name}</Box>
          </Flex>
          <Flex>
            <SkuNew />
          </Flex>
        </Stack>
        <TableContainer mt={6}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>品番</Th>
                <Th>品名</Th>
                <Th>カラー</Th>
                <Th>サイズ</Th>
                <Th>価格</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>SP110</Td>
                <Td>コックコート</Td>
                <Td>白</Td>
                <Td>S</Td>
                <Td>1500</Td>
              </Tr>
              <Tr>
                <Td>SP110</Td>
                <Td>コックコート</Td>
                <Td>白</Td>
                <Td>M</Td>
                <Td>1500</Td>
              </Tr>
              {/* {sku.map((product: any) => (
                <Tr key={product.id}>
                  <Td>{product.product_number}</Td>
                  <Td>{product.product_name}</Td>
                </Tr>
              ))} */}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Product;
