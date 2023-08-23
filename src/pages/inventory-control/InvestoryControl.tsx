import { Box } from "@chakra-ui/react";
import { BarcodeReader } from "../../components/inventory-control/barcodeReader";
import { useState } from "react";

const InvestoryControl = () => {
  const [details, setDetails] = useState([]);
  return (
    <Box>
      <BarcodeReader setDetails={setDetails} />
      <Box>
        {details.map((detail) => (
          <Box key={detail}>{detail}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default InvestoryControl;
