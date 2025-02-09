"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

interface PopupContextType {
	showPopup: (content: ReactNode, title?: string) => void;
	hidePopup: () => void;
}

const PopupContext = createContext<PopupContextType>({
	showPopup: () => {},
	hidePopup: () => {}
});

export const PopupProvider = ({ children }: { children: ReactNode }) => {
	const [popupOpen, setPopupOpen] = useState(false);
	const [popupContent, setPopupContent] = useState<ReactNode>(null);
	const [popupTitle, setPopupTitle] = useState<string>("");

	const showPopup = (content: ReactNode, title?: string) => {
		setPopupContent(content);
		setPopupTitle(title || "");
		setPopupOpen(true);
	};

	const hidePopup = () => {
		setPopupOpen(false);
		setPopupContent(null);
		setPopupTitle("");
	};

	return (
		<PopupContext.Provider value={{ showPopup, hidePopup }}>
			{children}
			<Dialog
				open={popupOpen}
				onClose={hidePopup}
			>
				{popupTitle && <DialogTitle>{popupTitle}</DialogTitle>}
				<DialogContent>{popupContent}</DialogContent>
			</Dialog>
		</PopupContext.Provider>
	);
};

export const usePopup = () => useContext(PopupContext);
