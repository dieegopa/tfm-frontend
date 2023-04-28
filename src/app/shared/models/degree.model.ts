import {University} from "./university.model";
import {User} from "./user.model";
import {Subject} from "./Subject";

export class Degree {
  id: number;
  name: string;
  slug: string;
  school: string;
  university: University | null;
  subjects: Subject[];
  Users: User[];

  constructor(id: number, name: string, slug: string, school: string, university: any, subjects: Subject[], Users: User[]) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.school = school;
    this.university = university;
    this.subjects = subjects;
    this.Users = Users;
  }
}
