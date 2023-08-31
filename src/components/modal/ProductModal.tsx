import { Button, useDisclosure } from '@chakra-ui/react';
import  { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import ProductForm from '../form/ProductForm';


type Props = {
  product: any;
};

const ProductModal: FC<Props> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size='sm' colorScheme='linkedin' onClick={onOpen}>選択</Button>

      <Modal size='3xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>商品</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <ProductForm product={product} onClose={onClose} />
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;