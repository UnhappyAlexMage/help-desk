import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createTicketSchema, type CreateTicketFormData } from "../shared/validators/createTicket.schema";
import { useUser } from "../providers/RoleContext";
import { dataTickets } from "../api/constants";

export default function CreateTicketPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { currentUser } = useUser();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateTicketFormData>({
        resolver: zodResolver( createTicketSchema ),
        mode: "onSubmit",
    });

    const mutation = useMutation({ mutationFn: async ( data: CreateTicketFormData ) => {
        const requestBody = { ...data, authorId: currentUser?.id }

        const response = await fetch(dataTickets,
            {
            method: "POST",
            headers: {
                "Content-Type":
                "application/json",
            },
            body: JSON.stringify(requestBody),
            }
            
        );

        if (!response.ok) {
            throw new Error("Ошибка создания заявки");
        }

        return response.json();
        },
        
        onError: (error) => {
            console.error("Ошибка мутации:", error);

            toast.error("Не удалось создать заявку!")
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tickets"],
            });

            toast.success("Заявка успешно создана");
        },
    });

    return (
        <section className="bg-white rounded-xl border border-gray-400 m-4 overflow-hidden">
            <h1 className="text-2xl font-bold mb-4 ml-4 text-black">
                Создание заявки
            </h1>
            <form
                onSubmit={handleSubmit((data) => { mutation.mutate(data); })}
                className="m-4"
            >
                <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                        Название
                    </label>
                    <input
                        {...register("title")}
                        placeholder="Введите название..."
                        className="w-full border border-gray-300 rounded-lg p-3 box-border text-black"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 mt-1">
                        {
                            errors.title
                            .message
                        }
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                        Описание
                    </label>
                    <textarea
                        {...register("description")}
                        placeholder="Введите описание..."
                        className="w-full min-h-45 border border-gray-300 rounded-lg p-3 text-black box-border"
                    />

                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">
                        {
                            errors
                            .description
                            .message
                        }
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                        Категория
                    </label>
                    <select
                        {...register("category")}
                        className="w-full border border-gray-300 rounded-lg p-3 text-black box-border mb-2"
                    >
                        <option className="text-black" value="">
                        Выберите категорию:
                        </option>
                        <option value="hardware">
                            Hardware
                        </option>
                        <option value="software">
                            Software
                        </option>
                        <option value="network">
                            Network
                        </option>
                        <option value="access">
                            Access
                        </option>
                        <option value="other">
                            Other
                        </option>
                    </select>
                    {errors.category && (
                        <p className="text-sm text-red-500 mt-1">
                        {
                            errors.category
                            .message
                        }
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                        Приоритет
                    </label>
                    <select
                        {...register("priority")}
                        className="w-full border border-gray-300 rounded-lg p-3 text-black box-border mb-2"
                    >
                        <option value="">
                            Выберите приоритет:
                        </option>
                        <option value="low">
                            Low
                        </option>
                        <option value="medium">
                            Medium
                        </option>
                        <option value="high">
                            High
                        </option>
                        <option value="critical">
                            Critical
                        </option>
                    </select>

                    {errors.priority && (
                        <p className="text-sm text-red-500 mt-1">
                        {
                            errors.priority
                            .message
                        }
                        </p>
                    )}
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                        Дедлайн
                    </label>

                    <input
                        type="datetime-local"
                        {...register("deadlineAt")}
                        className="w-full border border-gray-300 rounded-lg p-3 text-black box-border mb-4"
                    />

                    {errors.deadlineAt && (
                        <p className="text-sm text-red-500 mt-1">
                        {
                            errors.deadlineAt
                            .message
                        }
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    disabled={mutation.isPending}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50 mr-2 border border-black cursor-pointer"
                >
                    Перейти к заявкам
                </button>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 cursor-pointer"
                >
                    {mutation.isPending ? "Создание..." : "Создать заявку"}
                </button>
            </form>
        </section>
    );
}