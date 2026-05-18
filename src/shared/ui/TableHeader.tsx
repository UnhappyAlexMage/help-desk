import SortButton from "./SortButton";

type SortDirection = "up" | "down" |  null;

type TableHeaderProps = {
    title: string;
    sortable?: boolean;
    sortDirection?: SortDirection;
    onSort?: () => void;
};

export default function TableHeader({
    title,
    sortable = false,
    sortDirection = null,
    onSort
} : TableHeaderProps ) {
    return (
        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
            <div className="flex items-center justify-center gap-1">
                {title}
                {sortable && onSort && (
                <SortButton
                    direction={sortDirection}
                    onClick={onSort}
                />
                )}
            </div>
        </th>
    );
};