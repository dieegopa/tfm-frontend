import {Subject} from "./subject.model";
import {Degree} from "./degree.model";

export class Course {

  id: number;
  name: string;
  slug: string;
  degree: Degree | null;
  subjects: Subject[];
  number: number

  constructor(id: number, name: string, slug: string, subjects: Subject[], degree: Degree | null, number: number) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.subjects = subjects;
    this.degree = degree;
    this.number = number;
  }
}
