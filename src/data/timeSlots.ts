import { TimeSlot } from '@/types/order'

// Horaires d'ouverture du restaurant
export const openingHours = {
  lunch: { start: '11:30', end: '14:30' },
  dinner: { start: '18:00', end: '22:30' }
}

// Générer les créneaux de 15 minutes
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  
  // Créneaux du midi
  const lunchSlots = generateSlotsForPeriod(
    openingHours.lunch.start, 
    openingHours.lunch.end, 
    isToday, 
    today
  )
  
  // Créneaux du soir
  const dinnerSlots = generateSlotsForPeriod(
    openingHours.dinner.start, 
    openingHours.dinner.end, 
    isToday, 
    today
  )
  
  return [...lunchSlots, ...dinnerSlots]
}

function generateSlotsForPeriod(
  startTime: string, 
  endTime: string, 
  isToday: boolean, 
  currentTime: Date
): TimeSlot[] {
  const slots: TimeSlot[] = []
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  
  let currentHour = startHour
  let currentMin = startMin
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`
    
    // Vérifier si le créneau est disponible (pas dans le passé si c'est aujourd'hui)
    let available = true
    if (isToday) {
      const slotTime = new Date()
      slotTime.setHours(currentHour, currentMin, 0, 0)
      // Ajouter 30 minutes de délai minimum
      const minTime = new Date(currentTime.getTime() + 30 * 60 * 1000)
      available = slotTime > minTime
    }
    
    slots.push({
      time: timeString,
      available
    })
    
    // Ajouter 15 minutes
    currentMin += 15
    if (currentMin >= 60) {
      currentMin = 0
      currentHour++
    }
  }
  
  return slots
}

// Obtenir les 7 prochains jours (sauf dimanche fermé si applicable)
export const getAvailableDates = (): Date[] => {
  const dates: Date[] = []
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Ajouter tous les jours (le restaurant est ouvert 7j/7 selon les infos)
    dates.push(date)
  }
  
  return dates
}
