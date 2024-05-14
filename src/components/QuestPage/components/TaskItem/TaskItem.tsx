import clsx from 'clsx';

import styles from './TaskItem.module.scss';

import { ArrowIcon as ArrowSvg } from '@app/icons';
import checkMarkUrlImg from '@icons/check_mark.png';

interface TaskItemProps {
  className?: string;
  title: string;
  isCompleted: boolean;
  number: number;
  desc?: string;
  onClick?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  className,
  title,
  number,
  isCompleted,
  desc,
  onClick,
}) => (
  <div className={clsx(styles.root, className)} onClick={onClick}>
    <div className={styles.item}>
      <div className={styles.wrap}>
        {isCompleted ? (
          <div className={styles.completed}>
            <img
              className={styles.checkMark}
              src={checkMarkUrlImg}
              alt="check-mark"
            />
          </div>
        ) : (
          <div className={styles.serialNum}>
            <span>{number}</span>
          </div>
        )}
        <span className={styles.title}>{title}</span>
      </div>
      <ArrowSvg className={styles.icon} />
    </div>
    {desc && <p className={styles.desc}>{desc}</p>}
  </div>
);
