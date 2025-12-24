import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    label: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

type FlashProps = {
    success?: string | null;
    error?: string | null;
    warning?: string | null;
    info?: string | null;
};

export interface PageProps extends InertiaPageProps {
    name: string;
    quote: {
        message: string;
        author: string;
    };
    auth: {
        user: unknown;
    };
    sidebarOpen: boolean;
    flash: FlashProps;
}

export type Diagnosa = {
    id: number;
    pasien_id: number;
    dokter: string;
    keluhan: string;
    diagnosa: string;
    tindakan: string;
    obat: string;
    tanggal_periksa: string;
};

export type Pasien = {
    id: number;
    nomor_pasien: string | null;
    nama_lengkap: string;
    usia: string;
    alamat: string | null;
    nomor_telepon: string | null;
    jenis_kelamin: 'Laki-laki' | 'Perempuan' | null;
    tanggal_lahir: string | null;
    golongan_darah: 'A' | 'B' | 'AB' | 'O' | null;
    pekerjaan: string | null;
    nomor_ktp: string | null;
    diagnosa: Diagnosa[];
};

export type PaginationMetaLink = {
    url: string | undefined;
    label: string;
    page: number | null;
    active: boolean;
};

export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
    links: PaginationMetaLink[];
};

export type PaginationLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

export type PaginatedPasien = {
    data: Pasien[];
    links: PaginationLinks;
    meta: PaginationMeta;
};

export type PasienFilters = {
    search?: string;
    perPage?: number;
};

export type PasienIndexPageProps = {
    pasien: PaginatedPasien;
    filters: PasienFilters;
};
