import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
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
  const [categories, setCategories] = useState<
    { id: string; category_name: string }[] | null
  >([]);
  const [fileUpload, setFileUpload] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const images = await addImages(fileUpload);
    console.log(images)
    await addProduct(data, images);
  };

  const addProduct = async (data: Inputs, images: string[] = []) => {
    const { data: product, error } = await supabase.from("products").insert([
      {
        product_number: data.productNumber,
        product_name: data.productName,
        category_id: data.category,
        images,
      },
    ]);

    if (error) {
      console.error(error);
      alert("登録に失敗しました。");
    }
    console.log(product);
  };

  const addImages = async (fileUpload: File[]) => {
    if (fileUpload?.length === 0) return;
    const fileArray = fileUpload.map(async (file) => {
      const uuid = uuidv4();
      const { data, error } = await supabase.storage
      .from("items")
      .upload(uuid, file, {
        cacheControl: "3600",
        upsert: false,
      });
      console.log("data",data)
      if (error) return;
      return data?.path;
    });
    return await pathArray(fileArray);
  };

  const pathArray = async (fileArray: any) => {
    const imageArray = [];
    for (const file of fileArray) {
      imageArray.push(await file);
    }
    return imageArray;
  };

  const addPreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files: FileList | null = e.target.files;
    if (!files) return;
    setFileUpload((prev: File[]) => [...prev, files[0]]);
  };

  useEffect(() => {
    const getColors = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`id,category_name`);
      if (error) {
        console.error(error);
      }
      setCategories(data);
    };
    getColors();
  }, []);

  return (
    <Container p={6} maxW={600} bg="white" rounded="md" boxShadow="md">
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
              {categories?.map(({ id, category_name }) => (
                <option key={id} value={id}>
                  {category_name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm">画像</FormLabel>
            <Input type="file" onChange={addPreviewImage} />
          </FormControl>
          <Button mt={6} type="submit" colorScheme="linkedin">
            送信
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProductNew;
