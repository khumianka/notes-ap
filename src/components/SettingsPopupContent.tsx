import React from "react";
import { Button, Box } from "@mui/material";
import { usePopup } from "@/contexts/PopupContext";
import { ManageFiltersPopupContent } from "./ManagaFiltersPopupContent";
import { ManageTagsPopupContent } from "./ManageTagsPopupContent";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export const SettingsPopupContent: React.FC<{ onClose: () => void }> = ({
	onClose
}) => {
	const popup = usePopup();
	const {t} = useTranslation();

	const openManageTags = () => {
		popup.showPopup(
			<ManageTagsPopupContent onClose={popup.hidePopup} />,
			"Manage Tags"
		);
	};

	const openManageFilters = () => {
		popup.showPopup(
			<ManageFiltersPopupContent onClose={popup.hidePopup} />,
			"Manage Filters"
		);
	};

	return (
		<Box display="flex" flexDirection="column" gap={2}>
			<Button variant="outlined" fullWidth onClick={openManageTags}>
				{t("manage_tags")}
			</Button>
			<Button variant="outlined" fullWidth onClick={openManageFilters}>
				{t("manage_filters")}
			</Button>
			<Button onClick={onClose} variant="contained" color="primary">
				{t("close")}
			</Button>
			<LanguageSwitcher />
		</Box>
	);
};
