"use client";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export function AlertMessage({ type, msg }) {
  return (
    <Alert color={type} icon={HiInformationCircle}>
      <span className="font-medium">{msg}</span>
    </Alert>
  );
}
