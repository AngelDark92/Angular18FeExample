import { Paziente } from "./paziente.model";

export interface PazienteConCartella {
    paziente ?: Paziente,
    cartellaId ?: any
}