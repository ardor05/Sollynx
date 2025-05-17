import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/ui-elements/StatCard';
import DepositModal from '@/components/ui-elements/DepositModal';
import WithdrawModal from '@/components/ui-elements/WithdrawModal';
import InvestModal from '@/components/ui-elements/InvestModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const Vault = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [deductAmount, setDeductAmount] = useState(() => localStorage.getItem('other-cost') || '');
  const [deductDate, setDeductDate] = useState<Date | undefined>(() => {
    const stored = localStorage.getItem('deduct-date');
    return stored ? new Date(stored) : new Date();
  });
  const [totalGrossProfit, setTotalGrossProfit] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('dashboard-data');
    if (stored) {
      const parsed = JSON.parse(stored);
      const totalGross = parsed.reduce((acc: number, cur: any) => acc + cur.profit, 0);
      setTotalGrossProfit(totalGross);
    }
  }, []);

  const totalOtherCost = parseFloat(deductAmount || '0');
  const totalNetProfit = (totalGrossProfit - totalOtherCost).toFixed(2);

  const handleDeposit = (amount: number) => {
    console.log('Depositing:', amount, 'USDC');
  };

  const handleWithdraw = (amount: number) => {
    console.log('Withdrawing:', amount, 'USDC');
  };

  const handleInvest = (amount: number) => {
    console.log('Investing:', amount, 'USDC');
    setInvestmentAmount(amount.toString());
  };

  const handleConfirmCustomize = () => {
    localStorage.setItem('other-cost', deductAmount);
    localStorage.setItem('deduct-date', deductDate?.toISOString() || '');
    setIsCustomizeModalOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Vault</h1>
        <p className="text-gray-400">Manage your funds and investments</p>
      </header>

      <div className="glass p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Vault Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-gray-400">Total Gross Profit:</span>
            <span className="ml-2 neon-text">{totalGrossProfit.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-400">Total Net Profit:</span>
            <span className="ml-2 neon-text">{totalNetProfit} USDC</span>
          </div>
        </div>
      </div>

      <div className="glass p-6 flex items-center justify-between mb-8">
        <div>
          <span className="text-gray-400">Other Cost - Wallet:</span>
          <span className="ml-2 neon-text">{deductAmount || '0'} USDC</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCustomizeModalOpen(true)}>Customize</Button>
          <Button className="neon-button" onClick={() => setIsWithdrawModalOpen(true)}>Withdraw</Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass neon-border p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl neon-text">Reload Balance</h3>
            <p className="text-gray-400 mt-2">Buy USDC with your traditional currency</p>
          </div>
          <div className="glass neon-border p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl neon-text">Convert to fiat</h3>
            <p className="text-gray-400 mt-2">Exchange your crypto for your local currency</p>
          </div>
          <div className="glass neon-border p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl neon-text">Interest-Yielding</h3>
            <p className="text-gray-400 mt-2">Earn interest on your deposits</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button className="glass neon-border h-16 text-lg hover:neon-text transition-colors" onClick={() => setIsDepositModalOpen(true)}>Deposit</Button>
          <Button className="glass neon-border h-16 text-lg hover:neon-text transition-colors" onClick={() => setIsWithdrawModalOpen(true)}>Withdraw</Button>
          <Button className="glass neon-border h-16 text-lg hover:neon-text transition-colors" onClick={() => setIsInvestModalOpen(true)}>Invest</Button>
        </div>
      </div>

      <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} onDeposit={handleDeposit} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} onWithdraw={handleWithdraw} />
      <InvestModal isOpen={isInvestModalOpen} onClose={() => setIsInvestModalOpen(false)} onInvest={handleInvest} />

      <Dialog open={isCustomizeModalOpen} onOpenChange={setIsCustomizeModalOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Customize Other Cost</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="number" placeholder="Amount to deduct (USDC)" value={deductAmount} onChange={(e) => setDeductAmount(e.target.value)} />
            <div>
              <label className="text-sm text-gray-400 mb-2 block">When to deduct?</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deductDate ? format(deductDate, 'PPP') : 'Pick date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={deductDate} onSelect={setDeductDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCustomizeModalOpen(false)}>Cancel</Button>
              <Button onClick={handleConfirmCustomize}>Confirm</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vault;