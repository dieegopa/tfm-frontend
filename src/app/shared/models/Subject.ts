import {User} from "./user.model";
import {Degree} from "./degree.model";
import {Course} from "./course.model";

export class Subject {
  id: number;
  name: string;
  slug: string;
  degrees: Degree[];
  users: User[];
  course: Course | null;

  constructor(id: number, name: string, slug: string, degrees: Degree[], users: User[], course: Course | null) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.degrees = degrees;
    this.users = users;
    this.course = course;
  }
}
