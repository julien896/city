/* import React, { Dispatch, Ref, SetStateAction } from "react"; */
import React, { Dispatch, SetStateAction } from "react";
import { Form, Formik } from "formik";
import { createInitialValues } from "./initialValues";
import { HomePageFormType } from "./HomePageFormType";
import { Autocomplete, TextField } from "@mui/material";
/* import { validation } from "./validation"; */
import { DataType } from '../index';
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";


interface Props {
  /* onSubmit: (value: HomePageFormType) => Promise<void>; */
  initialValues?: HomePageFormType;
  data: DataType;
  value: string;
  setKeyValue: Dispatch<SetStateAction<string>>;
  handleChange: (newValue: string) => void;
  date: Moment | null;
  handleDateChange: (newValue: Moment | null) => void;
  passengers: number;
  handlePassengersChange: (e: any) => void;
  /* formRef: Ref<FormikProps<HomePageFormType>> | undefined; */
}

export function HomePageForm({
  initialValues = createInitialValues(),
  data,
  value,
  handleChange,
  setKeyValue,
  date,
  handleDateChange,
  passengers,
  handlePassengersChange
  /* formRef, */
}: Props) {


  return (
    <Formik<HomePageFormType>
      initialValues={initialValues}
      onSubmit={() => console.log("")}
      /*       innerRef={formRef}
      onSubmit={onSubmit}
      validationSchema={validation} */
    >
      {() => (
        <Form className="w-full">
          <div className="input-con-btn">
            <div className="field-group">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onFocus={() => setKeyValue('origin')}
                options={data.origin.map(el => el.name)}
                sx={{ width: 300 }}
                renderInput={(params) => ( 
                  <TextField 
                    {...params} 
                    value={value} 
                    onChange={e => handleChange(e.target.value)} 
                    label="City of origin" 
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onFocus={() => setKeyValue('intermediate')}
                options={data.intermediate.map(el => el.name)}
                sx={{ width: 300 }}
                renderInput={(params) => ( 
                  <TextField 
                    {...params} 
                    value={value} 
                    onChange={e => handleChange(e.target.value)} 
                    label="Intermediate" 
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onFocus={() => setKeyValue('destination')}
                options={data.destination.map(el => el.name)}
                sx={{ width: 300 }}
                renderInput={(params) => ( 
                  <TextField 
                    {...params} 
                    value={value} 
                    onChange={e => handleChange(e.target.value)} 
                    label="Destination" 
                  />
                )}
              />
              <DesktopDatePicker
                label="Travel date"
                inputFormat="MM/dd/yyyy"
                value={date}
                disablePast
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(e) => handlePassengersChange(e)}
                defaultValue={passengers}
                value={passengers}
                inputProps={{ maxLength: 12 }}
              />
            </div>
            {/* <span className="error"><ErrorMessage name="email" className="error" /></span> */}
          </div>
        </Form>
      )}
    </Formik>
  );
}


