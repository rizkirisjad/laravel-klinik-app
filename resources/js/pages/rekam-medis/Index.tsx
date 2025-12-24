import RekamMedis from '@/components/diagnosa/RekamMedis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Pasien } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekam Medis',
        href: '/rekam-medis',
    },
];

const Index = () => {
    const [pasien, setPasien] = useState<Pasien>();

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

    const getPasienWithDiagnosa = async (inputValue: string) => {
        if (!inputValue) return [];

        try {
            const { data } = await axios.get(`/data-pasien/${inputValue}/show`);
            console.log(data);
            setPasien(data);
        } catch (error) {
            console.log(error);
            toast.error('Terjadi kesalahan saat memuat data diagnosa pasien');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekam Medis" />
            <div>
                <AsyncSelect
                    id="react-async-select"
                    loadOptions={getPasien}
                    cacheOptions
                    defaultOptions
                    isClearable
                    placeholder="Pilih Pasien"
                    noOptionsMessage={() => 'Pasien tidak ditemukan'}
                    loadingMessage={() => 'Memuat data pasien...'}
                    onChange={(
                        selectedOption: SingleValue<{
                            label: string;
                            value: string;
                        }>,
                    ) => {
                        getPasienWithDiagnosa(selectedOption?.value ?? '');
                    }}
                />
            </div>
            <div className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pasien</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Nama : {pasien?.nama_lengkap || '-'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Jenis Kelamin : {pasien?.jenis_kelamin || '-'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Usia : {pasien?.usia || '-'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Golongan Darah : {pasien?.golongan_darah || '-'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Alamat : {pasien?.alamat || '-'}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rekam Medis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RekamMedis diagnosa={pasien?.diagnosa || []} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};
export default Index;
