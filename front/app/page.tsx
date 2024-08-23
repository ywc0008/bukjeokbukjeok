"use client";

import useSWR from "swr";
import NaverMap from "@/components/NaverMap";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3003/api/jobs",
    fetcher
  );
  if (data && Array.isArray(data)) {
    console.log(data[0]);
  }

  if (error) return <div>Failed to load jobs</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>북적북적</h1>
        <h2>전북대 구인구직 지도맵</h2>
      </div>

      {/* <NaverMap data={data} /> */}
    </main>
  );
}
