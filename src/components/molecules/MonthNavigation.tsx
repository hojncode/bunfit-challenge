import { getMonthText } from "@/utils/consts/consts";
import { colors } from "@/utils/styles/colors";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../atom/Button";
import { WeekWrapper } from "./WeekWrapper";

export const MonthNavigation = ({
	handleChangeMonth,
	currentDate,
	isWeekly,
	handleChangeWeek,
}: {
	handleChangeMonth: (type: string) => void;
	currentDate: { year: number; month: number };
	isWeekly: boolean;
	handleChangeWeek: (type: "prev" | "next") => void;
}) => {
	const handleChange = (type: "prev" | "next") => {
		if (isWeekly) {
			handleChangeWeek(type);
		} else handleChangeMonth(type);
	};

	return (
		<View>
			<View style={styles.calendar_header}>
				<Button
					onPress={() => handleChange("prev")}
					iconName="keyboard-arrow-left"
					iconStyles={{ color: colors.skyblue }}
				/>
				<Text>
					{getMonthText(currentDate.month)} {currentDate.year}
				</Text>
				<Button
					onPress={() => handleChange("next")}
					iconName="keyboard-arrow-right"
					iconStyles={{ color: colors.skyblue }}
				/>
			</View>
			<WeekWrapper />
		</View>
	);
};

const styles = StyleSheet.create({
	calendar_header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
});
