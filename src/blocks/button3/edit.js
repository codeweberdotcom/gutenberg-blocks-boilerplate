import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { LinkTypeSelector } from '../../utilities/link_type1';
import { ButtonSidebar } from '../button3/sidebar';
import { getClassNames } from '../button3/sidebar'; // Путь к файлу, где определена функция getClassNames // Путь к файлу link_type1.js
import { __ } from '@wordpress/i18n'; // Импортируем функцию для перевода

const ButtonEdit = ({ attributes, setAttributes }) => {
	const {
		anchor,
		LinkUrl,
		ButtonSize,
		ButtonColor,
		ButtonGradientColor,
		ButtonStyle,
		ButtonType,
		ButtonShape,
		ButtonIconPosition,
		IconClass,
		SocialIconClass,
		SocialIconStyle,
		LeftIcon,
		CircleIcon,
		ButtonContent,
		SocialIcon,
		RightIcon,
		DataValue, // Добавляем DataValue для использования
	} = attributes;

	const onChangeLinkUrl = (newUrl) => setAttributes({ LinkUrl: newUrl });
	const onChangeButtonContent = (newContent) =>
		setAttributes({ ButtonContent: newContent });

	// Генерация класса кнопки
	const buttonClass = getClassNames(attributes);

	const blockProps = useBlockProps({
		className: buttonClass, // Применяем сгенерированный класс
	});

	return (
		<>
			<div>
				<InspectorControls>
					{/* Добавляем тестовый текст для перевода */}
					<p>
						{__(
							'Test text for translation in the sidebar',
							'naviddev-gutenberg-blocks'
						)}
					</p>
					{/* Добавляем выпадающий список для LinkType */}
					<LinkTypeSelector
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ButtonSidebar
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</InspectorControls>
				<a
					{...useBlockProps({ className: buttonClass, id: anchor })}
					href={LinkUrl}
					// Применяем сгенерированный класс
					onClick={(event) => event.preventDefault()}
					data-value={DataValue}
				>
					{LeftIcon}
					{CircleIcon}
					{SocialIcon}

					<RichText
						tagName="span"
						value={ButtonContent}
						onChange={onChangeButtonContent}
						placeholder="Введите текст кнопки..."
						className="button-content"
					/>

					{RightIcon}
				</a>
			</div>
		</>
	);
};

export default ButtonEdit;
