import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/react";
import { SmartReader } from "../../components/inventory-control/SmartReader";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import CartBar from "../../components/sidebar/CartSidebar";
import ProductList from "../products/ProductList";
import BarcodeReader from "../../components/inventory-control/barcodeReader";

const InvestoryControl = () => {
  const [details, setDetails] = useState([]);
  const [isInputFocus,setIsInputFocus] = useState(true)
  const onFocusClick = () => {
    setIsInputFocus(!isInputFocus)
  }

  return (
    <Layout>
      <Flex gap={6}>
        <Box w='full'>
          <Tabs variant="soft-rounded" colorScheme="linkedin">
            <TabList p={3} gap={6} justifyContent="center" bg='white' rounded='md' boxShadow='md'>
              <Tab>商品リスト</Tab>
              <Tab onClick={onFocusClick}>バーコード</Tab>
              <Tab>スマホSCAN</Tab>
            </TabList>
            <TabPanels mt={6}>
              <TabPanel p={0}>
                <ProductList />
              </TabPanel>
              <TabPanel p={0}>
                <BarcodeReader isInputFocus={isInputFocus} />
              </TabPanel>
              <TabPanel p={0}>
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
