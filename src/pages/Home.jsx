import React, { useContext, useEffect } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";

export const Home = () => {
	const { store, dispatch } = useContext(Context);

	useEffect(() => {
		dispatch.actions.getContacts();
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