export async function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then((response) => response.json());
}
