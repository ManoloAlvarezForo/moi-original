export type ActivityType =
  | 'revisit'
  | 'street'
  | 'houseToHouse'
  | 'letter'
  | 'bibleStudy'
  | 'phone';

export type ActivityPropsType = {
  id?: string;
  date: any;
  activity: string;
  hours: number;
  videos: number;
  publications: number;
  revisits: number;
  additionalInfo?: string;
  createdDate?: any;
  revisitPerson?: string;
};

export type ActivityByDate = {
  [key: string]: [ActivityPropsType];
};

export enum ACTIVITY_LABEL_TYPE {
  revisit = 'Revisita',
  street = 'Calles',
  houseToHouse = 'De Casa en Casa',
  letter = 'Cartas',
  bibleStudy = 'Estudio Biblico',
  phone = 'Telefono',
  cart = 'Carrito',
}

export enum ACTIVITY_TYPE {
  REVISIT = 'revisit',
  STREET = 'street',
  HOUSE_TO_HOUSE = 'houseToHouse',
  LETTER = 'letter',
  BIBLE_STUDY = 'bibleStudy',
  PHONE = 'phone',
  CART = 'cart',
}
