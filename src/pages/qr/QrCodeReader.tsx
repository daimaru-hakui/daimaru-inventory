import { Box, Button, Container, Flex, Input } from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { useRef, useState } from "react";

const QrCodeReader = () => {
  const controlsRef = useRef<IScannerControls | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reader, setReader] = useState<IScannerControls>();


  const startCodeReader = async () => {
    if (!videoRef.current) return;
    const codeReader = new BrowserQRCodeReader();

    const controls = await codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => {
        if (error) {
          console.log("log");
          return;
        }
        if (result) {
          console.log(result);
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
    <Layout>
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
        <Input />
      </Container>
    </Layout>
  );
};

export default QrCodeReader;
