// Payment.tsx using Solana Pay official SDK + Link + QR code
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Edit, QrCode, Trash, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useWallet } from '@solana/wallet-adapter-react';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'react-qr-code';
import { encodeURL } from '@solana/pay';
import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qYtW9GgQf8zMPG4vJzdp9BatRa");

const Invoice = ({ invoice, onEdit, onChoosePayMethod }: any) => {
  const [value, token] = invoice.amount.split(' ');
  return (
    <div className="glass flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg mb-4">
      <div className="mb-2 md:mb-0">
        <span>Invoice {invoice.id}: </span>
        <span className="text-sollynx-neon-blue">{value} {token}</span>
        <div className="text-sm text-gray-400">{invoice.type} - {invoice.name}</div>
        <div className="text-xs text-gray-500">{invoice.description}</div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400">{invoice.date}</span>
        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice.id)}><Edit className="w-4 h-4" /></Button>
        <Button variant="outline" size="sm" onClick={() => onChoosePayMethod(invoice.id)}><QrCode className="w-4 h-4" /> Pay Link</Button>
      </div>
    </div>
  );
};

const Payment = () => {
  const [invoices, setInvoices] = useState<any[]>(() => {
    const stored = localStorage.getItem('invoices');
    return stored ? JSON.parse(stored) : [];
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [payLink, setPayLink] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showMethodSelect, setShowMethodSelect] = useState(false);

  const { publicKey } = useWallet();

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const handleSave = () => {
    const reference = uuidv4();
    const newInvoice = {
      id: editId || invoices.length + 1,
      amount: `${amount} USDC`,
      type,
      name,
      description,
      reference,
      date: format(date || new Date(), 'MM/dd/yyyy'),
    };
    const updatedInvoices = editId
      ? invoices.map(inv => inv.id === editId ? { ...newInvoice, reference: inv.reference } : inv)
      : [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    resetModal();
  };

  const resetModal = () => {
    setModalOpen(false);
    setEditId(null);
    setAmount('');
    setType('');
    setName('');
    setDescription('');
    setDate(new Date());
  };

  const handleEdit = (id: number) => {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    setEditId(id);
    setAmount(inv.amount.split(' ')[0]);
    setType(inv.type);
    setName(inv.name);
    setDescription(inv.description);
    setDate(new Date(inv.date));
    setModalOpen(true);
  };

  const handleRemove = () => {
    if (editId !== null) {
      setInvoices(prev => prev.filter(inv => inv.id !== editId));
      resetModal();
    }
  };

  const handleChoosePayMethod = (id: number) => {
    const invoice = invoices.find(i => i.id === id);
    if (!invoice) return;
  
    // 📌 Mock link – replace this with Solana Pay in future
    const mockLink = `https://sollynx.app/pay/invoice/${invoice.id}`;
  
    setPayLink(mockLink);
    setShowMethodSelect(true);
  };  

  const totalRevenue = invoices.reduce((acc, cur) => acc + parseFloat(cur.amount), 0).toFixed(2);

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
                <span className="ml-2 text-sollynx-neon-blue">{invoices.length}</span>
              </div>
              <div>
                <span className="text-gray-400">Total Revenue:</span>
                <span className="ml-2 text-sollynx-neon-blue">{totalRevenue}</span>
              </div>
            </div>
          </div>
          <Button className="neon-button mt-4 md:mt-0" onClick={() => setModalOpen(true)}>+ Create Invoice</Button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Invoices</h2>
        {invoices.map((invoice) => (
          <Invoice 
            key={invoice.id}
            invoice={invoice}
            onEdit={handleEdit}
            onChoosePayMethod={handleChoosePayMethod}
          />
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit' : 'Create'} Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount in USDC" />
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="glass">
                <SelectValue placeholder="Product or Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <div className="flex justify-between gap-2">
              {editId && (
                <Button variant="destructive" onClick={handleRemove}><Trash className="w-4 h-4 mr-1" /> Remove</Button>
              )}
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={resetModal}>Cancel</Button>
                <Button onClick={handleSave}>{editId ? 'Update' : 'Create'}</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showMethodSelect} onOpenChange={setShowMethodSelect}>
        <DialogContent className="glass text-center">
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 mt-4">
            <Button onClick={() => { navigator.clipboard.writeText(payLink); alert('Link copied!'); setShowMethodSelect(false); }} className="w-full flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Pay with Browser (Copy Link)
            </Button>
            <Button onClick={() => { setShowMethodSelect(false); setShowQRModal(true); }} className="w-full flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Pay with Mobile (QR Code)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="glass flex flex-col items-center">
          <DialogHeader>
            <DialogTitle>Scan to Pay with Wallet</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {payLink && <QRCode value={payLink} size={180} />}
            <p className="text-xs text-center text-gray-400 mt-4 break-all">{payLink}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;