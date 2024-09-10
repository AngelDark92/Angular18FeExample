import { User } from "./user.model";

export interface Paziente {
    id?: any;
    nome?: string;
    cognome?:string;
    codiceFiscale?:string;
    email?:string;
    comuneDiResidenza?:string;
    numeroDiTelefono?:string;
    user?:User;
}
