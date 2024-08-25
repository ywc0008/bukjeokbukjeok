"use client";

import KaKaoMap from "@/components/KaKaoMap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <h1>북적북적</h1>
        <h2>전북대 구인구직 지도맵</h2>
        <section>
          <KaKaoMap />
        </section>
      </div>
    </main>
  );
}
