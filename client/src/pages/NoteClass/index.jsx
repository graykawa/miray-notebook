import { useState } from 'react'
import styles from './index.module.less'
import { WapNav, Edit, LikeO, Search } from '@react-vant/icons'
import Menu from '@/components/Menu'
import { useNavigate } from 'react-router'

// 随机颜色，颜色偏亮色系
const randomColor = () => {
  const r = Math.floor(Math.random() * 100) + 140
  const g = Math.floor(Math.random() * 100) + 140
  const b = Math.floor(Math.random() * 100) + 140
  return `rgb(${r}, ${g}, ${b})`
}
const noteClassList = [
  { title: '美食', id: 1 },
  { title: '旅行', id: 2 },
  { title: '恋爱', id: 3 },
  { title: '学习', id: 4 },
  { title: '吵架', id: 5 }
]

export default function NoteClass() {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const goNoteList = (title) => {
    navigate(`/noteList?category=${title}`)
  }

  return (
    <div className={styles['note-class-wrapper']}>
      <div className={[`${styles['note-class']}`, `${showMenu ? styles['hide'] : ''}`].join(' ')}>
        <header>
          <div onClick={() => setShowMenu(true)}>
            <WapNav className={styles['icon']} />
          </div>
          <div>
            <Edit className={styles['icon']} />
            <LikeO className={styles['icon']} />
            <Search className={styles['icon']} />
          </div>
        </header>
        <section>
          {
            noteClassList.map(item => {
              return (
                <div 
                  key={item.id} 
                  className={styles['note-class-item']} 
                  style={{ backgroundColor: randomColor() }}
                  onClick={() => { goNoteList(item.title) }}
                >
                  <span className={styles['note-class-item-title']}>{item.title}</span>
                </div>
              )
            })
          }
        </section>
      </div>

      <div className={[`${styles['menu']}`, `${ showMenu ? styles['show'] : '' }`].join(' ')}>
        <Menu setShowMenu={setShowMenu}></Menu>
      </div>
    </div>
  )
}
