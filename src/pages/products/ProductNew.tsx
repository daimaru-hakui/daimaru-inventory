import { FC } from "react";
import Layout from "../../components/Layout/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  Stack,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";

type Inputs = {
  productNumber: string;
  productName: string;
  category: string;
};

const ProductNew: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
    await addProduct(data);
  };

  const addProduct = async (data: Inputs) => {
    const { data: product, error } = await supabase
      .from("products")
      .insert([
        { product_number: data.productNumber, product_name: data.productName },
      ]);

    if (error) {
      console.error(error);
    }
    console.log(product);
  };

  return (
    <Layout>
      <Container>
        <Heading as="h1">商品登録</Heading>
        <Box as="form" mt={6} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <FormControl>
              <FormLabel fontSize="sm">品番</FormLabel>
              <Input
                type="text"
                {...register("productNumber", { required: true })}
              />
              {errors.productNumber && (
                <Box color="red" fontSize="sm" textAlign="left">
                  品番を入力してください。
                </Box>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">品名</FormLabel>
              <Input
                type="text"
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <Box color="red" fontSize="sm" textAlign="left">
                  品番を入力してください。
                </Box>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">カテゴリー</FormLabel>
              <Select
                placeholder="カテゴリー"
                {...register("category", { required: true })}
              >
                <option value="option1">上着</option>
                <option value="option2">パンツ</option>
                <option value="option3">帽子</option>
              </Select>
            </FormControl>
            <Button mt={6} type="submit" colorScheme="linkedin">
              送信
            </Button>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};

export default ProductNew;
