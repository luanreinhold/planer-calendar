import type { DateSelectArg, DatesSetArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import { useCalendarEvents } from "../hooks/use-calendar-events";
import { eventRepository } from "../services/event-repository-instance";

export default function Calendar() {
  // Faixa de datas visível no calendário. O FullCalendar nos avisa dela via `datesSet`.
  const [range, setRange] = useState({ start: "", end: "" });

  const { events, createEvent, removeEvent } = useCalendarEvents(eventRepository, range);

  function handleDatesSet(arg: DatesSetArg) {
    setRange({ start: arg.startStr, end: arg.endStr });
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Please enter a new title for your event");
    selectInfo.view.calendar.unselect(); // limpa a seleção

    if (title) {
      createEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      removeEvent(clickInfo.event.id);
    }
  }

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        datesSet={handleDatesSet}
        select={handleDateSelect}
        eventClick={handleEventClick}
        events={events}
      />
    </div>
  );
}
