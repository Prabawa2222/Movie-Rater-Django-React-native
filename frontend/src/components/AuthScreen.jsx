import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TextInput, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loginUser } from "../utils/apiService";

export default function AuthScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const auth = async () => {
		fetch(`http://192.168.1.6:8000/auth/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((res) => res.json())
			.then((res) => {
				saveData(res.token);
				navigation.navigate("MovieList");
				console.log(res.token);
			});
	};

	const saveData = async (token) => {
		await AsyncStorage.setItem("MR_Token", token);
	};

	return (
		<View>
			<Text>Username</Text>
			<TextInput
				placeholder="Username"
				value={username}
				onChangeText={(e) => setUsername(e)}
			/>
			<Text>Password</Text>
			<TextInput
				placeholder="password"
				value={password}
				onChangeText={(e) => setPassword(e)}
			/>
			<TouchableOpacity onPress={auth}>
				<Text>Login</Text>
			</TouchableOpacity>
		</View>
	);
}
