import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { FC, useRef, useState } from "react";

type Props = {
  setDetails: (prev: any) => void;
};

export const BarcodeReader: FC<Props> = ({ setDetails }) => {
  const controlsRef = useRef<IScannerControls | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reader, setReader] = useState<IScannerControls>();

  const startCodeReader = async () => {
    if (!videoRef.current) return;
    const codeReader = new BrowserMultiFormatReader();
    // const codeReader = new BrowserQRCodeReader();

    const controls = await codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => {
        if (error) {
          console.log("log");
          return;
        }
        if (result) {
          console.log(result.getText());
          setDetails((prev: any) => [...prev, result.getText()]);
        }
        controlsRef.current?.stop();
        controlsRef.current = controls;
      }
    );
    setReader(controls);
  };

  const resetCodeReader = () => {
    if (!reader) return;
    controlsRef.current = null;
    reader.stop();
  };

  return (
    <Container maxW={600}>
      <Box
        as="video"
        id="video"
        width="100%"
        height="50vh"
        bg="black"
        ref={videoRef}
      ></Box>
      <Flex mt={3} gap={3}>
        <Button w="full" onClick={resetCodeReader}>
          Reset
        </Button>
        <Button w="full" colorScheme="linkedin" onClick={startCodeReader}>
          Start
        </Button>
      </Flex>
    </Container>
  );
};
