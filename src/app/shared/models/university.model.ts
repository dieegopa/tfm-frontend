import {User} from "./user.model";
import {Degree} from "./degree.model";

export class University {
  id: number | undefined;
  name: string | undefined;
  image_url: string | undefined;
  slug: string | undefined;
  degrees: Degree[] | undefined;
  users: User[] | undefined;

  constructor(id: number | undefined, name: string | undefined, image_url: string | undefined, slug: string | undefined, degrees: Degree[] | undefined, users: User[] | undefined) {
    this.id = id;
    this.name = name;
    this.image_url = image_url;
    this.slug = slug;
    this.degrees = degrees;
    this.users = users;
  }

}
