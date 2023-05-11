import {Sections} from "../models/sections.interface";

export const TREE_DATA: Sections[] = [
  {
    name: 'Mis Aportaciones',
    children: [],
    id: null,
    type: 'contributions',
  },
  {
    name: 'Favoritos',
    children: [
      {name: 'Universidades', children: [], id: null, type: null},
      {name: 'Titulaciones', children: [], id: null, type: null},
      {name: 'Asignaturas', children: [], id: null, type: null},
    ],
    id: null,
    type: null,
  },
];
