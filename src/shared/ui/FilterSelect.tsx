type Option = {
    label: string;
    value: string;
};

type FilterSelectProps = {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
};

export default function FilterSelect({
    label,
    value,
    options,
    onChange
} : FilterSelectProps ) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                {label}
            </label>
            <select 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm outline-none text-zinc-950"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};