import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./src/components/AuthScreen";
import MovieList from "./src/components/MovieListScreen";
import MovieDetail from "./src/components/MovieDetailScreen";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Auth" component={AuthScreen} />
				<Stack.Screen name="MovieList" component={MovieList} />
				<Stack.Screen name="MovieDetail" component={MovieDetail} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
