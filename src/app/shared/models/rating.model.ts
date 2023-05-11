import {File} from "./file.model";
import {User} from "./user.model";

export class Rating {
  id: number | undefined;
  value: number | undefined;
  file: File | undefined;
  user: User | undefined;

  constructor(id: number | undefined, value: number | undefined, file: File | undefined, user: User | undefined) {
    this.id = id;
    this.value = value;
    this.file = file;
    this.user = user;
  }

}
