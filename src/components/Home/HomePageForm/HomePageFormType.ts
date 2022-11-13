import { Moment } from 'moment'

export type HomePageFormType = {
    origin: string;
    intermediate: string[] | null;
    destination: string;
    date: Moment | null;
    passengers: number;
};