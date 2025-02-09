import React from "react";
import { Button } from "@mui/material";
import { useNotesContext } from "@/contexts/NotesContext";
import { Note } from "@/types";
import { useTranslation } from "react-i18next";

const CreateNoteButton: React.FC = () => {
	const { state, dispatch } = useNotesContext();
	const currentFilterTags = state.currentFilter.tags;
	const { t } = useTranslation();

	const handleCreateNote = async () => {
		const newNote: Note = {
			id: Date.now().toString(),
			content: "",
			tags: currentFilterTags
		};
		dispatch({ type: "ADD_NOTE", payload: newNote });
		dispatch({ type: "SET_ACTIVE_NOTE_ID", payload: newNote.id });
	};

	return (
		<Button variant="contained" color="primary" onClick={handleCreateNote}>
			{t("create_note")}
		</Button>
	);
};

export default CreateNoteButton;
