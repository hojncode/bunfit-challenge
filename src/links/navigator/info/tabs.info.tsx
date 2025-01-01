// bottom tabs 의 config

import { CalendarScreen } from "@/screens/calendar";
import { HomeScreen } from "@/screens/home";
import { LibraryScreen } from "@/screens/library";
import { MypageScreen } from "@/screens/mypage";
import { Ionicons } from "@expo/vector-icons";

export type TabType = "home-tab" | "calendar-tab" | "library-tab" | "mypage-tab";

export interface TabConfig<T = {}> {
	tabId: number;
	tabType: TabType;
	component: React.ComponentType<T>; // 컴포넌트에서 props 를 받는 경우
	icon: keyof typeof Ionicons.glyphMap;
	displayName: string;
	screens: Array<{
		name: string;
		component: React.ComponentType<T>;
		options?: {};
	}>;
}

const TABS_CONFIG: TabConfig[] = [
	{
		tabId: 0,
		tabType: "home-tab",
		component: HomeScreen,
		icon: "home-sharp",
		displayName: "Home",
		screens: [{ name: "HomeMain", component: HomeScreen }],
	},
	{
		tabId: 1,
		tabType: "calendar-tab",
		component: CalendarScreen,
		icon: "calendar-sharp",
		displayName: "Calendar",
		screens: [{ name: "CalendarMain", component: CalendarScreen }],
	},
	{
		tabId: 2,
		tabType: "library-tab",
		component: LibraryScreen,
		icon: "library",
		displayName: "Library",
		screens: [{ name: "LibraryMain", component: LibraryScreen }],
	},
	{
		tabId: 3,
		tabType: "mypage-tab",
		component: MypageScreen,
		icon: "person-outline",
		displayName: "My Page",
		screens: [{ name: "MypageMain", component: MypageScreen }],
	},
];

export const getTabsByType = ({ tabType }: { tabType: TabType }): TabConfig[] => {
	return TABS_CONFIG.filter((item) => item.tabType === tabType);
};

export const getScreensByTabName = ({
	tabType,
}: {
	tabType: TabType;
}): Array<{ name: string; component: React.ComponentType }> => {
	return TABS_CONFIG.find((tab) => tab.tabType === tabType)?.screens || [];
};
