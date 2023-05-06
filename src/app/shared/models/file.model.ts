import {User} from "./user.model";
import {Category} from "./category.enum";
import {Subject} from "./subject";

export class File {
  id: number;
  name: string;
  category: Category;
  type: string;
  user: User | null;
  subject: Subject | null;

  constructor(id: number, name: string, category: Category, type: string, user: User | null, subject: Subject | null) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.user = user;
    this.subject = subject;
  }

}
