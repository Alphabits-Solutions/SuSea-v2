import clsx from "clsx";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
}

export default function SectionContainer({
  children,
  className,
  as: Tag = "div",
}: SectionContainerProps) {
  return (
    <Tag className={clsx("max-w-7xl mx-auto px-8", className)}>
      {children}
    </Tag>
  );
}
