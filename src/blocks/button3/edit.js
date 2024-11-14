// Импорт необходимых зависимостей WordPress
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { LinkTypeSelector } from '../../utilities/link_type1'; // Путь к файлу link_type1.js

const ButtonEdit = ({ attributes, setAttributes }) => {
	const {
		LinkUrl,
		LinkType, // Добавляем LinkType для выбора типа ссылки
		ButtonClass,
		LeftIcon,
		CircleIcon,
		ButtonContent,
		SocialIcon,
		RightIcon,
		DataValue, // Добавляем DataValue для использования
	} = attributes;

	const onChangeLinkUrl = (newUrl) => setAttributes({ LinkUrl: newUrl });
	const onChangeButtonClass = (newClass) =>
		setAttributes({ ButtonClass: newClass });
	const onChangeButtonContent = (newContent) =>
		setAttributes({ ButtonContent: newContent });

	// Указываем параметры и атрибуты кнопки
	const blockProps = useBlockProps({
		className: ButtonClass,
	});

	return (
		<>
			<div>
				{/* Добавляем выпадающий список для LinkType */}
				<LinkTypeSelector
					attributes={attributes}
					setAttributes={setAttributes}
				/>

				<a
					{...blockProps}
					href={LinkUrl} // Используем LinkUrl как ссылку
					className={ButtonClass}
					onClick={(event) => event.preventDefault()} // Предотвращаем переход по ссылке в редакторе
					data-value={DataValue} // Добавляем атрибут DataValue
				>
					{LeftIcon}
					{CircleIcon}

					<RichText
						tagName="span" // Обертка текста
						value={ButtonContent} // Передаем текущее значение текста
						onChange={onChangeButtonContent} // Обработчик изменения текста
						placeholder="Введите текст кнопки..." // Подсказка
						className="button-content" // Класс для стиля
					/>

					{RightIcon}
				</a>
			</div>
		</>
	);
};

export default ButtonEdit;
