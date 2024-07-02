import { Action, Value, View } from "react-calendar/dist/cjs/shared/types";

export interface TileContentInterface {
  activeStartDate: Date | null;
  date: Date;
  view: View;
}

export interface StartDateChangeInterface {
  action: Action;
  activeStartDate: Date | null;
  value: Value;
  view: View;
}
