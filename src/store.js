const API_URL = "https://playground.4geeks.com/contact";
export { API_URL };

export const AGENDA_SLUG = "juanmasis777";

export const initialStore = () => {
	return {
		contacts: []
	};
};

export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case "set_contacts":
			return {
				...store,
				contacts: action.payload
			};

		case "add_contact":
			return {
				...store,
				contacts: [...store.contacts, action.payload]
			};

		case "delete_contact":
			return {
				...store,
				contacts: store.contacts.filter(contact => contact.id !== action.payload)
			};

		case "update_contact":
			return {
				...store,
				contacts: store.contacts.map(contact =>
					contact.id === action.payload.id ? action.payload : contact
				)
			};

		default:
			return store;
	}
}

export const actions = {
	setContacts: contacts => ({
		type: "set_contacts",
		payload: contacts
	}),

	addContact: contact => ({
		type: "add_contact",
		payload: contact
	}),

	deleteContact: id => ({
		type: "delete_contact",
		payload: id
	}),

	updateContact: contact => ({
		type: "update_contact",
		payload: contact
	})
};