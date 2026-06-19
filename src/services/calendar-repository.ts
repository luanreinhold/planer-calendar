import type { CalendarEvent } from "../models/calendar-event-model";

export interface EventRepository {
  list(range: { start: string; end: string }): Promise<CalendarEvent[]>;
  create(event: Omit<CalendarEvent, "id">): Promise<CalendarEvent>;
  update(event: CalendarEvent): Promise<CalendarEvent>;
  remove(id: string): Promise<void>;
}
