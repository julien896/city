import { HomePageFormType } from "./HomePageFormType";
import * as Yup from "yup";
import { Moment } from "moment";

export const validation: Yup.SchemaOf<HomePageFormType> = Yup.object().shape({
  origin: Yup.string()
    .label("Origin")
    .required('This field is required!'),
  /*   intermediate: Yup.array()
    .of(Yup.string())
    .label("Intermediate")
    .notRequired(), */
  intermediate: Yup.string()
    .label("Intermediate")
    .required('This field is required!'),
  destination: Yup.string()
    .label("Destination")
    .required('This field is required!'),
  date: Yup.mixed<Moment | null>()
    .label("Date")
    .required('This field is required!'),
  passengers: Yup.number()
    .label("Passengers")
    .required('This field is required!'),
});