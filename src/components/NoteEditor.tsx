"use client";
import { useNotesContext } from "@/contexts/NotesContext";
import { Note } from "@/types";
import { Button, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePopup } from "@/contexts/PopupContext";
import { useTranslation } from "react-i18next";
import { TagsPopupContent } from "./TagsPopupContent";

interface NoteEditorProps {
	note: Note;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note }) => {
	const { dispatch } = useNotesContext();
	const [content, setContent] = useState(note.content);
	const textRef = useRef<HTMLInputElement>(null);
	const popup = usePopup();
	const { t } = useTranslation();

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	const saveNote = useCallback(() => {
		const updatedNote = { ...note, content };
		dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
	}, [dispatch, note, content]);

	useEffect(() => {
		textRef.current?.focus();
	}, []);

	const handleBlur = () => {
		saveNote();
	};

	const openTagsPopup = () => {
		popup.showPopup(
			<TagsPopupContent note={note} onClose={popup.hidePopup} />,
			t("manage_tags")
		);
	};

	return (
		<div>
			<TextField
				inputRef={textRef}
				fullWidth
				multiline
				variant="outlined"
				value={content}
				onChange={handleTextChange}
				onBlur={handleBlur}
			/>
			<div className="flex space-x-2 mt-2">
				<Button variant="outlined" onClick={openTagsPopup}>
					{t("tags")}
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => dispatch({ type: "DELETE_NOTE", payload: note.id })}
				>
					{t("delete")}
				</Button>
			</div>
		</div>
	);
};
