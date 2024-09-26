import { AnagraficaUtente } from "./anagrafica-utente.model";
import { Dato } from "./dato.model";


export interface ListaDati {
    dati ?: Dato[];
    anagrafica ?: AnagraficaUtente;
    cartellaId ?: any
}
