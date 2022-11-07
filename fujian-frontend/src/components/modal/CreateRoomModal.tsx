import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import {
  startConnecting,
  createRoom,
} from '../../redux/slices/RoomSlice';
import FormikInput from '../formik/inputs/FormikInput';
import FormikErrorMessage from '../formik/error/FormikErrorMessage';
import toastify from '../toastify/Toastify';

import { ICreateRoomInput } from '../../redux/types/IRoom';
import styles from './CreateRoomModal.module.scss';

interface Props {
  show: boolean;
  onHide: (show: boolean) => void;
}

const CreateRoomModal = ({ show, onHide }: Props) => {
  const t = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isCreated, setIsCreated] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { room, isLoading, isError } = useAppSelector((state) => state.room);
  const { message } = useAppSelector((state) => state.message);

  const handleClose = () => onHide(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t.formatMessage({ id: 'room-name-is-required' }))
      .min(2, t.formatMessage({ id: 'room-name-is-too-short' }))
      .max(10, t.formatMessage({ id: 'room-name-is-too-long' })),
    password: Yup.string()
      .min(
        4,
        t.formatMessage(
          { id: 'room-password-need-to-longger-than-n-character' },
          { n: 4 },
        ),
      )
      .max(
        50,
        t.formatMessage(
          { id: 'room-password-need-to-shorter-than-n-character' },
          { n: 50 },
        ),
      ),
  });

  const handleCreateRoom = (formValues: ICreateRoomInput) => {
    setIsCreated(true);
    dispatch(createRoom(formValues));
  };

  useEffect(() => {
    if (!isLoading && !isError && room && isCreated) {
      toastify({ type: 'success', message });
      navigate(`/room/${room.id}`);
      setIsCreated(false);
    } else if (!isLoading && isError) {
      toastify({ type: 'error', message });
    }
  }, [navigate, message, isLoading, isError, room, isCreated]);

  useEffect(() => {
    dispatch(startConnecting());
  }, [dispatch]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="create-new-room" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
            capacity: 2,
            mapSize: 10,
            shipsAmount: 5,
            shootPerTurn: 1,
            secondsPerTurn: 10,
            password: undefined,
            userId: user!.id,
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreateRoom}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.createRoomModal__form__content}>
                <label
                  className={styles.createRoomModal__form__content__label}
                  htmlFor="name"
                >
                  <FormattedMessage id="room-name" />
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t.formatMessage({ id: 'enter-room-name' })}
                    component={FormikInput}
                    error={touched.name ? !!errors.name : false}
                  />
                  {errors.name && touched.name ? (
                    <FormikErrorMessage message={errors.name} />
                  ) : null}
                </label>
              </div>
              {/* <div className={styles.createRoomModal__form__content}>
                <label
                  className={styles.createRoomModal__form__content__label}
                  htmlFor="password"
                >
                  <FormattedMessage id="room-password" />
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t.formatMessage({ id: 'enter-room-password' })}
                    component={FormikInput}
                    error={touched.password ? !!errors.password : false}
                  />
                  {errors.password && touched.password ? (
                    <FormikErrorMessage message={errors.password} />
                  ) : null}
                </label>
              </div> */}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  <FormattedMessage id="close" />
                </Button>
                <Button variant="success" type="submit">
                  {isLoading ? (
                    <Spinner animation="border" role="status" size="sm" />
                  ) : (
                    <FormattedMessage id="create-room" />
                  )}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateRoomModal;
