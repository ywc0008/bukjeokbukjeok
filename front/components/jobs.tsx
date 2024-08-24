import useSWR from "swr";

export default function Jobs() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
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
    <ul>
      {data.map((job: any, index: number) => (
        <li key={index}>{job.title}</li>
      ))}
    </ul>
  );
}
