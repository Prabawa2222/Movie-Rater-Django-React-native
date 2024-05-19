import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ rating, size, interactive = false, setRating }) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		stars.push(
			<TouchableOpacity
				onPress={() => interactive && setRating(i)}
				activeOpacity={interactive ? 0.7 : 1}
			>
				<FontAwesome
					key={i}
					name={i <= rating ? "star" : "star-o"}
					size={size}
					color="#ffd700"
				/>
			</TouchableOpacity>
		);
	}
	return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
	starContainer: {
		flexDirection: "row",
		marginVertical: 8,
	},
});

export default StarRating;
