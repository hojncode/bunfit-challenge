import React, { ReactNode } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View, TouchableWithoutFeedback } from "react-native";

interface DefaultLayoutProps {
	children: ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
				<View style={styles.content}>{children}</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
});
