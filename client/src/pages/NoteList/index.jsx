import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router'
import { NavBar } from 'react-vant';
import { Search } from '@react-vant/icons'
import styles from './index.module.less'
import axios from '@/api'
import Pull from '@/components/Pull'
import { formateDate } from '@/utils/index.js';


export default function NoteList() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const navigate = useNavigate()
  const [noteList, setNoteList] = useState([])
  const [finished, setFinished] = useState(false)
  const page = 1
  const size = 10

  const getData = async(page, size) => {
    axios.get(`/findNoteListByType?note_type=${category}&page=${page}&size=${size}`).then(res => {
      console.log(res)
      setNoteList(res.data)
    })
  }

  useEffect(() => {
    getData(page, size)
  }, [])

  const onLoad = async() => { // 释放重新加载  
    await getData(1, 10)
    setFinished(true)
  }


  return (
    <div className={styles['note-list']}>
      <header className={styles['header']}>
        <NavBar
          title={category}
          leftText="返回"
          rightText={<Search fontSize={20} />}
          onClickLeft={() => navigate(-1)}
          onClickRight={() => { }}
        />
      </header>

      <Pull onLoad={onLoad} finished={finished} setFinished={setFinished}>
        <section className={styles['section']}>

          <ul>
            {
              noteList.map(item => (
                <li key={item.id} onClick={() => navigate(`/noteDetail?id=${item.id}`)}>
                  <div className={styles['img']}>
                    <img src={item.note_img} alt="" />
                  </div>
                  <div className={styles['time']}>{formateDate(item.update_time)}</div>
                  <div className={styles['title']}>{item.note_title}</div>
                </li>
              ))
            }
          </ul>
        </section>
      </Pull>
    </div>
  )
}
