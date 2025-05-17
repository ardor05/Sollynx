import { useState } from 'react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/ui-elements/StatCard';
import DepositModal from '@/components/ui-elements/DepositModal';
import WithdrawModal from '@/components/ui-elements/WithdrawModal';
import InvestModal from '@/components/ui-elements/InvestModal';

const Vault = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleDeposit = (amount: number) => {
    console.log('Depositing:', amount, 'USDC');
    // Add deposit logic here
  };

  const handleWithdraw = (amount: number) => {
    console.log('Withdrawing:', amount, 'USDC');
    // Add withdrawal logic here
  };

  const handleInvest = (amount: number) => {
    console.log('Investing:', amount, 'USDC');
    setInvestmentAmount(amount.toString());
    // Add invest logic here
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
            <span className="ml-2 neon-text">0</span>
          </div>
          <div>
            <span className="text-gray-400">Total Net Profit:</span>
            <span className="ml-2 neon-text">0</span>
          </div>
        </div>
      </div>

      <div className="glass p-6 flex items-center justify-between mb-8">
        <div>
          <span className="text-gray-400">Other Cost - Wallet:</span>
          <span className="ml-2 neon-text">0 USDC</span>
        </div>
        <Button
          className="neon-button"
          onClick={() => setIsWithdrawModalOpen(true)}
        >
          Withdraw
        </Button>
      </div>

      <div className="grid gap-6">
        {/* First row: info boxes */}
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

        {/* Second row: action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            className="glass neon-border h-16 text-lg hover:neon-text transition-colors"
            onClick={() => setIsDepositModalOpen(true)}
          >
            Deposit
          </Button>
          <Button
            className="glass neon-border h-16 text-lg hover:neon-text transition-colors"
            onClick={() => setIsWithdrawModalOpen(true)}
          >
            Withdraw
          </Button>
          <Button
            className="glass neon-border h-16 text-lg hover:neon-text transition-colors"
            onClick={() => setIsInvestModalOpen(true)}
          >
            Invest
          </Button>
        </div>
      </div>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDeposit={handleDeposit}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
      />

      <InvestModal
        isOpen={isInvestModalOpen}
        onClose={() => setIsInvestModalOpen(false)}
        onInvest={handleInvest}
      />
    </div>
  );
};

export default Vault;
