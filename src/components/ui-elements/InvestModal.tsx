import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';

interface GrowthPool {
  id: string;
  name: string;
  description: string;
  yield: number; // Annual % return
}

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvest: (amount: number) => void;
}

const dummyGrowthPools: GrowthPool[] = [
  {
    id: 'pool1',
    name: 'Stable Yield Pool',
    description: 'Low-risk pool offering steady APY.',
    yield: 5.5
  },
  {
    id: 'pool2',
    name: 'Growth Strategy Pool',
    description: 'Aggressive strategy with higher APY.',
    yield: 9.2
  },
  {
    id: 'pool3',
    name: 'Balanced Portfolio',
    description: 'Moderate risk and return profile.',
    yield: 7.0
  }
];

const InvestModal = ({ isOpen, onClose, onInvest }: InvestModalProps) => {
  const [usdcAmount, setUsdcAmount] = useState('');
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [selectedPool, setSelectedPool] = useState<GrowthPool | null>(null);

  useEffect(() => {
    const found = dummyGrowthPools.find(p => p.id === selectedPoolId);
    setSelectedPool(found || null);
  }, [selectedPoolId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(usdcAmount);
    if (amount > 0 && selectedPool) {
      onInvest(amount);
      onClose();
    } else {
      toast.error('Please enter amount and select a growth pool');
    }
  };

  const estimatedReward = selectedPool
    ? ((parseFloat(usdcAmount || '0') * selectedPool.yield) / 100).toFixed(2)
    : '0.00';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass neon-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Invest USDC</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* USDC amount */}
            <div>
              <label className="text-sm text-gray-400">USDC Amount</label>
              <Input
                type="number"
                value={usdcAmount}
                onChange={e => setUsdcAmount(e.target.value)}
                placeholder="Enter USDC amount"
                className="glass mt-2"
              />
            </div>

            {/* Pool selection */}
            <div>
              <label className="text-sm text-gray-400">Choose Growth Pool</label>
              <Select value={selectedPoolId} onValueChange={setSelectedPoolId}>
                <SelectTrigger className="glass mt-2 w-full">
                  <SelectValue placeholder="Select a pool" />
                </SelectTrigger>
                <SelectContent className="glass">
                  {dummyGrowthPools.map(pool => (
                    <SelectItem key={pool.id} value={pool.id}>
                      {pool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Info box */}
            {selectedPool && (
              <div className="glass p-4 rounded-lg space-y-2">
                <div className="text-lg font-semibold neon-text">{selectedPool.name}</div>
                <div className="text-sm text-gray-400">{selectedPool.description}</div>
                <div className="text-sm text-gray-500">
                  Estimated reward (1 year): <strong>{estimatedReward} USDC</strong>
                </div>
                <div className="text-xs text-gray-400">
                  Based on annual yield of {selectedPool.yield}%
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" className="glass" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="glass neon-border"
              disabled={!usdcAmount || parseFloat(usdcAmount) <= 0 || !selectedPool}
            >
              Confirm Investment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvestModal;
