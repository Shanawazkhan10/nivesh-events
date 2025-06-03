import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';

interface EventCountCardProps {
  title: string;
  count: number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const EventCountCard: React.FC<EventCountCardProps> = ({ 
  title, 
  count, 
  change, 
  icon,
  color
}) => {
  const isPositiveChange = change && change > 0;
  const changeText = change ? `${isPositiveChange ? '+' : ''}${change}%` : null;
  
  return (
    <Card className="h-full transition-all duration-300 hover:translate-y-[-2px]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{count.toLocaleString()}</h3>
            
            {change !== undefined && (
              <div className="mt-1 flex items-center">
                <span className={`flex items-center text-sm font-medium ${
                  isPositiveChange 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {isPositiveChange ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                  {changeText}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
              </div>
            )}
          </div>
          
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCountCard;