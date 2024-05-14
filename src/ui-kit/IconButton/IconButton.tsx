import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './IconButton.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: React.ReactElement;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className,
  ...restProps
}) => {
  const content = (
    <>{icon && React.cloneElement(icon, { className: styles.icon })}</>
  );

  const classNames = clsx(styles.root, className);

  return (
    <button
      className={clsx(classNames, {
        [styles.disabled]: restProps.disabled,
      })}
      {...restProps}
    >
      {content}
    </button>
  );
};
