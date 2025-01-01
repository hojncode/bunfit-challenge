import { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { MonthNavigation } from "@/components/molecules/MonthNavigation";
import { CalendarBody } from "@/components/molecules/CalenderBody";
import { getCurrentDate, getDaysArray, useCalendarFunctions } from "@/utils/functions/dateUtils";

export const Calendar = ({ isWeekly }: { isWeekly: boolean }) => {
	const calendarHeight = useSharedValue(300); // 초기 높이
	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: calendarHeight.value,
		};
	});

	const { year, month, date } = getCurrentDate();

	const todayRef = useRef({
		year,
		month,
		date,
	});

	const { currentDate, selectedDate, handleChangeMonth, handleChangeWeek, handleDateChoice } = useCalendarFunctions({
		year,
		month,
		date,
	});

	// 주 배열 생성 함수
	const getWeekDaysArray = (date: { date: number; month: number; year: number }) => {
		const referenceDate = new Date(currentDate.year, currentDate.month - 1, currentDate.date);
		const startOfWeek = new Date(referenceDate);
		startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay()); // 주 시작일 (일요일)

		return Array.from({ length: 7 }, (_, i) => {
			const day = new Date(startOfWeek);
			day.setDate(startOfWeek.getDate() + i);
			return {
				year: day.getFullYear(),
				month: day.getMonth() + 1,
				date: day.getDate(),
			};
		});
	};

	const daysArray = useMemo(() => {
		if (isWeekly) {
			// 주 단위 데이터: 선택된 날짜 또는 오늘 날짜 기준
			const referenceDate = selectedDate?.date ? selectedDate : todayRef.current;
			return getWeekDaysArray(referenceDate);
		}
		return getDaysArray(currentDate);
	}, [currentDate, selectedDate, isWeekly]);

	return (
		<View style={styles.container}>
			<MonthNavigation
				handleChangeMonth={handleChangeMonth}
				currentDate={currentDate}
				isWeekly={isWeekly}
				handleChangeWeek={handleChangeWeek}
			/>
			<Animated.View style={[styles.calendar, animatedStyle]}>
				<CalendarBody
					daysArray={daysArray}
					todayRef={todayRef}
					selectedDate={selectedDate}
					handleDateChoice={handleDateChoice}
					currentDate={currentDate}
					handleChangeMonth={handleChangeMonth}
					isWeekly={isWeekly}
					handleChangeWeek={handleChangeWeek}
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	calendar: {
		width: "100%",
	},
});
