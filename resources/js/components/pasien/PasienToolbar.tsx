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
import { handleChangePerPage } from '@/lib/utils';
import { RefreshCcw, Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    search: string;
    onSearchChange: Dispatch<SetStateAction<string>>;
    onSubmit: (e: React.FormEvent) => void;
    onClear: () => void;
    path: string;
}

export default function PasienToolbar({
    search,
    onSearchChange,
    onSubmit,
    onClear,
    path,
}: Props) {
    return (
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Select onValueChange={(v) => handleChangePerPage(Number(v), path)}>
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
                onSubmit={onSubmit}
            >
                <Input
                    type="search"
                    placeholder="Cari..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <Button type="submit">
                    <Search size={16} />
                </Button>
                <Button size="icon" variant="outline" onClick={onClear}>
                    <RefreshCcw size={16} />
                </Button>
            </form>

            <FormPasien setSearch={onSearchChange} />
        </div>
    );
}
