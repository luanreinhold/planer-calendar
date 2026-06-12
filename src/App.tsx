
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import './App.css'

function App() {
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr)
  }
  return (
    <>
     
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
            dateClick={handleDateClick}

    />
   
    </>
  )
}

export default App
