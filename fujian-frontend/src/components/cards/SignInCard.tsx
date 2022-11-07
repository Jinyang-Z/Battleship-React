import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { ISignInInput } from '../../services/SignIn';
import SignIn from '../../redux/actions/auth/SignIn';
import FormikInput from '../formik/inputs/FormikInput';
import FormikErrorMessage from '../formik/error/FormikErrorMessage';
import toastify from '../toastify/Toastify';

import styles from './SignInCard.module.scss';

const SignInCard = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoading, isError } = useAppSelector(
    (state) => state.auth,
  );
  const { message } = useAppSelector((state) => state.message);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(intl.formatMessage({ id: 'invalid-email' }))
      .required(intl.formatMessage({ id: 'email-is-required' })),
    password: Yup.string().required(
      intl.formatMessage({ id: 'password-is-required' }),
    ),
  });

  const handleSignIn = (formValues: ISignInInput) => {
    const { email, password } = formValues;
    dispatch(SignIn({ email, password }));
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
    <div className={styles.signInCard}>
      <div className={styles.signInCard__header}>
        <p className={styles.signInCard__header__title}>
          <FormattedMessage id="welcome" />
        </p>
        <p className={styles.signInCard__header__subtitle}>
          <FormattedMessage id="signin-to-battleship" />
        </p>
      </div>

      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({ errors, touched }) => (
          <Form className={styles.signInCard__form}>
            <div className={styles.signInCard__form__content}>
              <label
                htmlFor="email"
                className={styles.signInCard__form__content__label}
              >
                <FormattedMessage id="email" />
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder={intl.formatMessage({ id: 'enter-your-email' })}
                  component={FormikInput}
                  error={touched.email ? !!errors.email : false}
                />
                {errors.email && touched.email ? (
                  <FormikErrorMessage message={errors.email} />
                ) : null}
              </label>
            </div>

            <div className={styles.signInCard__form__content}>
              <label
                htmlFor="password"
                className={styles.signInCard__form__content__label}
              >
                <FormattedMessage id="password" />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder={intl.formatMessage({
                    id: 'enter-your-password',
                  })}
                  component={FormikInput}
                  error={touched.password ? !!errors.password : false}
                />
                {errors.password && touched.password ? (
                  <FormikErrorMessage message={errors.password} />
                ) : null}
              </label>
            </div>

            <div className={styles['signInCard__form__remember-and-forgot']}>
              <div className={styles['signInCard__form__remember-and-forgot__input']}>
                <Field id="rememberMe" type="checkbox" name="rememberMe" />
                <span
                  className={
                    styles['signInCard__form__remember-and-forgot__remember-me']
                  }
                >
                  <FormattedMessage id="remember-me" />
                </span>
              </div>

              <a
                className={
                  styles['signInCard__form__remember-and-forgot__forgot-password']
                }
                href="/"
              >
                <FormattedMessage id="forgot-password" />
              </a>
            </div>

            <button className={styles.signInCard__form__button} type="submit">
              {isLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                <FormattedMessage id="signin" />
              )}
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.signInCard__footer}>
        <p className={styles.signInCard__footer__label}>
          <FormattedMessage id="create-account" />
        </p>
        <a className={styles.signInCard__footer__link} href="/signup">
          <FormattedMessage id="register" />
        </a>
      </div>
    </div>
  );
};

export default React.memo(SignInCard);
