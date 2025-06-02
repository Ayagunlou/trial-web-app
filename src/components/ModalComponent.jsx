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
      <ModalHeader>{textHeader}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            onAccept && onAccept();
            onClose && onClose();
          }}
        >
          I accept
        </Button>
        <Button
          color="gray"
          onClick={() => {
            onDecline && onDecline();
            onClose && onClose();
          }}
        >
          Decline
        </Button>
      </ModalFooter>
    </Modal>
  );
}
