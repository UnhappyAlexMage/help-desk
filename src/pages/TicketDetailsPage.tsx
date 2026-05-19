import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";

import InfoRow from "../shared/ui/InfoRow";
import { getUserNameById } from "../shared/lib/getUserNameById";
import { formatDate } from "../shared/lib/formatDate";
import { CommentsSection } from "../components/CommentsSection";
import TicketHistory from "../components/TicketHistory";

interface OutletContextType {
  activeUser: {
    id: string;
    role: string;
    fullName: string;
  } | null;
};

export default function TicketDetailsPage() {
    const { ticketId } = useParams();

    const navigate = useNavigate();
    const { activeUser } = useOutletContext<OutletContextType>();

    const { data: ticket, isLoading, isError } = useQuery({
        queryKey: ["ticket", ticketId],
        queryFn: async () => {
            const response = await fetch(`/api/tickets/${ticketId}`);

            if(!response.ok) {
                throw new Error("Ошибка в загрузке заявки");
            };

            const data = await response.json();
            return data;
        },

     });

     if(isLoading) { return <div className="text-black-700">Происходит загрузка выбранной заявки... Нажмите Ctrl+R</div> };
     if(isError ) { return <div className="text-red-700">Произошла ошибка при загрузке заявки... Нажмите Ctrl+R</div> };

     return (
        <div className="space-y-6 m-8">
            <section className="bg-gray-100 rounded-xl border border-gray-600 p-6">
                <div className="flex gap-6" style={{ minHeight: '600px', height: '650px' }}>
                    <div className="w-1/2 space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-black">
                                Тема: {ticket.title}
                            </h3>
                            <p className="mt-1 text-gray-600">
                                Описание: {ticket.description}
                            </p>
                        </div>
                        <div className="border-t border-gray-400"></div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-black">
                                Информация о заявке:
                            </h4>
                            <div className="space-y-2">
                                <InfoRow 
                                    label="Статус:"
                                    value={ticket.status}
                                />
                                <InfoRow 
                                    label="Приоритет:"
                                    value={ticket.priority}
                                />
                                <InfoRow 
                                    label="Категория:"
                                    value={ticket.category}
                                />
                                <InfoRow 
                                    label="Автор:"
                                    value={getUserNameById(ticket.authorId)}
                                />
                                <InfoRow 
                                    label="Исполнитель:"
                                    value={getUserNameById(ticket.assigneeId)}
                                />
                                <InfoRow 
                                    label="Дата объявления:"
                                    value={formatDate(ticket.createdAt)}
                                />
                                <InfoRow 
                                    label="Дата обновления:"
                                    value={formatDate(ticket.updatedAt)}
                                />
                                <InfoRow 
                                    label="Дедлайн:"
                                    value={ticket.deadlineAt ? formatDate(ticket.deadlineAt) : "Не указано"}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(`/`)}
                            className="text-black bg-gray-300 mr-2 mt-2"
                        >
                            ← Назад
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(`/tickets/${ticketId}/edit`)}
                            className="text-black bg-gray-300 mt-2"
                        >
                            Редактирование заявки →
                        </button>
                    </div>
                    <div className="w-px bg-gray-300"></div>
                    <div className="w-1/2 flex flex-col gap-4 h-full">
                        <article className="bg-gray-100  rounded-lg flex-1" style={{ height: '75%' }}>
                            <div className="h-full overflow-y-auto">
                                <p className="font-bold text-xl mb-2 text-black">Комментарии:</p>
                                <CommentsSection 
                                    activeUser={activeUser}
                                />
                            </div>
                        </article>
                        <div className="border-t border-gray-400"></div>
                        <article className="bg-gray-100 rounded-lg pl-4 overflow-hidden" style={{ height: '25%' }}>
                            <div className="h-full overflow-y-auto text-black text-xl font-bold">История изменений:
                                <TicketHistory 
                                    ticketId={ticket.id}
                                />
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};