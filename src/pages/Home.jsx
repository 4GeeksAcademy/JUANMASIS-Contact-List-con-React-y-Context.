import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import { API_URL, AGENDA_SLUG, actions } from "../store";

export const Home = () => {
	const { store, dispatch } = useContext(Context);

	const loadContacts = async () => {
		try {
			const response = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`);

			if (response.status === 404) {
				await fetch(`${API_URL}/agendas/${AGENDA_SLUG}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				});

				return loadContacts();
			}

			const data = await response.json();
			dispatch(actions.setContacts(data.contacts || []));
		} catch (error) {
			console.log("Error loading contacts:", error);
		}
	};

	useEffect(() => {
		loadContacts();
	}, []);

	return (
		<div className="mt-5">
			<div className="d-flex justify-content-end mb-4">
				<Link to="/add-contact">
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div>

			{store.contacts.length > 0 ? (
				store.contacts.map(contact => (
					<ContactCard key={contact.id} contact={contact} />
				))
			) : (
				<div className="text-center mt-5">
					<h4>No contacts found</h4>
				</div>
			)}
		</div>
	);
};