type InfoRowProps = {
    label: string;
    value: string;
};

export default function InfoRow({label, value} : InfoRowProps) {

    return (
        <div className="flex items-start justify-between gap-6 py-3 border-b border-gray-400">
            <span className="text-sm font-medium text-gray-500">
                {label}
            </span>
            <span className="text-sm text-gray-900 text-right">
                {value}
            </span>
        </div> 
    );
};