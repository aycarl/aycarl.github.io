import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

export type BlobColor = "sky" | "green" | "yellow" | "pink" | "orange";

interface BlobProps {
  color: BlobColor;
  drift?: 1 | 2 | 3;
  className?: string;
}

interface AnimatedBlobSpec {
  color: BlobColor;
  blobClass: string;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
}

const colorMap: Record<BlobColor, string> = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  pink: "bg-pink",
  orange: "bg-orange",
};

const heroBlobSpecs: readonly AnimatedBlobSpec[] = [
  {
    color: "sky",
    blobClass: "left-[12%] top-[18%] h-72 w-72 md:h-96 md:w-96 opacity-20",
    driftX: 22,
    driftY: -14,
    duration: 26,
    delay: 0,
  },
  {
    color: "green",
    blobClass: "left-[42%] top-[8%] h-64 w-64 md:h-80 md:w-80 opacity-[0.18]",
    driftX: -18,
    driftY: 16,
    duration: 30,
    delay: 2,
  },
  {
    color: "yellow",
    blobClass: "left-[70%] top-[16%] h-56 w-56 md:h-72 md:w-72 opacity-[0.17]",
    driftX: 16,
    driftY: 10,
    duration: 28,
    delay: 1,
  },
  {
    color: "pink",
    blobClass: "left-[84%] top-[42%] h-64 w-64 md:h-[22rem] md:w-[22rem] opacity-[0.16]",
    driftX: -20,
    driftY: -12,
    duration: 32,
    delay: 3,
  },
  {
    color: "orange",
    blobClass: "left-[56%] top-[52%] h-48 w-48 md:h-64 md:w-64 opacity-15",
    driftX: 14,
    driftY: -10,
    duration: 34,
    delay: 0.5,
  },
];

export const Blob = ({ color, drift, className }: BlobProps) => {
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
    />
  );
};

export const BlobField = ({ className }: { className?: string }) => {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <Blob color="sky" className="-left-[4%] -top-[6%] h-[420px] w-[420px]" drift={1} />
      <Blob color="green" className="left-[22%] top-[10%] h-[360px] w-[360px]" drift={2} />
      <Blob color="yellow" className="left-[48%] -top-[8%] h-[300px] w-[300px]" drift={3} />
      <Blob color="pink" className="-right-[6%] top-[6%] h-[380px] w-[380px]" drift={1} />
      <Blob color="orange" className="left-[60%] top-[38%] h-[260px] w-[260px]" drift={2} />
    </div>
  );
};

export const HeroBlobField = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className={cn("absolute inset-0 pointer-events-none", className)}>
      {heroBlobSpecs.map((blob) => (
        <motion.span
          key={`${blob.color}-${blob.blobClass}`}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            blob.blobClass,
            colorMap[blob.color],
          )}
          animate={
            reduceMotion
              ? { x: 0, y: 0, scale: 1 }
              : {
                  x: [0, blob.driftX, -blob.driftX * 0.6, 0],
                  y: [0, blob.driftY, -blob.driftY * 0.6, 0],
                  scale: [1, 1.03, 0.98, 1],
                }
          }
          transition={{
            duration: blob.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: blob.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/28 to-background/56" />
    </div>
  );
};
