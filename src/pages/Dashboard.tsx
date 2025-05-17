// Clean Dashboard with add/remove and localStorage persistence only

import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import StatCard from '@/components/ui-elements/StatCard';
import AnalyticsChart from '@/components/ui-elements/AnalyticsChart';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useState, useEffect } from 'react';

const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

const Dashboard = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [revenue, setRevenue] = useState('');
  const [credit, setCredit] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [dataPoints, setDataPoints] = useState<any[]>(() => {
    const stored = localStorage.getItem('dashboard-data');
    return stored ? JSON.parse(stored) : [];
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const profit = revenue && credit ? (parseFloat(revenue) - parseFloat(credit)).toFixed(2) : '0.00';

  const totalProfit = dataPoints.reduce((acc, cur) => acc + cur.profit, 0).toFixed(2);
  const totalRevenue = dataPoints.reduce((acc, cur) => acc + cur.revenue, 0).toFixed(2);
  const totalCredit = dataPoints.reduce((acc, cur) => acc + cur.credit, 0).toFixed(2);

  useEffect(() => {
    localStorage.setItem('dashboard-data', JSON.stringify(dataPoints));
  }, [dataPoints]);

  const { data: usdcBalance, isLoading } = useQuery({
    queryKey: ['usdc-balance', publicKey?.toString()],
    queryFn: async () => {
      if (!publicKey) return 0;
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
        const usdcAccount = tokenAccounts.value.find(account => account.account.data.parsed.info.mint === USDC_MINT.toString());
        if (!usdcAccount) return 0;
        return usdcAccount.account.data.parsed.info.tokenAmount.uiAmount;
      } catch (error) {
        console.error('Error fetching USDC balance:', error);
        return 0;
      }
    },
    enabled: !!publicKey,
  });

  const handleSave = () => {
    const newPoint = {
      name: selectedMonth,
      revenue: parseFloat(revenue),
      credit: parseFloat(credit),
      profit: parseFloat(profit),
    };
    setDataPoints(prev => [...prev.filter(p => p.name !== selectedMonth), newPoint]);
    setModalOpen(false);
    setRevenue('');
    setCredit('');
    setSelectedMonth('');
  };

  const removeData = (month: string) => {
    setDataPoints(prev => prev.filter(p => p.name !== month));
  };

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Overview of your portfolio</p>
      </header>

      <div className="glass p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Portfolio Summary</h2>
        <div>
          <span className="text-gray-400">Total Balance:</span>
          <p className="text-2xl font-bold neon-text">
            {isLoading ? 'Loading...' : `${usdcBalance?.toFixed(2) || '0.00'} USDC`}
          </p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Button className="glass neon-border flex items-center gap-2" onClick={() => setModalOpen(true)}>
          <Edit className="h-4 w-4" /> Edit Data
        </Button>
      </div>

      <AnalyticsChart data={dataPoints} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatCard title="Profit" value={`${totalProfit} USDC`} />
        <StatCard title="Revenue" value={`${totalRevenue} USDC`} />
        <StatCard title="Credit" value={`${totalCredit} USDC`} />
      </div>

      {dataPoints.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Remove Data</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dataPoints.map(dp => (
              <Button
                key={dp.name}
                className="glass border border-red-500 text-red-500 flex justify-between"
                onClick={() => removeData(dp.name)}
              >
                {dp.name} <Trash className="w-4 h-4 ml-2" />
              </Button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Edit Monthly Financial Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="glass w-full">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent className="glass">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="Revenue" className="glass" />
            <Input type="number" value={credit} onChange={e => setCredit(e.target.value)} placeholder="Credit" className="glass" />

            <div className="text-sm text-gray-400">Calculated Profit: <span className="font-bold neon-text">{profit} USDC</span></div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" className="glass" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button className="glass neon-border" onClick={handleSave} disabled={!revenue || !credit || !selectedMonth}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
