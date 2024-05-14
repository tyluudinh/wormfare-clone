import React from 'react';
import clsx from 'clsx';


import styles from './Page.module.scss';

interface PageProps {
  className?: string;
  children?: React.ReactNode[];
}

export const Page: React.FC<PageProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(styles.root, className)}
      key="page"
      //   initial={{ translateY: '100%' }}
      //   animate={{ translateY: 0 }}
      //   exit={{ translateY: '0%', transition: { duration: 0.8 } }}
      //   transition={{ delay: 0, duration: 0.8 }}
    >
      {children}
    </div>
  );
};
