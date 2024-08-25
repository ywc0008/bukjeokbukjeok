import useSWR from "swr";

export function useJob() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:3003/api/jobs",
    fetcher
  );

  return { data, error, isLoading };
}
