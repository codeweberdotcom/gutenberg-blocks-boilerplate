import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button as WpButton,
	ButtonGroup,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { colors } from './colors';
import { shapes } from './shapes';
import { gradientcolors } from './gradient_colors'; // Импортируем список градиентов
import { fontIcons } from './font_icon'; // Импортируем список иконок

// Добавьте доступные варианты типов кнопок
const buttonTypes = [
	{ label: __('Solid', 'naviddev-gutenberg-blocks'), value: 'solid' },
	{ label: __('Circle', 'naviddev-gutenberg-blocks'), value: 'circle' },
	{ label: __('Social', 'naviddev-gutenberg-blocks'), value: 'social' },
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
}) => {
	const isOutline = buttonStyle === 'outline';
	const isOutlineGradient = buttonStyle === 'outline-gradient';
	const isSoft = buttonStyle === 'soft';
	const isGradient = buttonStyle === 'gradient';
	const isSolidOrOutlineOrSoft = ['solid', 'outline', 'soft'].includes(
		buttonStyle
	);

	// Функция для формирования классов кнопки
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

		// Добавляем размер кнопки, если не выбран тип expand или play
		if (buttonSize && buttonType !== 'expand' && buttonType !== 'play') {
			classes.push(buttonSize);
		}

		// Добавляем стиль кнопки
		if (buttonStyle) {
			if (buttonStyle === 'outline') {
				classes.push(`btn-outline-${buttonColor}`);
			} else if (buttonStyle === 'gradient') {
				// Если выбран стиль Gradient, добавляем два класса
				classes.push('btn-gradient'); // Добавляем базовый класс
				if (buttonGradient) {
					// Убедитесь, что класс добавляется правильно в формате 'gradient-1'
					classes.push(buttonGradient); // Это будет что-то вроде 'gradient-1'
				}
			} else if (buttonStyle === 'outline-gradient') {
				// Если выбран стиль Outline Gradient, добавляем два класса
				classes.push('btn-outline-gradient'); // Базовый класс для Outline Gradient
				if (buttonGradient) {
					// Убедитесь, что класс добавляется правильно в формате 'gradient-1'
					classes.push(buttonGradient); // Это будет что-то вроде 'gradient-1'
				}
			} else if (buttonStyle === 'soft') {
				classes.push(`btn-soft-${buttonColor}`);
			} else {
				classes.push(`btn-${buttonColor}`);
			}
		}

		// Добавляем форму кнопки
		if (buttonShape) {
			classes.push(buttonShape);
		}

		// Добавляем тип кнопки
		if (buttonType) {
			switch (buttonType) {
				case 'icon':
					classes.push('btn-icon');
					if (iconClass) {
						classes.push(iconClass); // Добавляем класс иконки, если он выбран
					}
					// Устанавливаем класс в зависимости от положения иконки
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
				case 'circle':
					classes.push('btn-circle');
					break;
				default:
					classes.push(`btn-${buttonType}`);
			}
		}

		return classes.join(' ');
	};

	const isExpandOrPlay = buttonType === 'expand' || buttonType === 'play';
	const isGradientOrOutlineGradient =
		buttonStyle === 'gradient' || buttonStyle === 'outline-gradient';

	const isIcon = buttonType === 'icon';

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Button Settings', 'naviddev-gutenberg-blocks')}
				>
					{/* Переместили SelectControl для Button Type на верх */}
					<SelectControl
						label={__('Button Type', 'naviddev-gutenberg-blocks')}
						value={buttonType}
						options={buttonTypes}
						onChange={onChangeType}
					/>

					{/* Скрываем метку "Size Button" и кнопки размера для 'expand' и 'play' */}
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
						<WpButton
							isPrimary={buttonStyle === 'solid'}
							onClick={() => onChangeStyle('solid')}
						>
							Solid
						</WpButton>
						<WpButton
							isPrimary={buttonStyle === 'outline'}
							onClick={() => onChangeStyle('outline')}
						>
							Outline
						</WpButton>
						<WpButton
							isPrimary={buttonStyle === 'soft'}
							onClick={() => onChangeStyle('soft')}
						>
							Soft
						</WpButton>
						<WpButton
							isPrimary={buttonStyle === 'gradient'}
							onClick={() => onChangeStyle('gradient')}
							disabled={isExpandOrPlay} // Делаем неактивным при выборе Expand или Play
						>
							Gradient
						</WpButton>
						<WpButton
							isPrimary={buttonStyle === 'outline-gradient'}
							onClick={() => onChangeStyle('outline-gradient')}
							disabled={isExpandOrPlay} // Делаем неактивным при выборе Expand или Play
						>
							Outline Gradient
						</WpButton>
					</ButtonGroup>

					{/* Скрываем метку и выбор формы кнопки для 'expand' и 'play' */}
					<SelectControl
						label={__('Button Shape', 'naviddev-gutenberg-blocks')}
						value={buttonShape}
						options={shapes}
						onChange={onChangeShape}
						disabled={isExpandOrPlay}
					/>

					{/* Показываем выпадающий список для цвета кнопки только для стилей Solid, Soft и Outline */}
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

					{/* Показываем выпадающий список для градиента, только если выбран стиль Gradient или Outline Gradient */}
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

					{/* Добавляем иконку и переключатель, объединенные в одну группу, только если выбран тип кнопки "icon" */}
					{isIcon && (
						<div className="icon-group">
							<SelectControl
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
				</PanelBody>
			</InspectorControls>

			{/* Отображение кнопки с изменяемыми параметрами */}
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
				{iconClass && buttonIconPosition === 'left' && (
					<i className={iconClass}></i>
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
				{iconClass && buttonIconPosition === 'right' && (
					<i className={iconClass}></i>
				)}
			</div>
		</>
	);
};

export default CustomButton;
