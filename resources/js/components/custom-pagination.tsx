import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationMeta } from '@/types';

interface CustomPaginationProps {
    meta: PaginationMeta;
}

const CustomPagination = ({ meta }: CustomPaginationProps) => {
    return (
        <Pagination className="mt-4">
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        href={
                            meta.current_page === 1
                                ? '#'
                                : (meta.links[0]?.url ?? '#')
                        }
                        className={
                            meta.current_page === 1
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />
                </PaginationItem>
                {/* Page Numbers */}
                {meta.links
                    .filter(
                        (link) =>
                            link.page !== null &&
                            !link.label.includes('pagination'),
                    )
                    .map((link) => (
                        <PaginationItem key={link.page}>
                            <PaginationLink
                                size={'sm'}
                                href={link.url}
                                isActive={link.active}
                                className={
                                    link.active
                                        ? 'bg-primary text-primary-foreground hover:bg-primary'
                                        : ''
                                }
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        href={
                            meta.current_page === meta.last_page
                                ? '#'
                                : (meta.links[meta.links.length - 1]?.url ??
                                  '#')
                        }
                        className={
                            meta.current_page === meta.last_page
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
export default CustomPagination;
