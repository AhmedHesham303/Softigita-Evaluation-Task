import type { ReactNode } from "react";

interface ListItemProps {
  children: ReactNode;
}

export default function ListItem({ children }: ListItemProps) {
  return <li className="p-4 border-2 border-red w-fit">{children}</li>;
}
