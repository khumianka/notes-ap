"use client";
import React from "react";
import { useNotesContext } from "@/contexts/NotesContext";
import { Filter } from "@/types";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePopup } from "@/contexts/PopupContext";
import { FilterPopupContent } from "./FilterPopupContent";
import { SettingsPopupContent } from "./SettingsPopupContent";

export const Sidebar: React.FC = () => {
	const { state, dispatch } = useNotesContext();
	const { t } = useTranslation();
	const popup = usePopup();

	const handleFilterClick = (filter: Filter) => {
		dispatch({ type: "SET_ACTIVE_FILTER", payload: filter });
	};

	const openFilterPopup = () => {
		popup.showPopup(
			<FilterPopupContent onClose={popup.hidePopup} />,
			t("create_filter")
		);
	};

	const openSettingsPopup = () => {
		popup.showPopup(
			<SettingsPopupContent onClose={popup.hidePopup} />,
			t("settings")
		);
	};

	return (
		<div className="w-64 bg-blue-900 text-white p-4 flex flex-col justify-between">
			<div>
				<List>
					{state.filters.map((filter) => (
						<ListItem
							key={filter.id}
							onClick={() => handleFilterClick(filter)}
							className={`hover:bg-sky-40/40 ${
								state.currentFilter.id === filter.id ? "bg-sky-50/40" : "cursor-pointer border border-white-300"}
								rounded my-4`}
						>
							<ListItemText primary={filter.name} />
						</ListItem>
					))}
				</List>
			</div>
			<div className="flex items-center justify-between">
				<Button variant="outlined" onClick={openSettingsPopup}>
					{t("Settings")}
				</Button>
				<Button variant="contained" color="secondary" onClick={openFilterPopup}>
					+
				</Button>
			</div>
		</div>
	);
};
