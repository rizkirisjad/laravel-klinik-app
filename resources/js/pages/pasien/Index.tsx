import CustomPagination from '@/components/custom-pagination';
import FormPasien from '@/components/pasien/FormPasien';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleChangePerPage } from '@/lib/utils';
import { BreadcrumbItem, Pasien, PasienIndexPageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { RefreshCcw, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Pasien',
        href: '/data-pasien',
    },
];

const Index = () => {
    const { pasien, filters } = usePage<PasienIndexPageProps>().props;
    const [search, setSearch] = useState('');
    const dataPasien = pasien.data;
    const meta = pasien.meta;
    const path = meta.path;

    const searchData = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            path,
            { search: search },
            { preserveState: true, replace: true },
        );
    };

    const clearSearch = () => {
        setSearch('');
        router.get(path, {}, { preserveState: true, replace: true });
    };

    useEffect(() => {
        console.log('Pasien :', pasien);
        console.log('Filters :', filters);
    }, [filters, pasien]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pasien" />
            <div className="mb-4 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Select
                    onValueChange={(value) =>
                        handleChangePerPage(Number(value), path)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Data per halaman" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Jumlah Data</SelectLabel>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <form
                    className="flex w-full max-w-md items-center gap-2"
                    onSubmit={searchData}
                >
                    <Input
                        type="search"
                        placeholder="Cari..."
                        className="flex-1"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Button type="submit">
                        <Search size={16} />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={clearSearch}
                    >
                        <RefreshCcw size={16} />
                    </Button>
                </form>
                <FormPasien setSearch={setSearch} />
            </div>
            {dataPasien.length === 0 ? (
                <h5 className="my-24 text-center text-2xl">
                    Maaf, data pasien tidak tersedia...
                </h5>
            ) : (
                <>
                    <Table>
                        <TableHeader className="border-b bg-teal-700/90">
                            <TableHead className="w-10 text-center">
                                No
                            </TableHead>
                            <TableHead>Nomor Pasien</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            <TableHead>Usia</TableHead>
                            <TableHead className="w-32 text-center">
                                Opsi
                            </TableHead>
                        </TableHeader>
                        <TableBody>
                            {dataPasien.map((data: Pasien, index: number) => {
                                return (
                                    <TableRow key={data.id}>
                                        <TableCell className="text-center">
                                            {meta.from + index}
                                        </TableCell>
                                        <TableCell>
                                            {data.nomor_pasien}
                                        </TableCell>
                                        <TableCell>
                                            {data.nama_lengkap}
                                        </TableCell>
                                        <TableCell>
                                            {data.jenis_kelamin}
                                        </TableCell>
                                        <TableCell>{data.usia}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-x-2">
                                                <FormPasien
                                                    key={data.id}
                                                    pasien={data}
                                                    setSearch={setSearch}
                                                />

                                                <Button
                                                    variant={'destructive'}
                                                    size={'icon'}
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Yakin ingin menghapus data ini?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/data-pasien/${data.id}`,
                                                                {
                                                                    preserveScroll: true,
                                                                    onSuccess:
                                                                        () => {
                                                                            setSearch(
                                                                                '',
                                                                            );
                                                                            toast.success(
                                                                                'Data pasien berhasil dihapus.',
                                                                            );
                                                                        },
                                                                },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Trash size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <CustomPagination meta={meta} />
                </>
            )}
        </AppLayout>
    );
};
export default Index;
