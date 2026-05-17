import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Bot } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-surface-light p-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-surface-gray rounded-full flex items-center justify-center text-surface-muted">
            <Bot size={48} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-navy-deep mb-2">404</h1>
        <p className="text-xl font-medium text-navy-charcoal mb-4">Route Not Found</p>
        <p className="text-surface-muted mb-8">
          This route is outside the mapped automation path.
        </p>
        <Link to="/">
          <Button>Return to Marketplace</Button>
        </Link>
      </div>
    </div>
  );
};
