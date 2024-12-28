import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./Tabs";

const Stack = createStackNavigator();

export const Root = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};
