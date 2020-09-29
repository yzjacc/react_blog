import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'
import { Row, Col } from 'antd';
import SimplifyModule from '../../components/SimplifyModule'


export default () => {
  return (
    <div className={styles.content}>
      <SimplifyModule
        data={{
          title: '「 正念的奇迹 」',
          time: '2020.09.23',
          url: 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/IMG_0044.JPG',
          content: '这不是一本讲解八正道的专业佛教书籍，所以我们可以很容易地看明白前半部分。他让我们知道了正念是什么，以及怎样保持正念。这就足够了。\n'
            + '本书的作者是一位得道高僧，因此后半段很轻松地就给我们展示了一个难以企及的专业高度。我知道很多人和我一样目前是做不到的。不过不要紧，修行就是一个终身的事情，正因为复杂，所以才有趣。抱定一个保持正念的态度，一切复杂都变得简单。不因为我们达不到目标就焦虑，而要体会和享受此刻精进的过程。\n'
            + '这就是正念的奇迹！'
        }
        }
      ></SimplifyModule>
      <SimplifyModule
        data={{
          title: '「 关键对话 」',
          time: '2020.09.24',
          url: 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/IMG_0051.JPG',
          content: '极怒时莫与人书 极喜时莫与人物  --明确自己的心态' + '\n' +
            '不迁怒 不贰过  -- 颜回\n'+ '大家求财  --寻找共同目的'
        }
        }
      ></SimplifyModule><SimplifyModule
      data={{
        title: '「 从0到1 」',
        time: '2020.09.29',
        url: 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/IMG_0109.JPG',
        content: '我们当下的任务是找到创新的独特方式，使得未来不仅仅与众不同，而且更加美好，即从0到1。最重要的第一步是独立思考。只有重新认识世界，如同古人第一眼看见这个世界一样新奇，我们才能重构世界，守护未来。'
      }
      }
    ></SimplifyModule>
    </div>
  );
}
