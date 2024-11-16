import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
const { useSelect, useDispatch } = wp.data;
const { ComboboxControl, TextControl, Button, SelectControl } = wp.components;

export const LinkTypeControl = ({ value, onChange }) => {
	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const [selectedLinkType, setSelectedLinkType] = useState(
		value.LinkType || 'external'
	);
	const [linkUrl, setLinkUrl] = useState(value.LinkUrl || '');
	const [dataValue, setDatavalue] = useState(value.dataValue || '');
	const [externalUrl, setExternalUrl] = useState(value.externalUrl || ''); // Новый параметр для External URL
	const [cf7Forms, setCf7Forms] = useState([]);
	const [loadingCf7Forms, setLoadingCf7Forms] = useState(false);
	const [phoneType, setPhoneType] = useState(value.PhoneType || 'custom');
	const [phoneNumber, setPhoneNumber] = useState(value.PhoneNumber || '');
	const [showPhoneConditions, setShowPhoneConditions] = useState(false);
	const [phoneConditions, setPhoneConditions] = useState([]);
	const [loadingPhones, setLoadingPhones] = useState(false);
	const [modals, setModals] = useState([]);
	const [loadingModals, setLoadingModals] = useState(false);

	const posts = useSelect((select) => {
		return (
			select('core').getEntityRecords('postType', 'post', {
				per_page: -1,
			}) || []
		);
	}, []);

	const pages = useSelect((select) => {
		return (
			select('core').getEntityRecords('postType', 'page', {
				per_page: -1,
			}) || []
		);
	}, []);

	useEffect(() => {
		if (selectedLinkType === 'cf7') {
			setLoadingCf7Forms(true);
			const fetchCf7Forms = async () => {
				try {
					const response = await fetch(
						'https://hoger.test/wp-json/wp/v2/options'
					);
					const data = await response.json();

					if (data && data.cf7_forms) {
						const formOptions = Object.entries(data.cf7_forms).map(
							([id, title]) => ({
								label: title,
								value: id,
							})
						);
						setCf7Forms(formOptions);
					} else {
						console.error(
							'Некорректный ответ API для форм CF7:',
							data
						);
					}
				} catch (error) {
					console.error('Ошибка при загрузке форм CF7:', error);
				} finally {
					setLoadingCf7Forms(false);
				}
			};
			fetchCf7Forms();
		}

		if (selectedLinkType === 'phone' && phoneType === 'contacts') {
			setLoadingPhones(true);
			const fetchPhoneData = async () => {
				try {
					const response = await fetch(
						'https://hoger.test/wp-json/wp/v2/options'
					);
					const data = await response.json();

					const phoneOptions = [
						{
							label: data.phones.phone_number,
							value: data.phones.phone_number,
						},
						{
							label: data.phones.phone_number_2,
							value: data.phones.phone_number_2,
						},
						{
							label: data.phones.phone_number_3,
							value: data.phones.phone_number_3,
						},
					];

					setPhoneConditions(phoneOptions);
				} catch (error) {
					console.error('Ошибка при загрузке телефонов:', error);
				} finally {
					setLoadingPhones(false);
				}
			};
			fetchPhoneData();
		}

		if (selectedLinkType === 'modal') {
			setLoadingModals(true);
			const fetchModals = async () => {
				try {
					const response = await fetch(
						'https://hoger.test/wp-json/wp/v2/options'
					);
					const data = await response.json();

					if (data && data.modals) {
						const modalOptions = Object.entries(data.modals).map(
							([id, title]) => ({
								label: title,
								value: id,
							})
						);
						setModals(modalOptions);
					} else {
						console.error(
							'Некорректный ответ API для модальных окон:',
							data
						);
					}
				} catch (error) {
					console.error('Ошибка при загрузке модальных окон:', error);
				} finally {
					setLoadingModals(false);
				}
			};
			fetchModals();
		}
	}, [selectedLinkType, phoneType]);

	useEffect(() => {
		if (selectedLinkType === 'external') {
			setExternalUrl(value.externalUrl || '');
		}
	}, [selectedLinkType, value.externalUrl]);

	const linkTypeOptions = [
		{ label: 'Select a Link Type', value: '' },
		{ label: 'External', value: 'external' },
		{ label: 'Page', value: 'page' },
		{ label: 'Post', value: 'post' },
		{ label: 'CF7 Form', value: 'cf7' },
		{ label: 'Phone', value: 'phone' },
		{ label: 'Modal', value: 'modal' },
	];

	const updateFinalLink = (linkType, fieldValue) => {
		let link = '';
		let dataVal = '';
		switch (linkType) {
			case 'page':
			case 'post':
			case 'external':
				link = fieldValue || '';
				break;
			case 'cf7':
				dataVal = `datacf7="${fieldValue}"`;
				break;
			case 'phone':
				link = fieldValue || '';
				break;
			case 'modal':
				dataVal = `datamodal="${fieldValue}"`;
				break;
			default:
				link = linkUrl;
		}

		updateBlockAttributes({ LinkUrl: link, dataValue: dataVal });
		setLinkUrl(link);
		setDatavalue(dataVal);
		onChange(link, dataVal);
	};

	const handleLinkTypeChange = (newValue) => {
		setSelectedLinkType(newValue);
		updateBlockAttributes({ LinkType: newValue });
		updateFinalLink(newValue, '');
	};

	const handlePhoneTypeChange = (type) => {
		setPhoneType(type);
		updateBlockAttributes({ PhoneType: type });
		if (type === 'contacts') {
			setShowPhoneConditions(true);
		} else {
			setShowPhoneConditions(false);
		}
	};

	const handlePhoneNumberChange = (newNumber) => {
		const phoneLink = `tel:${newNumber}`;
		setPhoneNumber(newNumber);
		updateBlockAttributes({ PhoneNumber: newNumber });
		updateFinalLink('phone', phoneLink);
	};

	const handlePhoneConditionChange = (newCondition) => {
		const telLink = `tel:${newCondition}`;
		handleChange('phoneCondition', telLink);
	};

	const handleChange = (field, newValue) => {
		updateBlockAttributes({ [field]: newValue });
		updateFinalLink(selectedLinkType, newValue);
	};

	return (
		<div>
			<SelectControl
				label="Link Type"
				value={selectedLinkType}
				options={linkTypeOptions}
				onChange={handleLinkTypeChange}
			/>

			{selectedLinkType === 'page' && (
				<ComboboxControl
					label="Page"
					value={value.page}
					options={pages.map((page) => ({
						label: page.title.rendered,
						value: page.link,
					}))}
					onChange={(newValue) => handleChange('page', newValue)}
					placeholder="Select a page"
				/>
			)}

			{selectedLinkType === 'post' && (
				<ComboboxControl
					label="Post"
					value={value.post}
					options={posts.map((post) => ({
						label: post.title.rendered,
						value: post.link,
					}))}
					onChange={(newValue) => handleChange('post', newValue)}
					placeholder="Select a post"
				/>
			)}

			{selectedLinkType === 'external' && (
				<TextControl
					label="External URL"
					value={externalUrl}
					onChange={(newValue) => {
						setExternalUrl(newValue);
						handleChange('externalUrl', newValue);
					}}
					placeholder="Enter external URL"
				/>
			)}

			{selectedLinkType === 'cf7' && (
				<ComboboxControl
					label="CF7 Form"
					value={value.cf7Form}
					options={cf7Forms}
					onChange={(newValue) => handleChange('cf7Form', newValue)}
					disabled={loadingCf7Forms || cf7Forms.length === 0}
					placeholder="Select a CF7 form"
				/>
			)}

			{selectedLinkType === 'phone' && (
				<>
					<div className="component-sidebar-title">
						<label>
							{__('Phone Type', 'naviddev-gutenberg-blocks')}
						</label>
					</div>
					<div className="phone-type-controls button-group-sidebar_50">
						{[
							{ label: 'Custom', value: 'custom' },
							{ label: 'Contacts', value: 'contacts' },
						].map((type) => (
							<Button
								key={type.value}
								isPrimary={phoneType === type.value}
								isSecondary={phoneType !== type.value}
								onClick={() =>
									handlePhoneTypeChange(type.value)
								}
							>
								{type.label}
							</Button>
						))}
					</div>
					{phoneType === 'custom' && (
						<TextControl
							label="Phone Number"
							value={phoneNumber}
							onChange={(newValue) =>
								handlePhoneNumberChange(newValue)
							}
						/>
					)}
					{showPhoneConditions && (
						<SelectControl
							label="Phone Conditions"
							value={phoneNumber}
							options={phoneConditions}
							onChange={(newCondition) =>
								handlePhoneConditionChange(newCondition)
							}
							disabled={
								loadingPhones || phoneConditions.length === 0
							}
						/>
					)}
				</>
			)}

			{selectedLinkType === 'modal' && (
				<ComboboxControl
					label="Modals"
					value={value.modal}
					options={modals}
					onChange={(newValue) => handleChange('modal', newValue)}
					disabled={loadingModals || modals.length === 0}
					placeholder="Select a modal"
				/>
			)}
		</div>
	);
};
