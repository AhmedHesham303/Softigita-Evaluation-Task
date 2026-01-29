import { cn } from "@/lib/utils";

export default function Content({
  contentText,
  contentClassName,
}: {
  contentText: string;
  contentClassName?: string;
}) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold text-wrap max-sm:text-xl",
        contentClassName,
      )}
    >
      {contentText}
    </h2>
  );
}
