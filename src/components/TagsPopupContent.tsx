import React from "react";
import { Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { useNotesContext } from "@/contexts/NotesContext";
import { Note, Tag } from "@/types";
import { useTranslation } from "react-i18next";

interface FormValues {
	selectedTagIds: string[];
	newTagName: string;
}

export const TagsPopupContent: React.FC<{
	note: Note;
	onClose: () => void;
}> = ({ note, onClose }) => {
	const { state, dispatch } = useNotesContext();
	const { t } = useTranslation();

	const initialValues: FormValues = {
		selectedTagIds: note.tags,
		newTagName: ""
	};

	const handleSubmit = async (values: FormValues) => {
		let updatedTagIds = values.selectedTagIds;
		if (values.newTagName.trim()) {
			const newTag: Tag = values.newTagName.trim();
			dispatch({ type: "ADD_TAG", payload: newTag });
			updatedTagIds = [...updatedTagIds, newTag];
		}
		const updatedNote = { ...note, tags: updatedTagIds };
		dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
		onClose();
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({ values, setFieldValue, handleChange }) => (
				<Form autoComplete="off">
					<div>
						{state.tags.map((tag) => (
							<FormControlLabel
								key={tag}
								control={
									<Checkbox
										checked={values.selectedTagIds.includes(tag)}
										onChange={(e) => {
											if (e.target.checked) {
												setFieldValue("selectedTagIds", [
													...values.selectedTagIds,
													tag
												]);
											} else {
												setFieldValue(
													"selectedTagIds",
													values.selectedTagIds.filter((t) => t !== tag)
												);
											}
										}}
									/>
								}
								label={tag}
							/>
						))}
					</div>
					<TextField
						fullWidth
						name="newTagName"
						label={t("tag_name")}
						value={values.newTagName}
						onChange={handleChange}
						margin="normal"
					/>
					<div style={{ marginTop: 16, textAlign: "right" }}>
						<Button onClick={onClose}>{t("cancel")}</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							style={{ marginLeft: 8 }}
						>
							{t("save")}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
