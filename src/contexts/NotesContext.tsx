"use client";
import { Filter, Note, NotesState, Tag } from "@/types";
import {
	createContext,
	ReactNode,
	useContext,
	useMemo,
	useReducer
} from "react";

type Action =
	| { type: "SET_NOTES"; payload: Note[] }
	| { type: "ADD_NOTE"; payload: Note }
	| { type: "UPDATE_NOTE"; payload: Note }
	| { type: "DELETE_NOTE"; payload: string }
	| { type: "SET_TAGS"; payload: Tag[] }
	| { type: "ADD_TAG"; payload: Tag }
	| { type: "DELETE_TAG"; payload: string }
	| { type: "SET_FILTERS"; payload: Filter[] }
	| { type: "ADD_FILTER"; payload: Filter }
	| { type: "DELETE_FILTER"; payload: string }
	| { type: "SET_ACTIVE_FILTER"; payload: Filter }
	| { type: "SET_ACTIVE_NOTE_ID"; payload: string | null };

const initialState: NotesState = {
	notes: [

		{ id: "test4", content: "Test Note with 'hello' tag", tags: ["hello"]},
		{ id: "test5", content: "Test Note with 'world' tag", tags: ["world"]},
		{ id: "test6", content: "Test Note with 'hello and 'world' tags", tags: ["hello", "world"] },
		{ id: "test1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec viverra libero, et tristique lorem. Morbi feugiat odio ut convallis ultrices. Morbi in neque sed ex eleifend volutpat. Ut eget orci quis sapien dignissim eleifend sed malesuada lectus. Aenean finibus tempor est, sit amet ullamcorper metus finibus quis. Nunc ex quam, sollicitudin nec ipsum at, porta interdum magna. Maecenas auctor consequat posuere. Integer molestie tortor vitae faucibus aliquam. Ut vel diam id enim volutpat egestas vel imperdiet ex. Praesent consectetur sodales eros, at lobortis mauris posuere eu. Vivamus at metus nulla. ", tags: []},
		{ id: "test2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec viverra libero, et tristique lorem. Morbi feugiat odio ut convallis ultrices. Morbi in neque sed ex eleifend volutpat. Ut eget orci quis sapien dignissim eleifend sed malesuada lectus. Aenean finibus tempor est, sit amet ullamcorper metus finibus quis. Nunc ex quam, sollicitudin nec ipsum at, porta interdum magna. Maecenas auctor consequat posuere. Integer molestie tortor vitae faucibus aliquam. Ut vel diam id enim volutpat egestas vel imperdiet ex. Praesent consectetur sodales eros, at lobortis mauris posuere eu. Vivamus at metus nulla. ", tags: []},
		{ id: "test3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec viverra libero, et tristique lorem. Morbi feugiat odio ut convallis ultrices. Morbi in neque sed ex eleifend volutpat. Ut eget orci quis sapien dignissim eleifend sed malesuada lectus. Aenean finibus tempor est, sit amet ullamcorper metus finibus quis. Nunc ex quam, sollicitudin nec ipsum at, porta interdum magna. Maecenas auctor consequat posuere. Integer molestie tortor vitae faucibus aliquam. Ut vel diam id enim volutpat egestas vel imperdiet ex. Praesent consectetur sodales eros, at lobortis mauris posuere eu. Vivamus at metus nulla. ", tags: []}
	],
	tags: ["hello", "world"],
	filters: [
		{
			id: "inbox",
			name: "Inbox",
			tags: []
		},
		{
			id: "test2",
			name: "World folder",
			tags: ["world"]
		},
		{
			id: "test",
			name: "Hello folder",
			tags: ["hello"]
		}
	],
	currentFilter: {
		id: "inbox",
		name: "Inbox",
		tags: []
	},
	activeNoteId: null
};

export const notesReducer = (state: NotesState, action: Action): NotesState => {
	switch (action.type) {
		case "SET_NOTES":
			return { ...state, notes: action.payload };
		case "ADD_NOTE":
			return { ...state, notes: [...state.notes, action.payload] };
		case "UPDATE_NOTE":
			return {
				...state,
				notes: state.notes.map((note) =>
					note.id === action.payload.id ? action.payload : note
				)
			};
		case "DELETE_NOTE":
			return {
				...state,
				notes: state.notes.filter((note) => note.id !== action.payload)
			};
		case "SET_TAGS":
			return { ...state, tags: action.payload };
		case "ADD_TAG":
			return { ...state, tags: [...state.tags, action.payload] };
		case "SET_FILTERS":
			return { ...state, filters: action.payload };
		case "ADD_FILTER":
			return { ...state, filters: [...state.filters, action.payload] };
		case "SET_ACTIVE_FILTER":
			return { ...state, currentFilter: action.payload };
		case "SET_ACTIVE_NOTE_ID":
			return { ...state, activeNoteId: action.payload };
		case "DELETE_TAG":
			return {
				...state,
				tags: state.tags.filter((tag) => tag !== action.payload)
			};
		case "DELETE_FILTER":
			return {
				...state,
				filters: state.filters.filter((filter) => filter.id !== action.payload)
			};
		default:
			return state;
	}
};

interface NotesContextProps {
	state: NotesState;
	dispatch: React.Dispatch<Action>;
}

export const NotesContext = createContext<NotesContextProps>({
	state: initialState,
	dispatch: () => null
});

export const NotesProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(notesReducer, initialState);

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
};

export const useNotesContext = () => {
	const context = useContext(NotesContext);
	if (!context) {
		throw new Error("useNotesContext must be used within NotesProvider");
	}
	return context;
};
