
import React, { useEffect, useState } from 'react'
import { HomeComponent } from './HomeComponent';
import { HomeRepository } from '../../services/homeRepository';
import { useDebounce } from '../../hooks/useDebounce';
import { useMutation } from 'react-query';
import { City } from '../../models/City';
import { HomePageForm } from './HomePageForm/HomePageForm';
import { Moment } from 'moment';

export interface DataType {
  origin: City[] | [];
  intermediate: City[] | [];
  destination: City[] | []
}

function Home() {
  const repo = new HomeRepository()
  
  const [value, setValue] = useState<string>('')
  const [keyValue, setKeyValue] = useState<string>('')
  const [citiesData, setCitiesData] = useState<DataType>({
    origin: [],
    intermediate: [],
    destination: [],
  });

  const debouncedValue = useDebounce(value, 700)

  const [date, setDate] = useState<Moment | null>(null);
  const [passengers, setPassengers] = useState<number>(0)

  const handleDateChange = (newValue: Moment | null) => {
    setDate(newValue);
  };

  const handlePassengersChange = (e: any) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value == "" || regex.test(e.target.value)) {
      setPassengers(e.target.value);
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

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const citiesMutationMutate = (key: string) => {
    citiesMutation.mutateAsync(key)
  }

  useEffect(() => {
    citiesMutationMutate(value)
  }, [debouncedValue])
  
  
  return (
    <HomeComponent>
      <HomeComponent.Title 
        title='Distance calculator'
      />
      <HomePageForm 
        data={citiesData}
        setKeyValue={setKeyValue}
        value={value}
        handleChange={handleChange}
        date={date}
        handleDateChange={handleDateChange}
        passengers={passengers}
        handlePassengersChange={handlePassengersChange}
      />
    </HomeComponent>
  );
}
export default Home;
