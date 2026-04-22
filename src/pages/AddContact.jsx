import React, { useContext, useEffect, useState } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
	const { store, dispatch } = useContext(Context);
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});

	useEffect(() => {
		if (id) {
			const foundContact = store.contacts.find(
				contact => String(contact.id) === String(id)
			);

			if (foundContact) {
				setFormData({
					name: foundContact.name || "",
					email: foundContact.email || "",
					phone: foundContact.phone || "",
					address: foundContact.address || ""
				});
			}
		}
	}, [id, store.contacts]);

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (id) {
			await dispatch.actions.updateContact(id, formData);
		} else {
			await dispatch.actions.addContact(formData);
		}

		navigate("/");
	};

	return (
		<div className="mt-5 form-container">
			<h1 className="text-center mb-4">
				{id ? "Edit contact" : "Add a new contact"}
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Full Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="Full Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						placeholder="Enter email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Phone</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Address</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary w-100">
					Save
				</button>

				<Link to="/" className="d-block mt-3">
					or get back to contacts
				</Link>
			</form>
		</div>
	);
};

export default AddContact;