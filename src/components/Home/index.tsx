
import React, { Ref, useEffect, useRef, useState } from 'react'
import { HomeComponent } from './HomeComponent';
import { HomeRepository } from '../../services/homeRepository';
import { useDebounce } from '../../hooks/useDebounce';
import { useMutation } from 'react-query';
import { City } from '../../models/City';
import { HomePageForm } from './HomePageForm/HomePageForm';
import { Moment } from 'moment';
import { FormikProps } from 'formik';
import { HomePageFormType } from './HomePageForm/HomePageFormType';

export interface DataType {
  origin: City[] | [];
  intermediate: City[] | [];
  destination: City[] | []
}
export interface SelectedDataType {
  origin: City;
  destination: City
}

function Home() {
  const repo = new HomeRepository()

  const formRef: Ref<FormikProps<HomePageFormType>> | undefined = useRef(null)
  
  const [value, setValue] = useState<string>('')
  const [keyValue, setKeyValue] = useState<string>('')
  const [citiesData, setCitiesData] = useState<DataType>({
    origin: [],
    intermediate: [],
    destination: [],
  });

  const debouncedValue = useDebounce(value, 700)

  const [date, setDate] = useState<Moment | null>(null);

  const handleDateChange = (newValue: Moment | null) => {
    setDate(newValue);
    formRef.current!.values.date = newValue
  };

  const handlePassengersChange = (e: any) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value == "" || regex.test(e.target.value)) {
      formRef.current!.values.passengers = e.target.value
    }
  }

  const handleChangeState = (data: any[], key: string) => {
    if(data) {
      setCitiesData({ ...citiesData, [key]: data  })
    } else {
      setCitiesData({ ...citiesData, [key]: []})
    }
  }

  const citiesMutation = useMutation(repo.getCities, {
    onSuccess:(data: any) => {
      handleChangeState(data, keyValue)
    }
  })

  const handleChange = (newValue: any) => {
    setValue(newValue)
    if (keyValue === 'intermediate') { 
      formRef.current!.values.intermediate = newValue
    } else {
      formRef.current!.values[keyValue as keyof SelectedDataType] = newValue
    }
    /* formRef.current!.values[keyValue as keyof SelectedDataType] = newValue */
    
  };

  const citiesMutationMutate = (key: string) => {
    citiesMutation.mutateAsync(key)
  }

  useEffect(() => {
    citiesMutationMutate(value)
  }, [debouncedValue])

  console.log(formRef)
  return (
    <HomeComponent>
      <HomeComponent.Title 
        title='Distance calculator'
      />
      <HomePageForm 
        formRef={formRef}
        data={citiesData}
        setKeyValue={setKeyValue}
        value={value}
        handleChange={handleChange}
        date={date}
        handleDateChange={handleDateChange}
        handlePassengersChange={handlePassengersChange}
        isLoading={citiesMutation.isLoading}
      />
    </HomeComponent>
  );
}
export default Home;
