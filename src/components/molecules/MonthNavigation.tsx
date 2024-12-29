import { getMonthText } from "@/utils/consts/consts";
import { colors } from "@/utils/styles/colors";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../atom/Button";

export const MonthNavigation = ({
	handleChangeMonth,
	currentDate,
}: {
	handleChangeMonth: (type: string) => void;
	currentDate: { year: number; month: number };
}) => {
	return (
		<View style={styles.calendar_header}>
			<Button
				onPress={() => handleChangeMonth("prev")}
				iconName="keyboard-arrow-left"
				iconStyles={{ color: colors.skyblue }}
			/>
			<Text style={{}}>
				{getMonthText(currentDate.month)} {currentDate.year}
			</Text>
			<Button
				onPress={() => handleChangeMonth("next")}
				iconName="keyboard-arrow-right"
				iconStyles={{ color: colors.skyblue }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	calendar_header: {
		width: "100%",
		height: "10%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
});
