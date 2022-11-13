
import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material';
import { HomeComponent } from './HomeComponent';
import { HomeRepository } from '../../services/homeRepository';
import { useDebounce } from '../../hooks/useDebounce';
import { useMutation } from 'react-query';
import { City } from '../../models/City';

function Home() {
  const repo = new HomeRepository()
  
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<City[] | []>([]);

  const debouncedValue = useDebounce(value, 700)

  const citiesMut = useMutation(repo.getCities, {
    onSuccess:(data: any) => {
      if(data) {
        setData(data)
      } else {
        setData([])
      }
    }
  })

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const citiesMutation = (key: string) => {
    citiesMut.mutateAsync(key)
  }

  useEffect(() => {
    citiesMutation(value)
  }, [debouncedValue])
  
  
  return (
    <HomeComponent>
      <HomeComponent.Title 
        title='Distance calculator'
      />
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
    </HomeComponent>
  );
}
export default Home;
