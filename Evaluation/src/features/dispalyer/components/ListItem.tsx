import type { Breed } from "../types/breeds";

interface ListItemProps {
  breed: Breed;
}

export default function ListItem({ breed }: ListItemProps) {
  const name = breed.attributes?.name;
  const description = breed.attributes?.description;
  return (
    <li className="w-full max-w-xl p-6  rounded-xl shadow-md flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </li>
  );
}
