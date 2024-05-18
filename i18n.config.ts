import en from './locales/en.json'
import ru from './locales/ru.json'
export default defineI18nConfig(() => {
    return {
        legacy: false,
        messages: {
            en,
            ru,
        }
    }
})