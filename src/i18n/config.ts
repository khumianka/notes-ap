import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	"en": {
		"translation": {
			"inbox": "Inbox",
			"settings": "Settings",
			"create_note": "Create note",
			"manage_tags": "Tags",
			"manage_filters": "Filters",
			"close": "Close",
			"create_filter": "Create filter",
			"create": "Create",
			"cancel": "Cancel",
			"tags": "Tags",
			"tag_name": "Tag name",
			"save": "Save",
			"filter_name": "Filter name"
		}
	},
	"ru": {
		"translation": {
			"inbox": "Входящие",
			"settings": "Настройки",
			"create_note": "Создать заметку",
			"manage_tags": "Теги",
			"manage_filters": "Фильтры",
			"close": "Закрыть",
			"create_filter": "Создать фильтр",
			"create": "Создать",
			"cancel": "Отмена",
			"tags": "Теги",
			"tag_name": "Название тега",
			"save": "Сохранить",
			"filter_name": "Название фильтра"
		}
	},
	"pl": {
		"translation": {
			"inbox": "Skrzynka odbiorcza",
			"settings": "Ustawienia",
			"create_note": "Utwórz notatkę",
			"manage_tags": "Tagi",
			"manage_filters": "Filtry",
			"close": "Zamknij",
			"create_filter": "Utwórz filtr",
			"create": "Utwórz",
			"cancel": "Anuluj",
			"tags": "Tagi",
			"tag_name": "Nazwa tagu",
			"save": "Zapisz",
			"filter_name": "Nazwa filtru"
		}
	}
}

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
