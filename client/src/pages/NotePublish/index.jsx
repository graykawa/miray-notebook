import { useState } from 'react'
import Editor from '@/components/Editor'
import { Cell, Input, hooks, Uploader, ActionSheet, Button, NavBar } from 'react-vant'
import { Arrow } from '@react-vant/icons';
import styles from './index.module.less'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import axios from '@/api'

const actions = [
  { name: '美食'},
  { name: '旅行'},
  { name: '恋爱'},
  { name: '学习'},
  { name: '吵架'}
]


export default function NotePublic() {

  const navigator = useNavigate()
  const [html, setHtml] = useState('')  // 编辑器内容
  const [state, updateState] = hooks.useSetState({  // 标题
    title: '',
  })
  const [noteImg, setNoteImg] = useState('')
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState('美食')

  const onSelect = (action) => {
    setCategory(action.name)
    setVisible(false)
  }

  const onPublish = () => {
    console.log(noteImg);

    if (html.length <= 11) {
      toast.error('请输入日记内容')
      return
    }
    if (!state.title) {
      toast.error('请输入标题')
      return
    }
    
    axios.post('/note-publich', {
      note_title: state.title,
      note_content: html,
      note_img: noteImg,
      note_type: category
    }).then(res => {
      console.log(res);
      
    })
    
  }

  return (
    <div className={styles['note-public']}>
      <div className={styles['back']}>
        <NavBar
          title="写日记"
          onClickLeft={() => navigator(-1)}
        />
      </div>

      <div className={styles['editor']}>
        <Editor setHtml={setHtml} html={html}/>
      </div>
      <div className={styles['note-wrap']}>
        <div className={styles['note-cell']}>
          <Cell>
            <Input
              prefix={'标题：'}
              value={state.title}
              onChange={title => updateState({ title })}
              placeholder='请输入标题'
              clearable
            />
          </Cell>
        </div>

        <div className={styles['note-cell']}> 
          <Cell>
            <Uploader
              uploadText='上传图片'
              accept='*'
              maxCount={1}
              onChange={v => setNoteImg(v[0].url)}
            />
          </Cell>
        </div>

        <div className={styles['note-cell']}>
          <Cell>
            <div className={styles['select']}>
              <span>选择分类</span>
              <span className={styles['select-item']} onClick={() => setVisible(true)}>{category} <Arrow /> </span>
            </div>
          </Cell>

          <ActionSheet
            visible={visible}
            onCancel={() => setVisible(false)}
            onSelect={onSelect}
            actions={actions}
          />
        </div>
      </div>

      <div className={styles['btn']}>
        <Cell>
          <Button type='primary' block onClick={onPublish}>发布日记</Button>
        </Cell>
      </div>
    </div>
  )
}
