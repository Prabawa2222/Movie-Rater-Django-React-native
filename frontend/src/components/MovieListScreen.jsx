import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
} from "react-native";

function MovieListScreen({ navigation }) {
	const [movies, setMovies] = useState([]);
	const [token, setToken] = useState(null);

	const getToken = async () => {
		try {
			const savedToken = await AsyncStorage.getItem("MR_Token");
			setToken(savedToken);
			if (token) {
				getMovies();
			}
		} catch (error) {
			console.error("Failed to retrieve the token from storage", error);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	useEffect(() => {
		if (token) {
			getMovies();
		}
	}, [token]);

	const getMovies = () => {
		fetch("http://192.168.1.6:8000/api/movies/", {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		})
			.then((res) => res.json())
			.then((jsonRes) => {
				setMovies(jsonRes);
				console.log(jsonRes);
			})
			.catch((error) => console.log(error));
	};

	return (
		<View>
			<Text>{token}</Text>
			<Text>Movies: {JSON.stringify(movies)}</Text>
		</View>
	);
}

export default MovieListScreen;
