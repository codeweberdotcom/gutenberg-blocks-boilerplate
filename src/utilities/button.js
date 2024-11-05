import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button as WpButton,
	ButtonGroup,
	SelectControl,
} from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { colors } from './colors';
import { shapes } from './shapes';

// Добавьте доступные варианты типов кнопок
const buttonTypes = [
	{ label: __('Default', 'naviddev-gutenberg-blocks'), value: 'default' },
	{ label: __('Circle', 'naviddev-gutenberg-blocks'), value: 'circle' },
	{ label: __('Social', 'naviddev-gutenberg-blocks'), value: 'social' },
	{ label: __('Icon', 'naviddev-gutenberg-blocks'), value: 'icon' },
	{ label: __('Expand', 'naviddev-gutenberg-blocks'), value: 'expand' },
	{ label: __('Play', 'naviddev-gutenberg-blocks'), value: 'play' },
];

const CustomButton = ({
	text,
	onChangeText,
	buttonSize,
	onChangeSize,
	buttonColor,
	onChangeColor,
	buttonShape,
	onChangeShape,
	buttonStyle,
	onChangeStyle,
	buttonType,
	onChangeType, // Новый обработчик для типа кнопки
}) => {
	const isOutline = buttonStyle === 'outline';

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Button Settings', 'naviddev-gutenberg-blocks')}
				>
					<p>{__('Size Button', 'naviddev-gutenberg-blocks')}</p>
					<ButtonGroup>
						<WpButton
							isPrimary={buttonSize === 'btn-lg'}
							onClick={() => onChangeSize('btn-lg')}
						>
							{__('Large', 'naviddev-gutenberg-blocks')}
						</WpButton>
						<WpButton
							isPrimary={buttonSize === 'medium'}
							onClick={() => onChangeSize('medium')}
						>
							{__('Medium', 'naviddev-gutenberg-blocks')}
						</WpButton>
						<WpButton
							isPrimary={buttonSize === 'btn-sm'}
							onClick={() => onChangeSize('btn-sm')}
						>
							{__('Small', 'naviddev-gutenberg-blocks')}
						</WpButton>
					</ButtonGroup>

					<p>{__('Button Style', 'naviddev-gutenberg-blocks')}</p>
					<ButtonGroup>
						<WpButton
							isPrimary={buttonStyle === 'default'}
							onClick={() => onChangeStyle('default')}
						>
							Default
						</WpButton>
						<WpButton
							isPrimary={buttonStyle === 'outline'}
							onClick={() => onChangeStyle('outline')}
						>
							Outline
						</WpButton>
					</ButtonGroup>

					<SelectControl
						label={__('Button Color', 'naviddev-gutenberg-blocks')}
						value={buttonColor}
						options={colors}
						onChange={onChangeColor}
					/>

					<SelectControl
						label={__('Button Shape', 'naviddev-gutenberg-blocks')}
						value={buttonShape}
						options={shapes}
						onChange={onChangeShape}
					/>

					<SelectControl
						label={__('Button Type', 'naviddev-gutenberg-blocks')} // Новый параметр для типа кнопки
						value={buttonType}
						options={buttonTypes}
						onChange={onChangeType}
					/>
				</PanelBody>
			</InspectorControls>
			<a
				href="#"
				className={`btn ${buttonSize} ${
					isOutline
						? `btn-outline-${buttonColor}`
						: `btn-${buttonColor}`
				} ${buttonShape} btn-type-${buttonType}`} // Добавляем класс для типа кнопки
			>
				<RichText
					tagName="span"
					value={text}
					onChange={onChangeText}
					placeholder={__('Button Text', 'naviddev-gutenberg-blocks')}
				/>
			</a>
		</>
	);
};

export default CustomButton;
