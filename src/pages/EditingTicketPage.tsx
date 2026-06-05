import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOutletContext } from "react-router";
import toast from "react-hot-toast";

import { editingTicketSchema, type editingTicketFromData } from "../shared/validators/editingTicket.schema.ts";
import type { Ticket } from "../entities/model/types.ts";
import { getAvailableStatuses } from "../shared/lib/ticketStatus.ts";
import { dataTickets } from "../api/constants.ts";

interface OutletContextType {
  activeUser: {
    id: string;
    role: string;
    fullName: string;
  } | null;
};

export default function EditingTicketPage() {
    const { activeUser } = useOutletContext<OutletContextType>();

    const { ticketId } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: ticket, isLoading, isError } = useQuery({
        queryKey: ["ticket", ticketId],
        queryFn: async () => {
            const response = await fetch(`${dataTickets}/${ticketId}`);

            if(!response.ok) {
                throw new Error("Ошибка в загрузке заявки");
            };

            const data: Ticket = await response.json();
            return data;
        },

    });

    const { register, handleSubmit, formState: { errors } } = useForm<editingTicketFromData>({
        resolver: zodResolver( editingTicketSchema ),
        mode: "onSubmit",
        values: ticket ? {
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            assigneeId: ticket.assigneeId ?? "",
            // authorId: ticket.authorId,
            // createdAt: ticket.createdAt,
            // updatedAt: ticket.updatedAt,
            category: ticket.category,
            deadlineAt: ticket.deadlineAt?.slice(0, 16)
        } : undefined,
    });

    const mutation = useMutation({ mutationFn: async( data: editingTicketFromData ) => {
        const response = await fetch(`/api/tickets/${ticketId}`, 
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }
        );

        if(!response.ok) { 
            throw new Error("Ошибка редактирования заявки"); 
        };

        return response.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ "tickets" ],
            });

            queryClient.invalidateQueries({
                queryKey: [ "ticket", ticketId ],
            });

            queryClient.refetchQueries({
                queryKey: ["tickets"],
            });

            toast.success("Заявка успешна редактирована!");
            setTimeout(()=> { navigate("/") }, 1000);        
        },

        onError: (error) => {
            console.error("Ошибка мутации:", error);

            toast.error("Ошибка редактирования заявки...");
        }
    });
    
    const availableStatuses = ticket ? getAvailableStatuses(ticket.status) : [];

    const isAdmin = activeUser?.role === "admin";

    if(isLoading) { return <div className="text-black-700">Происходит загрузка выбранной заявки... Нажмите Ctrl+R</div> };
    if(isError ) { return <div className="text-red-700">Произошла ошибка при загрузке заявки... Нажмите Ctrl+R</div> };

    return (
        <div className="space-y-6 m-8">
            <section className="bg-white rounded-xl border border-black p-6">
                <h1 className="text-2xl font-bold mb-6 text-black">
                    Редактирование заявки
                </h1>
                <form
                    onSubmit={handleSubmit((data) => mutation.mutate(data))}
                    className="space-y-6"
                >
                    <div>
                        <label className="block mb-2 text-lg font-medium text-black">
                            Измените Название
                        </label>
                        <input
                            {...register("title")}
                            className="w-full border border-gray-300 rounded-lg p-3 text-black"
                        />
                        <p className="text-black text-sm"><b>Прошлое название: </b>{ticket?.title}</p>
                        {errors.title && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium text-black">
                            Измените Описание
                        </label>
                        <textarea
                            {...register("description")}
                            className="w-full min-h-24 border border-gray-300 rounded-lg p-3 text-black"
                            
                        />
                        <p className="text-black text-sm"><b>Прошлое описание: </b>{ticket?.description}</p>
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium text-black">
                            Измените Статус
                        </label>
                        <select
                            {...register("status")}
                            className="w-full h-10 border bg-white border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer"
                        > 
                            {availableStatuses.map(
                                (status) => (
                                    <option
                                        key={status}
                                        value={status}
                                    >
                                        {status}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium text-black">
                            Измените Приоритет
                        </label>
                        <select
                            {...register("priority")}
                            className="w-full h-10 border bg-white border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer"
                        >
                        <option value="">Выбранный приоритет: {ticket?.priority}</option>
                            <option value="low">Выбрать: Low</option>
                            <option value="medium">Выбрать: Medium</option>
                            <option value="high">Выбрать: High</option>
                            <option value="critical">Выбрать: Critical</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium text-black">
                            Измените Исполнителя
                        </label>
                        {isAdmin ? (
                            <select
                                {...register("assigneeId")}
                                className="w-full h-10 border bg-white border-gray-300 rounded-md shadow-sm text-gray-700 cursor-pointer p-2"
                            >
                                <option value="">Назначить саппорта: Мария Смирнова</option>
                                
                            </select>
                        ) : (
                            <select
                                disabled
                                className="w-full h-10 border bg-gray-100 border-gray-300 rounded-md shadow-sm text-gray-400 cursor-not-allowed p-2"
                                value=""
                            >
                                <option value="">Изменение исполнителя недоступно</option>
                            </select>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium text-black">
                            Измените Дедлайн
                        </label>
                        <input
                            type="datetime-local"
                            {...register("deadlineAt")}
                            className="w-full border border-gray-300 rounded-lg p-3 text-black"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/tickets/${ticketId}`)}
                            className="px-6 py-2  bg-gray-300 rounded-lg border text-black  hover:bg-gray-200"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-gray-800"
                        >
                            {mutation.isPending ? "Сохранение..." : "Сохранить изменения"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
     );
}