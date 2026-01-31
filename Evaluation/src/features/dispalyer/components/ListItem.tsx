// import type { Breed } from "../types/breeds";

// interface ListItemProps {
//   breed: Breed;
// }

export default function ListItem({
  children,
  key,
}: {
  children: React.JSX.Element;
  key: string | undefined;
}) {
  return (
    <li
      className="w-full max-w-xl p-6  rounded-xl shadow-md flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300"
      key={key}
    >
      {children}
    </li>
  );
}
