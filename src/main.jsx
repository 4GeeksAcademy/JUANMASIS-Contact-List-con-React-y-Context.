import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from "./hooks/useGlobalReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StoreProvider>
			<RouterProvider router={router} />
		</StoreProvider>
	</React.StrictMode>
);