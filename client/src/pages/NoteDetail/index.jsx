import React from 'react'
import styles from './index.module.less'
import { ArrowLeft } from '@react-vant/icons';
import { useState,useEffect } from 'react';
import { useSearchParams,useNavigate } from 'react-router'
import axios from '@/api'


export default function NoteDetail() {
  const navigator = useNavigate()
  const [searchParams] = useSearchParams()
  const [curNote,setCurNote] = useState({})
  const noteId = searchParams.get('id')
  //请求当前笔记
  useEffect(() => {
    axios.get(`/findNoteDetailById?id=${noteId}`).then(res => {
       setCurNote(res.data)
    })
  }, [])


  return (
    <div className={styles['note-detail']}>
      <div className={styles['back']} onClick={() => navigator(-1)}>
        <ArrowLeft fontSize={24}  />
      </div>

      <div className={styles['note-img']}>    
        <img src={curNote.note_img} alt="" />
      </div>
      <div className={styles['note-content']}>
        <div className={styles['tab']}>
          <span className={styles['note_type']}>{curNote.note_type}</span>
          <span className={styles['author']}>{curNote.username}</span>
        </div>
        <p className={styles['title']}>{curNote.note_title}</p>
        <div className={styles['content']} dangerouslySetInnerHTML={{__html:curNote.note_content}}></div>
      </div>
    </div>
  )
}
