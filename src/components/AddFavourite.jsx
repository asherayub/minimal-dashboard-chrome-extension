import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";

import { HiPlus } from "react-icons/hi";
import { FavouriteContext } from "./FavouriteContext";

export default function AddFavourite() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { favouriteObj, handleFavouriteInput, addToFavourite } =
    useContext(FavouriteContext);

  return (
    <Box alignSelf={"start"}>
      <Button onClick={onOpen} w={"70px"} h={"70px"} borderRadius={"50"}>
        <HiPlus />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Website Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Name to be displayed"
                name="siteName"
                value={favouriteObj.siteName}
                onChange={handleFavouriteInput}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Website URL</FormLabel>
              <Input
                placeholder="Enter URL"
                name="siteURL"
                value={favouriteObj.siteURL}
                onChange={handleFavouriteInput}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addToFavourite();
                onClose();
              }}
              isDisabled={
                favouriteObj.siteName === "" || favouriteObj.siteURL === ""
              }
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
