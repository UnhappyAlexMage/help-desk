import { useRouteError, isRouteErrorResponse, useNavigate  } from 'react-router';

export default function GlobalErrorBoundary() {
    const error = useRouteError();

    const handleReload = () => window.location.reload();

    const navigate = useNavigate();
    const habldeGoHome = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
    }

    const getErrorMessage = (): string => {
        if(isRouteErrorResponse(error)) {
            switch (error.status) {
                case 401:
                    return 'Требуется авторизация.';
                case 403:
                    return 'Доступ запрещён.';
                case 500:
                    return 'Внутренняя ошибка сервера.';
                case 502:
                    return 'Сервер временно недоступен.';
                default:
                    return `Ошибка ${error.status}: ${error.statusText || 'Неизвестная ошибка сервера'}`;
            };
        };

         return 'Произошла непредвиденная ошибка в приложении.';
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-slate-300 p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 pt-30 pb-30 text-center">
            <h6 className="text-3xl font-bold text-slate-800 mb-2">
                Отработал ErrorBoundary
            </h6>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                {getErrorMessage()}
            </p>
            <div className="flex gap-4">
                <button
                    onClick={handleReload}
                    className="flex-1   bg-slate-100 hover:bg-slate-200 text-black font-medium rounded-xl transition shadow-sm"
                    >
                    Попробовать снова
                </button>
                <a
                    onClick={habldeGoHome}
                    className="flex-1 bg-gray-300 font-medium rounded-xl transition pt-2.5 cursor-pointer"
                    >
                    На главную
                </a>
            </div>
            </div>
        </div>
    );
};