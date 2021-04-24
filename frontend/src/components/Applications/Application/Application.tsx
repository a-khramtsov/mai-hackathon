

import React, { useState } from 'react'
import s from './Application.module.scss'
import classNames from 'classnames'
import projectImg from '../../../assets/img/project-img.png'
import userImg from '../../../assets/img/user-img.png'
import { SubmitRoundedButton, DismissSimpleButton, DismissRoundedButton } from '../../Common/CustomComponents/CustomButtons'
import { ButtonsHolder } from '../../Common/CustomComponents/Blocks'
import SubmissionModal from '../../Common/Modals/SubmissionModal'
import { ApplicationType } from 'types/applications'

type PropsType = {
	application: ApplicationType
}

const Application = ({ application, ...props }: PropsType) => {
	let listItems = ['Фaiyegqwi7ugeqwui', 'ueg qwygve uoqwv e qw', 'qwiye fqwyve ', 'qwlukeyy gqwyeb wqig e',]

	const [modalOpen, setModalOpen] = useState(false)


	return (
		<div className={s.projectBlock}>
			<div className={s.date}>6 апреля, 11:35</div>

			<div className={s.previewBlock}>
				<img src={projectImg} alt="project-img" className={s.projectImg} />


				<div className={s.previewInfo}>
					<div className={s.placeInfo}>
						<img src={userImg} alt="user-img" />
						<div className={s.placeDetails}>
							<p className={s.placeName}>BEAUTYPLACE</p>
							<p className={s.placeCategory}>коворкинг</p>
						</div>
					</div>
					<div className={s.projectName}>Кабинет 1 на Ленинском пр. 132</div>
					<div className={s.price}>от 100р<span> / час</span></div>
				</div>
			</div>

			<div className={s.mainInfoBlock}>
				<div className={s.contentBlock}>
					<h1>Страна</h1>
					<p>Россия</p>
				</div>
				<div className={s.contentBlock}>
					<h1>Формат пространства</h1>
					<p>Салон</p>
				</div>
				<div className={s.contentBlock}>
					<h1>Город</h1>
					<p>Санкт - Петербург</p>
				</div>
				<div className={s.contentBlock}>
					<h1>Вид рабочего места</h1>
					<p>Отдельный кабинет</p>
				</div>
				<div className={s.contentBlock}>
					<h1>Точный адрес</h1>
					<p>ул. Ленинский пр. 132</p>
				</div>
				<div className={s.contentBlock}>
					<h1>Тип рабочего места</h1>
					<p>Кабинет педикюрный</p>
				</div>
			</div>

			<div className={classNames(s.contentBlock, s.bigMargin)}>
				<h1>Удобства</h1>
				<div className={s.categoryContent}>
					<h2>Основное оснащение</h2>
					<p>{listItems.join(' • ')}</p>
				</div>
			</div>

			<div className={classNames(s.contentBlock, s.bigMargin)}>
				<h1>Описание</h1>
				<p>Добрый день! Сдаю уютное рабочее место парикмахера в студии недалеко от Невского проспекта, в шаговой доступности метро. Сдаю уютное рабочее парикмахера в недалеко от Невского проспекта, в шаговой доступности метро. Сдаю место парикмахера недалеко от Невского проспекта, в шаговой доступности метро.</p>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

				<div className={classNames(s.contentBlock, s.bigMargin)}>
					<h1>Правила поведения</h1>
					{listItems.map(elem => <p>• {elem}</p>)}
				</div>
				<div className={classNames(s.contentBlock, s.bigMargin)}>
					<h1>Правила отмены</h1>
					<p>Без возможности отмены</p>
				</div>
			</div>

			<ButtonsHolder>
				<DismissSimpleButton onClick={() => { setModalOpen(true) }}>Заблокировать</DismissSimpleButton>
				<SubmitRoundedButton>Одобрить</SubmitRoundedButton>
			</ButtonsHolder>


			<SubmissionModal
				open={modalOpen}
				handleClose={() => { setModalOpen(false) }}
				titleText={"Сообщение о причине блокировки объявления:"}
				submitFunction={(message: string) => { console.log(message) }}
				buttons={<ButtonsHolder>
					<button type="button" onClick={() => { setModalOpen(false) }}>Закрыть</button>
					<DismissRoundedButton type="submit">Заблокировать</DismissRoundedButton>
				</ButtonsHolder>}
			/>

		</div>
	)
}

export default Application;
