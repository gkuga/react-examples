import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import { useDnDSort } from './useDnDSort'
import type { DnDSorted } from './useDnDSort'

type Style<T extends HTMLElement> = React.HTMLAttributes<T>['style']

const bodyStyle: Style<HTMLDivElement> = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center'
}

const inputContainerStyle: Style<HTMLDivElement> = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
  maxWidth: '350px',
  alignItems: 'center',
}

const inputStyle: Style<HTMLDivElement> = {
  margin: '1rem 0',
}

const containerStyle: Style<HTMLDivElement> = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '350px',
  maxHeight: '500px'
}

const imageCardStyle: Style<HTMLDivElement> = {
  cursor: 'grab',
  userSelect: 'none',
  width: '100px',
  height: '130px',
  overflow: 'hidden',
  borderRadius: '5px',
  margin: 3
}

const imageStyle: Style<HTMLImageElement> = {
  pointerEvents: 'none',
  objectFit: 'cover',
  width: '100%',
  height: '100%'
}

const Image = (props: { item: DnDSorted<{ key: string, value: string }> }) => {
  return (
    <div style={imageCardStyle} {...props.item.events}>
      <img src={props.item.value.value} alt='ソート可能な画像' style={imageStyle} />
    </div>
  )
}

/**
 * @description ドラッグ＆ドロップ並び替えサンプルのコンポーネント
 */
const SortSampleApp = () => {
  const [imageList, setImageList] = useState([
    { key: '1', value: '/images/pexels-matheus-bertelli-1830252.jpg' },
    { key: '2', value: '/images/pexels-daria-rem-2759658.jpg' },
    { key: '3', value: '/images/pexels-pixabay-277253.jpg' },
    { key: '4', value: '/images/pexels-aron-visuals-1743165.jpg' },
    { key: '5', value: '/images/pexels-ekrulila-3246665.jpg' },
    { key: '6', value: '/images/pexels-steve-johnson-1690351.jpg' },
    { key: '7', value: '/images/pexels-eberhard-grossgasteiger-2086361.jpg' },
    { key: '8', value: '/images/pexels-eberhard-grossgasteiger-2088203.jpg' },
    { key: '9', value: '/images/pexels-alexander-ant-5603660.jpg' }
  ])
  const [results, deleteItem] = useDnDSort(imageList, (images) => setImageList(images))
  const [url, setURL] = useState<string>('')
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setImageList(p => p.concat([{ key: Math.random().toString(16), value: url }]))
      setURL('')
    }
  }

  return (
    <div style={bodyStyle}>
      <div style={inputContainerStyle}>
        <label htmlFor='url' >Image URL</label>
        <input
          id='url'
          style={inputStyle}
          type='text'
          onKeyDown={onKeyDown}
          value={url}
          onChange={event => setURL(event.target.value)}
        />
      </div>
      <div style={containerStyle}>
        {results.map((item) => {
          return (
            <div key={item.value.key} style={imageCardStyle} {...item.events}>
              <button
                onClick={() => {
                  setImageList(imageList.filter(image => image.key !== item.value.key))
                  deleteItem(item.value.key)
                }}
              >X</button>
              <img src={item.value.value} alt='ソート可能な画像' style={imageStyle} />
            </div>
          )
        })}
      </div>
    </div >
  )
}

let rootElement = document.getElementById('root')

if (!rootElement) {
  rootElement = document.createElement('div')
  rootElement.id = 'root'
  document.body.appendChild(rootElement)
}

const root = createRoot(rootElement)
root.render(<SortSampleApp />)
