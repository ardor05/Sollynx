
import { Button } from '@/components/ui/button';
import StatCard from '@/components/ui-elements/StatCard';

interface RecipientProps {
  name: string;
  amount: number;
  type: 'employee' | 'supplier';
}

const Recipient = ({ name, amount, type }: RecipientProps) => {
  const slipType = type === 'employee' ? 'Pay Slip' : 'Credit Slip';
  
  return (
    <div className="glass flex items-center justify-between p-4 rounded-lg mb-4">
      <span>{name}</span>
      <span className="neon-text">{amount}</span>
      <Button variant="outline" className="text-sm">{slipType}</Button>
    </div>
  );
};

const Distribution = () => {
  const employees = [
    { name: 'Employee A', amount: 100 },
    { name: 'Employee B', amount: 200 },
  ];
  
  const suppliers = [
    { name: 'Supplier A', amount: 100 },
    { name: 'Supplier B', amount: 200 },
  ];

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
                <span className="ml-2 text-sollynx-neon-blue drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">0</span>
              </div>
              <div>
                <span className="text-gray-400">Total Credit:</span>
                <span className="ml-2 text-sollynx-neon-blue drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">0</span>
              </div>
            </div>
          </div>
          <Button className="neon-button mt-4 md:mt-0">Customize Payout</Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Employees</h2>
          <Button className="neon-button">+ Add Employee</Button>
        </div>
        
        {employees.map((employee, index) => (
          <Recipient 
            key={index}
            name={employee.name}
            amount={employee.amount}
            type="employee"
          />
        ))}
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Suppliers</h2>
          <Button className="neon-button">+ Add Supplier</Button>
        </div>
        
        {suppliers.map((supplier, index) => (
          <Recipient 
            key={index}
            name={supplier.name}
            amount={supplier.amount}
            type="supplier"
          />
        ))}
      </div>
    </div>
  );
};

export default Distribution;
