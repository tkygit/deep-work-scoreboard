const currTimer = "currTimer"

export const loadTimerState = (sessionId) => {
  try {
    const timerStateStr = localStorage.getItem(currTimer)
    const timerState = JSON.parse(timerStateStr)
    if (timerState.id !== sessionId) {
      return 0
    }
    return timerState.time
  } catch(err) {
    return 0
  }
}

export const saveTimerState = (timerState) => {
  try {
    const timerStateStr = JSON.stringify(timerState)
    localStorage.setItem(currTimer, timerStateStr)
  } catch(err) {
    console.log("Error saving timer")
  }
}