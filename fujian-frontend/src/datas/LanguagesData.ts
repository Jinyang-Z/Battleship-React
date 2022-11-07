import LanguagesEnum from '../enums/LanguagesEnum';

export interface ILanguages {
  id: LanguagesEnum;
  icon: string;
  country: string;
}

export const LanguagesData: ILanguages[] = [
  {
    id: LanguagesEnum.FR,
    icon: '🇫🇷',
    country: 'France',
  },
  {
    id: LanguagesEnum.EN,
    icon: '🇺🇸',
    country: 'English',
  },
];
