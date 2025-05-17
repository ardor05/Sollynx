import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import StatCard from '@/components/ui-elements/StatCard';
import AnalyticsChart from '@/components/ui-elements/AnalyticsChart';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// USDC mint address on Devnet
const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

const Dashboard = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  // Query to get USDC balance
  const { data: usdcBalance, isLoading } = useQuery({
    queryKey: ['usdc-balance', publicKey?.toString()],
    queryFn: async () => {
      if (!publicKey) return 0;
      
      try {
        // Find all token accounts for the user
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_PROGRAM_ID }
        );

        // Find USDC token account
        const usdcAccount = tokenAccounts.value.find(
          account => account.account.data.parsed.info.mint === USDC_MINT.toString()
        );

        if (!usdcAccount) return 0;

        // Get balance and convert from raw amount to USDC (6 decimals)
        const balance = usdcAccount.account.data.parsed.info.tokenAmount.uiAmount;
        return balance;
      } catch (error) {
        console.error('Error fetching USDC balance:', error);
        return 0;
      }
    },
    enabled: !!publicKey,
  });

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

      <div className="relative">
        <div className="absolute top-0 right-0 z-10">
          <Button 
            className="glass neon-border flex items-center gap-2"
            onClick={() => {
              // Add your click handler here
              console.log('Add Data clicked');
            }}
          >
            <Plus className="h-4 w-4" />
            Add Data
          </Button>
        </div>
        <AnalyticsChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatCard title="Profit" value="0 USDC" />
        <StatCard title="Revenue" value="0 USDC" />
        <StatCard title="Credit" value="0 USDC" />
      </div>
    </div>
  );
};

export default Dashboard;
