"use client";
import React from "react";
import { Sidebar } from "./Sidebar";
import { NotesList } from "./NotesList";
import CreateNoteButton from "./CreateNoteButton";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";

export const AppLayout: React.FC = () => {
	return (
		<I18nextProvider i18n={i18n}>
			<div className="flex h-screen">
				<Sidebar />
				<div className="flex-1 p-4 overflow-auto">
					<div className="mb-4 flex justify-end">
						<CreateNoteButton />
					</div>
					<NotesList />
				</div>
			</div>
		</I18nextProvider>
	);
};
