import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language || "en");

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		setLang(lng);
	};

	return (
		<div className="flex gap-2 p-2">
			<Button
				className={`px-3 py-1 rounded ${lang === "en" ? "bg-blue-500 text-white" : "bg-gray-300"
					}`}
				onClick={() => changeLanguage("en")}
			>
				EN
			</Button>
			<Button
				className={`px-3 py-1 rounded ${lang === "ru" ? "bg-blue-500 text-white" : "bg-gray-300"
					}`}
				onClick={() => changeLanguage("ru")}
			>
				RU
			</Button>
			<Button
				className={`px-3 py-1 rounded ${lang === "pl" ? "bg-blue-500 text-white" : "bg-gray-300"
					}`}
				onClick={() => changeLanguage("pl")}
			>
				PL
			</Button>
		</div>
	);
};

export default LanguageSwitcher;

