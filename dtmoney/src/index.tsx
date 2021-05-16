import React from 'react';
import ReactDOM from 'react-dom';

import { createServer, Model } from 'miragejs'

import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server: { db: { loadData: (arg0: { transactions: { id: number; title: string; type: string; category: string; amount: number; createdAt: Date; }[]; }) => void; }; }) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-05-12 15:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-05-14 17:00:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (_: any, request: { requestBody: string; }) => {
      const data = JSON.parse(request.requestBody);

      return this.schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

