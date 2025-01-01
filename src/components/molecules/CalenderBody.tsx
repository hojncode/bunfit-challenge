import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Button } from "../atom/Button";
import { colors } from "@/utils/styles/colors";
import { SCREEN_WIDTH } from "@/utils/styles/common.style";

export const CalendarBody = ({
	daysArray,
	handleDateChoice,
	handleChangeMonth,
	handleChangeWeek,
	selectedDate,
	todayRef,
	currentDate,
	isWeekly,
}: {
	daysArray: Array<{ date: number; month: number; year: number }>;
	handleDateChoice: (day: { date: number; month: number; year: number }) => void;
	handleChangeMonth: (type: "prev" | "next") => void;
	handleChangeWeek: (type: "prev" | "next") => void;
	selectedDate: any;
	todayRef: any;
	currentDate: any;
	isWeekly: boolean;
}) => {
	const translateX = useSharedValue(0); // 스와이프 이동 값
	const opacity = useSharedValue(1); // 투명도

	const gestureHandler = Gesture.Pan()
		.onUpdate((event) => {
			translateX.value = event.translationX; // X축 이동 값 업데이트
		})
		.onEnd(() => {
			if (translateX.value < -100) {
				// 다음 월
				translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 });
				opacity.value = withTiming(0, { duration: 0 }, () => {
					if (isWeekly) {
						runOnJS(handleChangeWeek)("next");
					} else {
						runOnJS(handleChangeMonth)("next");
					}
					translateX.value = SCREEN_WIDTH; // 화면 오른쪽으로 초기화
					translateX.value = withTiming(0, { duration: 300 });
					opacity.value = withTiming(1, { duration: 300 });
				});
			} else if (translateX.value > 100) {
				// 이전 월
				translateX.value = withTiming(SCREEN_WIDTH, { duration: 300 });
				opacity.value = withTiming(0, { duration: 0 }, () => {
					if (isWeekly) {
						runOnJS(handleChangeWeek)("prev");
					} else {
						runOnJS(handleChangeMonth)("prev");
					}
					translateX.value = -SCREEN_WIDTH;
					translateX.value = withTiming(0, { duration: 300 });
					opacity.value = withTiming(1, { duration: 300 });
				});
			} else {
				// 스와이프 임계값 미만 → 원래 위치로 복귀
				translateX.value = withTiming(0, { duration: 300 });
				opacity.value = withTiming(1, { duration: 300 });
			}
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translateX.value },
			{
				scale: interpolate(
					Math.abs(translateX.value), // 이동 거리 기준으로 크기 조정
					[0, SCREEN_WIDTH],
					[1, 1]
				),
			},
		],
	}));

	return (
		<GestureDetector gesture={gestureHandler}>
			<Animated.View style={[styles.calendar_body, animatedStyle]}>
				<Animated.View style={styles.calendar_body_daysArray}>
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
				</Animated.View>
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	calendar_body: {
		// flex: 1,
	},
	calendar_body_daysArray: {
		flexDirection: "row",
		flexWrap: "wrap",
		width: SCREEN_WIDTH,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
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
