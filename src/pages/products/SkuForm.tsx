import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";

type Inputs = {
  color: string;
  size: string;
  price: string;
};

const SkuForm = () => {
  const [sizes, setSizes] = useState<
    { id: string; size_name: string }[] | null
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <Box as="form" mt={6} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl>
          <FormLabel fontSize="sm">カラー</FormLabel>
          <Select
            placeholder="カラー"
            {...register("color", { required: true })}
          >
            <option value="1">黒</option>
            <option value="2">赤</option>
            <option value="3">白</option>
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
            {sizes?.map((size)=>(
            <option key={size.id} value={size.id}>{size.size_name}</option>
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
