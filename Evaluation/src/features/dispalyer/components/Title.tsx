import { cn } from "@/lib/utils";

export default function Title({
  titleText,
  titleClassName,
}: {
  titleText: string;
  titleClassName?: string;
}) {
  return (
    <h1 className={cn("text-4xl font-bold max-sm:text-3xl", titleClassName)}>
      {titleText}
    </h1>
  );
}
