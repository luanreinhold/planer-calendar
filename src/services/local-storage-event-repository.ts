import type { CalendarEvent } from "../models/calendar-event-model";
import type { EventRepository } from "./calendar-repository";

const STORAGE_KEY = "calendar:events";

export class LocalStorageEventRepository implements EventRepository {
  private read(): CalendarEvent[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CalendarEvent[]) : [];
  }

  private write(events: CalendarEvent[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  async list(range: { start: string; end: string }): Promise<CalendarEvent[]> {
    return this.read().filter((event) => event.start >= range.start && event.start < range.end);
  }

  async create(event: Omit<CalendarEvent, "id">): Promise<CalendarEvent> {
    const created: CalendarEvent = { ...event, id: crypto.randomUUID() };
    this.write([...this.read(), created]);
    return created;
  }

  async update(event: CalendarEvent): Promise<CalendarEvent> {
    this.write(this.read().map((current) => (current.id === event.id ? event : current)));
    return event;
  }

  async remove(id: string): Promise<void> {
    this.write(this.read().filter((event) => event.id !== id));
  }
}
