import { createTRPCRouter, publicProcedure } from "../trpc";
import { PropertyInput } from "~/types";

export const propertyRouter = createTRPCRouter({
  create: publicProcedure
    .input(PropertyInput)
    .mutation(async ({ ctx, input }) => {
      console.log("input: ", input);
      return {
        greeting: `Hello ${input}`,
      };
    }),
});
