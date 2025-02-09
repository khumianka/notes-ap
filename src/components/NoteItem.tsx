"use client";
import { useNotesContext } from "@/contexts/NotesContext";
import { Note } from "@/types";
import React, { useCallback, useEffect, useRef } from "react";
import { NoteEditor } from "./NoteEditor";

interface NoteItemProps {
	note: Note;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
	const { state, dispatch } = useNotesContext();
	const isActive = state.activeNoteId === note.id;
	const containerRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(() => {
		dispatch({ type: "SET_ACTIVE_NOTE_ID", payload: note.id });
	}, [dispatch, note.id]);

	useEffect(() => {
		if (isActive && containerRef.current) {
			containerRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}
	}, [isActive]);

	return (
		<div
			ref={containerRef}
			onClick={handleClick}
			className={`p-4 border rounded-lg cursor-pointer transition duration-300 ${
				isActive ? "bg-white shadow-lg" : "bg-gray-50 hover:shadow-md"
			}`}
		>
			{isActive ? (
				<NoteEditor note={note} />
			) : (
				<div className="line-clamp-5 text-gray-700 whitespace-pre-wrap">
					{note.content}
				</div>
			)}
		</div>
	);
};
