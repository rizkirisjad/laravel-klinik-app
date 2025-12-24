import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Pasien } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Spinner } from '../ui/spinner';
import { Textarea } from '../ui/textarea';

type FormPasienProps = {
    pasien?: Pasien;
    setSearch: Dispatch<SetStateAction<string>>;
};

const FormPasien = ({ pasien, setSearch }: FormPasienProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const method = pasien ? 'put' : 'post';
    const route = pasien ? `/data-pasien/${pasien.id}` : '/data-pasien';
    const jenisKelamin = [
        { label: 'Laki-laki', value: 'Laki-laki' },
        { label: 'Perempuan', value: 'Perempuan' },
    ];
    const golonganDarah = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'AB', value: 'AB' },
        { label: 'O', value: 'O' },
    ];

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            nama_lengkap: pasien?.nama_lengkap || '',
            alamat: pasien?.alamat || '',
            nomor_telepon: pasien?.nomor_telepon || '',
            jenis_kelamin: pasien?.jenis_kelamin || '',
            tanggal_lahir: pasien?.tanggal_lahir || '',
            golongan_darah: pasien?.golongan_darah || '',
            pekerjaan: pasien?.pekerjaan || '',
            nomor_ktp: pasien?.nomor_ktp || '',
        });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (method === 'post') {
                post(route, {
                    onSuccess: () => {
                        setOpen(false);
                        setSearch('');
                        clearErrors();
                        reset();
                    },
                });
            } else {
                put(route, {
                    onSuccess: () => {
                        setOpen(false);
                        setSearch('');
                        clearErrors();
                        reset();
                    },
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat menyimpan data pasien.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !processing && setOpen(v)}>
            <DialogTrigger asChild>
                <Button
                    variant={pasien ? 'outline' : 'default'}
                    size={pasien ? 'icon' : 'default'}
                >
                    {pasien ? <Edit size={16} /> : 'Tambah Pasien'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Form Pasien</DialogTitle>
                    <DialogDescription>
                        Lengkapi data pasien dengan benar.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Nama Lengkap */}
                        <div>
                            <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                            <Input
                                name="nama_lengkap"
                                id="nama_lengkap"
                                type="text"
                                value={data.nama_lengkap}
                                onChange={(e) =>
                                    setData('nama_lengkap', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.nama_lengkap}
                                className="mt-2"
                            />
                        </div>
                        {/* Tanggal Lahir */}
                        <div>
                            <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                            <Input
                                name="tanggal_lahir"
                                id="tanggal_lahir"
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) =>
                                    setData('tanggal_lahir', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.tanggal_lahir}
                                className="mt-2"
                            />
                        </div>
                        {/* Jenis Kelamin */}
                        <div>
                            <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                            <div className="mt-2 flex items-center space-x-5">
                                {jenisKelamin.map((jk, index) => (
                                    <Label key={index}>
                                        <input
                                            id="jenis_kelamin"
                                            type="radio"
                                            name="jenis_kelamin"
                                            value={jk.value}
                                            checked={
                                                data.jenis_kelamin === jk.value
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'jenis_kelamin',
                                                    e.target.value,
                                                )
                                            }
                                            className="mr-2"
                                        />
                                        {jk.label}
                                    </Label>
                                ))}
                            </div>
                            <InputError
                                message={errors.jenis_kelamin}
                                className="mt-2"
                            />
                        </div>
                        {/* Golongan Darah */}
                        <div>
                            <Label htmlFor="golongan_darah">
                                Golongan Darah
                            </Label>
                            <Select
                                name="golongan_darah"
                                value={data.golongan_darah}
                                onValueChange={(value) =>
                                    setData('golongan_darah', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Golongan Darah" />
                                </SelectTrigger>
                                <SelectContent>
                                    {golonganDarah.map((gd, index) => (
                                        <SelectItem
                                            id="golongan_darah"
                                            value={gd.value}
                                            key={index}
                                        >
                                            {gd.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.golongan_darah}
                                className="mt-2"
                            />
                        </div>
                        {/* Nomor Telepon */}
                        <div>
                            <Label htmlFor="nomor_telepon">Nomor Telepon</Label>
                            <Input
                                name="nomor_telepon"
                                id="nomor_telepon"
                                type="text"
                                value={data.nomor_telepon}
                                onChange={(e) =>
                                    setData('nomor_telepon', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.nomor_telepon}
                                className="mt-2"
                            />
                        </div>
                        {/* Pekerjaan */}
                        <div>
                            <Label htmlFor="pekerjaan">Pekerjaan</Label>
                            <Input
                                name="pekerjaan"
                                id="pekerjaan"
                                type="text"
                                value={data.pekerjaan}
                                onChange={(e) =>
                                    setData('pekerjaan', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.pekerjaan}
                                className="mt-2"
                            />
                        </div>
                        {/* Nomor KTP */}
                        <div>
                            <Label htmlFor="nomor-ktp">Nomor KTP</Label>
                            <Input
                                name="nomor_ktp"
                                id="nomor_ktp"
                                type="text"
                                value={data.nomor_ktp}
                                onChange={(e) =>
                                    setData('nomor_ktp', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.nomor_ktp}
                                className="mt-2"
                            />
                        </div>
                        {/* Alamat Lengkap */}
                        <div>
                            <Label htmlFor="alamat_lengkap">
                                Alamat Lengkap
                            </Label>
                            <Textarea
                                name="alamat_lengkap"
                                id="alamat_lengkap"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData('alamat', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.alamat}
                                className="mt-2"
                            />
                        </div>
                        <Button className="block w-full" disabled={processing}>
                            {processing && <Spinner />}
                            {pasien ? 'Simpan Data' : 'Tambah Data'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="block w-full"
                        >
                            Batal
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default FormPasien;
