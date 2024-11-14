import { SelectControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

export const LinkTypeSelector = ({ attributes, setAttributes }) => {
	const { LinkType, LinkUrl, PostId, PageId, CF7ID, DataValue } = attributes;

	// Состояния для хранения списка постов, страниц и форм CF7
	const [posts, setPosts] = useState([]);
	const [pages, setPages] = useState([]);
	const [cf7Forms, setCf7Forms] = useState([]);
	const [isLoadingCF7, setIsLoadingCF7] = useState(true);

	// Получаем базовый URL сайта с использованием глобальной переменной WordPress
	const sitelinkurl = wpApiSettings.root.replace('/wp-json/', '');

	// Загрузка постов и страниц с использованием WordPress REST API
	useEffect(() => {
		// Получаем список постов
		const fetchPosts = async () => {
			const response = await fetch(`${wpApiSettings.root}wp/v2/posts`);
			const data = await response.json();
			setPosts(data);
		};

		// Получаем список страниц
		const fetchPages = async () => {
			const response = await fetch(`${wpApiSettings.root}wp/v2/pages`);
			const data = await response.json();
			setPages(data);
		};

		// Получаем список форм CF7
		const fetchCF7Forms = async () => {
			const response = await fetch(
				`${sitelinkurl}/wp-json/wp/v2/options`
			);
			const data = await response.json();
			const forms = data.cf7_forms || {}; // Получаем список форм из ответа
			const formOptions = Object.entries(forms).map(([id, title]) => ({
				label: `${id}: ${title}`, // Выводим ID и название формы
				value: id, // Сохраняем ID формы
			}));
			setCf7Forms(formOptions);

			// Если найдена только одна форма, устанавливаем её ID
			if (formOptions.length === 1) {
				setAttributes({ CF7ID: formOptions[0].value });
			}

			setIsLoadingCF7(false);
		};

		// Загружаем данные в зависимости от выбранного типа
		if (LinkType === 'post') {
			fetchPosts();
		} else if (LinkType === 'page') {
			fetchPages();
		} else if (LinkType === 'cf7') {
			fetchCF7Forms();
		}
	}, [LinkType, sitelinkurl]); // Перезапрашиваем данные при изменении LinkType или sitelinkurl

	// Обработчик изменения типа ссылки
	const handleLinkTypeChange = (newLinkType) => {
		setAttributes({ LinkType: newLinkType });

		// Очищаем данные при изменении типа
		if (newLinkType === 'external') {
			setAttributes({
				LinkUrl: '',
				PostId: '',
				PageId: '',
				CF7ID: '',
				DataValue: '',
			});
		} else if (newLinkType === 'post') {
			setAttributes({ PostId: '', LinkUrl: '', DataValue: '' }); // Убираем DataValue
		} else if (newLinkType === 'page') {
			setAttributes({ PageId: '', LinkUrl: '', DataValue: '' }); // Убираем DataValue
		} else if (newLinkType === 'cf7') {
			// Для CF7 устанавливаем значение DataValue в нужном формате
			setAttributes({
				CF7ID: 'javascript:void(0)',
				LinkUrl: 'javascript:void(0)',
				DataValue: `cf7-${CF7ID}`,
			});
		}
	};

	// Обработчик изменения URL
	const handleLinkUrlChange = (newLinkUrl) => {
		setAttributes({ LinkUrl: newLinkUrl });
	};

	// Обработчик выбора поста
	const handlePostSelect = (selectedPostId) => {
		setAttributes({ PostId: selectedPostId });
		// Находим ссылку на пост по ID
		const selectedPost = posts.find(
			(post) => post.id === parseInt(selectedPostId)
		);
		if (selectedPost) {
			setAttributes({ LinkUrl: selectedPost.link });
		}
	};

	// Обработчик выбора страницы
	const handlePageSelect = (selectedPageId) => {
		setAttributes({ PageId: selectedPageId });
		// Находим ссылку на страницу по ID
		const selectedPage = pages.find(
			(page) => page.id === parseInt(selectedPageId)
		);
		if (selectedPage) {
			setAttributes({ LinkUrl: selectedPage.link });
		}
	};

	// Обработчик выбора CF7 формы
	const handleCF7Select = (selectedCF7Id) => {
		setAttributes({ CF7ID: selectedCF7Id });
		// Устанавливаем формат DataValue для выбранной формы
		setAttributes({ DataValue: `cf7-${selectedCF7Id}` });
	};

	// Для синхронизации выбранного значения с атрибутами, при изменении LinkType
	const getSelectedPostId = () => {
		return PostId ? PostId : '';
	};

	const getSelectedPageId = () => {
		return PageId ? PageId : '';
	};

	const getSelectedCF7Id = () => {
		return CF7ID ? CF7ID : '';
	};

	return (
		<>
			{/* Добавляем настройки в правый сайдбар */}
			<InspectorControls>
				<SelectControl
					label="Тип ссылки"
					value={LinkType}
					options={[
						{ label: 'External', value: 'external' },
						{ label: 'Page', value: 'page' },
						{ label: 'Post', value: 'post' },
						{ label: 'CF7', value: 'cf7' },
					]}
					onChange={handleLinkTypeChange}
				/>

				{/* Если выбран тип "external", показываем поле для ввода URL */}
				{LinkType === 'external' && (
					<TextControl
						label="Введите URL"
						value={LinkUrl}
						onChange={handleLinkUrlChange}
						placeholder="https://example.com"
					/>
				)}

				{/* Если выбран тип "post", показываем выпадающий список с постами */}
				{LinkType === 'post' && posts.length > 0 && (
					<SelectControl
						label="Выберите пост"
						value={getSelectedPostId()} // Передаем ID выбранного поста
						options={posts.map((post) => ({
							label: `${post.id}: ${post.title.rendered}`, // Выводим ID и название поста
							value: post.id, // Сохраняем ID поста
						}))}
						onChange={handlePostSelect} // Обработчик для выбора поста
					/>
				)}

				{/* Если выбран тип "page", показываем выпадающий список с страницами */}
				{LinkType === 'page' && pages.length > 0 && (
					<SelectControl
						label="Выберите страницу"
						value={getSelectedPageId()} // Передаем ID выбранной страницы
						options={pages.map((page) => ({
							label: page.title.rendered, // Отображаем название страницы
							value: page.id, // Сохраняем ID страницы
						}))}
						onChange={handlePageSelect} // Обработчик для выбора страницы
					/>
				)}

				{/* Если выбран тип "cf7", показываем выпадающий список с формами */}
				{LinkType === 'cf7' && cf7Forms.length > 0 && (
					<SelectControl
						label="Выберите форму CF7"
						value={getSelectedCF7Id()} // Передаем ID выбранной формы
						options={
							isLoadingCF7
								? [{ label: 'Загрузка...', value: '' }]
								: cf7Forms
						}
						onChange={handleCF7Select} // Обработчик для выбора формы CF7
					/>
				)}
			</InspectorControls>
		</>
	);
};
