import React, { useEffect, useState, FC } from "react";
import styles from "./index.less";
import imgBase64 from "./assets/backImg";
import { useHistory } from "umi";

const Menu: FC = () => {
  const history = useHistory();
  const [state, setState] = useState({
    text: "",
    divStyle: {
      height: `${window.innerHeight}px`,
      backgroundImage: `url(${imgBase64})`,
    },
    pointStyle: {},
  });
  const leftTitle = "Bill Yu";

  const arr = [
    "天下大事，必作于细，天下难事，必作于易。",
    "冲天香阵透长安，满城尽带黄金甲。",
    "举杯邀明月，对影成三人。",
    "月既不解饮，影徒随我身。",
    "待到秋来九月八，我花开后百花杀。",
    "物有本末，事有终始。知所先后，则近道矣。",
    "人闲桂花落，夜静春山空。",
    "黄昏庭院柳啼鸦，记得那人，和月折梨花。",
    "楼写春云色，珠含明月辉。",
    "雅俗共赏",
  ];
  const text = arr[Math.floor(Math.random() * 10)];

  useEffect(() => {
    setInterval(() => {
      const changeImg = Math.floor((Math.random() * 100) / 2 + 1);
      const img = new Image();
      img.src = `https://pg12138.oss-cn-beijing.aliyuncs.com/assets/background/0${changeImg}.jpg`;
      img.onload = () => {
        setState((state) => {
          return {
            ...state,
            divStyle: {
              ...state.divStyle,
              backgroundImage: `url(https://pg12138.oss-cn-beijing.aliyuncs.com/assets/background/0${changeImg}.jpg)`,
            },
          };
        });
      };
    }, 10000);
    setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        setState((state) => {
          if (state.text == text) {
            clearInterval(timer);
          }
          i++;
          return {
            ...state,
            text: text.substring(0, i),
          };
        });
      }, 200);
    }, 1500);
  }, []);

  function pop() {
    setState((state) => {
      return {
        ...state,
        divStyle: {
          ...state.divStyle,
          height: "25rem",
        },
        pointStyle: {
          display: "none",
        },
      };
    });
  }

  return (
    <div className={styles.menu} style={state.divStyle}>
      <div className={styles.leftTitle} onClick={() => console.log("")}>
        {leftTitle}
      </div>
      <div className={styles.contain}>
        <div className={styles.title}>Bill Yu</div>
        <div className={styles.bottom}>{state.text}</div>
      </div>

      <div className={styles.link}>
        <div
          className={styles.button}
          onClick={() => {
            history.push("/");
            pop();
          }}
        >
          <div className={styles.iconfont}>&#xe61e;</div>
          <p>首页</p>
        </div>
        <div
          className={styles.button}
          onClick={() => {
            history.push("/archive");
            pop();
          }}
        >
          <div className={styles.iconfont}>&#xe762;</div>
          <p>档案</p>
        </div>
        <div
          className={styles.button}
          onClick={() => {
            window.location.href = "https://www.yzjacc.cn/resume.html";
          }}
        >
          <div className={styles.icon}>&#xe637;</div>
          <p>简历</p>
        </div>
        <div
          className={styles.button}
          onClick={() => {
            history.push("/book");
            pop();
          }}
        >
          <div className={styles.icon}>&#xe620;</div>
          <p>书单</p>
        </div>
        <div
          className={styles.button}
          onClick={() => {
            history.push("/about");
            pop();
          }}
        >
          <div className={styles.iconfont}>&#xe622;</div>
          <p>关于</p>
        </div>
      </div>

      <div
        className={styles.point}
        onClick={() => {
          pop();
        }}
        style={state.pointStyle}
      >
        &#xe668;
      </div>
    </div>
  );
};

export default Menu;
