import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import rhombusUrl from '@media/button/rhombus.png';

import styles from './Button.module.scss';

type ButtonSize = 'small' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: ButtonSize;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'small',
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  const content = (
    <>
      {leftIcon && React.cloneElement(leftIcon, { className: styles.iconLeft })}
      {rightIcon &&
        React.cloneElement(rightIcon, { className: styles.iconRight })}

      <span className={styles.container}>
        <span className={styles.wrap}>
          <img
            className={styles.rhombus}
            src={rhombusUrl}
            alt="rhombus"
            width={28}
          />
          <span className={styles.content}>{children}</span>
        </span>
      </span>
    </>
  );

  const classNames = clsx(
    styles.root,
    className,
    styles[variant],
    styles[size],
  );

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
