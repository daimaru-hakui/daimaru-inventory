import { Button, Flex } from "@chakra-ui/react";
import useCartStore from "../store";

const OutInToggle = () => {
  const outInFlag = useCartStore((state) => state.outInFlag);
  const setOutInFlag = useCartStore((state) => state.setOutInFlag);

  return (
    <Flex p={3} w="full" bg="white" rounded="md" boxShadow="md" gap={3}>
      <Button
        w="full"
        colorScheme={outInFlag === "OUT" ? "linkedin" : "gray"}
        opacity={outInFlag === "OUT" ? 1 : 0.1}
        onClick={() => setOutInFlag("OUT")}
      >
        出荷
      </Button>
      <Button
        w="full"
        colorScheme={outInFlag === "IN" ? "linkedin" : "gray"}
        opacity={outInFlag === "IN" ? 1 : 0.1}
        onClick={() => setOutInFlag("IN")}
      >
        入荷
      </Button>
    </Flex>
  );
};

export default OutInToggle;
