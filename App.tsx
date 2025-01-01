import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Navigator } from "@/helpers/Navigator";
import { colors } from "@/utils/styles/colors";

const App = () => {
	return (
		<GestureHandlerRootView style={styles.gestureHandlerRoot}>
			<StatusBar />
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
		backgroundColor: colors.white,
	},
});

export default App;
