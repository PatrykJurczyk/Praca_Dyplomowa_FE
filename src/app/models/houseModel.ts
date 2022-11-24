export interface HouseModel {
  _id: string;
  owner: string;
  country: string;
  province: string;
  city: string;
  street: string;
  houseNr: string;
  yearBuilt: number;
  price: number;
  dimension: number;
  floorsInBuilding: number;
  floor?: number;
  createdAt: string;
  roomsNumber: number;
  bathroomNumber: number;
  otherFeatures?: string[];
  descriptionField?: string;
  images: string[];
  isAccepted: 0 | 1 | 2;
  isReserved: 0 | 1 | 2 | 3;
}

export interface HouseDetailModel {
  open: boolean;
  idHouse: string;
}
