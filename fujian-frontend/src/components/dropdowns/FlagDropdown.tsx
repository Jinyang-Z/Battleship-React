import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { GetLanguageCookie, SetLanguageCookie } from '../../utils/Languages';
import LanguagesEnum from '../../enums/LanguagesEnum';
import { ILanguages, LanguagesData } from '../../datas/LanguagesData';

const FlagDropdown = () => {
  const [currentLanguage, setCurrentLanguage] = useState<ILanguages>();

  useEffect(() => {
    const language = GetLanguageCookie();
    setCurrentLanguage(LanguagesData.find((x) => x.id === language));
  }, []);

  const handleLanguageChange = (language: LanguagesEnum) => {
    SetLanguageCookie(language);
    setCurrentLanguage(LanguagesData.find((x) => x.id === language));
    window.location.reload();
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {currentLanguage?.icon}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleLanguageChange(LanguagesEnum.FR)}>
          🇫🇷 Français
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange(LanguagesEnum.EN)}>
          🇺🇸 English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FlagDropdown;
