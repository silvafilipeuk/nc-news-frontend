function formatCourseDate(date) {
	const dateObj = new Date(date + "T00:00:00");
	return new Intl.DateTimeFormat("en-UK").format(dateObj);
}

export default formatCourseDate;
