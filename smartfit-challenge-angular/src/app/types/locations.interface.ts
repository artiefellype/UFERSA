import { Schedules } from "./schedules.interface";

export interface Locations {
  id: number,
  title: string,
  content: string,
  opened: boolean,
  mask: string,
  towel: string,
  fountain: string,
  locker_room: string,
  schedules: Schedules []
}
