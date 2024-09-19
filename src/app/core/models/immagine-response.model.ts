import { Immagine } from "./immagine.model";

export interface ImmagineResponse {
    type?: string;
    base64Date?: string;
    nomeFile?: string;
    immagine?: Immagine;
    
}