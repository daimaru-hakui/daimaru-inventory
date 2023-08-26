import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, FC } from "react";
import { supabase } from "../../utils/supabaseClient";
import useCartStore from "../../store";
import ProductFormRow from "./ProductFormRow";

type Props = {
  product: any;
  onClose: () => void;
};

type Inputs = {
  id: string;
  quantity: number;
}[];

const ProductForm: FC<Props> = ({ product, onClose }) => {
  const [items, setItems] = useState<any>();
  const [inputData, setInputData] = useState<Inputs>([]);
  const setCarts = useCartStore((state) => state.setCarts);


  const handleNumber = (e: string, id: string) => {
    const value = Number(e);
    setInputData((prev) => {
      const newArray = prev.filter((obj) => (obj.id !== id));
      return [...newArray, { id, quantity: value }];
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCarts(inputData);
    onClose();
  };


  useEffect(() => {
    const getItems = async () => {
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
        .eq("product_id", product.id)
        .order("color_name", { foreignTable: "colors", ascending: false });

      if (error) {
        console.error(error);
      }
      setItems(data);
    };
    getItems();
  }, [product.id]);

  if (!product) return;

  return (
    <Box px={6}>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />
      <Box mt={6} textAlign="left">
        <Box>{product.product_number}</Box>
        <Box>{product.product_name}</Box>
      </Box>

      <form onSubmit={handleSubmit}>
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
                <Th>発注数量</Th>
                <Th>在庫2</Th>
                <Th>発注数量</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items?.map((item: any, idx: number) => (
                <ProductFormRow key={idx} item={item} handleNumber={handleNumber} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box w='full' mt={6}>
          <Button w='full' colorScheme="linkedin" type='submit'>確定</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
