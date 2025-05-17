import React from 'react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/ui-elements/StatCard';

interface InvoiceProps {
  id: number;
  amount: string;
  date: string;
}

const Invoice = ({ id, amount, date }: InvoiceProps) => {
  // Split the amount into number and currency parts
  const amountParts = amount.split(' ');
  const amountValue = amountParts[0];
  const currency = amountParts[1];

  return (
    <div className="glass flex items-center justify-between p-4 rounded-lg mb-4">
      <span>Invoice {id}: <span className="text-sollynx-neon-blue drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">{amountValue}</span> <span className="text-sollynx-neon-blue drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">{currency}</span></span>
      <span className="text-gray-400">{date}</span>
      <Button variant="outline" className="text-sm">Pay Link</Button>
    </div>
  );
};

const Payment = () => {
  const invoices = [
    { id: 1, amount: '0 USDC', date: '1/1/2025' },
    { id: 2, amount: '0 USDC', date: '1/1/2025' },
    { id: 3, amount: '0 USDC', date: '1/1/2025' },
  ];

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Payment</h1>
        <p className="text-gray-400">Manage your invoices and payments</p>
      </header>

      <div className="glass p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
            <div className="flex gap-6">
              <div>
                <span className="text-gray-400">Total Invoices:</span>
                <span className="ml-2 text-sollynx-neon-blue drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">0</span>
              </div>
              <div>
                <span className="text-gray-400">Total Revenue:</span>
                <span className="ml-2 text-sollynx-neon-blue drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">0</span>
              </div>
            </div>
          </div>
          <Button className="neon-button mt-4 md:mt-0">+ Create Invoice</Button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Invoices</h2>
        {invoices.map((invoice) => (
          <Invoice 
            key={invoice.id}
            id={invoice.id}
            amount={invoice.amount}
            date={invoice.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Payment;