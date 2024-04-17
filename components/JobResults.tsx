import React from "react";
import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

async function JobResults({
  filterValues: { q, location, remote, type },
}: {
  filterValues: JobFilterValues;
}) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" | ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: {
              search: searchString,
            },
            companyName: {
              search: searchString,
            },
            type: {
              search: searchString,
            },
            description: {
              search: searchString,
            },
            location: {
              search: searchString,
            },
            locationType: {
              search: searchString,
            },
          },
        ],
      }
    : {};
  const data: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      {
        approved: true,
      },
    ],
  };
  const jobs = await prisma.job.findMany({
    where: data,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4 grow">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}

export default JobResults;
