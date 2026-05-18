import { createBrowserRouter } from 'react-router';

import App from '../App';
import GlobalErrorBoundary from '../components/GlobalErrorBoundary';

const TicketsPage = () => import('../pages/TicketsPage').then(module => ({ Component: module.default }));
const NotFound = () => import('../components/ErrorPage404').then(module => ({ Component: module.default }));
const TicketDetailsPage = () => import('../pages/TicketDetailsPage').then(module => ({ Component: module.default }));
const CreateTicketPage = () => import('../pages/CreateTicketPage').then(module => ({ Component: module.default }));
const EditingTicketPage = () => import('../pages/EditingTicketPage').then(module => ({ Component: module.default }));


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        index: true,
        lazy: TicketsPage,
        handle: { title: 'Список заявок', showInMenu: true }
      },
      {
        path: 'tickets/:ticketId',
        lazy: TicketDetailsPage,
        handle: { title: 'Карточка заявки', showInMenu: false }
      },
      {
        path: 'tickets/create',
        lazy: CreateTicketPage,
        handle: { title: 'Создание новой заявки', showInMenu: false }
      },
      {
        path: 'tickets/:ticketId/edit',
        lazy: EditingTicketPage,
        handle: { title: 'Редактирование выбранной заявки', showInMenu: false }
      },
      {
        path: '*',
        lazy: NotFound,
        handle: { title: 'Страница не найдена' ,showInMenu: false }
      },
    ]
  }
]);

export default router;
