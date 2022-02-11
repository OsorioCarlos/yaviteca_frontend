import { ConservationStatus } from "./conservation-status";
import { State } from "./state";

export interface Book {
    id?: number;
    isbn: string;
    name: string;
    editorial: string;
    author: string;
    genre: string;
    conservation_status_id: ConservationStatus;
    state_id: State;
    creation_date: Date;
    is_deleted?: boolean;
}