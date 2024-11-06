import { useBlockProps } from '@wordpress/block-editor';
import CustomButton from '../../utilities/button';

const Edit = ({ attributes, setAttributes }) => {
	const {
		buttonText = 'Default Text',
		buttonSize = 'medium',
		buttonColor = 'primary',
		buttonShape = '',
		buttonStyle = 'solid',
		buttonType = 'default',
		buttonGradient = 'btn-gradient gradient-1',
		buttonIconPosition = 'left', // Новый атрибут для позиции иконки
	} = attributes;

	const setButtonText = (text) => setAttributes({ buttonText: text });
	const setButtonSize = (size) => setAttributes({ buttonSize: size });
	const setButtonColor = (color) => setAttributes({ buttonColor: color });
	const setButtonShape = (shape) => setAttributes({ buttonShape: shape });
	const setButtonStyle = (style) => setAttributes({ buttonStyle: style });
	const setButtonType = (type) => setAttributes({ buttonType: type });
	const setButtonGradient = (gradient) =>
		setAttributes({ buttonGradient: gradient });
	const setButtonIconPosition = (position) =>
		setAttributes({ buttonIconPosition: position }); // Новый обработчик для позиции иконки

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
				buttonIconPosition={buttonIconPosition} // Передаем атрибут позиции иконки
				onChangeIconPosition={setButtonIconPosition} // Передаем обработчик для изменения позиции иконки
			/>
		</div>
	);
};

export default Edit;
