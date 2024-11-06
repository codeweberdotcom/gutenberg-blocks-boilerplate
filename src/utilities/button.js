import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button as WpButton,
	ButtonGroup,
	SelectControl,
	ToggleControl,
	ComboboxControl,
	TextControl,
} from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { colors } from './colors';
import { shapes } from './shapes';
import { gradientcolors } from './gradient_colors';
import { fontIcons } from './font_icon';
import { fontIconsSocial } from './font_icon_social'; // Импорт для социальных иконок
import { useState } from 'react';

const buttonTypes = [
	{ label: __('Solid', 'naviddev-gutenberg-blocks'), value: 'solid' },
	{ label: __('Circle', 'naviddev-gutenberg-blocks'), value: 'circle' },
	{ label: __('Social', 'naviddev-gutenberg-blocks'), value: 'social' }, // Тип Social
	{ label: __('Icon', 'naviddev-gutenberg-blocks'), value: 'icon' },
	{ label: __('Expand', 'naviddev-gutenberg-blocks'), value: 'expand' },
	{ label: __('Play', 'naviddev-gutenberg-blocks'), value: 'play' },
];

const buttonStyles = [
	{ label: __('Solid', 'naviddev-gutenberg-blocks'), value: 'solid' },
	{ label: __('Outline', 'naviddev-gutenberg-blocks'), value: 'outline' },
	{ label: __('Soft', 'naviddev-gutenberg-blocks'), value: 'soft' },
	{ label: __('Gradient', 'naviddev-gutenberg-blocks'), value: 'gradient' },
	{
		label: __('Outline Gradient', 'naviddev-gutenberg-blocks'),
		value: 'outline-gradient',
	},
];

const linkTypes = [
	{
		label: __('External URL', 'naviddev-gutenberg-blocks'),
		value: 'external',
	},
	{
		label: __('Internal URL', 'naviddev-gutenberg-blocks'),
		value: 'internal',
	},
	{ label: __('Modal', 'naviddev-gutenberg-blocks'), value: 'modal' },
	{ label: __('Form', 'naviddev-gutenberg-blocks'), value: 'form' },
	{ label: __('Video', 'naviddev-gutenberg-blocks'), value: 'video' },
	{ label: __('YouTube', 'naviddev-gutenberg-blocks'), value: 'youtube' },
	{ label: __('Rutube', 'naviddev-gutenberg-blocks'), value: 'rutube' },
	{ label: __('VK Video', 'naviddev-gutenberg-blocks'), value: 'vk_video' },
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
	onChangeType,
	buttonGradient,
	onChangeGradient,
	iconClass,
	onChangeIconClass,
	buttonIconPosition,
	onChangeIconPosition,
	SocialIcon,
	onChangeSocialIcon,
}) => {
	const [linkType, setLinkType] = useState('external');
	const [externalUrl, setExternalUrl] = useState('');
	const [internalUrl, setInternalUrl] = useState('');
	const [socialIcon, setSocialIcon] = useState(SocialIcon || '');

	const handleLinkTypeChange = (value) => {
		setLinkType(value);
		// Clear URL fields when changing link type
		setExternalUrl('');
		setInternalUrl('');
	};

	const isSolidOrOutlineOrSoft = ['solid', 'outline', 'soft'].includes(
		buttonStyle
	);
	const isExpandOrPlay = buttonType === 'expand' || buttonType === 'play';
	const isGradientOrOutlineGradient = [
		'gradient',
		'outline-gradient',
	].includes(buttonStyle);
	const isIcon = buttonType === 'icon';
	const isSocial = buttonType === 'social'; // Проверка, выбран ли тип Social

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

		if (buttonSize && buttonType !== 'expand' && buttonType !== 'play') {
			classes.push(buttonSize);
		}

		switch (buttonStyle) {
			case 'outline':
				classes.push(`btn-outline-${buttonColor}`);
				break;
			case 'gradient':
				classes.push('btn-gradient', buttonGradient);
				break;
			case 'outline-gradient':
				classes.push('btn-outline-gradient', buttonGradient);
				break;
			case 'soft':
				classes.push(`btn-soft-${buttonColor}`);
				break;
			default:
				classes.push(`btn-${buttonColor}`);
		}

		if (buttonShape) {
			classes.push(buttonShape);
		}

		// Для кнопки типа social добавляем класс btn-[socialIcon]
		if (isSocial && socialIcon) {
			classes.push('btn-circle', `btn-${socialIcon}`);
		} else {
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
					classes.push('btn-circle');
					break;
				case 'circle':
					classes.push('btn-circle');
					break;
				default:
					classes.push(`btn-${buttonType}`);
			}
		}

		return classes.join(' ');
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Button Settings', 'naviddev-gutenberg-blocks')}
				>
					<SelectControl
						label={__('Button Type', 'naviddev-gutenberg-blocks')}
						value={buttonType}
						options={buttonTypes}
						onChange={onChangeType}
					/>

					{isSocial && (
						<>
							<ComboboxControl // Используем ComboboxControl для выбора социальной иконки
								label={__(
									'Social Icon',
									'naviddev-gutenberg-blocks'
								)}
								value={socialIcon}
								options={fontIconsSocial} // Используем социальные иконки
								onChange={(value) => {
									setSocialIcon(value);
									if (onChangeSocialIcon) {
										onChangeSocialIcon(value); // Обновляем родительское состояние
									}
								}}
							/>
							<p>
								{__(
									'Style Social',
									'naviddev-gutenberg-blocks'
								)}
							</p>
							{/* Добавляем кнопки для выбора стилей при типе кнопки "Social" */}
							<ButtonGroup>
								<WpButton
									isPrimary={buttonStyle === 'style1'}
									onClick={() => onChangeStyle('style1')}
								>
									{__('Style 1', 'naviddev-gutenberg-blocks')}
								</WpButton>
								<WpButton
									isPrimary={buttonStyle === 'style2'}
									onClick={() => onChangeStyle('style2')}
								>
									{__('Style 2', 'naviddev-gutenberg-blocks')}
								</WpButton>
								<WpButton
									isPrimary={buttonStyle === 'style3'}
									onClick={() => onChangeStyle('style3')}
								>
									{__('Style 3', 'naviddev-gutenberg-blocks')}
								</WpButton>
							</ButtonGroup>
						</>
					)}

					{!isExpandOrPlay && (
						<>
							<p>
								{__('Size Button', 'naviddev-gutenberg-blocks')}
							</p>
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
						</>
					)}

					<p>{__('Button Style', 'naviddev-gutenberg-blocks')}</p>
					<ButtonGroup>
						{buttonStyles.map(({ label, value }) => (
							<WpButton
								key={value}
								isPrimary={buttonStyle === value}
								onClick={() => onChangeStyle(value)}
								disabled={
									isExpandOrPlay &&
									[
										'gradient',
										'outline-gradient',
										'outline',
									].includes(value)
								}
							>
								{label}
							</WpButton>
						))}
					</ButtonGroup>

					<SelectControl
						label={__('Button Shape', 'naviddev-gutenberg-blocks')}
						value={buttonShape}
						options={shapes}
						onChange={onChangeShape}
						disabled={isExpandOrPlay}
					/>

					{isSolidOrOutlineOrSoft && (
						<SelectControl
							label={__(
								'Button Color',
								'naviddev-gutenberg-blocks'
							)}
							value={buttonColor}
							options={colors}
							onChange={onChangeColor}
						/>
					)}

					{isGradientOrOutlineGradient && (
						<SelectControl
							label={__(
								'Button Gradient',
								'naviddev-gutenberg-blocks'
							)}
							value={buttonGradient}
							options={gradientcolors}
							onChange={onChangeGradient}
						/>
					)}

					{isIcon && (
						<div className="icon-group">
							<ComboboxControl
								label={__('Icon', 'naviddev-gutenberg-blocks')}
								value={iconClass}
								options={fontIcons}
								onChange={onChangeIconClass}
							/>
							<ToggleControl
								label={__(
									'Icon Position (Right)',
									'naviddev-gutenberg-blocks'
								)}
								checked={buttonIconPosition === 'right'}
								onChange={() =>
									onChangeIconPosition(
										buttonIconPosition === 'right'
											? 'left'
											: 'right'
									)
								}
							/>
						</div>
					)}

					{/* New link type select */}
					<SelectControl
						label={__('Link Type', 'naviddev-gutenberg-blocks')}
						value={linkType}
						options={linkTypes}
						onChange={handleLinkTypeChange}
					/>

					{/* Conditionally render fields for URL input */}
					{linkType === 'external' && (
						<TextControl
							label={__(
								'External URL',
								'naviddev-gutenberg-blocks'
							)}
							value={externalUrl}
							onChange={setExternalUrl}
						/>
					)}

					{linkType === 'internal' && (
						<TextControl
							label={__(
								'Internal URL',
								'naviddev-gutenberg-blocks'
							)}
							value={internalUrl}
							onChange={setInternalUrl}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div
				className={buttonClasses({
					buttonSize,
					buttonColor,
					buttonShape,
					buttonStyle,
					buttonType,
					buttonGradient,
					iconClass,
					buttonIconPosition,
				})}
			>
				{buttonType === 'play' ? (
					<i className="icn-caret-right"></i>
				) : buttonType === 'circle' ? (
					<span>
						<i className="uil uil-check"></i>
					</span>
				) : buttonType === 'social' && socialIcon ? ( // Отображение социальной иконки
					<i className={`uil uil-${socialIcon}`}></i>
				) : (
					<>
						{iconClass &&
							buttonType === 'icon' &&
							buttonIconPosition === 'left' && (
								<i className={iconClass}></i>
							)}
						{buttonType === 'expand' && (
							<i className="uil uil-arrow-right"></i>
						)}
						<RichText
							tagName="span"
							value={text}
							onChange={onChangeText}
							placeholder={__(
								'Add your button text...',
								'naviddev-gutenberg-blocks'
							)}
						/>
						{iconClass &&
							buttonType === 'icon' &&
							buttonIconPosition === 'right' && (
								<i className={iconClass}></i>
							)}
					</>
				)}
			</div>
		</>
	);
};

export default CustomButton;
