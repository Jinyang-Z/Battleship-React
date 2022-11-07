import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './TextCarousel.module.scss';

const TextCarousel = () => (
  <div className={styles['text-carousel']}>
    <div className={styles['text-carousel__container']}>
      <div className={styles['text-carousel__container__carousel']}>
        <div className={styles['text-carousel__container__carousel__change']}>
          <div
            className={
                styles['text-carousel__container__carousel__change__content']
              }
          >
            <div
              className={
                  styles[
                    'text-carousel__container__carousel__change__content__item'
                  ]
                }
            >
              🔥
              <FormattedMessage id="fire" />
              🔥
            </div>
            <div
              className={
                  styles[
                    'text-carousel__container__carousel__change__content__item'
                  ]
                }
            >
              💥
              <FormattedMessage id="touched" />
              💥
            </div>
            <div
              className={
                  styles[
                    'text-carousel__container__carousel__change__content__item'
                  ]
                }
            >
              🚢
              <FormattedMessage id="flowed" />
              🚢
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TextCarousel;
