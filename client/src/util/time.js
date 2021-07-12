const convertToHrMins = (timeGoal) => {
    const numHours = Math.floor(timeGoal / 3600);
    const numMinutes = Math.floor(timeGoal % 3600 / 60);

    if (numHours === 0) {
        return numMinutes.toString() + "min"
    } else if (numHours > 0 && numMinutes === 0) {
        return numHours.toString() + "hr"
    } else {
        return numHours.toString() + "hr " + numMinutes.toString() + "min"
    }
};

export default convertToHrMins;
