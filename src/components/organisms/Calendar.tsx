import { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { MonthNavigation } from "@/components/molecules/MonthNavigation";
import { CalendarBody } from "@/components/molecules/CalenderBody";
import { getCurrentDate, getDaysArray, useCalendarFunctions } from "@/utils/functions/dateUtils";

export const Calendar = () => {
	const { year, month, date } = getCurrentDate();

	const todayRef = useRef({
		year,
		month,
		date,
	});

	const { currentDate, selectedDate, handleChangeMonth, handleDateChoice } = useCalendarFunctions({
		year,
		month,
		date,
	});

	const daysArray = useMemo(() => getDaysArray(currentDate), [currentDate]);

	return (
		<View style={styles.calendar}>
			<MonthNavigation handleChangeMonth={handleChangeMonth} currentDate={currentDate} />
			<CalendarBody
				daysArray={daysArray}
				todayRef={todayRef}
				selectedDate={selectedDate}
				handleDateChoice={handleDateChoice}
				currentDate={currentDate}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	calendar: {
		width: "100%",
		height: "50%",
	},
});
