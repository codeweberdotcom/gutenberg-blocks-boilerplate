import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		buttonText = 'Default Text',
		buttonSize = 'medium',
		buttonColor = 'primary',
		buttonShape = '',
		buttonStyle = 'solid',
		buttonType = 'default',
		buttonGradient = 'btn-gradient gradient-1',
		iconClass = '', // Атрибут для иконки
		buttonIconPosition = 'left', // Позиция иконки
	} = attributes;

	// Функция для генерации классов для кнопки
	const buttonClasses = ({
		buttonSize,
		buttonColor,
		buttonShape,
		buttonStyle,
		buttonType,
		buttonGradient,
		iconClass,
		buttonIconPosition,
	}) => {
		const classes = ['btn'];

		if (buttonSize) {
			classes.push(buttonSize);
		}

		if (buttonStyle) {
			if (buttonStyle === 'outline') {
				classes.push(`btn-outline-${buttonColor}`);
			} else if (buttonStyle === 'gradient') {
				classes.push('btn-gradient');
				if (buttonGradient) {
					classes.push(buttonGradient);
				}
			} else if (buttonStyle === 'outline-gradient') {
				classes.push('btn-outline-gradient');
				if (buttonGradient) {
					classes.push(buttonGradient);
				}
			} else if (buttonStyle === 'soft') {
				classes.push(`btn-soft-${buttonColor}`);
			} else {
				classes.push(`btn-${buttonColor}`);
			}
		}

		if (buttonShape) {
			classes.push(buttonShape);
		}

		if (buttonType) {
			switch (buttonType) {
				case 'icon':
					classes.push('btn-icon');
					classes.push(
						buttonIconPosition === 'right'
							? 'btn-icon-end'
							: 'btn-icon-start'
					);
					break;
				case 'play':
					classes.push('btn-circle', 'btn-play', 'ripple');
					break;
				case 'expand':
					classes.push('btn-expand', 'rounded-pill');
					break;
				case 'social':
				case 'circle':
					classes.push('btn-circle');
					break;
				default:
					classes.push(`btn-${buttonType}`);
			}
		}

		return classes.join(' ');
	};

	const buttonClassName = buttonClasses({
		buttonSize,
		buttonColor,
		buttonShape,
		buttonStyle,
		buttonType,
		buttonGradient,
		iconClass,
		buttonIconPosition,
	});

	return (
		<div {...useBlockProps.save()}>
			<a href="#" className={buttonClassName}>
				{/* Логика для отображения иконки для типа 'expand' */}
				{buttonType === 'expand' && (
					<i className="uil uil-arrow-right"></i> // Иконка для типа 'expand'
				)}

				{/* Логика для отображения иконки для типа 'play' */}
				{buttonType === 'play' && (
					<i className="icn-caret-right"></i> // Иконка для типа 'play'
				)}

				{/* Для типа 'icon' отображаем иконку */}
				{iconClass &&
					buttonType === 'icon' &&
					buttonIconPosition === 'left' && (
						<i className={iconClass}></i> // Иконка слева
					)}

				{/* Основной текст кнопки */}
				{buttonType !== 'play' && buttonType !== 'expand' && (
					<RichText.Content tagName="span" value={buttonText} />
				)}

				{/* Для типа 'icon' отображаем иконку справа */}
				{iconClass &&
					buttonType === 'icon' &&
					buttonIconPosition === 'right' && (
						<i className={iconClass}></i> // Иконка справа
					)}
			</a>
		</div>
	);
}
