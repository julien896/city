import { HomePageFormType } from "./HomePageFormType";

export const createInitialValues = (): HomePageFormType => ({
  origin: "",
  intermediate: [],
  destination: "",
  date: null,
  passengers: 0
});