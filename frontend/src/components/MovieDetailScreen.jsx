import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Alert,
} from "react-native";
import StarRating from "./ui/StarRating";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MovieDetail({ route, navigation }) {
	const { movie } = route.params;
	const [userRating, setUserRating] = useState(0);
	const [token, setToken] = useState(null);

	const getToken = async () => {
		try {
			const savedToken = await AsyncStorage.getItem("MR_Token");
			setToken(savedToken);
		} catch (error) {
			console.error("Failed to retrieve the token from storage", error);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	useEffect(() => {
		console.log(userRating);
	}, [userRating]);

	const handleRateClicked = () => {
		fetch(`http://192.168.1.6:8000/api/movies/${movie.id}/rate_movie/`, {
			method: "POST",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ stars: userRating }),
		})
			.then((res) => res.json())
			.then((res) => {
				setUserRating(0);
				navigation.navigate("MovieList");
				Alert.alert("Rating", res.message);
			})
			.catch((error) =>
				Alert.alert("Error", error.message || error.toString())
			);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{movie.title}</Text>
			<Image source={{ uri: movie.image }} style={styles.image} />
			<Text style={styles.description}>{movie.description}</Text>
			<Text style={styles.rating}>Average Rating: {movie.avg_rating}</Text>
			<StarRating
				rating={movie.avg_rating}
				size={24}
				interactive={false}
			/>
			<Text style={styles.noOfRatings}>
				Number of Ratings: {movie.no_of_ratings}
			</Text>
			<Text>Rate It!!</Text>
			<StarRating
				rating={userRating}
				setRating={setUserRating}
				interactive={true}
				size={32}
			/>
			<Button title="Rate" onPress={handleRateClicked} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	image: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		marginBottom: 16,
	},
	rating: {
		fontSize: 16,
		marginBottom: 8,
	},
	noOfRatings: {
		fontSize: 16,
	},
});

export default MovieDetail;
