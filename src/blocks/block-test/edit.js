import { useBlockProps } from '@wordpress/block-editor';
import CustomButton from '../../utilities/button';

const Edit = ({ attributes, setAttributes }) => {
	const {
		buttonText = 'Default Text',
		buttonSize = 'medium',
		buttonColor = 'primary',
		buttonShape = '',
		buttonStyle = 'default',
		buttonType = 'default', // Новый параметр buttonType
	} = attributes;

	const setButtonText = (text) => setAttributes({ buttonText: text });
	const setButtonSize = (size) => setAttributes({ buttonSize: size });
	const setButtonColor = (color) => setAttributes({ buttonColor: color });
	const setButtonShape = (shape) => setAttributes({ buttonShape: shape });
	const setButtonStyle = (style) => setAttributes({ buttonStyle: style });
	const setButtonType = (type) => setAttributes({ buttonType: type }); // Новый обработчик для типа кнопки

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
				buttonType={buttonType} // Передаем тип кнопки
				onChangeType={setButtonType} // Обработчик для типа кнопки
			/>
		</div>
	);
};

export default Edit;
