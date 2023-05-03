import {University} from "./university.model";
import {User} from "./user.model";
import {Subject} from "./Subject";
import {Course} from "./course.model";

export class Degree {
  id: number;
  name: string;
  slug: string;
  university: University | null;
  subjects: Subject[];
  users: User[];
  school: string;
  courses: Course[];


  constructor(id: number, name: string, slug: string, school: string, university: any, subjects: Subject[], users: User[], courses: Course[]) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.school = school;
    this.university = university;
    this.subjects = subjects;
    this.users = users;
    this.courses = courses;
  }
}
