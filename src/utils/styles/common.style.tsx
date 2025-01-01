import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";

export const CommonStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.white,
    paddingHorizontal: 20,
	},
});

export const { width: SCREEN_WIDTH } = Dimensions.get("window");
