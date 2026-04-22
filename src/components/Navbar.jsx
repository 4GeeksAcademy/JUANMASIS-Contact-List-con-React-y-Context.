import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light shadow-sm">
			<div className="container">
				<Link to="/" className="navbar-brand fw-bold">
					Contact List
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;