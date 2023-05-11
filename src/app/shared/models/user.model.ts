import {University} from "./university.model";
import {Subject} from "./subject.model";
import {Degree} from "./degree.model";
import {File} from "./file.model";

export class User {
  sub: string;
  roles: string[] | null;
  email: string | null;
  universities: University[] | null;
  subjects: Subject[] | null;
  degrees: Degree[] | null;
  files: File[] | null;

  constructor(sub: string, email: string | null, roles: string[] | null, universities: University[] | null, subjects: Subject[] | null, degrees: Degree[] | null, files: File[] | null) {
    this.sub = sub;
    this.email = email;
    this.roles = roles;
    this.universities = universities;
    this.subjects = subjects;
    this.degrees = degrees;
    this.files = files;
  }
}
