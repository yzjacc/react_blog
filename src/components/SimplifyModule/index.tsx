import styles from "./index.less";
import React, { FC } from "react";
interface IProps {
  data: {
    time?: string;
    title?: string;
    content?: string;
    imgUrl?: string;
    detailUrl?: string;
    isShowImg?: boolean;
    imgStyle?: object;
  };
}
const SimplifyModule = ({ data }: IProps) => {
  const {
    time,
    title,
    content,
    imgUrl,
    isShowImg = true,
    detailUrl,
    imgStyle,
  } = data;

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <div className={styles.name}>{title}</div>
        <div className={styles.time}>{time}</div>
      </div>
      <div className={styles.essay}>
        {isShowImg ? (
          <div className={styles.essImg} style={imgStyle}>
            <img className={styles.img} src={imgUrl} />
          </div>
        ) : null}
        <div className={styles.comment}>{content}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.logo}></div>
        <a className={styles.button} href={detailUrl}>
          Try XMind
        </a>
      </div>
    </div>
  );
};
export default SimplifyModule;
