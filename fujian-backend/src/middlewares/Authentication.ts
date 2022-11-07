import User from '../db/models/UserModel';
import { FJContext } from '../types/Context';
import { getDataTokenJwt } from '../utils';

export default async function Authentication(ctx: FJContext, next: () => Promise<unknown>) {
  const token = ctx.get('Authorization').split(' ')[1];
  if (token && token != 'undefined') {
    try {
      const user = getDataTokenJwt<User>(token);
      ctx.user = user;
    } catch (error) {
      console.error(error);
      throw new Error('Error in authentication middleware');
    }
  }
  await next();
}
