module.exports.updateTimeMilestone = (totalSeconds, nextMilestoneHr) => {
    const firstMilestones =  [ 10, 20, 50, 100 ];

    const totalHours = Math.floor(totalSeconds/3600);

    if (totalHours >= nextMilestoneHr) {
        const milestoneIndex = firstMilestones.indexOf(nextMilestoneHr);

        if (milestoneIndex > -1 && milestoneIndex < firstMilestones.length - 1) {
            return firstMilestones[milestoneIndex + 1]
        } else {
            return nextMilestoneHr + 100;
        }
    } else {
        return nextMilestoneHr;
    }
};