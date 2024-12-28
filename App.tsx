import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Navigator } from "@/helpers/navigator";

const App = () => {
	return (
		<GestureHandlerRootView style={styles.gestureHandlerRoot}>
			<SafeAreaView style={styles.safeArea}>
				<Navigator />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	gestureHandlerRoot: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
	},
});

export default App;
