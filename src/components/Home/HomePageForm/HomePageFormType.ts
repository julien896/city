import { Moment } from 'moment'

export type HomePageFormType = {
    origin: string;
    intermediate: string[] | null;
    /* intermediate: string; */
    destination: string;
    date: Moment | null;
    passengers: number;
};