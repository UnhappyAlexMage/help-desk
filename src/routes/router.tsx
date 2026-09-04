import { createBrowserRouter } from 'react-router';

import App from '../App';
import GlobalErrorBoundary from '../components/GlobalErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        index: true,
        lazy: () => import('../pages/TicketsPage').then(module => ({ Component: module.default })),
        handle: { title: 'Список заявок', showInMenu: true }
      },
      {
        path: 'tickets/:ticketId',
        lazy: () => import('../pages/TicketDetailsPage').then(module => ({ Component: module.default })),
        handle: { title: 'Карточка заявки', showInMenu: false }
      },
      {
        path: 'tickets/create',
        lazy: () => import('../pages/CreateTicketPage').then(module => ({ Component: module.default })),
        handle: { title: 'Создание новой заявки', showInMenu: false }
      },
      {
        path: 'tickets/:ticketId/edit',
        lazy: () => import('../pages/EditingTicketPage').then(module => ({ Component: module.default })),
        handle: { title: 'Редактирование выбранной заявки', showInMenu: false }
      },
      {
        path: '*',
        lazy: () => import('../components/ErrorPage404').then(module => ({ Component: module.default })),
        handle: { title: 'Страница не найдена' ,showInMenu: false }
      },
    ]
  }
]);

export default router;
