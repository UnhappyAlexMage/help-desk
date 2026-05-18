type Props = {
    search: string,
    setSearch: (value: string) => void
};

export const InputSeacrhTickets = ({ search, setSearch }: Props) => {

    return (
        <input 
            type="text"
            placeholder="Поиск по названию и описанию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="justify-center border border-gray-400 px-3 py-2 mb-3 h-12 w-full focus:outline-none focus:border-gray-600 text-black placeholder:text-black rounded-2xl"
        />
    )
};