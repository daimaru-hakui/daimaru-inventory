import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import ProductCard from "../../components/card/ProductCard";

const ProductList: FC = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `id,product_number,product_name,
          items(price,skus(stock,stock_places(stock_place_name)),
          colors(id,color_name),
          sizes(id,size_name))`
        )
        .filter(`items.price`, "eq", 1000);
      if (error) {
        console.error(error);
      }
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <Box maxW="full">
      <SimpleGrid columns={{ base: 1, lg: 2, "2xl": 4 }} spacing={6}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
