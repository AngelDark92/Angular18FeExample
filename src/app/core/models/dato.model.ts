import { Cartellaclinica } from "./cartellaclinica.model";

export interface Dato {
    id?: any;
    reparto?: string;
    diagnosi?: string;
    terapia?: string;
    cartellaClinica?: Cartellaclinica;
}
