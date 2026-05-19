import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { commentSchema, type CommentFormData } from "../shared/validators/comment.schema";
import { getUserNameById } from "../shared/lib/getUserNameById.ts";
import { formatDate } from "../shared/lib/formatDate.ts";
import type { TicketComment } from "../entities/model/types.ts";
import { useState } from "react";

interface UserData {
    activeUser: {
    id: string;
    role: string;
    fullName: string;
    } | null;
};

export function CommentsSection( {activeUser} : UserData ) {
    const { ticketId } = useParams();
    const queryClient = useQueryClient();

    const [formKey, setFormKey] = useState(0);

    const { data: comments, isLoading, isError } = useQuery<TicketComment[]>({
        queryKey: ["comments", ticketId],
        queryFn: async () => {
            const response = await fetch(`/api/tickets/${ticketId}/comments`);

            if(!response.ok) {
                throw new Error("Ошибка загрузки комментариев");
            };

            return response.json();
        },
    });

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: { text: ""},
        mode: "onSubmit",
    });


    const mutation = useMutation({
        mutationFn: async ( data: CommentFormData ) => {
        const response = await fetch(
            `/api/tickets/${ticketId}/comments`,
            {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
                text: data.text,
                authorId: activeUser?.id,
            }),
            }
        );

        if (!response.ok) {
            throw new Error(
            "Ошибка добавления комментария"
            );
        }

        return response.json();
        },

        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [ "comments", ticketId ],
        });

        reset();
        setFormKey(prev => prev + 1);

        },
    });


    if(isLoading) { return <div className="text-black-700">Происходит загрузка комментариев... Нажмите Ctrl+R</div> };
    if(isError ) { return <div className="text-red-700">Произошла ошибка при загрузке комментариев... Нажмите Ctrl+R</div> };

    return(
        <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="space-y-4">
                {comments?.map((comment) => (
                <div
                    key={comment.id}
                    className="border border-gray-100 rounded-lg p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-black">
                        {getUserNameById(comment.authorId)}
                    </span>
                    <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                    </span>
                    </div>
                    <p className="text-sm text-gray-700">
                        {comment.text}
                    </p>
                </div>
                ))}
            </div>
            <form
                key={formKey}
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                className="mt-6"
            >
                <textarea
                    {...register("text")}
                    placeholder="Введите комментарий..."
                    className="w-full min-h-25 border border-gray-300 rounded-lg p-3 outline-none focus:border-gray-600 text-black"
                />
                {errors.text && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.text.message}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
                    >
                    {mutation.isPending ? "Сохранение..." : "Добавить комментарий"}
                </button>
            </form>
        </section>
    );
};