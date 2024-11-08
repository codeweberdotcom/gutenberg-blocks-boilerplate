import { useBlockProps } from '@wordpress/block-editor';
import CustomButton from './sidebar';

const Edit = ({ attributes, setAttributes }) => {
	console.log(attributes);
	const {
		buttonText = 'Button Text',
		buttonSize = 'medium',
		buttonColor = 'primary',
		buttonShape = 'rounded',
		buttonStyle = 'solid',
		buttonType = 'solid',
		buttonGradientColor = 'btn-gradient gradient-1',
		iconClass = '',
		socialIconClass = 'facebook',
		socialIconStyle = 'style_1',
	} = attributes;

	// Обработчики для изменения атрибутов
	const setButtonText = (text) => setAttributes({ buttonText: text });
	const setButtonSize = (size) => setAttributes({ buttonSize: size });
	const setButtonColor = (color) => setAttributes({ buttonColor: color });
	const setButtonShape = (shape) => setAttributes({ buttonShape: shape });
	const setButtonStyle = (style) => setAttributes({ buttonStyle: style });
	const setButtonType = (type) => setAttributes({ buttonType: type });
	const setButtonGradientColor = (gradient) =>
		setAttributes({ buttonGradientColor: gradient });
	const setIconClass = (iconClassName) =>
		setAttributes({ iconClass: iconClassName });
	const setSocialIconClass = (socialIconClassName) =>
		setAttributes({ socialIconClass: socialIconClassName });
	const setSocialIconStyle = (socialIconStyle) =>
		setAttributes({ socialIconStyle: socialIconStyle });

	return (
		<div {...useBlockProps()}>
			{/* Компонент кнопки */}
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
				buttonGradientColor={buttonGradientColor}
				onChangeGradientColor={setButtonGradientColor}
				iconClass={iconClass}
				onChangeIconClass={setIconClass}
				socialIconClass={socialIconClass}
				onChangeSocialIconClass={setSocialIconClass}
				socialIconStyle={socialIconStyle}
				onChangeSocialIconStyle={setSocialIconStyle}
			/>
		</div>
	);
};

export default Edit;
