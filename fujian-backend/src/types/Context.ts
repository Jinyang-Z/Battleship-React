import { I18n } from 'i18n';
import { Context } from 'koa';

export interface FJContext extends Context {
  i18n: I18n;
}