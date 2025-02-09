export interface Note {
	id: string;
	content: string;
	tags: Tag[];
}

export type Tag = string;

export interface Filter {
	id: string;
	name: string;
	tags: Tag[];
}

export interface NotesState {
	notes: Note[];
	tags: Tag[];
	filters: Filter[];
	currentFilter: Filter;
	activeNoteId: string | null;
}
