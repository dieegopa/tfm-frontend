import {University} from "./university.model";
import {User} from "./user.model";
import {Subject} from "./subject.model";
import {Course} from "./course.model";

export class Degree {
  id: number;
  name: string;
  slug: string;
  university: University | null;
  subject: Subject[];
  users: User[];
  school: string;
  courses: Course[];
  favorite: boolean | undefined;


  constructor(id: number, name: string, slug: string, school: string, university: any, subject: Subject[], users: User[], courses: Course[], favorite: boolean = false) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.school = school;
    this.university = university;
    this.subject = subject;
    this.users = users;
    this.courses = courses;
    this.favorite = favorite;
  }
}
