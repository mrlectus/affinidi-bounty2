import { AllJobs } from "@/components/all-jobs";
import { SearchBar } from "@/components/search-bar";
export default async function Home() {
  return (
    <main>
      <SearchBar />
      <AllJobs />
    </main>
  );
}
