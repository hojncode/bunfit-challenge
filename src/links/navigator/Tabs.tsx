import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabType, getTabsByType } from "./info/tabs.info";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/styles/colors";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
	const tabTypes: TabType[] = ["home-tab", "calendar-tab", "library-tab", "mypage-tab"];

	const tabList = tabTypes.flatMap((tabType) => getTabsByType({ tabType }));

	return (
		<Tab.Navigator initialRouteName={tabList[0].displayName}>
			{tabList
				.sort((a, b) => a.tabId - b.tabId)
				.map((value) => {
					// todo: exception

					return (
						<Tab.Screen
							key={`${value.tabId}`}
							component={value.component}
							name={value.displayName}
							options={{
								headerTitle: value.displayName,
								headerShown: false,
								tabBarIcon: ({ focused }) => (
									<View>
										<Ionicons name={value.icon} size={24} style={{ color: focused ? colors.black : colors.lightgray }} />
									</View>
								),
								tabBarLabel: ({ focused }) => (
									<Text
										style={{
											color: focused ? colors.black : colors.lightgray,
											fontWeight: "bold",
										}}
									>
										{value.displayName.toUpperCase() || value.tabId}
									</Text>
								),
								headerTitleAlign: "center",
							}}
						/>
					);
				})}
		</Tab.Navigator>
	);
};
