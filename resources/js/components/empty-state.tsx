import { cn } from '@/lib/utils';

export default function EmptyState({
    heading,
    className,
}: {
    heading?: string;
    className?: string;
}) {
    return <h5 className={cn('text-xl', className)}>{heading}</h5>;
}
