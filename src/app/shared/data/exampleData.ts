import {University} from "../models/university.model";
import {Degree} from "../models/degree.model";
import {Subject} from "../models/Subject";
import {Course} from "../models/course.model";

export const courses: Course [] = [
  new Course(1, '1 Grado en Ingenieria Informatica', '1-ingenieria-informatica', [], null, 1),
]

export const subjects: Subject [] = [
  new Subject(1, 'Programación 1', 'program', [], [], courses[0]),
  new Subject(2, 'Programación 2', 'program2', [], [], courses[0]),
  new Subject(3, 'Programación 3', 'program3', [], [], courses[0]),
  new Subject(4, 'Programación 4', 'program4', [], [], courses[0]),
  new Subject(5, 'Programación 5', 'program4', [], [], courses[0]),
  new Subject(6, 'Programación 6', 'program4', [], [], courses[0]),
  new Subject(7, 'Programación 7', 'program4', [], [], courses[0]),
  new Subject(8, 'Programación 8', 'program4', [], [], courses[0]),
  new Subject(9, 'Programación 9', 'program4', [], [], courses[0]),
  new Subject(10, 'Programación 10', 'program4', [], [], courses[0]),
]

export const degrees: Degree[] = [
  new Degree(1, 'Grado en Ingeniería Informática 1', 'grado-en-ingenieria-informatica1', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, subjects, [], []),
  new Degree(2, 'Grado en Ingeniería Informática 2', 'grado-en-ingenieria-informatica2', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], [], []),
  new Degree(3, 'Grado en Ingeniería Informática 3', 'grado-en-ingenieria-informatica3', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], [], []),
  new Degree(4, 'Grado en Ingeniería Informática 4', 'grado-en-ingenieria-informatica4', 'Escuela Técnica Superior de Ingeniería de Sistemas Informáticos', null, [], [], []),
];

export const universities: University[] = [
  new University(1, 'Universidad de Almería', 'https://cofradiadeestudiantes.com/wp-content/uploads/2019/03/05-Logotipo-Vertical.png', 'universidad-de-almeria', [], []),
  new University(2, 'Universidad de Cádiz', 'https://1000marcas.net/wp-content/uploads/2019/12/UCA.jpg', 'universidad-de-cadiz', [], []),
  new University(3, 'Universidad de Córdoba', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Logounicordoba.svg', 'universidad-de-cordoba', [], []),
  new University(4, 'Universidad de Granada', 'https://canal.ugr.es/wp-content/uploads/2017/07/logo-UGR-color-vertical.jpg', 'universidad-de-granada', [], []),
  new University(6, 'Universidad Politécnica de Madrid', 'https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/Logotipo/LOGOTIPO%202%20tintas%20PNG.png', 'universidad-politecnica-madrid', degrees, []),
];
