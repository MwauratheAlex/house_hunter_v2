"use client";
import useRentModal from "~/app/hooks/useRentModal";
import Modal from "./Modal";

const RentModal = () => {
  const rentModal = useRentModal();
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={() => console.log()}
      onSubmit={() => console.log()}
      actionLabel="hello world"
      title="hello"
    />
  );
};

export default RentModal;
