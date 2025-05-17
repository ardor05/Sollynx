
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  className?: string;
}

const StatCard = ({ title, value, className = '' }: StatCardProps) => {
  return (
    <div className={`stat-card ${className}`}>
      <h3 className="text-lg text-gray-400 mb-2">{title}</h3>
      <p className="text-2xl font-bold neon-text">{value}</p>
    </div>
  );
};

export default StatCard;
