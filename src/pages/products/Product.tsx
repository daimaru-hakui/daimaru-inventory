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
import SkuNewModal from "./ItemNewModal";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>();
  const [skus, setSkus] = useState<any>();

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

  useEffect(() => {
    const getSkus = async (slug: string = "") => {
      const { data, error } = await supabase
        .from("items")
        .select(
          `id,product_code,price,created_at,
          products(product_number,product_name),
          colors(color_name),
          sizes(size_name)`
        )
        .eq("product_id", slug);

      if (error) {
        console.error(error);
      }
      console.log("skus", data);
      setSkus(data);
    };
    getSkus(slug);
  }, [slug]);

  if (!product) return;
  if (!skus) return;

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
            <SkuNewModal slug={slug} />
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
              {skus.map((sku: any) => (
                <Tr key={sku.id}>
                  <Td>{sku.products.product_number}</Td>
                  <Td>{sku.products.product_name}</Td>
                  <Td>{sku.colors.color_name}</Td>
                  <Td>{sku.sizes.size_name}</Td>
                  <Td>{sku.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Product;
