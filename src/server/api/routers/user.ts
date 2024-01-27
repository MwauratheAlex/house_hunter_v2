import { createTRPCRouter, publicProcedure } from "../trpc";
import { RegisterUserSchema } from "~/types";
import bcrypt from "bcryptjs";
import { users, verificationTokens } from "~/server/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { sendVerificationEmail } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(RegisterUserSchema)
    .mutation(async ({ ctx, input }) => {
      const validatedValues = RegisterUserSchema.safeParse(input);

      if (!validatedValues.success) {
        return { error: "Invalid values." };
      }
      const { name, email, password } = validatedValues.data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      });

      if (user) {
        return { error: "Email already in use." };
      }

      const userId = createId();

      await ctx.db.insert(users).values({
        id: userId,
        name,
        email,
        hashedPassword,
      });

      //   verification
      const token = await generateVerificationToken(email);

      // send email
      await sendVerificationEmail(email, token);

      return { success: "Email sent for verification" };
    }),
});
