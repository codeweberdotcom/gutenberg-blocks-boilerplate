import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { TabPanel, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { HeadingContentControl } from '../../components/heading/HeadingContentControl';
import { HeadingTypographyControl } from '../../components/heading/HeadingTypographyControl';
import { PositioningControl } from '../../components/layout/PositioningControl';
import { SpacingControl } from '../../components/spacing/SpacingControl';
import { BlockMetaFields } from '../../components/block-meta/BlockMetaFields';
import { getTitleClasses, getSubtitleClasses } from './utils';

const HeadingSubtitleEdit = ({ attributes, setAttributes }) => {
    const {
        enableTitle,
        enableSubtitle,
        title,
        subtitle,
        order,
        titleTag,
        subtitleTag,
        titleColor,
        titleColorType,
        subtitleColor,
        subtitleColorType,
        align,
        spacing,
    } = attributes;

    const blockProps = useBlockProps();

    const elements = [];
    if (enableTitle) {
        elements.push(
            <RichText
                key="title"
                tagName={titleTag}
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                className={getTitleClasses(attributes)}
                placeholder={__('Enter title...', 'naviddev-gutenberg-blocks')}
            />
        );
    }
    if (enableSubtitle) {
        elements.push(
            <RichText
                key="subtitle"
                tagName={subtitleTag}
                value={subtitle}
                onChange={(value) => setAttributes({ subtitle: value })}
                className={getSubtitleClasses(attributes)}
                placeholder={__('Enter subtitle...', 'naviddev-gutenberg-blocks')}
            />
        );
    }

    if (order === 'subtitle-first') {
        elements.reverse();
    }

    const tabs = [
        { name: 'content', title: 'Cnt' },
        { name: 'typography', title: 'Typ' },
        { name: 'align', title: 'Aln' },
        { name: 'spacing', title: 'Spc' },
        { name: 'settings', title: 'Set' },
    ];

    return (
        <>
            <InspectorControls>
                <TabPanel
                    tabs={tabs}
                >
                    {(tab) => (
                        <>
                            {tab.name === 'content' && (
                                <div style={{ padding: '16px' }}>
                                    <HeadingContentControl
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                    />
                                </div>
                            )}
                            {tab.name === 'typography' && (
                                <div style={{ padding: '16px' }}>
                                    <HeadingTypographyControl
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                    />
                                </div>
                            )}
                            {tab.name === 'align' && (
                                <div style={{ padding: '16px' }}>
                                    <PositioningControl
                                        title={__('Title Align', 'naviddev-gutenberg-blocks')}
                                        alignItems=""
                                        onAlignItemsChange={() => {}}
                                        justifyContent=""
                                        onJustifyContentChange={() => {}}
                                        textAlign={align}
                                        onTextAlignChange={(value) => setAttributes({ align: value })}
                                        position=""
                                        onPositionChange={() => {}}
                                        noPanel={true}
                                    />
                                </div>
                            )}
                            {tab.name === 'spacing' && (
                                <div style={{ padding: '16px' }}>
                                    <SpacingControl
                                        spacingType="padding"
                                        spacingXs=""
                                        spacingSm=""
                                        spacingMd=""
                                        spacingLg=""
                                        spacingXl=""
                                        spacingXxl=""
                                        onChange={(key, value) => setAttributes({ [key]: value })}
                                    />
                                </div>
                            )}
                            {tab.name === 'settings' && (
                                <PanelBody
                                    title={__('Title Block Settings', 'naviddev-gutenberg-blocks')}
                                    className="custom-panel-body"
                                    initialOpen={true}
                                >
                                    <BlockMetaFields
                                        attributes={attributes}
                                        setAttributes={setAttributes}
                                        fieldKeys={{
                                            classKey: 'className',
                                            dataKey: 'data',
                                            idKey: 'id',
                                        }}
                                        labels={{
                                            classLabel: __('CSS Class', 'naviddev-gutenberg-blocks'),
                                            dataLabel: __('Data Attributes', 'naviddev-gutenberg-blocks'),
                                            idLabel: __('ID', 'naviddev-gutenberg-blocks'),
                                        }}
                                    />
                                </PanelBody>
                            )}
                        </>
                    )}
                </TabPanel>
            </InspectorControls>
            <div {...blockProps}>
                {elements.length > 0 ? elements : <div>{__('Title Block', 'naviddev-gutenberg-blocks')}</div>}
            </div>
        </>
    );
};

export default HeadingSubtitleEdit;