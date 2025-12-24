import RekamMedis from '@/components/diagnosa/RekamMedis';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Diagnosa } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { HeartPulse, NotebookText } from 'lucide-react';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Halaman Diagnosa Pasien',
        href: '/diagnosa',
    },
];

const Index = () => {
    const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([]);
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            pasien_id: '',
            keluhan: '',
            diagnosa: '',
            tindakan: '',
            obat: '',
        });

    const getPasien = async (inputValue: string) => {
        if (!inputValue) return [];

        try {
            const { data } = await axios.get('/data-pasien/get-json', {
                params: {
                    search: inputValue,
                },
            });
            return data;
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat memuat data pasien.');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            post('/diagnosa', {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();

                    const reactSelect = document.getElementById(
                        'react-async-select',
                    ) as HTMLSelectElement;
                    reactSelect.value = '';
                },
            });
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat menyimpan data pasien.');
        }
    };

    const getDataDiagnosa = async (inputValue: string) => {
        if (!inputValue) return [];

        try {
            const { data } = await axios.get(
                `/data-pasien/${inputValue}/rekam-medis?limit=5`,
            );
            console.log(data);
            setDiagnosa(data);
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat memuat data diagnosa');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Halaman Diagnosa Pasien" />
            <section className="mt-8 grid gap-8 lg:grid-cols-12">
                {/* left column */}
                <Card className="lg:col-span-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
                            <CardTitle className="flex items-center gap-x-2">
                                <HeartPulse />
                                Form Diagnosa
                            </CardTitle>
                            <Button type="submit" disabled={processing}>
                                {processing && <Spinner />}
                                Simpan Diagnosa
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <AsyncSelect
                                    id="react-async-select"
                                    loadOptions={getPasien}
                                    cacheOptions
                                    defaultOptions
                                    isClearable
                                    placeholder="Pilih Pasien"
                                    noOptionsMessage={() =>
                                        'Pasien tidak ditemukan'
                                    }
                                    loadingMessage={() =>
                                        'Memuat data pasien...'
                                    }
                                    onChange={(
                                        selectedOption: SingleValue<{
                                            label: string;
                                            value: string;
                                        }>,
                                    ) => {
                                        setData(
                                            'pasien_id',
                                            selectedOption?.value ?? '',
                                        );
                                        getDataDiagnosa(
                                            selectedOption?.value ?? '',
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="keluhan"
                                    className="mb-2 capitalize"
                                >
                                    keluhan
                                </Label>
                                <Textarea
                                    className="min-h-32"
                                    name="keluhan"
                                    value={data.keluhan}
                                    onChange={(e) =>
                                        setData('keluhan', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.keluhan}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="diagnosa"
                                    className="mb-2 capitalize"
                                >
                                    diagnosa
                                </Label>
                                <Textarea
                                    className="min-h-32"
                                    name="diagnosa"
                                    value={data.diagnosa}
                                    onChange={(e) =>
                                        setData('diagnosa', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.diagnosa}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="tindakan"
                                    className="mb-2 capitalize"
                                >
                                    tindakan
                                </Label>
                                <Textarea
                                    className="min-h-32"
                                    name="tindakan"
                                    value={data.tindakan}
                                    onChange={(e) =>
                                        setData('tindakan', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.tindakan}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="obat"
                                    className="mb-2 capitalize"
                                >
                                    obat
                                </Label>
                                <Textarea
                                    className="min-h-32"
                                    name="obat"
                                    value={data.obat}
                                    onChange={(e) =>
                                        setData('obat', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.obat}
                                    className="mt-2"
                                />
                            </div>
                        </CardContent>
                    </form>
                </Card>
                {/* right column */}
                <Card className="lg:col-span-6">
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center gap-x-2">
                            <NotebookText />
                            Rekam Medis
                        </CardTitle>
                        <CardDescription>
                            Menampilkan 5 rekam medis terbaru
                        </CardDescription>
                        <CardContent>
                            <RekamMedis diagnosa={diagnosa} />
                        </CardContent>
                    </CardHeader>
                </Card>
            </section>
        </AppLayout>
    );
};
export default Index;
