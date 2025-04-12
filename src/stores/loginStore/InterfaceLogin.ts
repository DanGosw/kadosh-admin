import { type InterfaceAxiosApiResponse } from "@/composables/InterfaceAxiosApiNoPaginate";

export interface InterfaceLogin {
    user: User;
    token: string;
}

export interface User {
    id: number;
    names: string;
    username: string;
    dni: string;
    address: string;
    telephone: string;
    email: string;
    jobStart: string;
    observation: string;
    permission: Permission[];
    defaultSaleReceipt: string;
    active: boolean;
    fk_profile: FkProfile;
    fk_branch: FkBranch;
    user_series: Series[];
}

export interface Permission {
    name: string;
    children: Children[];
}

export interface Children {
    name: string;
    permissions?: string[];
}

export interface FkProfile {
    description: string;
    permission: Permission2[];
    active: boolean;
    id: number;
}

export interface Permission2 {
    name: string;
    children: Children2[];
}

export interface Children2 {
    name: string;
}

export interface FkBranch {
    id: number;
    fk_company: FkCompany;
    description: string;
}

export interface FkCompany {
    id: number;
    denomination: string;
}

export interface Series {
    id: number;
    serie: number;
    fk_serie: FkSerie;
}

export interface FkSerie {
    id: number;
    fk_invoiceType: FkInvoiceType;
    description: string;
    active: boolean;
}

export interface FkInvoiceType {
    id: string;
    description: string;
}

export type InterfaceUserLoginActions = InterfaceAxiosApiResponse<InterfaceLogin> 
