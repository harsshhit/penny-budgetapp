'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className="rounded-full h-14 w-14"
       
      >
        <Plus className="w-6 h-6 font-bold text-white" />
      </Button>
    </div>
  );
}
