import React, { CSSProperties } from 'react';
import clsx from 'clsx';

import styles from './Tabs.module.scss';

interface TabItem<T> {
  key: T;
  label: string;
}

interface TabsProps<T> {
  className?: string;
  variant?: 'primary' | 'secondary';
  initialActiveTab?: T;
  tabs: TabItem<T>[];
  onTabChange?: (tabKey: T) => void;
}

export const Tabs = <K extends string>({
  className,
  tabs,
  initialActiveTab,
  variant = 'primary',
  onTabChange,
}: TabsProps<K>) => {
  const [activeTab, setActiveTab] = React.useState<K>(
    initialActiveTab || tabs[0].key,
  );
  const activeTabIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const handleTabClick = (tabKey: K) => {
    setActiveTab(tabKey);
    onTabChange?.(tabKey);
  };

  const customStyles = {
    '--tab-count': tabs.length,
    '--tab-active-indicator-translate': `${100 * activeTabIndex}%`,
  } as CSSProperties;

  return (
    <div className={clsx(styles.root, className, styles[variant])}>
      <ul
        className={styles.tabs}
        style={customStyles}
        data-active-tab-label={tabs[activeTabIndex].label}
      >
        {tabs.map((tab) => (
          <li
            className={clsx(
              styles.tab,
              styles[`tab-${variant}`],
              activeTab === tab.key && styles.active,
            )}
            key={tab.key.toString()}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
