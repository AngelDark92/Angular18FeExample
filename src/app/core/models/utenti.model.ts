import { Medico } from "./medico.model";
import { Paziente } from "./paziente.model";
import { User } from "./user.model";

export interface Utenti {
    userDTO ?: User;
    pazienteDTO ?: Paziente;
    medicoDTO ? : Medico;
}
