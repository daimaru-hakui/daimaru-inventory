import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";
import { SmartReader } from "../../components/inventory-control/SmartReader";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import CartBar from "../../components/sidebar/SideCartBar";
import ProductList from "../products/ProductList";
import BarcodeReader from "../../components/inventory-control/BarcodeReader";

const InvestoryControl = () => {
  const [details, setDetails] = useState([]);
  return (
    <Layout>
      <Flex gap={6}>
        <Box w='full'>
          <Tabs variant="soft-rounded" colorScheme="linkedin">
            <TabList p={3} gap={6} justifyContent="center" bg='white' rounded='md' boxShadow='md'>
              <Tab>商品リスト</Tab>
              <Tab>バーコード</Tab>
              <Tab>スマホSCAN</Tab>
            </TabList>

            <TabPanels mt={6}>
              <TabPanel p={0}>
                <ProductList />
              </TabPanel>
              <TabPanel p={0}>
                <BarcodeReader />
              </TabPanel>
              <TabPanel>
                <SmartReader setDetails={setDetails} />
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
