import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  as?: 'div' | 'section' | 'li';
}

/** Wraps content and fades/slides it in when scrolled into view. */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, as = 'div', className = '', children, style, ...rest }) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      data-visible={visible ? 'true' : 'false'}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
