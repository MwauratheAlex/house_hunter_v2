"use client";
import useRentModal from "~/app/hooks/useRentModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import SelectionBox from "../Inputs/SelectionBox";
import Map from "../Map";

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
      icon: "/images/apartment-icon.svg",
    },
    {
      label: "House",
      icon: "/images/house-icon2.svg",
    },
    {
      label: "Single Room",
      icon: "/images/single-icon.svg",
    },
    {
      label: "BedSitter",
      icon: "/images/studio-icon.svg",
    },
  ];

  const categories = [
    {
      label: "For Rent",
      icon: "/images/rent-icon2.svg",
    },
    {
      label: "For Sale",
      icon: "/images/sale-icon.svg",
    },
  ];

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Are you Selling or Renting?"
        subtitle="Pick a category."
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <SelectionBox
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={(value) => setCustomValue("category", value)}
              iconSize={30}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.TYPE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of this best describes your property?"
          subtitle="Pick a type."
        />
        <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
          {houseTypes.map((item) => (
            <div key={item.label} className="col-span-1">
              <SelectionBox
                icon={item.icon}
                label={item.label}
                selected={housetype === item.label}
                onClick={(value) => setCustomValue("housetype", value)}
                iconSize={30}
              />
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
        <Map />
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
