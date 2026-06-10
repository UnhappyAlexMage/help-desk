import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router";

import type { Ticket } from "../entities/model/types";
import type { TicketFilters, SortField, TicketSorting } from "../entities/model/typesTickets";

import FilterSelect from "../shared/ui/FilterSelect";
import TableHeader from "../shared/ui/TableHeader";
import { InputSeacrhTickets } from "../shared/ui/InputSearchTickets";

import { useDebounceSearch } from "../hooks/useDebounceSearch";

import { getUserNameById } from "../shared/lib/getUserNameById";
import { formatDate } from "../shared/lib/formatDate";

import { dataTickets } from "../api/constants";
import { queryKeys } from "../api/queryKeys";

export default function TicketsPage() {

  const [sorting, setSorting] = useState<TicketSorting>({
    field: null,
    order: null,
  });

  const [filters, setFilters] = useState<TicketFilters>({
      status: "",
      priority: "",
      category: "",
      assigneeId: "",
      search: "",
  });

  const debouncedSearch = useDebounceSearch(filters.search, 1000);

  const handleFilterChange = ( key: keyof TicketFilters, value: string ) => { setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

    const handleSort = (field: SortField) => { setSorting((prev) => {
      if (prev.field !== field) {
        return {
          field,
          order: "up",
        };
      }

      if (prev.order === "up") {
        return {
          field,
          order: "down",
        };
      }

      return {
        field: null,
        order: null,
      };
    });
  };

  const { data: tickets, isLoading, isError } = useQuery<Ticket[]>({
    queryKey: [
      queryKeys.tickets.all,
      {
        ...filters,
        search: debouncedSearch
      },
      sorting,
    ],

    queryFn: async () => {
      const params = createTicketSearchParams();
      const response = await fetch(`${dataTickets}?${params}`);

      if (!response.ok) {
        throw new Error("Ошибка при загрузке заявок");
      };

      return response.json();
    },

    staleTime: 0,
    refetchOnMount: true,
  });

  const createTicketSearchParams = () => {
    const params = new URLSearchParams();

    Object.entries({...filters, search: debouncedSearch}).forEach(
      ([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      }
    );

    if (sorting.field && sorting.order) {
      params.append("sort", sorting.field);
      params.append("order", sorting.order);
    };

    return params.toString();
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-400 mx-auto">
      <div className="flex items-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Список заявок</h3>
        <button
          onClick={() => navigate("/tickets/create")}
          className="px-4 py-2 ml-2 mb-4 bg-gray-300 text-black rounded-lg "
        >
          Создать заявку
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <FilterSelect
          label="Статус"
          value={filters.status}
          onChange={(value) =>
            handleFilterChange("status", value)
          }
          options={[
            { label: "Выберите статус:", value: "" },
            { label: "Новая", value: "new" },
            { label: "В процессе", value: "in_progress" },
            { label: "Ожидание пользователя", value: "waiting_for_user" },
            { label: "Решенная", value: "resolved" },
            { label: "Закрытая", value: "closed" },
          ]}
        />
        <FilterSelect
          label="Приоритет"
          value={filters.priority}
          onChange={(value) =>
            handleFilterChange("priority", value)
          }
          options={[
            { label: "Выберите приоритет:", value: "" },
            { label: "Низкий:", value: "low" },
            { label: "Средний:", value: "medium" },
            { label: "Высокий:", value: "high" },
            { label: "Критический:", value: "critical" },
          ]}
        />
        <FilterSelect 
          label="Категории"
          value={filters.category}
          onChange={(value) =>
            handleFilterChange("category", value)
          }
          options={[
            { label: "Выберите категорию:", value: "" },
            { label: "аппаратное обеспечение", value: "hardware" },
            { label: "программное обеспечение", value: "software" },
            { label: "Сеть", value: "network" },
            { label: "Доступные", value: "access" },
            { label: "Другие", value: "other" },
          ]}
        />
        <FilterSelect 
          label="Исполнители"
          value={filters.assigneeId}
          onChange={(value) =>
            handleFilterChange("assigneeId", value)
          }
          options={[
            { label: "Выберите исполнителя:", value: "" },
            { label: "Иван Петров", value: "user1" },
            { label: "Мария Смирнова", value: "user2" },
            { label: "Алексей Орлов", value: "user3" },

          ]}
        />
      </div>
      <InputSeacrhTickets
        search={filters.search}
        setSearch={(value) => handleFilterChange("search", value)}
      />
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-slate-50">
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
                Название заявки
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
                Статус
              </th>
              <TableHeader
                title="Приоритет"
                sortable
                sortDirection={sorting.field === "priority" ? sorting.order : null}
                onSort={() => handleSort("priority")}
              />
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
                Категория
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
                Автор
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
                Исполнитель
              </th>
              <TableHeader
                title="Дата создания"
                sortable
                sortDirection={sorting.field === "createdAt" ? sorting.order : null}
                onSort={() => handleSort("createdAt")}
              />
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600 border-r border-gray-200">
                Дата обновления
              </th>
              <TableHeader
                title="Дедлайн"
                sortable
                sortDirection={sorting.field === "deadlineAt" ? sorting.order : null}
                onSort={() => handleSort("deadlineAt")}
              />
            </tr>
          </thead>
          
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">Происходит загрузка данных... Нажмите Ctrl+R</td>
              </tr>
            )}
            
            {isError && (
              <tr>
                <td colSpan={9} className="text-center py-8 text-red-500">Не удалось загрузить данные... Нажмите Ctrl+R</td>
              </tr>
            )}

            {!isLoading && tickets?.map((ticket) => (
              <tr key={ticket.id} onClick={() => navigate(`/tickets/${ticket.id}`)} className="border-b border-gray-100 hover:bg-slate-200 transition-colors cursor-pointer">
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200 font-medium">{ticket.title}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">
                  {ticket.status}
                </td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{ticket.priority}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{ticket.category}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNameById(ticket.authorId)}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{getUserNameById(ticket.assigneeId)}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{formatDate(ticket.createdAt)}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 border-r border-gray-200">{formatDate(ticket.updatedAt)}</td>
                <td className="text-center py-3 px-4 text-sm text-gray-700 last:border-r-0">{ticket?.deadlineAt ? formatDate(ticket.deadlineAt) : "Нет дедлайна"}</td>
              </tr>
            ))}
            
            {!isLoading && tickets?.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">Нет заявок, соответствующих выбранным фильтрам</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
