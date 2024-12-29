import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

interface ButtonProps {
	onPress: (event: GestureResponderEvent) => void;
	buttonStyles?: {};
	text?: string;
	iconName?: ComponentProps<typeof MaterialIcons>["name"];
	iconStyles?: {};
	children?: React.ReactNode;
	others?: {};
}

export const Button = ({ onPress, buttonStyles, text, iconName, iconStyles, children, ...others }: ButtonProps) => {
	return (
		<TouchableOpacity onPress={onPress} style={buttonStyles}>
			{children}
			{iconName && <MaterialIcons name={iconName} size={24} style={iconStyles} />}
		</TouchableOpacity>
	);
};
