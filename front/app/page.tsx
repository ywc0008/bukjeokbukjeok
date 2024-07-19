"use client";

import NaverMap from "@/components/NaverMap";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3003/api/jobs",
    fetcher
  );

  if (error) return <div>Failed to load jobs</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Job Listings</h1>
      <ul>
        {data.map((job, index) => (
          <li key={index}>{job.title}</li>
        ))}
      </ul>
      <NaverMap />
    </main>
  );
}
