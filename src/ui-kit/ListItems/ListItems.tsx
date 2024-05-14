import React from 'react';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';

import styles from './ListItems.module.scss';

interface ListItemsProps<T> {
  title?: string;
  className?: string;
  listClassName?: string;
  emptyView?: React.ReactNode;
  itemAnimation?: Variants;
  items: T[];
  skeleton?: React.ReactNode;
  isLoading?: boolean;
  keyExtractor: (item: T) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const ListItems = <T,>({
  title,
  className,
  listClassName,
  emptyView,
  itemAnimation,
  items,
  skeleton,
  isLoading,
  keyExtractor,
  renderItem,
}: ListItemsProps<T>) => {
  return (
    <div className={clsx(styles.root, className)}>
      {title && <h5 className={styles.title}>{title}</h5>}
      {items.length === 0 && !isLoading && emptyView}

      <motion.ul
        initial="hidden"
        whileInView={isLoading ? undefined : 'visible'}
        className={clsx(styles.list, listClassName)}
      >
        {items.length === 0 &&
          isLoading &&
          skeleton &&
          [skeleton, skeleton, skeleton].map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}

        {items.length !== 0 &&
          items.map((item, index) => (
            <motion.li
              key={keyExtractor(item)}
              className={styles.item}
              variants={itemAnimation}
              custom={index}
            >
              {renderItem(item, index)}
            </motion.li>
          ))}
      </motion.ul>
    </div>
  );
};
