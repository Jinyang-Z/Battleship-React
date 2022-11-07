import Cookies from 'universal-cookie';
import LanguagesEnum from '../enums/LanguagesEnum';
import FRFR from '../translations/fr-FR.json';
import ENUS from '../translations/en-US.json';

export const GetMessages = (language?: LanguagesEnum) => {
  switch (language) {
    case LanguagesEnum.FR:
      return FRFR;
    case LanguagesEnum.EN:
      return ENUS;
    default:
      return ENUS;
  }
};

export const SetLanguageCookie = (language: LanguagesEnum) => {
  const cookies = new Cookies();
  cookies.set('language', language, { path: '/' });
};

export const GetLanguageCookie = () => {
  const cookies = new Cookies();

  switch (cookies.get('language')) {
    case LanguagesEnum.FR:
      return LanguagesEnum.FR;
    case LanguagesEnum.EN:
      return LanguagesEnum.EN;
    default:
      cookies.set('language', LanguagesEnum.EN, { path: '/' });
      return LanguagesEnum.EN;
  }
};
