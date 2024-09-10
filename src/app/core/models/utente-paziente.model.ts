import { Paziente } from "./paziente.model";
import { User } from "./user.model";

export interface UtentePaziente {
    user ?: User;
    paziente ?: Paziente;
}
