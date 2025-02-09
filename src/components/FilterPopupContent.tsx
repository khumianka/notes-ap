import React from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Formik, Form } from "formik";
import { useNotesContext } from "@/contexts/NotesContext";
import { Filter } from "@/types";
import { useTranslation } from "react-i18next";

interface FormValues {
	name: string;
	selectedTags: string[];
}

export const FilterPopupContent: React.FC<{ onClose: () => void }> = ({
	onClose
}) => {
	const { state, dispatch } = useNotesContext();
	const { t } = useTranslation();

	const initialValues: FormValues = { name: "", selectedTags: [] };

	const handleSubmit = async (values: FormValues) => {
		const newFilter: Filter = {
			id: Date.now().toString(),
			name: values.name,
			tags: values.selectedTags
		};
		dispatch({ type: "ADD_FILTER", payload: newFilter });
		onClose();
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({ values, setFieldValue, handleChange }) => (
				<Form autoComplete="off">
					<TextField
						fullWidth
						name="name"
						label={t("filter_name")}
						value={values.name}
						onChange={handleChange}
						margin="normal"
					/>
					<div>
						{state.tags.map((tag) => (
							<FormControlLabel
								key={tag}
								control={
									<Checkbox
										checked={values.selectedTags.includes(tag)}
										onChange={(e) => {
											if (e.target.checked) {
												setFieldValue("selectedTags", [
													...values.selectedTags,
													tag
												]);
											} else {
												setFieldValue(
													"selectedTags",
													values.selectedTags.filter((t) => t !== tag)
												);
											}
										}}
									/>
								}
								label={tag}
							/>
						))}
					</div>
					<div style={{ marginTop: 16, textAlign: "right" }}>
						<Button onClick={onClose}>{t("close")}</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							style={{ marginLeft: 8 }}
						>
							{t("create")}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
