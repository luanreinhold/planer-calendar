import { useCallback, useEffect, useState } from "react";
import type { CalendarEvent } from "../models/calendar-event-model";
import type { EventRepository } from "../services/calendar-repository";

interface DateRange {
  start: string;
  end: string;
}

export function useCalendarEvents(repository: EventRepository, range: DateRange) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setEvents(await repository.list(range));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [repository, range.start, range.end]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createEvent = useCallback(
    async (event: Omit<CalendarEvent, "id">) => {
      await repository.create(event);
      await refresh();
    },
    [repository, refresh],
  );

  const updateEvent = useCallback(
    async (event: CalendarEvent) => {
      await repository.update(event);
      await refresh();
    },
    [repository, refresh],
  );

  const removeEvent = useCallback(
    async (id: string) => {
      await repository.remove(id);
      await refresh();
    },
    [repository, refresh],
  );

  return { events, loading, error, createEvent, updateEvent, removeEvent, refresh };
}
