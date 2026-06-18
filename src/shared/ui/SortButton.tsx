type SortDirection = "up" | "down" | null;

type SortButtonProps = {
    direction: SortDirection;
    onClick: () => void;
};

export default function SortButton({ direction, onClick } : SortButtonProps ) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center text-gray-500 hover:text-black transition-colors border-white"
        >
            {direction === null && "↕"}
            {direction === "up" && "↑"}
            {direction === "down" && "↓"}
        </button>
    );
};