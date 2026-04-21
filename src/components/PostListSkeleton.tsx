export const PostListSkeleton = ({ count = 3 }: { count?: number }) => (
  <ul className="divide-y divide-border">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="grid grid-cols-12 gap-6 py-8 items-baseline">
        <div className="col-span-12 md:col-span-3">
          <div className="h-3 w-24 bg-secondary rounded animate-pulse" />
          <div className="h-3 w-16 bg-secondary/70 rounded animate-pulse mt-2" />
        </div>
        <div className="col-span-12 md:col-span-9 space-y-3">
          <div className="h-7 w-3/4 bg-secondary rounded animate-pulse" />
          <div className="h-4 w-full bg-secondary/70 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-secondary/70 rounded animate-pulse" />
        </div>
      </li>
    ))}
  </ul>
);
