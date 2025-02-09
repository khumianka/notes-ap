"use client";
import { useNotesContext } from "@/contexts/NotesContext";
import { Note } from "@/types";
import React, { useMemo } from "react";
import { NoteItem } from "@/components/NoteItem";

export const NotesList: React.FC = () => {
	const { state } = useNotesContext();
	const { notes, currentFilter } = state;

	const filteredNotes: Note[] = useMemo(() => {
		if (currentFilter.id === "inbox") return notes;
		return notes.filter((note) =>
			currentFilter.tags.every((tag) => note.tags.includes(tag))
		);
	}, [currentFilter.id, currentFilter.tags, notes]);

	return (
		<div className="space-y-4">
			{filteredNotes.map((note) => (
				<NoteItem key={note.id} note={note} />
			))}
		</div>
	);
};
