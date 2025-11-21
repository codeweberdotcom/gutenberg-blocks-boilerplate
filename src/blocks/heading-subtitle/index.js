import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import blockJson from './block.json';

registerBlockType(blockJson.name, {
    ...blockJson,
    title: __('Title', 'naviddev-gutenberg-blocks'),
    description: __('A flexible title block with advanced typography controls.', 'naviddev-gutenberg-blocks'),
    edit,
    save,
});