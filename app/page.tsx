import { AllJobs } from "@/components/all-jobs";
import { SearchBar } from "@/components/search-bar";
import { getSession } from "@auth0/nextjs-auth0";
export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  return (
    <main>
      <SearchBar />
      <AllJobs />
    </main>
  );
}
