import { RouteParams } from 'koa-smart/dist/routes/Route';
import { Context } from 'koa';
import Route from './Route';

@Route.Route({
  routeBase: '',
})
export default class RouteIndex extends Route {
  constructor(params: RouteParams) {
    super({ ...params });
  }

  // http://localhost:3000/
  @Route.Get({ path: '/' })
  index(ctx: Context) {
    this.sendOk(ctx, {
      code: 200,
      message: 'Salut les potes',
    });
  }
}
