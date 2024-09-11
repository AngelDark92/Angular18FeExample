import { Paziente } from "./paziente.model";
import { User } from "./user.model";

export interface UtentePaziente {
    userDTO ?: User;
    pazienteDTO ?: Paziente;
}
