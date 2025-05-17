import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import Distribution from "./pages/Distribution";
import Vault from "./pages/Vault";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

// Solana wallet imports
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Import wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

const queryClient = new QueryClient();

const App = () => {
  // Choose network
  const network = WalletAdapterNetwork.Devnet; // or Mainnet, Testnet

  // RPC endpoint for Solana cluster
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Wallet adapters you want to support
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Wrap with Solana providers */}
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletModalProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/distribution" element={<Distribution />} />
                    <Route path="/vault" element={<Vault />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
