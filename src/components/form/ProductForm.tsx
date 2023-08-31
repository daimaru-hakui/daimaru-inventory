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
  stock: number;
}[];

const ProductForm: FC<Props> = ({ product, onClose }) => {
  const [items, setItems] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [inputData, setInputData] = useState<Inputs>([]);
  const setCarts = useCartStore((state) => state.setCarts);


  const handleInputNumber = (e: string, id: string, stock: number) => {
    const value = Number(e);
    setInputData((prev) => {
      const newArray = prev.filter((obj) => (obj.id !== id));
      return [...newArray, { id, quantity: value, stock }];
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
        .order("color_name", { foreignTable: "colors", ascending: false })
        .order("stock_place_id", { foreignTable: "skus", ascending: true });

      if (error) {
        console.error(error);
      }
      setItems(data);
    };
    getItems();
  }, [product.id]);

  useEffect(() => {
    const getImage = async (files: string[] = []) => {
      if (!files) return;
      const { data, error } = await supabase.storage
        .from("items")
        .createSignedUrl(files[0], 600);
      if (error) return;
      if(data) {
        setImageUrl(data?.signedUrl);
      }
    };
    if (product?.images)
      getImage(product.images);
  }, [product]);

  if (!product) return;

  return (
    <Box px={6}>
      <Image
        src={imageUrl}
        alt={product.product_number}
        borderRadius="lg"
        w={200}
        h={200}
        objectFit="cover"
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
                <Th>配送センター</Th>
                <Th>発注数量</Th>
                <Th>徳島工場</Th>
                <Th>発注数量</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items?.map((item: any, idx: number) => (
                <ProductFormRow key={idx} item={item} handleInputNumber={handleInputNumber} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box w='full' mt={6}>
          <Button w='full' colorScheme="linkedin" type='submit'>登録</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
