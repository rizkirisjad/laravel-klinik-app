// pages/data-pasien/hooks/usePasienIndex.ts
import { PasienIndexPageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export function usePasienIndex() {
    const { pasien } = usePage<PasienIndexPageProps>().props;

    const [search, setSearch] = useState('');
    const dataPasien = pasien.data;
    const meta = pasien.meta;
    const path = meta.path;

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(path, { search }, { preserveState: true, replace: true });
    };

    const clearSearch = () => {
        setSearch('');
        router.get(path, {}, { preserveState: true, replace: true });
    };

    const deletePasien = (id: number) => {
        if (!confirm('Yakin ingin menghapus data ini?')) return;

        router.delete(`/data-pasien/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setSearch('');
                toast.success('Data pasien berhasil dihapus.');
            },
        });
    };

    return {
        search,
        setSearch,
        dataPasien,
        meta,
        path,
        submitSearch,
        clearSearch,
        deletePasien,
    };
}
