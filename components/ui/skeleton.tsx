import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-200',
        className
      )}
    />
  );
}

export function QuoteCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      {/* Provider Header */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      {/* Price Section */}
      <div className="flex items-end gap-2 mb-6">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>

      {/* Action Button */}
      <Skeleton className="h-12 w-full rounded-xl" />
    </div>
  );
}

export function ResultsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <QuoteCardSkeleton key={i} />
      ))}
    </div>
  );
}
