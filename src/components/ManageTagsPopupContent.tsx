import React from "react";
import {
	List,
	ListItem,
	ListItemText,
	IconButton,
	Button
} from "@mui/material";
import { useNotesContext } from "@/contexts/NotesContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tag } from "@/types";
import { useTranslation } from "react-i18next";

export const ManageTagsPopupContent: React.FC<{ onClose: () => void }> = ({
	onClose
}) => {
	const { state, dispatch } = useNotesContext();
	const { t } = useTranslation();

	const handleDelete = async (id: string) => {
		dispatch({ type: "DELETE_TAG", payload: id });
	};

	return (
		<div>
			<List>
				{state.tags.map((tag: Tag) => (
					<ListItem
						key={tag}
						secondaryAction={
							<IconButton edge="end" onClick={() => handleDelete(tag)}>
								<DeleteIcon />
							</IconButton>
						}
					>
						<ListItemText primary={tag} />
					</ListItem>
				))}
			</List>
			<div style={{ textAlign: "right", marginTop: 16 }}>
				<Button onClick={onClose} variant="contained" color="primary">
					{t("close")}
				</Button>
			</div>
		</div>
	);
};
