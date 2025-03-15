import { CityData } from "./user-location";

export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_MINUTE = 60 * 1000;
export const DEFAULT_CITY_DATA: CityData = {
    id: 2073,
    name_en: "Mecca",
    country_en: "Saudi Arabia",
    name_ar: "مكة",
    country_ar: "السعودية",
    name: "مكة،  السعودية"
};

export const prayerNames: Record<string,string> = {
'Fajr': 'الفجر',
'Dhuhr': 'الظهر',
'Asr': 'العصر',
'Maghrib': 'المغرب',
'Isha': 'العشاء',
};

export const monthNames: Record<string, string> = {
    January: "يناير",
    February: "فبراير",
    March: "مارس",
    April: "أبريل",
    May: "مايو",
    June: "يونيو",
    July: "يوليو",
    August: "أغسطس",
    September: "سبتمبر",
    October: "أكتوبر",
    November: "نوفمبر",
    December: "ديسمبر"
};
