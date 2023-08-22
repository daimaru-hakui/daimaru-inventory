import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Button,
} from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import { FC, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Link } from "react-router-dom";

const Products: FC = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error(error);
      }
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <Layout>
      <Container maxW="600px">
        <TableContainer>
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
                  <Td><Link to={`/products/${product.id}`}><Button>詳細</Button></Link></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Products;
