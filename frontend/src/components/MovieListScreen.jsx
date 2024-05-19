import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
} from "react-native";
import StarRating from "./ui/StarRating";
import { useFocusEffect } from "@react-navigation/native";

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

	useFocusEffect(
		useCallback(() => {
			if (token) {
				getMovies();
			}
		}, [token])
	);

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
			<FlatList
				data={movies}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("MovieDetail", { movie: item })
						}
					>
						<Text>{item.title}</Text>
						<Image
							source={{ uri: item.image }}
							key={item.id}
							style={{
								width: 129,
								height: 192,
								borderWidth: 2,
								borderColor: "#d35647",
								resizeMode: "contain",
								margin: 8,
							}}
						/>
						<View style={{ position: "absolute", top: 30, left: 50 }}>
							<StarRating rating={item.avg_rating} size={10} />
						</View>

						{/* <Text>{item.avg_rating}</Text> */}
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}

export default MovieListScreen;
