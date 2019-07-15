export interface Props {}

export interface Column {
  width: number;
  panels: Panel[];
}

export type Panel = JSX.Element;
