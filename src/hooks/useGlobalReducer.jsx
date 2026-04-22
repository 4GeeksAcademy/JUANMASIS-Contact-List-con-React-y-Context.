import React, { createContext, useContext, useReducer } from "react";
import storeReducer, { initialStore, actions } from "../store";

export const Context = createContext(null);

export function StoreProvider({ children }) {
	const [store, baseDispatch] = useReducer(storeReducer, initialStore());

	const dispatch = {
		dispatch: baseDispatch,
		actions: {}
	};

	dispatch.actions = actions(dispatch);

	return (
		<Context.Provider value={{ store, dispatch }}>
			{children}
		</Context.Provider>
	);
}

export default function useGlobalReducer() {
	return useContext(Context);
}