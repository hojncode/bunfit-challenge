import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Button } from "@/components/atom/Button";
import { colors } from "@/utils/styles/colors";

const buttonArray = ["식단", "운동", "삭제"];

export const RecordScreen = ({
	translateY,
	setIsWeekly,
}: {
	translateY: any;
	setIsWeekly: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [selectedBtn, setSelectedBtn] = useState(0);

	const gestureHandler = Gesture.Pan()
		.onUpdate((event) => {
			translateY.value = Math.max(Math.min(event.translationY, 100), -300);
		})
		.onEnd(() => {
			if (translateY.value < -50) {
				// 주 단위 전환
				runOnJS(setIsWeekly)(true);
				translateY.value = -230;
			} else if (translateY.value > 50) {
				// 월 단위 전환
				runOnJS(setIsWeekly)(false);
				translateY.value = 0;
			} else {
				// 중간 값에서 멈출 때 원래 위치로 복귀
				translateY.value = 0;
			}
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: withTiming(translateY.value) },
				{
					scale: interpolate(translateY.value, [-300, 0], [1, 1]),
				},
			],
		};
	});

	return (
		<GestureDetector gesture={gestureHandler}>
			<Animated.View style={[styles.recordScreen, animatedStyle]}>
				<View style={[styles.recordScreen_button_wrap]}>
					{buttonArray.map((v, i) => {
						return (
							<Button
								key={i}
								onPress={() => setSelectedBtn(i)}
								buttonStyles={[
									styles.recordScreen_button,
									{ backgroundColor: selectedBtn === i ? colors.white : colors.lightgray },
								]}
							>
								<Text style={{ textAlign: "center", color: selectedBtn === i ? colors.black : colors.gray }}>{v}</Text>
							</Button>
						);
					})}
				</View>
				<Text style={styles.recordScreen_button_text}>추가 버튼을 눌러{"\n"} 식단을 기록해주세요</Text>
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	recordScreen: {
		flexDirection: "column",
		backgroundColor: colors.white,
		width: "100%",
		height: "100%",
		flex: 1,
		borderTopWidth: 1,
		borderColor: colors.lightgray,
		alignItems: "center",
	},
	recordScreen_button_wrap: {
		flexDirection: "row",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.lightgray,
		marginTop: 10,
	},
	recordScreen_button: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		margin: 2,
	},
	recordScreen_button_text: { padding: 20, textAlign: "center", color: colors.gray },
});
