import type { TicketStatus, UserRole } from "../entities/model/types";

// Карта разрешенных переходов - СТРОГО по правилам
const STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  new: ["in_progress"],                           // new -> только in_progress
  in_progress: ["waiting_for_user", "resolved"],  // in_progress -> waiting_for_user ИЛИ resolved
  waiting_for_user: ["in_progress"],              // waiting_for_user -> только in_progress
  resolved: ["closed", "in_progress"],            // resolved -> closed ИЛИ in_progress
  closed: []                                      // closed -> никуда
};

// Функция проверки - использует карту переходов
function canChangeTicketStatus(
  currentStatus: TicketStatus,
  nextStatus: TicketStatus
): boolean {
  // Нельзя перейти на тот же статус
  if (currentStatus === nextStatus) {
    return false;
  }
  
  // Проверяем, есть ли такой переход в разрешенных
  return STATUS_TRANSITIONS[currentStatus]?.includes(nextStatus) ?? false;
}

// Русские названия статусов
const STATUS_LABELS: Record<TicketStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  waiting_for_user: "Ожидает пользователя",
  resolved: "Решена",
  closed: "Закрыта"
};

interface StatusSelectorProps {
  currentStatus: TicketStatus;
  userRole: UserRole;
  onStatusChange: (newStatus: TicketStatus) => void;
}

export default function StatusSelector({ 
  currentStatus, 
  userRole, 
  onStatusChange 
}: StatusSelectorProps) {
  // Только admin и support могут менять статусы
  const canEdit = ["admin", "support"].includes(userRole);
  
  // Получаем доступные статусы для перехода
  const availableStatuses = canEdit ? STATUS_TRANSITIONS[currentStatus] : [];

  const handleChange = (newStatus: TicketStatus) => {
    // Дополнительная проверка
    if (canChangeTicketStatus(currentStatus, newStatus)) {
      onStatusChange(newStatus);
    } else {
      console.warn(`Переход "${currentStatus}" -> "${newStatus}" запрещен`);
    }
  };

  // Если нет прав на редактирование или статус closed
  if (!canEdit || availableStatuses.length === 0) {
    return (
      <span className="px-2 py-1 text-sm text-gray-700">
        {STATUS_LABELS[currentStatus]}
      </span>
    );
  }

  // Показываем селектор с возможными переходами
  return (
    <select
      value={currentStatus}
      onChange={(e) => handleChange(e.target.value as TicketStatus)}
      className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
    >
      <option value={currentStatus}>
        {STATUS_LABELS[currentStatus]}
      </option>
      
      {/* Показываем только разрешенные переходы */}
      {availableStatuses.map(status => (
        <option key={status} value={status}>
          → {STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}