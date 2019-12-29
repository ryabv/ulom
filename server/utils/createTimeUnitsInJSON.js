function createTimeUnitsScheme(minInOne = 5) {
	const elsPerDay = 60 / minInOne * 24;
	const result = [];
	const today = new Date().setHours(0,0,0,0);

	for (let i = 1; i <= elsPerDay; i++) {
		const time = new Date(today + minInOne * (i - 1) * 60 * 1000);
		result.push({
			id: i,
			case_id: 0,
			cat_id: 0,
			time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}T${String(time.getHours()).length < 2 ? '0' + String(time.getHours()) : String(time.getHours())}:${String(time.getMinutes()).length < 2 ? '0' + String(time.getMinutes()) : String(time.getMinutes())}:00`
		});
    }

	return result;
}

module.exports = createTimeUnitsScheme;