import { dayNames } from "@/utils/consts/consts";
import { colors } from "@/utils/styles/colors";
import { SCREEN_WIDTH } from "@/utils/styles/common.style";
import { StyleSheet, Text, View } from "react-native";

export const WeekWrapper = () => {
	return (
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
	);
};

const styles = StyleSheet.create({
	calendar_body_week_box: {
		flexDirection: "row",
		marginVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
	},
	calendar_body_week_textWrap: {
		width: `${100 / 7}%`,
		justifyContent: "center",
		alignItems: "center",
	},
	calendar_body_week_text: {},
});
