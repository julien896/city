import { Moment } from 'moment';
import { City } from '../models/City';
import { haversineDistance } from '../components/base/HaversineFormula';

export interface ITravelData {
  origin: City;
  intermediate?: string[];
  destination: City;
  date: Moment | null;
  passengers: number;
}

export interface ITravelResponse {
  tour: string; 
  km: number;
}

export const getCitiesMapper = (x: any): City => new City(x);

export const setTravelData = (x: ITravelData) => x;

export class HomeRepository {
  keys = {
    cities: () => ["cities"],
  };

  getCities = (key: any) => {
    const res = [
      {
        name:'Paris',
        latitude: 48.856614,
        longitude: 2.352222
      },
      {
        name:'Marseille',
        latitude: 43.296482,
        longitude: 5.369780
      },
      {
        name:'Lyon',
        latitude: 45.764043,
        longitude: 4.835659
      },
      {
        name:'Toulouse',
        latitude: 43.604652,
        longitude: 1.444209
      },
      {
        name:'Nice',
        latitude: 43.710173,
        longitude: 7.261953
      },
      {
        name:'Nantes',
        latitude: 47.218371,
        longitude: -1.553621
      },
      {
        name:'Strasbourg',
        latitude: 48.573405,
        longitude: 7.752111
      },
      {
        name:'Montpellier',
        latitude: 43.610769,
        longitude: 3.876716
      },
      {
        name:'Bordeaux',
        latitude: 44.837789,
        longitude: -0.579180
      },
      {
        name:'Lille',
        latitude: 50.629250,
        longitude: 3.057256
      },
      {
        name:'Rennes',
        latitude: 48.117266,
        longitude: -1.677793
      },
      {
        name:'Reims',
        latitude: 49.258329,
        longitude: 4.031696
      },
      {
        name:'Le Havre',
        latitude: 49.494370,
        longitude: 0.107929
      },
      {
        name:'Saint-Étienne',
        latitude: 45.439695,
        longitude: 4.387178
      },
      {
        name:'Toulon',
        latitude: 43.124228,
        longitude: 5.928000
      },
      {
        name:'Angers',
        latitude: 47.478419,
        longitude: -0.563166
      },
      {
        name:'Grenoble',
        latitude: 45.188529,
        longitude: 5.724524
      },
      {
        name:'Dijon',
        latitude: 47.322047,
        longitude: 5.041480
      },
      {
        name:'Nîmes',
        latitude: 43.836699,
        longitude: 4.360054
      },
      {
        name:'Aix-en-Provence',
        latitude: 43.529742,
        longitude: 5.447427
      }
    ]

    const filtered = res.filter((el:City) => el.name.toLowerCase().includes(
      typeof key !== 'string' ? 
        (key.length !== 0 ? key[key.length - 1].toLowerCase() : '') :  
        key.toLowerCase()
    ) )

    const promise = new Promise((resolve, reject) => {
      if(key.length > 0) {
        resolve(filtered.map(getCitiesMapper))
      } else {
        resolve([])
      }
    })

    return promise
  }

  createTravel = (x: ITravelData) => {
    console.log(x)
    const calculatedDistance = haversineDistance(
      {lat: x.origin.latitude, lng: x.origin.longitude}, 
      {lat: x.destination.latitude, lng: x.destination.longitude}
    )

    const promise: Promise<ITravelResponse> = new Promise((resolve, reject) => {
      resolve({ tour: `${x.origin.name} - ${x.destination.name} `, km: calculatedDistance / 1000 })
    })

    return promise
  }
}

 