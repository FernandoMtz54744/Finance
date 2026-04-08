import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export function CustomIcon({ name, ...props }: { name: string } & LucideProps) {
  if (!(name in Icons)) return null;

  const LucideIcon = Icons[name as keyof typeof Icons] as React.ComponentType<LucideProps>;

  return <LucideIcon {...props} />;
}