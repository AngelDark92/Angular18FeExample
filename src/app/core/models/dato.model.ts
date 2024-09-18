import { Cartellaclinica } from "./cartellaclinica.model";
import { Immagine } from "./immagine.model";

export interface Dato {
    id?: any;
    reparto?: string;
    diagnosi?: string;
    terapia?: string;
    cartellaClinicaDTO?: Cartellaclinica;
    immagini ?: Immagine[];
}
