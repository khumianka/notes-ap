import React from "react";
import {
	List,
	ListItem,
	ListItemText,
	IconButton,
	Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNotesContext } from "@/contexts/NotesContext";
import { Filter } from "@/types";
import { useTranslation } from "react-i18next";

export const ManageFiltersPopupContent: React.FC<{ onClose: () => void }> = ({
	onClose
}) => {
	const { state, dispatch } = useNotesContext();
	const { t } = useTranslation();

	const handleDelete = async (id: string) => {
		dispatch({ type: "DELETE_FILTER", payload: id });
	};

	return (
		<div>
			<List>
				{state.filters.map((filter: Filter) => {
					if (filter.id !== "inbox") return (
					<ListItem
						key={filter.id}
						secondaryAction={
							<IconButton edge="end" onClick={() => handleDelete(filter.id)}>
								<DeleteIcon />
							</IconButton>
						}
					>
						<ListItemText primary={filter.name} />
					</ListItem>
				)})}
			</List>
			<div style={{ textAlign: "right", marginTop: 16 }}>
				<Button onClick={onClose} variant="contained" color="primary">
					{t("close")}
				</Button>
			</div>
		</div>
	);
};
