import { __ } from '@wordpress/i18n';
import { useState, useEffect, useCallback } from 'react';
const { useSelect, useDispatch } = wp.data;
const { ComboboxControl, TextControl, Button, SelectControl } = wp.components;

export const LinkTypeControl = ({ value, onChange }) => {
	const { updateBlockAttributes } = useDispatch('core/block-editor');

	const [selectedLinkType, setSelectedLinkType] = useState(
		value.LinkType || 'external'
	);
	const [linkUrl, setLinkUrl] = useState(value.LinkUrl || '');
	const [dataValue, setDatavalue] = useState(value.dataValue || '');
	const [externalUrl, setExternalUrl] = useState(value.externalUrl || '');
	const [phoneType, setPhoneType] = useState(value.PhoneType || 'custom');
	const [phoneNumber, setPhoneNumber] = useState(value.PhoneNumber || '');
	const [cf7Forms, setCf7Forms] = useState([]);
	const [phoneConditions, setPhoneConditions] = useState([]);
	const [modals, setModals] = useState([]);
	const [loading, setLoading] = useState({
		cf7: false,
		phones: false,
		modals: false,
	});
	const [showPhoneConditions, setShowPhoneConditions] = useState(false);

	const posts = useSelect(
		(select) =>
			select('core').getEntityRecords('postType', 'post', {
				per_page: -1,
			}) || [],
		[]
	);
	const pages = useSelect(
		(select) =>
			select('core').getEntityRecords('postType', 'page', {
				per_page: -1,
			}) || [],
		[]
	);

	const loadOptions = useCallback(async (type) => {
		setLoading((prev) => ({ ...prev, [type]: true }));
		try {
			const response = await fetch(
				'https://hoger.test/wp-json/wp/v2/options'
			);
			const data = await response.json();

			switch (type) {
				case 'cf7':
					setCf7Forms(
						Object.entries(data.cf7_forms || {}).map(
							([id, title]) => ({ label: title, value: id })
						)
					);
					break;
				case 'phones':
					setPhoneConditions(
						[
							'phone_number',
							'phone_number_2',
							'phone_number_3',
						].map((key) => ({
							label: data.phones[key],
							value: data.phones[key],
						}))
					);
					break;
				case 'modals':
					setModals(
						Object.entries(data.modals || {}).map(
							([id, title]) => ({ label: title, value: id })
						)
					);
					break;
			}
		} catch (error) {
			console.error(`Ошибка при загрузке данных ${type}:`, error);
		} finally {
			setLoading((prev) => ({ ...prev, [type]: false }));
		}
	}, []);

	useEffect(() => {
		if (selectedLinkType === 'cf7') loadOptions('cf7');
		else if (selectedLinkType === 'phone' && phoneType === 'contacts')
			loadOptions('phones');
		else if (selectedLinkType === 'modal') loadOptions('modals');
	}, [selectedLinkType, phoneType, loadOptions]);

	useEffect(() => {
		if (selectedLinkType === 'external')
			setExternalUrl(value.externalUrl || '');
	}, [selectedLinkType, value.externalUrl]);

	const updateFinalLink = (linkType, fieldValue) => {
		let link = '',
			dataVal = '';
		if (linkType === 'cf7') dataVal = `datacf7="${fieldValue}"`;
		else if (linkType === 'modal') dataVal = `datamodal="${fieldValue}"`;
		else link = fieldValue || '';

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
		setShowPhoneConditions(type === 'contacts');
	};

	const handlePhoneNumberChange = (newNumber) => {
		const phoneLink = `tel:${newNumber}`;
		setPhoneNumber(newNumber);
		updateBlockAttributes({ PhoneNumber: newNumber });
		updateFinalLink('phone', phoneLink);
	};

	const linkTypeOptions = [
		{ label: 'Select a Link Type', value: '' },
		{ label: 'External', value: 'external' },
		{ label: 'Page', value: 'page' },
		{ label: 'Post', value: 'post' },
		{ label: 'CF7 Form', value: 'cf7' },
		{ label: 'Phone', value: 'phone' },
		{ label: 'Modal', value: 'modal' },
	];

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
					onChange={(newValue) => updateFinalLink('page', newValue)}
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
					onChange={(newValue) => updateFinalLink('post', newValue)}
					placeholder="Select a post"
				/>
			)}

			{selectedLinkType === 'external' && (
				<TextControl
					label="External URL"
					value={externalUrl}
					onChange={(newValue) =>
						updateFinalLink('external', newValue)
					}
					placeholder="Enter external URL"
				/>
			)}

			{selectedLinkType === 'cf7' && (
				<ComboboxControl
					label="CF7 Form"
					value={value.cf7Form}
					options={cf7Forms}
					onChange={(newValue) => updateFinalLink('cf7', newValue)}
					disabled={loading.cf7 || cf7Forms.length === 0}
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
						{['custom', 'contacts'].map((type) => (
							<Button
								key={type}
								isPrimary={phoneType === type}
								onClick={() => handlePhoneTypeChange(type)}
							>
								{type === 'custom' ? 'Custom' : 'Contacts'}
							</Button>
						))}
					</div>
					{phoneType === 'custom' && (
						<TextControl
							label="Phone Number"
							value={phoneNumber}
							onChange={handlePhoneNumberChange}
						/>
					)}
					{showPhoneConditions && (
						<SelectControl
							label="Phone Conditions"
							value={phoneNumber}
							options={phoneConditions}
							onChange={handlePhoneNumberChange}
							disabled={
								loading.phones || phoneConditions.length === 0
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
					onChange={(newValue) => updateFinalLink('modal', newValue)}
					disabled={loading.modals || modals.length === 0}
					placeholder="Select a modal"
				/>
			)}
		</div>
	);
};
