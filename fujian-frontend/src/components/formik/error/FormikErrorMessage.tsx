import React from 'react';
import styles from './FormikErrorMessage.module.scss';

interface Props {
  message: string;
}

const FormikErrorMessage = ({ message }: Props) => <div className={styles['formik-error-message']}>{message}</div>;

export default React.memo(FormikErrorMessage);
