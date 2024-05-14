import React from 'react';

import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

export const GeneralLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};
