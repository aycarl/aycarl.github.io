import { cn } from "@/lib/utils";

type BlobColor = "sky" | "green" | "yellow" | "pink" | "orange";

interface BlobProps {
  color: BlobColor;
  size?: number; // px
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  drift?: 1 | 2 | 3;
  className?: string;
}

const colorMap: Record<BlobColor, string> = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  pink: "bg-pink",
  orange: "bg-orange",
};

export const Blob = ({ color, size = 320, top, left, right, bottom, drift, className }: BlobProps) => {
  return (
    <span
      aria-hidden
      className={cn(
        "blob",
        colorMap[color],
        drift === 1 && "animate-drift-1",
        drift === 2 && "animate-drift-2",
        drift === 3 && "animate-drift-3",
        className,
      )}
      style={{ width: size, height: size, top, left, right, bottom }}
    />
  );
};

export const BlobField = ({ className }: { className?: string }) => {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <Blob color="sky"    size={420} top="-6%"  left="-4%"  drift={1} />
      <Blob color="green"  size={360} top="10%"  left="22%"  drift={2} />
      <Blob color="yellow" size={300} top="-8%"  left="48%"  drift={3} />
      <Blob color="pink"   size={380} top="6%"   right="-6%" drift={1} />
      <Blob color="orange" size={260} top="38%"  left="60%"  drift={2} />
    </div>
  );
};
