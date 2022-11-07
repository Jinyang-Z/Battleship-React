import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';

import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import SignUp from '../../redux/actions/auth/SignUp';
import FormikInput from '../formik/inputs/FormikInput';
import FormikErrorMessage from '../formik/error/FormikErrorMessage';
import toastify from '../toastify/Toastify';

import { ISignUpInput } from '../../services/SignUp';
import styles from './SignUpCard.module.scss';

const SignUpCard = () => {
  const t = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoading, isError } = useAppSelector(
    (state) => state.auth,
  );
  const { message } = useAppSelector((state) => state.message);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t.formatMessage({ id: 'email-is-required' }))
      .email(t.formatMessage({ id: 'invalid-email' })),
    pseudo: Yup.string()
      .required(t.formatMessage({ id: 'pseudo-is-required' }))
      .min(2, t.formatMessage({ id: 'pseudo-is-too-short' }))
      .max(10, t.formatMessage({ id: 'pseudo-is-too-long' })),
    password: Yup.string()
      .required(t.formatMessage({ id: 'password-is-required' }))
      .min(
        8,
        t.formatMessage(
          { id: 'password-need-to-longger-than-n-character' },
          { n: 8 },
        ),
      )
      .max(
        50,
        t.formatMessage(
          { id: 'password-need-to-shorter-than-n-character' },
          { n: 50 },
        ),
      ),
    confirmPassword: Yup.string()
      .required(t.formatMessage({ id: 'confirm-your-password-is-required' }))
      .oneOf(
        [Yup.ref('password'), null],
        t.formatMessage({ id: 'passwords-dont-match' }),
      ),
  });

  const handleSignUp = (formValues: ISignUpInput) => {
    const { pseudo, email, password } = formValues;
    dispatch(SignUp({ pseudo, email, password }));
  };

  useEffect(() => {
    if (!isLoading && isLoggedIn && message) {
      toastify({ type: 'success', message });
      navigate('/rooms');
    } else if (!isLoading && !isLoggedIn && isError && message) {
      toastify({ type: 'error', message });
    }
  }, [navigate, isLoggedIn, isLoading, isError, message]);

  return (
    <div className={styles.signUpCard}>
      <div className={styles.signUpCard__header}>
        <p className={styles.signUpCard__header__title}>
          <FormattedMessage id="welcome" />
        </p>
        <p className={styles.signUpCard__header__subtitle}>
          <FormattedMessage id="signup-to-battleship" />
        </p>
      </div>
      <Formik
        initialValues={{
          email: '',
          pseudo: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ errors, touched }) => (
          <Form className={styles.signUpCard__form}>
            <div className={styles.signUpCard__form__content}>
              <label
                className={styles.signUpCard__form__content__label}
                htmlFor="email"
              >
                <FormattedMessage id="email" />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.formatMessage({ id: 'enter-your-email' })}
                  component={FormikInput}
                  error={touched.email ? !!errors.email : false}
                />
                {errors.email && touched.email ? (
                  <FormikErrorMessage message={errors.email} />
                ) : null}
              </label>
            </div>
            <div className={styles.signUpCard__form__content}>
              <label
                className={styles.signUpCard__form__content__label}
                htmlFor="pseudo"
              >
                <FormattedMessage id="pseudo" />
                <Field
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  placeholder={t.formatMessage({ id: 'enter-your-pseudo' })}
                  component={FormikInput}
                  error={touched.pseudo ? !!errors.pseudo : false}
                />
                {errors.pseudo && touched.pseudo ? (
                  <FormikErrorMessage message={errors.pseudo} />
                ) : null}
              </label>
            </div>
            <div className={styles.signUpCard__form__content}>
              <label
                htmlFor="password"
                className={styles.signUpCard__form__content__label}
              >
                <FormattedMessage id="password" />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t.formatMessage({ id: 'enter-your-password' })}
                  component={FormikInput}
                  error={touched.password ? !!errors.password : false}
                />
                {errors.password && touched.password ? (
                  <FormikErrorMessage message={errors.password} />
                ) : null}
              </label>
            </div>
            <div className={styles.signUpCard__form__content}>
              <label
                className={styles.signUpCard__form__content__label}
                htmlFor="confirmPassword"
              >
                <FormattedMessage id="confirm-your-password" />
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t.formatMessage({ id: 'confirm-your-password' })}
                  component={FormikInput}
                  error={
                    touched.confirmPassword ? !!errors.confirmPassword : false
                  }
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <FormikErrorMessage message={errors.confirmPassword} />
                ) : null}
              </label>
            </div>
            <button className={styles.signUpCard__form__button} type="submit">
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <FormattedMessage id="register" />
              )}
            </button>
          </Form>
        )}
      </Formik>

      <div className={styles.signUpCard__footer}>
        <p className={styles.signUpCard__footer__label}>
          <FormattedMessage id="already-have-an-account" />
        </p>
        <a className={styles.signUpCard__footer__link} href="/signin">
          <FormattedMessage id="signin" />
        </a>
      </div>
    </div>
  );
};

export default SignUpCard;
