import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		buttonText = 'Default Text',
		buttonSize = 'medium',
		buttonColor = 'primary',
		buttonShape = '',
		buttonStyle = 'solid', // Стиль кнопки
		buttonType = 'default', // Тип кнопки
		buttonGradient = 'btn-gradient gradient-1', // Градиент, если используется
	} = attributes;

	// Функция для формирования классов кнопки
	const buttonClasses = ({
		buttonSize,
		buttonColor,
		buttonShape,
		buttonStyle,
		buttonType,
		buttonGradient,
	}) => {
		const classes = ['btn'];

		// Добавляем размер кнопки
		if (buttonSize) {
			classes.push(buttonSize);
		}

		// Добавляем стиль кнопки
		if (buttonStyle) {
			if (buttonStyle === 'outline') {
				classes.push(`btn-outline-${buttonColor}`);
			} else if (buttonStyle === 'gradient') {
				// Если выбран стиль Gradient, добавляем два класса
				classes.push('btn-gradient'); // Базовый класс для градиента
				if (buttonGradient) {
					// Добавляем градиент, например 'gradient-1'
					classes.push(buttonGradient);
				}
			} else if (buttonStyle === 'outline-gradient') {
				// Если выбран стиль Outline Gradient, добавляем два класса
				classes.push('btn-outline-gradient'); // Базовый класс для Outline Gradient
				if (buttonGradient) {
					// Добавляем градиент, например 'gradient-1'
					classes.push(buttonGradient);
				}
			} else if (buttonStyle === 'soft') {
				classes.push(`btn-soft-${buttonColor}`);
			} else {
				classes.push(`btn-${buttonColor}`);
			}
		}

		// Добавляем форму кнопки
		if (buttonShape) {
			classes.push(buttonShape);
		}

		// Добавляем тип кнопки
		if (buttonType) {
			switch (buttonType) {
				case 'icon':
					classes.push('btn-icon');
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

	// Собираем классы для кнопки
	const buttonClassName = buttonClasses({
		buttonSize,
		buttonColor,
		buttonShape,
		buttonStyle,
		buttonType,
		buttonGradient,
	});

	return (
		<div {...useBlockProps.save()}>
			<a href="#" className={buttonClassName}>
				<RichText.Content tagName="span" value={buttonText} />
			</a>
		</div>
	);
}
