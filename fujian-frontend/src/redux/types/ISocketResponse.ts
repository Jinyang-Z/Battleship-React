export interface ISocketResponse<T> {
  error?: string;
  data: T;
}
