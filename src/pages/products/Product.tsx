import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Image,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";
import SkuNewModal from "./ItemNewModal";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>();
  const [skus, setSkus] = useState<any>();
  const [image, setImage] = useState<any>();

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
      setProduct(data);
      await getImage(data?.images);
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
      setSkus(data);
    };
    getSkus(slug);
  }, [slug]);

  const getImage = async (files: string[]) => {
    const { data, error } = await supabase.storage
      .from("items")
      .createSignedUrl(files[0], 600);
    if (error) return;
    setImage(data?.signedUrl);
  };

  if (!product) return;
  if (!skus) return;

  return (
    <Container maxW={600} my={6} p={6} boxShadow="md" rounded="md" bg="white">
      <Heading as="h1">商品詳細</Heading>
      {image && (
        <Image
          mt={6}
          w="full"
          objectFit="cover"
          src={image || null}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
      )}
      <Flex mt={6} gap={3}>
        <Box fontWeight="bold">品番</Box>
        <Box>{product.product_number}</Box>
      </Flex>
      <Flex mt={1} gap={3}>
        <Box fontWeight="bold">品名</Box>
        <Box>{product.product_name}</Box>
      </Flex>
      <Flex mt={6} justify="center">
        <SkuNewModal slug={slug} />
      </Flex>

      <TableContainer mt={12}>
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
  );
};

export default Product;
