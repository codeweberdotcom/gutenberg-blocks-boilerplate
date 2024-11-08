import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import ButtonSidebar, { getClassNames } from './sidebar';

const Edit = ({ attributes, setAttributes }) => {
	const {
		buttonText,
		buttonSize,
		buttonColor,
		buttonGradientColor,
		buttonStyle,
		buttonType,
		buttonShape,
		buttonIconPosition, // Позиция иконки (left или right)
		iconClass,
		socialIconClass,
		socialIconStyle, // Социальная иконка
	} = attributes;

	// Получаем класс кнопки
	const buttonClass = getClassNames(attributes);

	// Условие для отображения иконки слева
	const leftIcon =
		buttonType === 'icon' && buttonIconPosition === 'left' && iconClass ? (
			<i className={iconClass}></i>
		) : null;

	let circleIcon = null;

	if (
		buttonType === 'circle' &&
		buttonStyle === 'outline-gradient' &&
		iconClass
	) {
		// Если все условия выполняются, показываем иконку
		circleIcon = (
			<span>
				<i className={iconClass}></i>
			</span>
		);
	} else if (
		buttonType === 'circle' &&
		(buttonStyle === 'gradient' ||
			buttonStyle === 'outline' ||
			buttonStyle === 'soft' ||
			buttonStyle === 'solid') &&
		iconClass
	) {
		// Если buttonType === 'circle' и buttonStyle не равен 'outline-gradient', показываем иконку
		circleIcon = (
			<span>
				<i className={iconClass}></i>
			</span>
		);
	} else {
		// Если никакое условие не выполняется, иконка не показывается
		circleIcon = null;
	}

	// Условие для отображения социальной иконки (с правильным форматом)
	const socialIcon =
		buttonType === 'social' && socialIconClass ? (
			<i className={`uil uil-${socialIconClass}`}></i>
		) : null;

	// Условие для отображения иконки справа
	const rightIcon =
		buttonType === 'icon' && buttonIconPosition === 'right' && iconClass ? (
			<i className={iconClass}></i>
		) : null;

	// Условие для отображения иконки для Play
	const playIcon =
		buttonType === 'play' ? <i className="icn-caret-right"></i> : null;

	// Условие для отображения иконки для Expand
	const expandIcon =
		buttonType === 'expand' ? (
			<i className="uil uil-arrow-right"></i>
		) : null;

	// Контент кнопки (текст или иконка)
	let buttonContent;

	if (buttonType === 'play') {
		// Для типа Play выводим иконку
		buttonContent = playIcon;
	} else if (buttonType === 'expand') {
		// Для типа Expand выводим иконку и текст
		buttonContent = (
			<>
				{expandIcon}
				<RichText
					tagName="span"
					value={buttonText}
					onChange={(newText) =>
						setAttributes({ buttonText: newText })
					}
					placeholder="Enter button text"
				/>
			</>
		);
	} else if (!['circle', 'social'].includes(buttonType)) {
		// Для всех других типов, кроме Circle и Social, отображаем текст
		buttonContent = (
			<RichText
				tagName="span"
				value={buttonText}
				onChange={(newText) => setAttributes({ buttonText: newText })}
				placeholder="Enter button text"
			/>
		);
	} else {
		// Для типов Circle и Social оставляем пустой элемент
		buttonContent = null;
	}

	return (
		<>
			<div {...useBlockProps()}>
				<a href="#" className={buttonClass}>
					{/* Иконка слева (если выбрана позиция 'left') */}
					{leftIcon}

					{/* Контент кнопки, который зависит от типа */}
					{circleIcon}
					{buttonContent}

					{/* Социальная иконка */}
					{socialIcon}

					{/* Иконка справа (если выбрана позиция 'right') */}
					{rightIcon}
				</a>
			</div>

			{/* Добавляем сайдбар с настройками */}
			<ButtonSidebar
				attributes={attributes}
				setAttributes={setAttributes}
			/>
		</>
	);
};

export default Edit;
