export default function Jobs() {
  return (
    <ul>
      {data.map((job, index: number) => (
        <li key={index}>{job.title}</li>
      ))}
    </ul>
  );
}
