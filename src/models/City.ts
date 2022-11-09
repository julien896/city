interface ICity {
    name: string;
    latitude: number;
    longitude: number;
  }
  
export class City {
  name: string;
  latitude: number;
  longitude: number;
  
  constructor(args: ICity) {
    this.name = args.name;
    this.latitude = args.latitude;
    this.longitude = args.longitude;
  }
}