import FormPasien from '@/components/pasien/FormPasien';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PaginationMeta, Pasien } from '@/types';
import { Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    data: Pasien[];
    meta: PaginationMeta;
    onDelete: (id: number) => void;
    setSearch: Dispatch<SetStateAction<string>>;
}

export default function PasienTable({
    data,
    meta,
    onDelete,
    setSearch,
}: Props) {
    return (
        <Table>
            <TableHeader className="border-b bg-teal-700/90">
                <TableHead className="w-10 text-center">No</TableHead>
                <TableHead>Nomor Pasien</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Usia</TableHead>
                <TableHead className="w-32 text-center">Opsi</TableHead>
            </TableHeader>
            <TableBody>
                {data.map((pasien, index) => (
                    <TableRow key={pasien.id}>
                        <TableCell className="text-center">
                            {meta.from + index}
                        </TableCell>
                        <TableCell>{pasien.nomor_pasien}</TableCell>
                        <TableCell>{pasien.nama_lengkap}</TableCell>
                        <TableCell>{pasien.jenis_kelamin}</TableCell>
                        <TableCell>{pasien.usia}</TableCell>
                        <TableCell>
                            <div className="flex justify-center gap-2">
                                <FormPasien
                                    pasien={pasien}
                                    setSearch={setSearch}
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => onDelete(pasien.id)}
                                >
                                    <Trash size={16} />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
