import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		buttonText,
		buttonSize,
		buttonColor,
		buttonGradientColor,
		buttonStyle,
		buttonType,
		buttonIconPosition,
		iconClass,
		socialIconClass,
		socialIconStyle,
	} = attributes;

	// Определяем классы кнопки в зависимости от атрибутов
	const buttonClasses = [
		'btn',
		`btn-${buttonColor}`,
		`btn-${buttonSize}`,
		`btn-${buttonStyle}`,
		buttonGradientColor,
		`btn-type-${buttonType}`,
		buttonIconPosition === 'left' ? 'icon-left' : 'icon-right',
	]
		.filter(Boolean) // Убираем undefined и пустые значения
		.join(' ');

	return (
		<a href="#" className={buttonClasses}>
			{iconClass && buttonIconPosition === 'left' && (
				<i className={iconClass}></i>
			)}
			<span>{buttonText}</span>
			{iconClass && buttonIconPosition === 'right' && (
				<i className={iconClass}></i>
			)}
			{socialIconClass && buttonType === 'social' && (
				<i className={`${socialIconClass} ${socialIconStyle}`}></i>
			)}
		</a>
	);
}
