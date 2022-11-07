export default interface IUser {
  id: string;
  pseudo: string;
  password: string | null;
  email: string;
  updatedAt: string;
  createdAt: string;
}
