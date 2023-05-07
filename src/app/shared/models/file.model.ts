import {User} from "./user.model";
import {Subject} from "./subject.model";

export class File {
  id: number;
  name: string;
  category: string;
  type: string;
  user: User | null;
  subject: Subject | null;

  constructor(id: number, name: string, category: string, type: string, user: User | null, subject: Subject | null) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.user = user;
    this.subject = subject;
  }

}
