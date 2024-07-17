import {ItemSelection} from '../components/Select/MoiSelect';
import {ServiceType} from '../types/user';

export const SPANISH = {
  publisher: 'Publicador',
  pioneer: 'Precursor',
};

export const getTranslatedServiceType = (
  service: ServiceType,
  gender: string,
) => {
  const response = serviceByGender[gender].find(
    (s: any) => s.value === service,
  ).label;
  return response;
};

const maleByGender: ItemSelection[] = [
  {id: 0, label: 'Publicador', value: ServiceType.PUBLISHER},
  {id: 1, label: 'Precursor', value: ServiceType.PIONEER},
];

const fameleByGender: ItemSelection[] = [
  {id: 2, label: 'Publicadora', value: ServiceType.PUBLISHER},
  {id: 3, label: 'Precursora', value: ServiceType.PIONEER},
];

const serviceByGender: any = {
  famele: fameleByGender,
  male: maleByGender,
};

export const getItemSelectionByGender = (gender: string) => {
  return serviceByGender[gender];
};

export const getTraslatedServiceByGender = (gender: string) => {
  return serviceByGender[gender].label;
};
