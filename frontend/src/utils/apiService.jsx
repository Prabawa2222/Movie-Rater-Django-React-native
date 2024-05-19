const baseUrl = "http://127.0.0.1:8000";

export function loginUser({ username, password }) {
	return fetch(`http://127.0.0.1:8000/auth/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
		.then((resp) => {
			if (!resp.ok) {
				throw new Error("Network response was not ok");
			}
			return resp.json();
		})
		.catch((error) => {
			console.error("Fetch error:", error);
			throw error;
		});
}
