"use server";
import { LoginSchema, LoginSchemaType } from "~/types";

export const login = (values: LoginSchemaType) => {
  const validatedValues = LoginSchema.safeParse(values);

  if (!validatedValues.success) return { error: "Invalid fields." };

  const { email, password } = validatedValues.data;

  console.log(validatedValues);
};
