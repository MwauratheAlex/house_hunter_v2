"use client";
import useRentModal from "~/app/hooks/useRentModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";

enum STEPS {
  CATEGORY = 0,
  TYPE = 1,
  LOCATION = 2,
  INFO = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      housetype: "",
      imageSrc: "",
      location: "",
      price: 0,
      category: "",
      roomcount: 0,
    },
  });

  const title = watch("title");
  const description = watch("description");
  const imageSrc = watch("imageSrc");
  const location = watch("location");
  const price = watch("price");
  const category = watch("category");
  const roomcount = watch("roomcount");
  const housetype = watch("housetype");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = () => {
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);
    console.log({
      title,
      description,
      imageSrc,
      location,
      price,
      category,
      roomcount,
    });
    setTimeout(() => console.log("submitted"), 1000);

    setIsLoading(false);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const houseTypes = [
    {
      label: "Apartment",
      icon: "apartment",
    },
    {
      label: "House",
      icon: "house",
    },
    {
      label: "Single Room",
      icon: "room",
    },
    {
      label: "BedSitter",
      icon: "studio",
    },
  ];

  const categories = [
    {
      label: "Rent",
      icon: "rent",
    },
    {
      label: "Sell",
      icon: "sell",
    },
  ];

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Are you Selling or Renting?"
        subtitle="Pick a category."
      />
      <div>
        {categories.map((housetype) => (
          <div
            onClick={() => setCustomValue("housetype", housetype.label)}
            className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2"
          >
            <div>{housetype.label}</div>
            <div>{housetype.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.TYPE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of this best describes your place?"
          subtitle="Pick a type."
        />
        <div>
          {houseTypes.map((housetype) => (
            <div
              onClick={() => setCustomValue("housetype", housetype.label)}
              className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2"
            >
              <div>{housetype.label}</div>
              <div>{housetype.icon}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div>
        <Heading
          title="Help clients find you."
          subtitle="Where is your property located?"
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tell us more about your property"
          subtitle="What facilities does it have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div>
        <Heading
          title="Add a photo of your place."
          subtitle="Let client see how it looks like."
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div>
        <Heading
          title="Describe your place."
          subtitle="Make it short and sweet."
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div>
        <Heading
          title="Finally, let's set the price"
          subtitle="What are your monthly charges?"
        />
      </div>
    );
  }
  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="List your property"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
