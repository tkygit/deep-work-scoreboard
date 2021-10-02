const currTimer = "currTimer"

export const loadTimerState = () => {
  try {
    const timerState = localStorage.getItem(currTimer)
    if (timerState === null) {
      return 0
    }
    return timerState
  } catch(err) {
    return 0
  }
}

export const saveTimerState = (timerState) => {
  try {
    localStorage.setItem(currTimer, timerState)
  } catch(err) {
    console.log("Error saving timer")
  }
}