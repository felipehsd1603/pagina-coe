import { type ReactNode } from 'react';

const colorMap = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  amber: 'bg-amber-100 text-amber-800',
  cyan: 'bg-cyan-100 text-cyan-800',
  red: 'bg-red-100 text-red-800',
} as const;

interface BadgeProps {
  color: keyof typeof colorMap;
  children: ReactNode;
  className?: string;
}

export default function Badge({ color, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color]} ${className}`}
    >
      {children}
    </span>
  );
}
