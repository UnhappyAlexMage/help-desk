export const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("ru-RU", 
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    ).format(new Date(date));
};