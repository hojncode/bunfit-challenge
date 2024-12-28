import { NavigationContainer } from "@react-navigation/native";
import { Root } from "@/links/navigator/Root";
import { DefaultLayout } from "@/components/template/DefaultLayout";

// 가장 상단의 영역 = notification 등 설정..
export const Navigator = () => {
	return (
		<NavigationContainer>
			<DefaultLayout>
				<Root />
			</DefaultLayout>
		</NavigationContainer>
	);
};
