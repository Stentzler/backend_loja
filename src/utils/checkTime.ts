const compareTime = (startTime: string, finishTime: string) => {
	const date = new Date();
	const currentlyHour = date.getHours();
	const currentlyMins = date.getMinutes();

	const startHour = Number(startTime.slice(0, 2));
	const startMins = Number(startTime.slice(3));

	const endHour = Number(finishTime.slice(0, 2));
	const endMins = Number(finishTime.slice(3));

	// Hora de inicio igual horario atual
	if (currentlyHour === startHour) {
		if (currentlyMins >= startMins) {
			return true;
		}
		return false;
	}

	// Hora final igual horario atual
	if (currentlyHour === endHour) {
		if (currentlyMins <= endMins) {
			return true;
		}
		return false;
	}

	// Horario de trabalho noturno que passa das 00:00 (checagem até meia noite)
	if (endHour < startHour && currentlyHour > startHour) {
		return true;
	}
	// Horario de trabalho noturno que passa das 00:00 (checagem apos meia noite)
	if (endHour < startHour && currentlyHour < endHour) {
		return true;
	}

	// Horario atual entre horario inicial e horario final
	if (currentlyHour > startHour && currentlyHour < endHour) {
		return true;
	}

	return false;
};

export default compareTime;
