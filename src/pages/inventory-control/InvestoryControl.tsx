import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Container } from "@chakra-ui/react";
import { BarcodeReader } from "../../components/inventory-control/barcodeReader";
import { useState } from "react";
import InventoryInput from "../../components/inventory-control/InventoryInput";

const InvestoryControl = () => {
  const [details, setDetails] = useState([]);
  return (
    <Container maxW={600} my={6} p={6} boxShadow="md" rounded="md" bg="white">
      <Tabs variant="soft-rounded" colorScheme="linkedin">
        <TabList gap={3} justifyContent="center">
          <Tab>SCAN</Tab>
          <Tab>入力フォーム</Tab>
        </TabList>

        <TabPanels>
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
    </Container>
  );
};

export default InvestoryControl;
