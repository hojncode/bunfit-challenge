import { StyleSheet, Text, View } from "react-native";
import { Button } from "../atom/Button";
import { colors } from "@/utils/styles/colors";
import { dayNames } from "@/utils/consts/consts";

export const CalendarBody = ({
	daysArray,
	todayRef,
	selectedDate,
	handleDateChoice,
	currentDate,
}: {
	daysArray: Array<{ date: number; month: number; year: number }>;
	handleDateChoice: (day: { date: number; month: number; year: number }) => void;
	selectedDate: any;
	todayRef: any;
	currentDate: any;
}) => {
	return (
		<View style={styles.calendar_body}>
			<View style={styles.calendar_body_week_box}>
				{dayNames.map((v, i) => {
					return (
						<View key={i} style={styles.calendar_body_week_textWrap}>
							<Text
								style={[
									styles.calendar_body_week_text,
									{ color: i === 0 ? colors.red : i === 6 ? colors.skyblue : colors.black },
								]}
							>
								{v}
							</Text>
						</View>
					);
				})}
			</View>
			<View style={styles.calendar_body_daysArray_container}>
				{daysArray.map((v, i) => {
					const isToday =
						JSON.stringify(Object.values(v).sort()) === JSON.stringify(Object.values(todayRef.current).sort());
					const chooseDay =
						JSON.stringify(Object.entries(v).sort()) === JSON.stringify(Object.entries(selectedDate).sort());

					return (
						<Button
							key={i}
							buttonStyles={[styles.calendar_body_daysArray_day_wrapper, { borderWidth: chooseDay ? 1 : 0 }]}
							onPress={() => handleDateChoice(v)}
						>
							<Text style={{ color: v.month === currentDate.month ? colors.black : colors.lightgray }}>
								{v?.date || ""}
							</Text>
							{isToday && <View style={styles.calendar_body_daysArray_today_dot}></View>}
						</Button>
					);
				})}
			</View>
		</View>
	);
};



const styles = StyleSheet.create({
	calendar_body: {
		width: "100%",
		height: "90%",
	},
	calendar_body_week_box: {
		flexDirection: "row",
		height: "10%",
	},
	calendar_body_week_textWrap: {
		width: `${100 / 7}%`,
		justifyContent: "center",
		alignItems: "center",
	},
	calendar_body_week_text: {},
	calendar_body_daysArray_container: { flexDirection: "row", flexWrap: "wrap", width: "100%", height: "100%" },
	calendar_body_daysArray_day_wrapper: {
		borderColor: colors.skyblue,
		borderRadius: 999,
		height: "15%",
		width: `${100 / 7}%`,
		alignItems: "center",
		justifyContent: "center",
	},
	calendar_body_daysArray_today_dot: {
		backgroundColor: colors.black,
		width: 5,
		height: 5,
		position: "absolute",
		bottom: 0,
	},
});
