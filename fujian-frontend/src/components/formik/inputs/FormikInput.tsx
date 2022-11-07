import React from 'react';
import FormikErrorMessage from '../error/FormikErrorMessage';
import styles from './FormikInput.module.scss';

const FormikInput = ({
  error, field, form, ...props
}: any) => (
  <div className={`${styles['formik-input']}`}>
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      className={`${styles['formik-input__input']} ${
        error && styles['formik-input__input--error']
      }`}
      placeholder={props.placeholder}
      value={field.value}
      onChange={field.onChange}
    />
    {!error && (
    <div className={`${styles['formik-input__hide']}`}>
      <FormikErrorMessage message="hide" />
    </div>
    )}
  </div>
);

export default React.memo(FormikInput);
