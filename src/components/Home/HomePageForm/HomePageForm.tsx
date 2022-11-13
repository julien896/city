/* import React, { Dispatch, Ref, SetStateAction } from "react"; */
import React from "react";
import { Form, Formik } from "formik";
import { createInitialValues } from "./initialValues";
import { HomePageFormType } from "./HomePageFormType";
import { Autocomplete, TextField } from "@mui/material";
/* import { validation } from "./validation"; */


interface Props {
  /* onSubmit: (value: HomePageFormType) => Promise<void>; */
  initialValues?: HomePageFormType;
  /* formRef: Ref<FormikProps<HomePageFormType>> | undefined; */
}

export function EmailForm({
  initialValues = createInitialValues(),
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
                options={data.map(el => el.name)}
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
            </div>
            {/* <span className="error"><ErrorMessage name="email" className="error" /></span> */}
          </div>
        </Form>
      )}
    </Formik>
  );
}


