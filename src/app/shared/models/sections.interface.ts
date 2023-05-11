export interface Sections {
  name: string;
  children?: Sections[] | null | undefined;
  id: number | null;
  type: string | null;
}
