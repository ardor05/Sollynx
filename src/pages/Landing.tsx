import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Landing = () => {
  return (
    <div className="space-bg min-h-screen flex flex-col justify-center items-center relative z-10 p-4">
      {/* Stars effect */}
      <div className="stars absolute inset-0 z-0"></div>
      
      <div className="container max-w-4xl mx-auto text-center">
        <div className="animate-float-up">
          <img 
            src="/assets/logo.svg" 
            alt="Sollynx Logo" 
            className="w-64 h-64 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(0,229,255,0.7)]" 
          />
          
          <div className="glass neon-border p-6 mb-10 animate-delay-200 animate-float-up max-w-xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Sollynx!</h2>
            <p className="text-2xl text-gray-300 mb-6">
              Powering SME Finances with Stablecoins
            </p>
          </div>

          
          <NavLink to="/dashboard" className="inline-block animate-delay-400 animate-float-up">
            <Button className="neon-button group">
              <span>Start Now</span>
              <Rocket className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Landing;
