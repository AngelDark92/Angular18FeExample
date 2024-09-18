import { Dato } from "./dato.model";
import { Medico } from "./medico.model";
import { Paziente } from "./paziente.model";

export interface Cartellaclinica {
    id? : any;
    pazienteDTO?: Paziente;
    medicoDTO?: Medico;
    datiSenzaCartella ?: Dato[];
}
