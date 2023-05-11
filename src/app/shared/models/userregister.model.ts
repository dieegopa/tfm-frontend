export class UserRegister {
  sub: string;
  email: string | null;

  constructor(sub: string, email: string | null) {
    this.sub = sub;
    this.email = email;
  }
}
