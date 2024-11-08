// sidebar.js
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ComboboxControl,
	Button,
} from '@wordpress/components';
import { colors } from '../../utilities/colors';
import { gradientcolors } from '../../utilities/gradient_colors';
import { fontIcons } from '../../utilities/font_icon';
import { fontIconsSocial } from '../../utilities/font_icon_social';

export default function Sidebar({ attributes, setAttributes }) {
	const {
		buttonSize = 'medium', // Размер кнопки по умолчанию
		buttonColor = 'primary', // Цвет кнопки по умолчанию
		buttonStyle = 'solid', // Стиль кнопки по умолчанию
		buttonShape = 'rounded', // Форма кнопки по умолчанию
		iconClass, // Иконка кнопки
		socialIconClass, // Социальная иконка
		socialIconStyle, // Стиль социальной иконки
		buttonText = 'Button Text', // Текст кнопки
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Button Settings', 'naviddev-gutenberg-blocks')}
			>
				{/* Button Size */}
				<SelectControl
					label={__('Button Size', 'naviddev-gutenberg-blocks')}
					value={buttonSize}
					options={[
						{ label: 'Large', value: 'large' },
						{ label: 'Medium', value: 'medium' },
						{ label: 'Small', value: 'small' },
					]}
					onChange={(value) => setAttributes({ buttonSize: value })}
				/>

				{/* Button Color */}
				<SelectControl
					label={__('Button Color', 'naviddev-gutenberg-blocks')}
					value={buttonColor}
					options={colors}
					onChange={(value) => setAttributes({ buttonColor: value })}
				/>

				{/* Button Gradient Color */}
				<SelectControl
					label={__(
						'Button Gradient Color',
						'naviddev-gutenberg-blocks'
					)}
					value={attributes.buttonGradientColor}
					options={gradientcolors}
					onChange={(value) =>
						setAttributes({ buttonGradientColor: value })
					}
				/>

				{/* Button Style */}
				<SelectControl
					label={__('Button Style', 'naviddev-gutenberg-blocks')}
					value={buttonStyle}
					options={[
						{ label: 'Solid', value: 'solid' },
						{ label: 'Outline', value: 'outline' },
						{ label: 'Soft Gradient', value: 'soft-gradient' },
						{
							label: 'Outline Gradient',
							value: 'outline-gradient',
						},
					]}
					onChange={(value) => setAttributes({ buttonStyle: value })}
				/>

				{/* Icon Class */}
				<ComboboxControl
					label={__('Icon Class', 'naviddev-gutenberg-blocks')}
					value={iconClass}
					options={fontIcons}
					onChange={(value) => setAttributes({ iconClass: value })}
				/>

				{/* Social Icon Class */}
				<ComboboxControl
					label={__('Social Icon Class', 'naviddev-gutenberg-blocks')}
					value={socialIconClass}
					options={fontIconsSocial}
					onChange={(value) =>
						setAttributes({ socialIconClass: value })
					}
				/>

				{/* Social Icon Style */}
				<SelectControl
					label={__('Social Icon Style', 'naviddev-gutenberg-blocks')}
					value={socialIconStyle}
					options={[
						{ label: 'Style 1', value: 'style_1' },
						{ label: 'Style 2', value: 'style_2' },
						{ label: 'Style 3', value: 'style_3' },
					]}
					onChange={(value) =>
						setAttributes({ socialIconStyle: value })
					}
				/>

				{/* Button Text */}
				<RichText
					label={__('Button Text', 'naviddev-gutenberg-blocks')}
					value={buttonText}
					onChange={(value) => setAttributes({ buttonText: value })}
					placeholder={__(
						'Enter Button Text',
						'naviddev-gutenberg-blocks'
					)}
				/>

				{/* Render the button as a preview */}
				<div className="button-preview">
					<Button
						className={`btn btn-${buttonColor} btn-${buttonSize} btn-${buttonStyle} btn-${buttonShape}`}
					>
						{/* Render icon if provided */}
						{iconClass && <i className={iconClass}></i>}
						{/* Render the button text */}
						{buttonText && <span>{buttonText}</span>}
					</Button>
				</div>
			</PanelBody>
		</InspectorControls>
	);
}
