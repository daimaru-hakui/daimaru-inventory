import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import SkuForm from "./SkuForm";

const SkuNew = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>追加</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>詳細追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SkuForm />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">登録</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SkuNew;
