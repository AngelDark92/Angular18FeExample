import { Medico } from "./medico.model";
import { Paziente } from "./paziente.model";

export interface Cartellaclinica {
    id? : any;
    paziente?: Paziente;
    medico?: Medico;
}
