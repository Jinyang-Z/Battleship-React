import { RouteParams } from 'koa-smart/dist/routes/Route';
import Route from './Route';
import User from '../db/models/UserModel';
import { Types } from 'koa-smart/dist/types';
import UserException from '../exceptions/UserExceptions';
import { generateTokenJwt } from '../utils';
import { DateTime } from 'luxon';
import { FJContext } from '../types/Context';

@Route.Route({
  routeBase: '/user',
})
export default class RouteUser extends Route {
  constructor(params: RouteParams) {
    super({ ...params });
  }

  // http://localhost:3000/user/
  @Route.Get({ path: '/' })
  index(ctx: FJContext) {
    this.sendOk(ctx, {
      code: 200,
      // message: ctx.app.
    });
  }

  // http://localhost:3000/user/test
  @Route.Get({ path: '/' },
  )

  test(ctx: FJContext) {
    this.sendOk(ctx, null);
  }

  // http://localhost:3000/user/sign-in
  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string().required(),
    }),
  })
  async signIn(ctx: FJContext) {
    const { password, email } = <User>ctx.request.body;
    try {
      const user =  await User.logInUserAsync(email.toLowerCase(), password);
      // TODO: refresh token
      const token = generateTokenJwt(user.toJSON(), DateTime.now().plus({ days: 7 }).toMillis());
      this.sendOk(ctx, { user, token }, ctx.i18n.__('SignInSuccess'));
    } catch (e) {
      console.error(`Error: ${(e as ReferenceError).message}`);
      if (e instanceof UserException) {
        // TODO: Logger to log into a log file
        // console.log('Stack: ', e.stack);
        this.throw(e.status, e.message, true);
      }
      this.throw(500, 'GlobalError', true);
    }
  }

  // http://localhost:3000/user/sign-up
  @Route.Post({
    bodyType: Types.object().keys({
      pseudo: Types.string().required(),
      password: Types.string().required(),
      email: Types.string().required(),
    }),
    // accesses: [],
  })
  async signUp(ctx: FJContext) {
    const { pseudo, password, email } = <User>ctx.request.body;

    try {
      const newUser = await User.addUserAsync(pseudo, password, email.toLowerCase());
      // TODO: refresh token
      const token = generateTokenJwt(newUser.toJSON(), DateTime.now().plus({ days: 7 }).toMillis());
      this.sendCreated(ctx, { user: newUser, token });
    } catch (e) {
      console.error(`Error: ${(e as ReferenceError).message}`);
      if (e instanceof UserException) {
        // TODO: Logger to log into a log file
        // console.log('Stack: ', e.stack);
        this.throw(e.status, e.message, true);
      }
      this.throw(500, 'GlobalError', true);
    }
  }
}
