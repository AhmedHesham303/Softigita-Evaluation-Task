import type { BreedsApiResponse } from "@/types/api-response";

export async function fetchBreeds(
  url: string = BASE_URL,
): Promise<BreedsApiResponse> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch dog breeds");
  }

  return response.json();
}
