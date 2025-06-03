"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

export function ModalComponent({
  textHeader,
  children,
  onAccept,
  onDecline,
  show,
  onClose,
}) {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader className="truncate">
        {textHeader}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            onAccept && onAccept();
            onClose && onClose();
          }}
        >
          Add to Cart
        </Button>
        <Button
          color="gray"
          onClick={() => {
            onDecline && onDecline();
            onClose && onClose();
          }}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
