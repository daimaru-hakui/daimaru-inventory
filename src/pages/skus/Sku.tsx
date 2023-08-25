import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Box,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

const Sku = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const getProductss = async () => {
      const { data, error } = await supabase
        .from("items")
        .select(
          `id,price,
          colors(id,color_name),
          sizes(id,size_name),
          skus(*),
          products(id,product_name,product_number)
          `
        )
        .eq("product_id", slug)
        .order("color_name", { foreignTable: "colors", ascending: false });

      if (error) {
        console.error(error);
      }
      console.log("data", data);
    };
    getProductss();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `id,product_number,product_name,
          items(id,price,
             skus(id,stock,stock_places(id,stock_place_name)),
             sizes(size_name),
             colors(color_name)
          )`
        )
        .eq("id", slug)
        .order("id", { foreignTable: "items.skus", ascending: false })
        .single();
      if (error) {
        console.error(error);
      }
      setProduct(data);
    };
    getProducts();
  }, []);

  console.log(product?.items);
  if (!product) return;

  return (
    <Container maxW={600} my={6} p={6} boxShadow="md" rounded="md" bg="white">
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />
      <Box mt={6} textAlign="left">
        <Box>{product.product_number}</Box>
        <Box>{product.product_name}</Box>
      </Box>

      <TableContainer
        mt={6}
        p={6}
        border="1px solid"
        borderColor={"gray.200"}
        rounded="md"
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th textAlign="center">カラー</Th>
              <Th textAlign="center">サイズ</Th>
              <Th textAlign="center">価格</Th>
              <Th>在庫1</Th>
              <Th>在庫2</Th>
              <Th>発注数量</Th>
            </Tr>
          </Thead>
          <Tbody>
            {product?.items.map((item: any) => (
              <Tr key={item.id}>
                <Td textAlign="center">{item.colors.color_name}</Td>
                <Td textAlign="center">{item.sizes.size_name}</Td>
                <Td textAlign="center">{item.price}</Td>
                {item.skus.map((sku: any) => (
                  <Td key={sku.id} isNumeric>
                    {sku.stock}
                  </Td>
                ))}
                <Td>
                  <NumberInput min={0} w="80px">
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Sku;
