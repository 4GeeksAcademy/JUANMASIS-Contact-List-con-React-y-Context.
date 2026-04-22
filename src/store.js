const API_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "juanmasis777";

export const initialStore = () => {
	return {
		contacts: []
	};
};

export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case "get_contacts":
			return {
				...store,
				contacts: action.payload
			};

		default:
			throw Error("Unknown action.");
	}
}

export const actions = dispatch => ({
	createAgenda: async () => {
		try {
			await fetch(`${API_URL}/agendas/${AGENDA_SLUG}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});
		} catch (error) {
			console.log("Error creating agenda:", error);
		}
	},

	getContacts: async () => {
		try {
			const response = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`);

			if (response.status === 404) {
				await dispatch.actions.createAgenda();
				return dispatch.actions.getContacts();
			}

			const data = await response.json();
			dispatch.dispatch({ type: "get_contacts", payload: data.contacts || [] });
		} catch (error) {
			console.log("Error loading contacts:", error);
		}
	},

	addContact: async formData => {
		try {
			await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: formData.name,
					phone: formData.phone,
					email: formData.email,
					address: formData.address
				})
			});

			await dispatch.actions.getContacts();
		} catch (error) {
			console.log("Error adding contact:", error);
		}
	},

	deleteContact: async id => {
		try {
			await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
				method: "DELETE"
			});

			await dispatch.actions.getContacts();
		} catch (error) {
			console.log("Error deleting contact:", error);
		}
	},

	updateContact: async (id, formData) => {
		try {
			await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: formData.name,
					phone: formData.phone,
					email: formData.email,
					address: formData.address
				})
			});

			await dispatch.actions.getContacts();
		} catch (error) {
			console.log("Error updating contact:", error);
		}
	}
});