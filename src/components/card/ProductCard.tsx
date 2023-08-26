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
import { FC } from "react";
import { Link } from "react-router-dom";
import PostModal from "../modal/ProductModal";

type Props = {
  product: any;
};

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Card w="full">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
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
