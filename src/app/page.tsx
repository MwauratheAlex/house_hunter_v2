import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Container from "./_components/Container";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="">
      <Container>
        <p>hello child</p>
      </Container>
    </main>
  );
}
