// Updated Distribution.tsx with Add/Edit/Remove and Customize Payout Modal
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Edit, Trash } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';

interface RecipientProps {
  name: string;
  amount: number;
  type: 'employee' | 'supplier';
  pubKey: string;
  onEdit: () => void;
  onRemove: () => void;
}

const Recipient = ({ name, amount, type, onEdit, onRemove }: RecipientProps) => {
  const slipType = type === 'employee' ? 'Pay Slip' : 'Credit Slip';
  return (
    <div className="glass flex items-center justify-between p-4 rounded-lg mb-4">
      <div className="flex-1">
        <span>{name}</span>
        <span className="ml-4 neon-text">{amount}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
        <Button size="sm" variant="destructive" onClick={onRemove}><Trash className="w-4 h-4" /></Button>
        <Button size="sm" variant="outline">{slipType}</Button>
      </div>
    </div>
  );
};

const Distribution = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [modalType, setModalType] = useState<'employee' | 'supplier' | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [amount, setAmount] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);
  const [employeeSettle, setEmployeeSettle] = useState<Date | undefined>(new Date());
  const [supplierSettle, setSupplierSettle] = useState<Date | undefined>(new Date());

  const handleSave = () => {
    const data = { name, pubKey, amount: parseFloat(amount) };
    const updateList = modalType === 'employee' ? [...employees] : [...suppliers];
    if (editIndex !== null) {
      updateList[editIndex] = data;
    } else {
      updateList.push(data);
    }
    modalType === 'employee' ? setEmployees(updateList) : setSuppliers(updateList);
    resetModal();
  };

  const handleEdit = (type: 'employee' | 'supplier', index: number) => {
    const item = type === 'employee' ? employees[index] : suppliers[index];
    setName(item.name);
    setPubKey(item.pubKey);
    setAmount(item.amount.toString());
    setModalType(type);
    setEditIndex(index);
  };

  const handleRemove = (type: 'employee' | 'supplier', index: number) => {
    const updateList = type === 'employee' ? [...employees] : [...suppliers];
    updateList.splice(index, 1);
    type === 'employee' ? setEmployees(updateList) : setSuppliers(updateList);
  };

  const resetModal = () => {
    setModalType(null);
    setEditIndex(null);
    setName('');
    setPubKey('');
    setAmount('');
  };

  const totalSalary = employees.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const totalCredit = suppliers.reduce((sum, s) => sum + parseFloat(s.amount), 0);

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Distribution</h1>
        <p className="text-gray-400">Manage your payments to employees and suppliers</p>
      </header>

      <div className="glass p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Distribution Summary</h2>
            <div className="flex gap-6">
              <div>
                <span className="text-gray-400">Total Salary:</span>
                <span className="ml-2 text-sollynx-neon-blue">{totalSalary}</span>
              </div>
              <div>
                <span className="text-gray-400">Total Credit:</span>
                <span className="ml-2 text-sollynx-neon-blue">{totalCredit}</span>
              </div>
            </div>
          </div>
          <Button className="neon-button mt-4 md:mt-0" onClick={() => setShowCustomize(true)}>Customize Payout</Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Employees</h2>
          <Button className="neon-button" onClick={() => setModalType('employee')}>+ Add Employee</Button>
        </div>
        {employees.map((e, i) => (
          <Recipient key={i} name={e.name} amount={e.amount} type="employee" pubKey={e.pubKey} onEdit={() => handleEdit('employee', i)} onRemove={() => handleRemove('employee', i)} />
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Suppliers</h2>
          <Button className="neon-button" onClick={() => setModalType('supplier')}>+ Add Supplier</Button>
        </div>
        {suppliers.map((s, i) => (
          <Recipient key={i} name={s.name} amount={s.amount} type="supplier" pubKey={s.pubKey} onEdit={() => handleEdit('supplier', i)} onRemove={() => handleRemove('supplier', i)} />
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalType !== null} onOpenChange={() => resetModal()}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} {modalType === 'employee' ? 'Employee' : 'Supplier'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Public Key" value={pubKey} onChange={e => setPubKey(e.target.value)} />
            <Input placeholder="Amount (USDC)" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetModal}>Cancel</Button>
              <Button onClick={handleSave}>{editIndex !== null ? 'Update' : 'Add'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customize Payout Modal */}
      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Customize Payout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">When to settle salary for employees?</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {employeeSettle ? format(employeeSettle, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={employeeSettle} onSelect={setEmployeeSettle} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm text-gray-400">When to settle credit for suppliers?</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {supplierSettle ? format(supplierSettle, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={supplierSettle} onSelect={setSupplierSettle} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Distribution;
