import {
  // Table,
  // Thead,
  // Tbody,
  // Tr,
  // Th,
  // Td,
  // TableContainer,
  // Button,
  Container,
  Flex,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
// import { Link } from "react-router-dom";
import ProductCard from "../../components/card/ProductCard";
import Layout from "../../components/Layout/Layout";

const Products: FC = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `id,product_number,product_name,
          items(price,skus(stock,stock_places(stock_place_name)),
          colors(id,color_name),
          sizes(id,size_name))`
        )
        .filter(`items.price`, "eq", 1000);
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
      <Container maxW="830px">
        <Flex gap={6} flexWrap="wrap" justify="center">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Flex>
        {/* <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>品番</Th>
                <Th>品名</Th>
                <Th>詳細</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product: any) => (
                <Tr key={product.id}>
                  <Td>{product.product_number}</Td>
                  <Td>{product.product_name}</Td>
                  <Td>
                    <Link to={`/products/${product.id}`}>
                      <Button>詳細</Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer> */}
      </Container>
    </Layout>
  );
};

export default Products;
