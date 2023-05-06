import {User} from "./user.model";
import {Subject} from "./subject";

export class File {
  id: number;
  name: string;
  category: string;
  type: string;
  user: User | null;

  constructor(id: number, name: string, category: string, type: string, user: User | null) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.user = user;
  }

}
