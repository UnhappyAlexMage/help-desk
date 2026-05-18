import { setupWorker } from 'msw/browser';
import { handlers } from './index.ts';

export const worker = setupWorker(...handlers)

worker.events.on('request:unhandled', ({ request }) => {
  console.warn('Необработанный запрос:', request.method, request.url)
});

worker.events.on('request:match', ({ request }) => {
  console.log('Перехвачен запрос:', request.method, request.url)
});