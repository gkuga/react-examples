import React, { useEffect, useRef } from 'react'

/**
 * @description マウスポインターが要素と被っているか判定します
 */
const isHover = (positon: Position, element: HTMLElement): boolean => {
	// マウスポインターの座標を取得
	const clientX = positon.x
	const clientY = positon.y

	// 重なりを判定する要素のサイズと座標を取得
	const rect = element.getBoundingClientRect()

	// マウスポインターが要素と重なっているかを判定する
	return (
		clientY < rect.bottom &&
		clientY > rect.top &&
		clientX < rect.right &&
		clientX > rect.left
	)
}

// 座標の型
interface Position {
	x: number
	y: number
}

// ドラッグ＆ドロップ要素の情報をまとめた型
export interface DnDItem<T> {
	value: T // useDnDSort()の引数に渡された配列の要素の値
	position: Position // 要素の座標
	element: HTMLElement // DOM情報
}

// useRef()で保持するデータの型
interface DnDRef<T> {
	dndItems: DnDItem<T>[] // 並び替える全ての要素を保持するための配列
	canCheckHovered: boolean // 重なり判定ができるかのフラグ
	pointerPosition: Position // マウスポインターの座標
	dragElement: DnDItem<T> | null // ドラッグしてる要素
}

// 返り値の型
export interface DnDSorted<T> {
	value: T
	events: {
		ref: (element: HTMLElement | null) => void
		onMouseDown: (event: React.MouseEvent<HTMLElement>) => void
		onTouchStart: (event: React.TouchEvent<HTMLElement>) => void
	}
}

type ValueWithKey = {
	key: string
}

/**
 * @description ドラッグ＆ドロップの並び替え処理を提供します
 */
export const useDnDSort = <T extends ValueWithKey>(items: T[], setItems: (items: T[]) => void): [DnDSorted<T>[], (key: string) => void] => {

	// 状態をrefで管理する
	const state: DnDRef<T> = useRef({
		dndItems: [],
		dragElement: null,
		canCheckHovered: true,
		pointerPosition: { x: 0, y: 0 }
	}).current

	useEffect(() => {
	}, [items])

	const deleteItem = (key: string) => {
		state.dndItems = state.dndItems.filter(item => item.value.key !== key)
	}

	const onMouseMove = (event: MouseEvent) => {
		onMove({ x: event.clientX, y: event.clientY })
	}

	const onTouchMove = (event: TouchEvent) => {
		onMove({ x: event.touches[0].clientX, y: event.touches[0].clientY })
	}

	const onMove = (position: Position) => {
		const { dndItems, dragElement, pointerPosition } = state

		// ドラッグして無ければ何もしない
		if (!dragElement) return

		// マウスポインターの移動量を計算
		const x = position.x - pointerPosition.x
		const y = position.y - pointerPosition.y

		const dragStyle = dragElement.element.style

		// ドラッグ要素の座標とスタイルを更新
		dragStyle.zIndex = '100'
		dragStyle.cursor = 'grabbing'
		dragStyle.transform = `translate(${x}px,${y}px)`

		// まだ確認できない場合は処理を終了する
		if (!state.canCheckHovered) return

		// 確認できないようにする
		state.canCheckHovered = false

		// ドラッグしている要素の配列の位置を取得
		const dragIndex = dndItems.findIndex(({ value }) => value.key === dragElement.value.key)

		// ホバーされている要素の配列の位置を取得
		const hoveredIndex = dndItems.findIndex(
			({ element }, index) => index !== dragIndex && isHover(position, element)
		)

		// ホバーされている要素があれば、ドラッグしている要素と入れ替える
		if (hoveredIndex !== -1) {
			// カーソルの位置を更新
			state.pointerPosition.x = position.x
			state.pointerPosition.y = position.y

			// 要素を入れ替える
			dndItems.splice(dragIndex, 1)
			dndItems.splice(hoveredIndex, 0, dragElement)

			const { left: x, top: y } = dragElement.element.getBoundingClientRect()

			// ドラッグ要素の座標を更新
			dragElement.position = { x, y }

			// 再描画する
			setItems(dndItems.map((v) => v.value))
		}

		// 300ms後に確認できるようにする
		setTimeout(() => (state.canCheckHovered = true), 300)
	}

	const onMouseUp = (event: MouseEvent) => {
		onUp({ x: event.clientX, y: event.clientY })
		window.removeEventListener('mouseup', onMouseUp)
		window.removeEventListener('mousemove', onMouseMove)
	}

	const onTouchEnd = (event: TouchEvent) => {
		// https://www.w3.org/TR/touch-events/
		onUp({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY })
		window.removeEventListener('touchend', onTouchEnd)
		window.removeEventListener('touchmove', onTouchMove)
	}

	// ドラッグが終了した時の処理
	const onUp = (position: Position) => {
		const { dragElement } = state

		// ドラッグしていなかったら何もしない
		if (!dragElement) return

		const dragStyle = dragElement.element.style

		// ドラッグしてる要素に適用していたCSSを削除
		dragStyle.zIndex = ''
		dragStyle.cursor = ''
		dragStyle.transform = ''

		// ドラッグしている要素をstateから削除
		state.dragElement = null
	}

	return [items.map(
		(value: T): DnDSorted<T> => {
			return {
				value,

				events: {
					ref: (element: HTMLElement | null) => {
						if (!element) return

						const { dndItems, dragElement, pointerPosition } = state

						// 位置をリセットする
						element.style.transform = ''

						// 要素の位置を取得
						const { left: x, top: y } = element.getBoundingClientRect()
						const position: Position = { x, y }

						const itemIndex = dndItems.findIndex((item) => item.value.key === value.key)

						// 要素が無ければ新しく追加して処理を終わる
						if (itemIndex === -1) {
							return dndItems.push({ value, element, position })
						}

						// ドラッグ要素の時は、ズレを修正する
						if (dragElement?.value.key === value.key) {
							// ドラッグ要素のズレを計算する
							const dragX = dragElement.position.x - position.x
							const dragY = dragElement.position.y - position.y

							// 入れ替え時のズレを無くす
							element.style.transform = `translate(${dragX}px,${dragY}px)`

							// マウスポインターの位置も再計算してズレを無くす
							pointerPosition.x -= dragX
							pointerPosition.y -= dragY
						}

						// ドラッグ要素以外の要素をアニメーションさせながら移動させる
						if (dragElement?.value.key !== value.key) {
							const item = dndItems[itemIndex]

							// 前回の座標を計算
							const x = item.position.x - position.x
							const y = item.position.y - position.y

							// 要素を前回の位置に留めておく
							element.style.transition = ''
							element.style.transform = `translate(${x}px,${y}px)`

							// 一フレーム後に要素をアニメーションさせながら元に位置に戻す
							requestAnimationFrame(() => {
								element.style.transform = ''
								element.style.transition = 'all 300ms'
							})
						}

						// 要素を更新する
						state.dndItems[itemIndex] = { value, element, position }
					},

					onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
						const element = event.currentTarget

						state.pointerPosition.x = event.clientX
						state.pointerPosition.y = event.clientY

						element.style.transition = ''
						element.style.cursor = 'grabbing'

						const { left: x, top: y } = element.getBoundingClientRect()
						const position: Position = { x, y }

						state.dragElement = { value, element, position }

						window.addEventListener('mouseup', onMouseUp)
						window.addEventListener('mousemove', onMouseMove)
					},

					onTouchStart: (event: React.TouchEvent<HTMLElement>) => {
						const element = event.currentTarget

						state.pointerPosition.x = event.touches[0].clientX
						state.pointerPosition.y = event.touches[0].clientY

						element.style.transition = ''
						element.style.cursor = 'grabbing'

						const { left: x, top: y } = element.getBoundingClientRect()
						const position: Position = { x, y }

						state.dragElement = { value, element, position }

						// mousemove, mouseupイベントをwindowに登録する
						window.addEventListener('touchend', onTouchEnd)
						window.addEventListener('touchmove', onTouchMove)
					},
				}
			}
		}
	), deleteItem]
}
