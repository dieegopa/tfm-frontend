import {User} from "./user.model";
import {Subject} from "./subject.model";

export class File {
  id: number;
  name: string;
  type: string;
  user: User | null;
  subject: Subject | null;
  category: string;
  backName: string;
  extra: string;
  url: string;

  constructor(id: number, name: string, category: string, type: string, user: User | null, subject: Subject | null, backName: string, extra: string, url: string) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.user = user;
    this.subject = subject;
    this.backName = backName;
    this.extra = extra;
    this.url = url;
  }

}
