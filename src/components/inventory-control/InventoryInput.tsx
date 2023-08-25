import { useEffect, useState } from "react";
import { Box, Flex, Select } from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";

const InventoryInput = () => {
  const [products, setProducts] = useState<any>([]);
  const [productId, setProducId] = useState("");
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `id,product_number,product_name,
              items(id,price,
                 skus(id,stock,stock_places(id,stock_place_name)),
                 sizes(size_name),
                 colors(color_name)
              )`
        )
        .order("id", { foreignTable: "items.skus", ascending: false });
      if (error) {
        console.error(error);
      }
      setProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getColors = async () => {
      const { data, error } = await supabase
        .from("items")
        .select(`id,product_id,colors(id,color_name) `)
        .eq("product_id", productId || null);
      if (error) {
        console.error(error);
        return;
      }
      setItems(
        data.map((value) => ({
          color_name: value.colors?.color_name,
          id: value.colors.id,
        }))
      );
    };
    getColors();
  }, [productId]);

  console.log(items);

  console.log(productId);
  if (products.length === 0) return;
  return (
    <Box>
      <Flex gap={6}>
        <Select
          placeholder="品番"
          onChange={(e) => setProducId(e.target.value)}
        >
          {products?.map((product: any) => (
            <option key={product.id} value={product.id}>
              {product.product_number}
            </option>
          ))}
        </Select>
        <Select placeholder="カラー">
          {items?.map((color: any, idx: number) => (
            <option key={idx} value={color.id}>
              {color.color_name}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default InventoryInput;
