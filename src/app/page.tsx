import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Container from "./_components/Container";
import ListingCard from "./_components/ListingCard";

export default async function Home(props: { params: {}; searchParams: {} }) {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();
  console.log(props);
  return (
    <main className="">
      <Container>
        <div
          className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          {new Array(24).fill(4).map((_, idx) => (
            <ListingCard idx={idx + 1} key={idx} />
          ))}
        </div>
      </Container>
    </main>
  );
}
