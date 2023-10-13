import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class Generator {
  password(passwordString: string): string {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    return hashSync(passwordString, salt);
  }

  comparePassword = (passwordString: string, hashPasswordString: string) =>
    compareSync(passwordString, hashPasswordString);
}
