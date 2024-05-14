import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';


import styles from './BottomSheet.module.scss';
import { CloseIcon } from '@app/icons';

interface BottomSheetProps {
  className?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  className,
  children,
  open,
  onClose,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [open]);

  const classNames = clsx(styles.root, className, { [styles.open]: open });

  return createPortal(
    <div className={classNames}>
      <div className={styles.cover}></div>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
