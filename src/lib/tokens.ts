import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { verificationTokens } from "~/server/db/schema";

export const generateVerificationToken = async (email: string) => {
  const existingToken = await db.query.verificationTokens.findMany({
    where: (verificationToken, { eq }) => eq(verificationToken.email, email),
  });

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.email, email));
  }

  const token = createId();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  await db.insert(verificationTokens).values({
    token,
    expires,
    email,
  });

  return token;
};
