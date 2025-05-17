
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const NotFound = () => {
  return (
    <div className="space-bg min-h-screen flex flex-col justify-center items-center">
      <div className="text-center glass p-12 neon-border">
        <h1 className="text-6xl font-bold mb-4 neon-text">404</h1>
        <p className="text-xl text-gray-300 mb-8">Lost in space? This page doesn't exist</p>
        <NavLink to="/">
          <Button className="neon-button">
            <Globe className="mr-2" />
            Return to Home
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
