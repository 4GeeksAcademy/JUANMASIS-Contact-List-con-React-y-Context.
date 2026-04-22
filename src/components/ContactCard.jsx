import React, { useContext } from "react";
import { Context } from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
	const { dispatch } = useContext(Context);
	const navigate = useNavigate();

	const handleDelete = async () => {
		const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
		if (confirmDelete) {
			await dispatch.actions.deleteContact(contact.id);
		}
	};

	const handleEdit = () => {
		navigate(`/edit-contact/${contact.id}`);
	};

	return (
		<div className="card mb-3 shadow-sm">
			<div className="row g-0 align-items-center p-3">
				<div className="col-md-2 text-center">
					<img
						src="https://randomuser.me/api/portraits/men/32.jpg"
						alt="contact"
						className="rounded-circle contact-image"
					/>
				</div>

				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{contact.name}</h5>
						<p className="card-text mb-1">
							<i className="fas fa-map-marker-alt me-2"></i>
							{contact.address}
						</p>
						<p className="card-text mb-1">
							<i className="fas fa-phone me-2"></i>
							{contact.phone}
						</p>
						<p className="card-text mb-1">
							<i className="fas fa-envelope me-2"></i>
							{contact.email}
						</p>
					</div>
				</div>

				<div className="col-md-2 text-center">
					<button className="btn btn-link text-dark me-2" onClick={handleEdit}>
						<i className="fas fa-pencil-alt"></i>
					</button>

					<button className="btn btn-link text-dark" onClick={handleDelete}>
						<i className="fas fa-trash"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;