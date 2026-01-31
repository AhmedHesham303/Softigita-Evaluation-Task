import { cn } from "@/lib/utils";

type ListItemProps = {
  children: React.JSX.Element;
  key: string | undefined;
  className?: string;
};
export default function ListItem({ children, key, className }: ListItemProps) {
  return (
    <li
      className={cn(
        "w-full max-w-xl p-6  rounded-xl shadow-md flex flex-col gap-2 ",
        className,
      )}
      key={key}
    >
      {children}
    </li>
  );
}
