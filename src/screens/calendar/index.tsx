import { useState } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Calendar } from "@/components/organisms/Calendar";
import { RecordScreen } from "@/components/organisms/Record";
import { CommonStyles } from "@/utils/styles/common.style";

/*
작업 전 요구사항 정리 
1. 상단 월 이동 버튼 (prev, next)

2. 일자 표시 화면 (중요)
- 7열 (고정) , 6행 (변동)
- 오늘 날짜를 구한다
- 해당 월의 일자별/요일 구한다
- 일자에 해당하는 요일을 매칭하여 표기한다

3. 날짜 선택시 해당일자 표시

4. 터치로 화면을 스와이프하여 올리면 주 단위 캘린더로 변환
*/

export const CalendarScreen = () => {
	const translateY = useSharedValue(0);
	const [isWeekly, setIsWeekly] = useState(false);

	return (
		<View style={CommonStyles.container}>
			<Calendar isWeekly={isWeekly} />
			<RecordScreen translateY={translateY} setIsWeekly={setIsWeekly} />
		</View>
	);
};
