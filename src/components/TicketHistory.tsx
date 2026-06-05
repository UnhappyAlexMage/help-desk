// components/TicketHistory.tsx
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../shared/lib/formatDate";

import type { TicketHistoryItem } from "../entities/model/types";
import { dataTickets } from "../api/constants";

type TicketHistoryProps = {
    ticketId: string;
};

export default function TicketHistory({ ticketId }: TicketHistoryProps) {
    const { data: history, isLoading, isError } = useQuery<TicketHistoryItem[]>({
        queryKey: ["ticketHistory", ticketId],
        queryFn: async () => {
            const response = await fetch(`${dataTickets}/${ticketId}/history`);
            
            if (!response.ok) {
                throw new Error("Ошибка загрузки истории изменений");
            }
            
            return response.json();
        },
        staleTime: 0,
    });

    if (isLoading) { return ( <p className="text-gray-700">Происходи загрузка истории изменений... Нажмите Ctrl+R</p> ) };
    if (isError) { return ( <p className="text-red-700"> Произошла ошибка при загрузке истории изменений... Нажмите Ctrl+R</p> )};
    if (!history || history.length === 0) { return ( <p className="text-gray-400"> История изменений пуста</p> )};

    const getFieldLabel = (field: string): string => {
        const labels: Record<string, string> = {
            status: "статус",
            priority: "приоритет",
            assignee: "исполнителя",
        };
        return labels[field] || field;
    };

    const getActionText = (entry: TicketHistoryItem): string => {
        switch (entry.field) {
            case "status":
                return `изменил(а) статус: ${entry.oldValue} → ${entry.newValue}`;
            case "priority":
                return `изменил(а) приоритет: ${entry.oldValue} → ${entry.newValue}`;
            case "assignee":
                if (!entry.oldValue) {
                    return `назначил(а) исполнителя: ${entry.newValue}`;
                }
                return `изменил(а) исполнителя: ${entry.oldValue} → ${entry.newValue}`;
            default:
                return `изменил(а) ${getFieldLabel(entry.field)}`;
        }
    };

    return (
        <section className="space-y-4">
            <div className="space-y-3">
                {history.map((entry) => (
                    <div
                        key={entry.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                        {/* Контент */}
                        <div className="flex-1">
                            <div className="text-sm text-gray-900">
                                <span className="font-medium">
                                    {entry.changedBy}
                                </span>{" "}
                                {getActionText(entry)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {formatDate(entry.changedAt)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}