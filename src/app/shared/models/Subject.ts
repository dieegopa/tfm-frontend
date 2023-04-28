import {User} from "./user.model";
import {Degree} from "./degree.model";

export class Subject {
  id: number;
  name: string;
  slug: string;
  degrees: Degree[];
  users: User[];

  constructor(id: number, name: string, slug: string, degrees: Degree[], users: User[]) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.degrees = degrees;
    this.users = users;
  }
}
