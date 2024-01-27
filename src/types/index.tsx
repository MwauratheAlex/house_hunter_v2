import { z } from "zod";

export const PropertyInput = z.object({
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  price: z.number(),
  category: z.string(),
  roomCount: z.number(),
  type: z.string(),
  amenities: z.array(z.string()),
});

export type PropertyInputType = z.infer<typeof PropertyInput>;

export type PropertyKeys = keyof PropertyInputType;

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
});

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

export type RegisterUserSchemaKeys = keyof RegisterUserSchemaType;
