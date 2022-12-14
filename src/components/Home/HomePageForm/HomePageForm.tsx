/* import React, { Dispatch, Ref, SetStateAction } from "react"; */
import React, { Dispatch, Ref, SetStateAction } from "react";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import { createInitialValues } from "./initialValues";
import { HomePageFormType } from "./HomePageFormType";
import { Autocomplete, Button, TextField } from "@mui/material";
import { validation } from "./validation";
import { DataType } from '../index';
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { HomeComponent } from "../HomeComponent";


interface Props {
  /* onSubmit: (value: HomePageFormType) => Promise<void>; */
  onSubmit: (value: HomePageFormType) => void;
  initialValues?: HomePageFormType;
  data: DataType;
  value: string;
  setKeyValue: Dispatch<SetStateAction<string>>;
  handleChange: (newValue: string) => void;
  date: Moment | null;
  handleDateChange: (newValue: Moment | null) => void;
  handlePassengersChange: (e: any) => void;
  formRef: Ref<FormikProps<HomePageFormType>> | undefined;
  isLoading: boolean;
}

export function HomePageForm({
  initialValues = createInitialValues(),
  data,
  value,
  handleChange,
  setKeyValue,
  date,
  handleDateChange,
  handlePassengersChange,
  formRef,
  isLoading,
  onSubmit
}: Props) {


  return (
    <Formik<HomePageFormType>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validation}
      innerRef={formRef}
    >
      {(formik) => (
        <Form>
          <div className="input-con-btn">
            <div className="field-group">
              <HomeComponent.FormItemContainer>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onFocus={() => setKeyValue('origin')}
                  options={data.origin.map(el => el.name)}
                  loading={isLoading}
                  onInputChange={(_, newValue: string) => handleChange(newValue)}
                  className='mui-textfield'
                  renderInput={(params) => ( 
                    <TextField 
                      {...params} 
                      value={value} 
                      onChange={e => handleChange(e.target.value)} 
                      label="Origin" 
                    />
                  )}
                />
              </HomeComponent.FormItemContainer>

              <HomeComponent.FormItemContainer>
                <Autocomplete
                  multiple
                  disablePortal
                  id="combo-box-demo"
                  onFocus={() => setKeyValue('intermediate')}
                  options={data.intermediate.map(el => el.name)}
                  onChange={(_, newValue: any) => handleChange(newValue)}
                  className='mui-textfield'
                  renderInput={(params) => ( 
                    <TextField 
                      {...params} 
                      value={value} 
                      onChange={e => handleChange(e.target.value)} 
                      label="Intermediate" 
                    />
                  )}
                />
              </HomeComponent.FormItemContainer>

              <HomeComponent.FormItemContainer>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onFocus={() => setKeyValue('destination')}
                  options={data.destination.map(el => el.name)}
                  onInputChange={(_, newValue: string) => handleChange(newValue)}
                  className='mui-textfield'
                  renderInput={(params) => ( 
                    <TextField 
                      {...params} 
                      value={value} 
                      onChange={e => handleChange(e.target.value)} 
                      label="Destination" 
                    />
                  )}
                />
                {formik.errors.destination &&
                <span className="error"><ErrorMessage name="destination" className="error" /></span>}                
              </HomeComponent.FormItemContainer>

              <HomeComponent.FormItemContainer>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  className="mui-textfield"
                  disablePast
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <span className="error"><ErrorMessage name="date" className="error" /></span>                
              </HomeComponent.FormItemContainer>

              <HomeComponent.FormItemContainer>
                <TextField
                  type="number"
                  label="Passengers"
                  className='mui-textfield'
                  variant="outlined"
                  onChange={(e) => handlePassengersChange(e)}
                  defaultValue={0}
                  inputProps={{ maxLength: 12 }}
                />
              </HomeComponent.FormItemContainer>
              <span className="error"><ErrorMessage name="passengers" className="error" /></span>
            </div>
          </div>
          <Button className="submit-btn" type="submit">
            Confirm
          </Button>
        </Form>
      )}
    </Formik>
  );
}


