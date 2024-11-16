// Импорт необходимых модулей
import { __ } from '@wordpress/i18n';
import { colors } from '../../utilities/colors';
import { gradientcolors } from '../../utilities/gradient_colors';
import { shapes } from '../../utilities/shapes';
import { fontIcons } from '../../utilities/font_icon';
import { fontIconsSocial } from '../../utilities/font_icon_social';
import { PanelBody, Button, ComboboxControl } from '@wordpress/components';

// Функция для динамического формирования класса кнопки
export const getClassNames = (attributes) => {
	const {
		ButtonSize,
		ButtonColor,
		ButtonGradientColor,
		ButtonStyle,
		ButtonType,
		ButtonShape,
		ButtonIconPosition,
		IconClass,
		SocialIconStyle,
		SocialIconClass,
		LeftIcon,
		RightIcon,
	} = attributes;

	// Создаем массив классов
	const classes = [];

	// Добавляем класс btn
	if (
		ButtonType === 'solid' ||
		ButtonType === 'circle' ||
		ButtonType === 'expand' ||
		ButtonType === 'play' ||
		ButtonType === 'circle' ||
		(ButtonType === 'social' && SocialIconStyle === 'style_1') ||
		ButtonType === 'icon'
	)
		classes.push(`btn`);

	// Добавляем классы размера
	if (
		(ButtonType === 'solid' ||
			ButtonType === 'circle' ||
			(ButtonType === 'social' && SocialIconStyle === 'style_1') ||
			ButtonType === 'icon') &&
		ButtonSize
	)
		classes.push(`${ButtonSize}`);

	// Добавляем класс btn-circle
	if (
		ButtonType === 'circle' ||
		(ButtonType === 'social' && SocialIconStyle === 'style_1') ||
		ButtonType === 'play'
	)
		classes.push(`btn-circle`);

	// Добавляем классы btn-play
	if (ButtonType === 'play') classes.push(`btn-play ripple`);

	// Добавляем классы btn-expand
	if (ButtonType === 'expand') classes.push(`btn-expand rounded-pill`);

	// Добавляем классы btn-icon btn-icon-start
	if (ButtonType === 'icon' && ButtonIconPosition === 'left')
		classes.push(`btn-icon btn-icon-start`);

	// Добавляем классы btn-icon btn-icon-end
	if (ButtonType === 'icon' && ButtonIconPosition === 'right')
		classes.push(`btn-icon btn-icon-end`);

	// Добавляем классы btn-color
	if (
		(ButtonType === 'solid' ||
			ButtonType === 'circle' ||
			ButtonType === 'icon' ||
			ButtonType === 'expand' ||
			ButtonType === 'play') &&
		ButtonStyle === 'solid' &&
		ButtonColor
	)
		classes.push(`btn-${ButtonColor}`);

	// Добавляем классы btn-outline-color
	if (
		(ButtonType === 'solid' ||
			ButtonType === 'circle' ||
			ButtonType === 'icon' ||
			ButtonType === 'expand' ||
			ButtonType === 'play') &&
		ButtonStyle === 'outline' &&
		ButtonColor
	)
		classes.push(`btn-outline-${ButtonColor}`);

	// Добавляем классы btn-soft-color
	if (
		(ButtonType === 'solid' ||
			ButtonType === 'circle' ||
			ButtonType === 'icon' ||
			ButtonType === 'expand' ||
			ButtonType === 'play') &&
		ButtonStyle === 'soft' &&
		ButtonColor
	)
		classes.push(`btn-soft-${ButtonColor}`);

	// Добавляем классы btn-gradient-color
	if (
		(ButtonType === 'solid' ||
			ButtonType === 'circle' ||
			ButtonType === 'icon' ||
			ButtonType === 'expand' ||
			ButtonType === 'play') &&
		ButtonStyle === 'gradient' &&
		ButtonGradientColor
	)
		classes.push(`btn-${ButtonGradientColor}`);

	// Добавляем классы btn-social
	if (ButtonType === 'social' && SocialIconStyle === 'style_1')
		classes.push(`btn-${SocialIconClass}`);

	// Добавляем классы btn-outline-gradient
	if (
		(ButtonType === 'solid' ||
			ButtonType === 'circle' ||
			ButtonType === 'icon' ||
			ButtonType === 'ezpand' ||
			ButtonType === 'play') &&
		ButtonStyle === 'outline-gradient' &&
		ButtonGradientColor
	)
		classes.push(`btn-outline-${ButtonGradientColor}`);

	// Добавляем классы btn-shape
	if ((ButtonType === 'solid' || ButtonType === 'icon') && ButtonShape)
		classes.push(`${ButtonShape}`);

	// Объединяем массив классов в строку
	return classes.join(' ');
};

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
						onClick={() =>
							setAttributes({ ButtonType: type.value })
						}
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
									setAttributes({
										ButtonSize: size.value,
									})
								}
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
									setAttributes({
										ButtonShape: shape.value,
									})
								}
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
										{
											label: 'Outline',
											value: 'outline',
										},
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
									setAttributes({
										ButtonStyle: style.value,
									})
								}
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
						onChange={(newColor) =>
							setAttributes({ ButtonColor: newColor })
						}
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
							onClick={() =>
								setAttributes({
									ButtonIconPosition: 'left',
								})
							}
						>
							{__('Left Icon', 'naviddev-gutenberg-blocks')}
						</Button>
						<Button
							isPrimary={ButtonIconPosition === 'right'}
							onClick={() =>
								setAttributes({
									ButtonIconPosition: 'right',
								})
							}
						>
							{__('Right Icon', 'naviddev-gutenberg-blocks')}
						</Button>
					</div>
				</>
			)}

			{/* Иконка круга */}
			{(ButtonType === 'circle' || ButtonType === 'icon') && (
				<ComboboxControl
					label={__('Icon Class', 'naviddev-gutenberg-blocks')}
					value={IconClass}
					options={fontIcons}
					onChange={(newIcon) =>
						setAttributes({ IconClass: newIcon })
					}
				/>
			)}

			{ButtonType === 'social' && (
				<ComboboxControl
					label={__('Social Icon Class', 'naviddev-gutenberg-blocks')}
					value={SocialIconClass}
					options={fontIconsSocial}
					onChange={(newSocialIcon) =>
						setAttributes({ SocialIconClass: newSocialIcon })
					}
				/>
			)}

			{/* Социальные иконки */}
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
									onClick={() =>
										setAttributes({
											SocialIconStyle: style.value,
										})
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

export default ButtonSidebar;
