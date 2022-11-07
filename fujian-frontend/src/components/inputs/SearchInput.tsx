import React from 'react';
import { useIntl } from 'react-intl';
import styles from './SearchInput.module.scss';

const SearchInput = () => {
  const t = useIntl();

  return (
    <input
      className={styles['search-input']}
      type="text"
      placeholder={t.formatMessage({ id: 'seach-by-game-id' })}
    />
  );
};

export default SearchInput;
