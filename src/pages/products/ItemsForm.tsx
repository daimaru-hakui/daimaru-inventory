import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  //   Input,
  Select,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";

type Inputs = {
  slug: string;
  productCode: string;
  color: string;
  size: string;
  price: string;
};

type Props = {
  slug: string | undefined;
};

const SkuForm: FC<Props> = ({ slug }) => {
  const [sizes, setSizes] = useState<
    { id: string; size_name: string }[] | null
  >([]);
  const [colors, setColors] = useState<
    { id: string; color_name: string }[] | null
  >([]);

  useEffect(() => {
    const getSizes = async () => {
      const { data, error } = await supabase
        .from("sizes")
        .select(`id,size_name`);
      if (error) {
        console.error(error);
      }
      setSizes(data);
    };
    getSizes();
  }, []);

  useEffect(() => {
    const getColors = async () => {
      const { data, error } = await supabase
        .from("colors")
        .select(`id,color_name`);
      if (error) {
        console.error(error);
      }
      setColors(data);
    };
    getColors();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
    await addItem(data);
    // location.reload();
  };

  const addItem = async (data: Inputs) => {
    const { data: stockPlaces } = await supabase
      .from("stock_places")
      .select("id");

    const { data: item, error } = await supabase
      .from("items")
      .insert([
        {
          product_id: slug,
          product_code: data.productCode,
          color_id: data.color,
          size_id: data.size,
          price: data.price,
        },
      ])
      .select()
      .single();
    if (error) {
      console.error(error);
      return;
    }

    const { data: sku, error: skuError } = await supabase.from("skus").upsert(
      stockPlaces?.map((place) => ({
        stock_place_id: place.id,
        item_id: item.id,
        stock: 0,
      }))
    );
    console.log(sku);
    console.log("error", skuError);
  };

  return (
    <Box as="form" mt={6} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl>
          <FormLabel fontSize="sm">商品コード</FormLabel>
          <Input {...register("productCode")} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">カラー</FormLabel>
          <Select
            placeholder="カラー"
            {...register("color", { required: true })}
          >
            {colors?.map(({ id, color_name }) => (
              <option key={id} value={id}>
                {color_name}
              </option>
            ))}
          </Select>
          {errors.color && (
            <Box color="red" fontSize="sm" textAlign="left">
              カラーを選択してください。
            </Box>
          )}
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">サイズ</FormLabel>
          <Select
            placeholder="サイズ"
            {...register("size", { required: true })}
          >
            {sizes?.map(({ id, size_name }) => (
              <option key={id} value={id}>
                {size_name}
              </option>
            ))}
          </Select>
          {errors.size && (
            <Box color="red" fontSize="sm" textAlign="left">
              サイズを選択してください。
            </Box>
          )}
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">価格</FormLabel>
          <NumberInput>
            <NumberInputField {...register("price", { required: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.price && (
            <Box color="red" fontSize="sm" textAlign="left">
              価格を入力してください。
            </Box>
          )}
        </FormControl>
        <Button mt={6} type="submit" colorScheme="linkedin">
          送信
        </Button>
      </Stack>
    </Box>
  );
};

export default SkuForm;
