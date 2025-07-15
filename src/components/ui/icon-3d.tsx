import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Icon3DVariant = 
  | 'default'
  | 'primary' 
  | 'accent'
  | 'floating'
  | 'pulse'
  | 'rotate'
  | 'glow';

interface Icon3DProps {
  icon: LucideIcon;
  variant?: Icon3DVariant;
  size?: number;
  className?: string;
  [key: string]: any;
}

const variantClasses: Record<Icon3DVariant, string> = {
  default: 'icon-3d',
  primary: 'icon-3d-primary',
  accent: 'icon-3d-accent',
  floating: 'icon-3d-floating',
  pulse: 'icon-3d-pulse',
  rotate: 'icon-3d-rotate',
  glow: 'icon-3d-glow'
};

export const Icon3D: React.FC<Icon3DProps> = ({
  icon: IconComponent,
  variant = 'default',
  size = 24,
  className,
  ...props
}) => {
  return (
    <IconComponent
      size={size}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  );
};