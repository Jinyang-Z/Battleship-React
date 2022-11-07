import { FJContext } from '../types/Context';

export default async function ResponseTime(ctx: FJContext, next: () => Promise<unknown>) {
  console.log('Started tracking response time');
  const started = Date.now();
  await next();
  // once all middleware below completes, this continues
  const ellapsed = `${(Date.now() - started).toString()}ms`;
  console.log('Response time is:', ellapsed);
  ctx.set('X-ResponseTime', ellapsed);
}
