import {User} from "./user.model";
import {Degree} from "./degree.model";

export class University {
  id: number;
  name: string;
  image_url: string;
  slug: string;
  degrees: Degree[];
  users: User[];

  constructor(id: number, name: string, image_url: string, slug: string, degrees: Degree[], users: User[]) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.slug = slug;
    this.degrees = degrees;
    this.users = users;
  }

}
