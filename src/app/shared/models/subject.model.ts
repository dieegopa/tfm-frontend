import {User} from "./user.model";
import {Degree} from "./degree.model";
import {Course} from "./course.model";
import {File} from "./file.model";

export class Subject {
  id: number;
  name: string;
  slug: string;
  degrees: Degree[];
  users: User[];
  course: Course | null;
  files: File[];
  favorite: boolean | undefined;

  constructor(id: number, name: string, slug: string, degrees: Degree[], users: User[], course: Course | null, files: File[], favorite: boolean = false) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.degrees = degrees;
    this.users = users;
    this.course = course;
    this.files = files;
    this.favorite = favorite;
  }
}
