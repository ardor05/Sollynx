import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Wallet = () => {
  const { publicKey, connected } = useWallet();

  // Format pubkey (show first 4 + last 4 chars)
  const shortenPubKey = (key: string) =>
    key.length > 8 ? `${key.slice(0, 4)}...${key.slice(-4)}` : key;

  return (
    <div className="flex items-center gap-4">
      {connected && publicKey && (
        <span className="text-sollynx-neon-blue font-mono">
          {shortenPubKey(publicKey.toString())}
        </span>
      )}
      <WalletMultiButton className="glass neon-border flex items-center gap-3 px-6 py-4 text-base" />
    </div>
  );
};

export default Wallet;
