// Импорт необходимых модулей
import { __ } from '@wordpress/i18n';
import { colors } from '../../utilities/colors';
import { gradientcolors } from '../../utilities/gradient_colors';
import { shapes } from '../../utilities/shapes';
import { fontIcons } from '../../utilities/font_icon';
import { fontIconsSocial } from '../../utilities/font_icon_social';
import { useState, useEffect } from '@wordpress/element';
import {
	PanelBody,
	Button,
	ComboboxControl,
	SelectControl,
} from '@wordpress/components';



export const ButtonSidebar = ({ attributes, setAttributes }) => {
	const {
		ButtonSize,
		ButtonColor,
		ButtonGradientColor,
		ButtonStyle,
		ButtonType,
		ButtonShape,
		ButtonIconPosition,
		IconClass,
		SocialIconClass,
		SocialIconStyle,
	} = attributes;

	// Условие для ограничения отображения кнопок Outline, Gradient и Outline Gradient
	const isRestrictedType = ['expand', 'social', 'play'].includes(ButtonType);

	const handleButtonTypeChange = (type) => {
		const {
			ButtonSize,
			ButtonColor,
			ButtonGradientColor,
			ButtonStyle,
			ButtonType,
			ButtonShape,
			ButtonIconPosition,
			IconClass,
			SocialIconClass,
			SocialIconStyle,
			LeftIcon,
			RightIcon,
			CircleIcon,
		} = attributes;

		let leftIcon = '';
		let rightIcon = '';
		let circleIcon = '';

		if (type === 'expand') {
			leftIcon = 'uil uil-arrow-right';

		} else if (type === 'play') {
			leftIcon = 'icn-caret-right';

		} else if (type === 'circle') {
			circleIcon = IconClass || 'uil uil-arrow-right';
		} else if (type === 'icon') {
			if (attributes.ButtonIconPosition === 'left') {
				leftIcon = IconClass || 'uil uil-arrow-right';
			} else if (attributes.ButtonIconPosition === 'right') {
				rightIcon = IconClass || 'uil uil-arrow-right';
			}
		}

		setAttributes({
			ButtonType: type,
			LeftIcon: leftIcon,
			RightIcon: '',
			CircleIcon: circleIcon,
		});
	};

	// Выбор размера кнокпи
	const handleButtonSizeChange = (newSize) => {
		setAttributes({
			ButtonSize: newSize, // Обновляем размер кнопки
		});
	};

	// Выбор формы кнокпи
	const handleButtonShapeChange = (newShape) => {
		setAttributes({
			ButtonShape: newShape, // Обновляем форму кнопки
		});
	};

	const handleButtonStyleChange = (newStyle) => {
		setAttributes({
			ButtonStyle: newStyle, // Обновляем стиль кнопки
		});
	};

	const handleButtonColorChange = (newColor) => {
		setAttributes({
			ButtonColor: newColor, // Обновляем цвет кнопки
		});
	};

const handleIconChange = (type, value) => {
	const {
		ButtonType,
		ButtonIconPosition,
		IconClass,
		SocialIconClass,
		SocialIconStyle,
		LeftIcon,
		RightIcon,
		CircleIcon,
	} = attributes;

	let leftIcon = '';
	let rightIcon = '';
	let circleIcon = '';

	switch (type) {
		case 'position': {
			// Обработка изменения позиции иконки
			if (ButtonType === 'icon') {
				if (ButtonIconPosition === 'left') {
					rightIcon = IconClass;
					leftIcon = '';
				} else if (ButtonIconPosition === 'right') {
					leftIcon = IconClass;
					rightIcon = '';
				}
			}
			setAttributes({
				ButtonIconPosition: value,
				LeftIcon: leftIcon,
				RightIcon: rightIcon,
				CircleIcon: circleIcon,
			});
			break;
		}

		case 'icon': {
			// Обработка изменения иконки
			if (ButtonType === 'circle') {
				circleIcon = value;
			} else if (ButtonType === 'icon') {
				if (ButtonIconPosition === 'left') {
					leftIcon = value;
					rightIcon = '';
				} else if (ButtonIconPosition === 'right') {
					rightIcon = value;
					leftIcon = '';
				}
			}
			setAttributes({
				IconClass: value,
				LeftIcon: leftIcon,
				RightIcon: rightIcon,
				CircleIcon: circleIcon,
			});
			break;
		}

		case 'socialIconStyle': {
			// Обработка изменения стиля социальной иконки
			setAttributes({
				SocialIconStyle: value,
			});
			break;
		}

		case 'socialIconClass': {

	      let socialIconClass = '';
			
			if (ButtonType === 'social') {
				if (ButtonIconPosition === 'left') {
					socialIconClass = value;
				} else if (ButtonIconPosition === 'right') {
					socialIconClass = value;
				}
			}

			setAttributes({
				SocialIconClass: socialIconClass,
			});
			break;
		}

		default:
			break;
	}
};


	return (
		<PanelBody
			title={__('Button Settings', 'naviddev-gutenberg-blocks')}
			className="custom-panel-body"
		>
			{/* Тип кнопки */}
			<div className="component-sidebar-title">
				<label>{__('Button Type', 'naviddev-gutenberg-blocks')}</label>
			</div>
			<div className="button-type-controls button-group-sidebar_33">
				{[
					{ label: 'Solid', value: 'solid' },
					{ label: 'Circle', value: 'circle' },
					{ label: 'Social', value: 'social' },
					{ label: 'Icon', value: 'icon' },
					{ label: 'Expand', value: 'expand' },
					{ label: 'Play', value: 'play' },
				].map((type) => (
					<Button
						key={type.value}
						isPrimary={ButtonType === type.value}
						onClick={() => handleButtonTypeChange(type.value)}
					>
						{type.label}
					</Button>
				))}
			</div>

			{(ButtonType === 'solid' ||
				ButtonType === 'circle' ||
				ButtonType === 'social' ||
				ButtonType === 'icon') && (
				<>
					{/* Размер кнопки */}
					<div className="component-sidebar-title">
						<label>
							{__('Button Size', 'naviddev-gutenberg-blocks')}
						</label>
					</div>
					<div className="button-size-controls button-group-sidebar_33">
						{[
							{ label: 'Small', value: 'btn-sm' },
							{ label: 'Medium', value: '' },
							{ label: 'Large', value: 'btn-lg' },
						].map((size) => (
							<Button
								key={size.value}
								isPrimary={ButtonSize === size.value}
								onClick={() =>
									handleButtonSizeChange(size.value)
								} // Используем функцию для изменения размера кнопки
							>
								{size.label}
							</Button>
						))}
					</div>
				</>
			)}

			{/* Форма кнопки */}
			{(ButtonType === 'icon' || ButtonType === 'solid') && (
				<div className="button-shape-controls">
					<div className="component-sidebar-title">
						<label>
							{__('Button Shape', 'naviddev-gutenberg-blocks')}
						</label>
					</div>
					<div className="button-shape-buttons button-group-sidebar_33">
						{shapes.map((shape) => (
							<Button
								key={shape.value}
								isPrimary={ButtonShape === shape.value}
								onClick={() =>
									handleButtonShapeChange(shape.value)
								} // Используем функцию для изменения формы кнопки
							>
								{shape.label}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* Стиль кнопки */}
			{(ButtonType === 'icon' ||
				ButtonType === 'solid' ||
				ButtonType === 'circle' ||
				ButtonType === 'expand' ||
				ButtonType === 'play') && (
				<div className="button-style-controls">
					<div className="component-sidebar-title">
						<label>
							{__('Button Style', 'naviddev-gutenberg-blocks')}
						</label>
					</div>
					<div className="button-style-buttons button-group-sidebar_50">
						{[
							{ label: 'Solid', value: 'solid' },
							{ label: 'Soft', value: 'soft' },
							// Отображаем кнопки Outline, Gradient и Outline Gradient только если не выбран ограниченный тип
							...(!isRestrictedType
								? [
										{ label: 'Outline', value: 'outline' },
										{
											label: 'Gradient',
											value: 'gradient',
										},
										{
											label: 'Outline Gradient',
											value: 'outline-gradient',
										},
								  ]
								: []),
						].map((style) => (
							<Button
								key={style.value}
								isPrimary={ButtonStyle === style.value}
								onClick={() =>
									handleButtonStyleChange(style.value)
								} // Используем функцию для изменения стиля кнопки
							>
								{style.label}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* Цвет кнопки */}
			{(ButtonType === 'icon' ||
				ButtonType === 'solid' ||
				ButtonType === 'circle' ||
				ButtonType === 'expand' ||
				ButtonType === 'play') &&
				(ButtonStyle === 'solid' ||
					ButtonStyle === 'outline' ||
					ButtonStyle === 'soft') && (
					<ComboboxControl
						label={__('Button Color', 'naviddev-gutenberg-blocks')}
						value={ButtonColor}
						options={colors}
						onChange={handleButtonColorChange} // Используем функцию для изменения цвета кнопки
					/>
				)}

			{/* Градиентный цвет */}
			{(ButtonType === 'icon' ||
				ButtonType === 'solid' ||
				ButtonType === 'circle' ||
				ButtonType === 'expand' ||
				ButtonType === 'play') &&
				(ButtonStyle === 'outline-gradient' ||
					ButtonStyle === 'gradient') && (
					<ComboboxControl
						label={__(
							'Gradient Color',
							'naviddev-gutenberg-blocks'
						)}
						value={ButtonGradientColor}
						options={gradientcolors}
						onChange={(newGradient) =>
							setAttributes({
								ButtonGradientColor: newGradient,
							})
						}
					/>
				)}

			{/* Позиция иконки */}
			{ButtonType === 'icon' && (
				<>
					<div className="icon-position-controls button-group-sidebar_50">
						<div className="component-sidebar-title">
							<label>
								{__(
									'Icon Position',
									'naviddev-gutenberg-blocks'
								)}
							</label>
						</div>
						<Button
							isPrimary={ButtonIconPosition === 'left'}
							onClick={() => handleIconChange('position', 'left')} // Используем универсальный обработчик
						>
							{__('Left Icon', 'naviddev-gutenberg-blocks')}
						</Button>
						<Button
							isPrimary={ButtonIconPosition === 'right'}
							onClick={() =>
								handleIconChange('position', 'right')
							} // Используем универсальный обработчик
						>
							{__('Right Icon', 'naviddev-gutenberg-blocks')}
						</Button>
					</div>
				</>
			)}

			{/* Иконка круга */}
			{(ButtonType === 'circle' || ButtonType === 'icon') && (
				<SelectControl
					label={__('Icon Class', 'naviddev-gutenberg-blocks')}
					value={IconClass}
					options={fontIcons}
					onChange={(newIcon) => handleIconChange('icon', newIcon)} // Универсальный обработчик
				/>
			)}

			{/* Социальные иконки */}
			{ButtonType === 'social' && (
				<ComboboxControl
					label={__('Social Icon Class', 'naviddev-gutenberg-blocks')}
					value={SocialIconClass}
					options={fontIconsSocial}
					onChange={(newIconClass) =>
						handleIconChange('socialIconClass', newIconClass)
					} // Универсальный обработчик
				/>
			)}

			{/* Социальные иконки - стиль */}
			{ButtonType === 'social' && (
				<>
					<div className="social-icon-style-controls button-group-sidebar">
						<div className="component-sidebar-title">
							<label>
								{__(
									'Social Icon Style',
									'naviddev-gutenberg-blocks'
								)}
							</label>
						</div>
						<div className="social-icon-style-buttons">
							{[
								{ label: 'Style 1', value: 'style_1' },
								{ label: 'Style 2', value: 'style_2' },
								{ label: 'Style 3', value: 'style_3' },
							].map((style) => (
								<Button
									key={style.value}
									isPrimary={SocialIconStyle === style.value}
									onClick={
										() =>
											handleIconChange(
												'socialIconStyle',
												style.value
											) // Универсальный обработчик
									}
								>
									{style.label}
								</Button>
							))}
						</div>
					</div>
				</>
			)}
		</PanelBody>
	);
};
