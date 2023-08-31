import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC ,useEffect,useState} from "react";
import { Link } from "react-router-dom";
import PostModal from "../modal/ProductModal";
import { supabase } from "../../utils/supabaseClient";

type Props = {
  product: any;
};

const ProductCard: FC<Props> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const getImage = async (files: string[] = []) => {
      if (!files) return;
      const { data, error } = await supabase.storage
        .from("items")
        .createSignedUrl(files[0], 600);
      if (error) return;
      setImageUrl(data?.signedUrl);
    };
    if (product?.images)
      getImage(product.images);
  }, [product]);

  return (
    <Card w="full">
      <CardBody>
        <Image
          src={imageUrl}
          alt={product.product_number}
          borderRadius="lg"
          width="full"
          height={250}
          objectFit="cover"
        />
        <Stack mt="6" spacing="3" textAlign="left">
          <Heading size="md">{product.product_number}</Heading>
          <Text>{product.product_name}</Text>
        </Stack>
      </CardBody>
      <Divider color="gray.300" />
      <CardFooter>
        <Flex gap={3}>
          <PostModal product={product} />
          {/* <Link to={`/skus/${product.id}`}>
            <Button size='sm' variant="solid" colorScheme="blue">
              選択
            </Button>
          </Link> */}
          <Link to={`/products/${product.id}`}>
            <Button size='sm' variant="ghost" colorScheme="blue">
              詳細
            </Button>
          </Link>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
