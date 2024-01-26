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