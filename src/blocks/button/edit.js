import { useBlockProps } from '@wordpress/block-editor';
import CustomButton from '../../utilities/button';

const Edit = ({ attributes, setAttributes }) => {
	const {
		buttonText = 'Default Text', // Текст по умолчанию
		buttonSize = 'medium', // Размер кнопки по умолчанию
		buttonColor = 'primary', // Цвет кнопки по умолчанию
		buttonShape = '', // Форма кнопки
		buttonStyle = 'solid', // Стиль кнопки по умолчанию
		buttonType = 'solid', // Убедитесь, что по умолчанию используется корректный тип
		buttonGradient = 'btn-gradient gradient-1', // Градиент кнопки
		buttonIconPosition = 'left', // Позиция иконки
		iconClass = '', // Иконка кнопки по умолчанию
		socialIconName = 'facebook', // Социальная иконка по умолчанию
	} = attributes;

	// Обработчики для изменения атрибутов
	const setButtonText = (text) => setAttributes({ buttonText: text });
	const setButtonSize = (size) => setAttributes({ buttonSize: size });
	const setButtonColor = (color) => setAttributes({ buttonColor: color });
	const setButtonShape = (shape) => setAttributes({ buttonShape: shape });
	const setButtonStyle = (style) => setAttributes({ buttonStyle: style });
	const setButtonType = (type) => setAttributes({ buttonType: type });
	const setButtonGradient = (gradient) =>
		setAttributes({ buttonGradient: gradient });
	const setButtonIconPosition = (position) =>
		setAttributes({ buttonIconPosition: position });
	const setIconClass = (iconClassName) =>
		setAttributes({ iconClass: iconClassName }); // Переименован параметр
	const setSocialIcon = (socialIconName) =>
		setAttributes({ socialIcon: socialIconName }); // Переименован параметр

	return (
		<div {...useBlockProps()}>
			<CustomButton
				text={buttonText}
				onChangeText={setButtonText}
				buttonSize={buttonSize}
				onChangeSize={setButtonSize}
				buttonColor={buttonColor}
				onChangeColor={setButtonColor}
				buttonShape={buttonShape}
				onChangeShape={setButtonShape}
				buttonStyle={buttonStyle}
				onChangeStyle={setButtonStyle}
				buttonType={buttonType}
				onChangeType={setButtonType}
				buttonGradient={buttonGradient}
				onChangeGradient={setButtonGradient}
				buttonIconPosition={buttonIconPosition}
				onChangeIconPosition={setButtonIconPosition}
				iconClass={iconClass}
				onChangeIconClass={setIconClass}
				socialIcon={socialIconName} // Используем новое имя переменной
				onChangeSocialIcon={setSocialIcon}
			/>
		</div>
	);
};

export default Edit;
