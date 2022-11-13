import { HomePageFormType } from "./HomePageFormType";

export const createInitialValues = (): HomePageFormType => ({
  origin: "",
  intermediate: null,
  destination: "",
  date: null,
  passengers: 0
});