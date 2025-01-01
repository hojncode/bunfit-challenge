import { useState } from "react";

interface Day {
	date: number;
	month: number;
	year: number;
}

export const getCurrentDate = () => {
	const nowDate = new Date();
	const year = nowDate.getFullYear();
	const month = nowDate.getMonth() + 1; // getMonth는 0~11을 반환하여 (1~12월로 표기하기 위해) 1을 더함.
	const date = nowDate.getDate();

	return { year, month, date };
};

export const getDaysArray = (currentDate: Day): Day[] => {
	if (!currentDate || !currentDate.year || !currentDate.month) {
		console.error("currentDate 없음:", currentDate);
		return [];
	}

	const firstDateInMonth = new Date(currentDate.year, currentDate.month - 1, 1);
	const lastDateInMonth = new Date(currentDate.year, currentDate.month, 0); // 해당월의 마지막 일자 = 해당 달력의 총 일자 수

	const prevLastDateInMonth = new Date(currentDate.year, currentDate.month - 1, 0);
	const nextFirstDateInMonth = new Date(currentDate.year, currentDate.month, 1);

	const startDay = firstDateInMonth.getDay();
	const lastDay = lastDateInMonth.getDay();

	const currentMonthArray: Day[] = Array.from({ length: lastDateInMonth.getDate() }, (_, i) => ({
		date: i + 1,
		month: currentDate.month,
		year: currentDate.year,
	}));

	const prevMonth: Day[] = Array.from({ length: startDay }, (_, i) => ({
		date: prevLastDateInMonth.getDate() - i,
		month: currentDate.month === 1 ? 12 : currentDate.month - 1,
		year: currentDate.month === 1 ? currentDate.year - 1 : currentDate.year,
	})).reverse();

	const nextMonth: Day[] = Array.from({ length: 6 - lastDay }, (_, i) => ({
		date: nextFirstDateInMonth.getDate() + i,
		month: (currentDate.month + 1) % 12,
		year: currentDate.month === 12 ? currentDate.year + 1 : currentDate.year,
	}));

	return [...prevMonth, ...currentMonthArray, ...nextMonth] || [];
};

export const useCalendarFunctions = (initState: Day) => {
	const [currentDate, setCurrentDate] = useState(initState);
	const [selectedDate, setSelectedDate] = useState(initState);

	const handleChangeMonth = (type: string) => {
		setCurrentDate((prev) => {
			let newYear = prev.year;
			let newMonth = prev.month;

			switch (type) {
				case "prev":
					newMonth -= 1;
					if (newMonth < 1) {
						newMonth = 12;
						newYear -= 1;
					}
					break;
				case "next":
					newMonth += 1;
					if (newMonth > 12) {
						newMonth = 1;
						newYear += 1;
					}
				default:
					break;
			}

			return { ...prev, year: newYear, month: newMonth };
		});
	};

	const handleChangeWeek = (type: string) => {
		setCurrentDate((prev) => {
			// 현재 기준 날짜를 선택된 날짜 또는 현재 날짜로 설정
			const referenceDate = prev;

			// 기준 날짜로부터 이동
			const newDate = new Date(referenceDate.year, referenceDate.month - 1, referenceDate.date);

			if (type === "prev") {
				newDate.setDate(newDate.getDate() - 7); // 이전 주로 이동
			} else if (type === "next") {
				newDate.setDate(newDate.getDate() + 7); // 다음 주로 이동
			}

			return {
				year: newDate.getFullYear(),
				month: newDate.getMonth() + 1, // JavaScript 월은 0부터 시작하므로 +1
				date: newDate.getDate(),
			};
		});
	};

	const handleDateChoice = (v: { date: number; month: number; year: number }) => {
		setSelectedDate(v);

		// 선택된 날짜가 현재 달이 아닌 경우, 해당 월로 변경
		if (v.month !== currentDate.month) {
			setCurrentDate({
				year: v.year,
				month: v.month,
				date: v.date,
			});
		}
	};

	return { currentDate, selectedDate, handleChangeMonth, handleChangeWeek, handleDateChoice };
};
