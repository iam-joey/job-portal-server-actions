import JobFilterSidebar from "@/components/JobFilterSideBar";
import JobListItem from "@/components/JobListItem";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import Image from "next/image";

interface query {
  searchParams: JobFilterValues;
}

export default async function Home({
  searchParams: { location, q, remote, type },
}: query) {
  const filterValues: JobFilterValues = {
    q,
    location,
    remote,
    type,
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row ">
        <JobFilterSidebar filterValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
