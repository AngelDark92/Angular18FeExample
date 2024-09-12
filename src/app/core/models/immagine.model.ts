import { Dato } from "./dato.model";

export interface Immagine {
    id?: any;
    nome?: string;
    file?: string;
    dataInserimento?: string;
    tipo?: string;
    dato?: Dato;
}