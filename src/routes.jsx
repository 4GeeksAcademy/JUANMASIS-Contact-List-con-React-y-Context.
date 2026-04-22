import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Single } from "./pages/Single";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/demo",
				element: <Demo />
			},
			{
				path: "/single/:theId",
				element: <Single />
			},
			{
				path: "/add-contact",
				element: <AddContact />
			},
			{
				path: "/edit-contact/:id",
				element: <AddContact />
			}
		]
	}
]);