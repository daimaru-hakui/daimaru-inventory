import { useEffect, useState } from "react";
import { format } from "date-fns";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";

const OutgoingHistory = () => {
  const [histories, setHistories] = useState<any>([]);

  useEffect(() => {
    const getIncomingHistory = async () => {
      const { data, error } = await supabase
        .from("outgoing_details")
        .select(
          `*,skus(*,items(*,products(*),sizes(*),colors(*)),stock_places(*)),outgoing_history(*)`
        )
        .order("id", { ascending: false });
      if (error) {
        console.log(error);
      }
      setHistories(data);
    };
    getIncomingHistory();
  }, []);

  return (
    <Layout>
      <Container p={6} maxW={1000} bg="white" rounded="md" boxShadow="md">
        <Box>出荷履歴</Box>
        <TableContainer mt={6}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>伝票番号</Th>
                <Th>入荷日</Th>
                <Th>品番</Th>
                <Th>商品名</Th>
                <Th>サイズ</Th>
                <Th>カラー</Th>
                <Th>価格</Th>
                <Th>数量</Th>
                <Th>合計</Th>
                <Th>出荷場所</Th>
              </Tr>
            </Thead>
            <Tbody>
              {histories.map((history: any) => (
                <Tr key={history.id}>
                  <Td>{history.outgoing_history.id}</Td>
                  <Td>
                    {format(
                      new Date(history.outgoing_history.outgoing_date_time),
                      "yyyy-MM-dd"
                    )}
                  </Td>
                  <Td>{history.skus.items.products.product_number}</Td>
                  <Td>{history.skus.items.products.product_name}</Td>
                  <Td>{history.skus.items.sizes.size_name}</Td>
                  <Td>{history.skus.items.colors.color_name}</Td>
                  <Td>{history.skus.items.price}円</Td>
                  <Td>{history.quantity}</Td>
                  <Td>{history.quantity * history.skus.items.price}円</Td>
                  <Td>{history.skus.stock_places.stock_place_name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default OutgoingHistory;
