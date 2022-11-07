import { v4 as uuid } from 'uuid';
import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, PrimaryKey, Unique, DataType } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { ErrorApp, ErrorYt } from 'koa-smart';
import UserException from '../../exceptions/UserExceptions';

//https://www.npmjs.com/package/sequelize-typescript#recommendations-and-limitations
@Table({
  timestamps: true,  
})
export default class User extends Model {
  @Unique(true)
  @PrimaryKey
  @Column
    id!: string;

  @Unique(true)
  @Column
    pseudo!: string;
  
  @Unique(true)
  @Column
    email!: string;

  @Column
    password!: string;

  getPseudo(): string {
    return this.getDataValue('pseudo') as string;
  }

  static async addUserAsync(pseudo: string, password: string, email: string): Promise<User> {
    const saltRounds = 10;

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      throw new UserException(400, 'EmailInvalid');
    }

    if (await User.findOne({ where: { email } })) {
      throw new UserException(409, 'EmailAlreadyUsed');
    }

    if (await User.findOne({ where: { pseudo } })) {
      throw new UserException(409, 'PseudoAlreadyUsed');
    }
    let newUser: User;
    await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          reject(err);
        }
        newUser = User.build({ id: uuid(), pseudo, password: hash, email: email });    
        await newUser.save();
        resolve(hash);
      });
    });
    newUser.password = null;
    return newUser;
  }

  static async logInUserAsync(email: string, password: string): Promise<User> {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      throw new UserException(400, 'EmailInvalid');
    }

    const user = await User.findOne({ where: { email } });

    if (!await bcrypt.compare(password, user.password)) {
      throw new UserException(401, 'BadCredentials');
    }
    user.password = null;
    return user;
  }

  static async getUserById(id: string): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new UserException(404, 'UserNotFound');
    }
    user.password = null;
    user.email = null;
    return user;
  }
}
