import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";
import { BarcodeReader } from "../../components/inventory-control/barcodeReader";
import { useState } from "react";
import InventoryInput from "../../components/inventory-control/InventoryInput";
import Layout from "../../components/Layout/Layout";
import CartBar from "../../components/sidebar/SideCartBar";
import ProductList from "../products/ProductList";

const InvestoryControl = () => {
  const [details, setDetails] = useState([]);
  return (
    <Layout>

      <Flex gap={6}>
        <Box w='full'>
          <Tabs variant="soft-rounded" colorScheme="linkedin">
            <TabList p={3} gap={3} justifyContent="center" bg='white' rounded='md' boxShadow='md'>
              <Tab>商品リスト</Tab>
              <Tab>SCAN</Tab>
              <Tab>入力フォーム</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <ProductList />
              </TabPanel>
              <TabPanel>
                <BarcodeReader setDetails={setDetails} />
              </TabPanel>
              <TabPanel>
                <InventoryInput />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box>
            {details.map((detail) => (
              <Box key={detail}>{detail}</Box>
            ))}
          </Box>
        </Box>
        <CartBar />
      </Flex>
    </Layout>
  );
};

export default InvestoryControl;
