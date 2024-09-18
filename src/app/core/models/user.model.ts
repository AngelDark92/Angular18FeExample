import { Group } from "./group.model";

export interface User {
    id ? : any;
    username ?: string;
    password ? : string;
    email ? : string;
    groupDTO ? : Group;    
}
