/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module ckfinder/ckfinder
 */

import { Plugin, type PluginDependencies } from 'ckeditor5/src/core';

import CKFinderUI from './ckfinderui';
import CKFinderEditing from './ckfinderediting';

/**
 * The CKFinder feature, a bridge between the CKEditor 5 WYSIWYG editor and the
 * [CKFinder](https://ckeditor.com/ckfinder) file manager and uploader.
 *
 * This is a "glue" plugin which enables:
 *
 * * {@link module:ckfinder/ckfinderediting~CKFinderEditing},
 * * {@link module:ckfinder/ckfinderui~CKFinderUI},
 * * {@link module:adapter-ckfinder/uploadadapter~CKFinderUploadAdapter}.
 *
 * See the {@glink features/images/image-upload/ckfinder "CKFinder integration" guide} to learn how to configure
 * and use this feature.
 *
 * Check out the {@glink features/images/image-upload/image-upload comprehensive "Image upload" guide} to learn about
 * other ways to upload images into CKEditor 5.
 */
export default class CKFinder extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName(): 'CKFinder' {
		return 'CKFinder';
	}

	/**
	 * @inheritDoc
	 */
	public static get requires(): PluginDependencies {
		return [ 'Link', 'CKFinderUploadAdapter', CKFinderEditing, CKFinderUI ];
	}
}

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ CKFinder.pluginName ]: CKFinder;
	}

	interface EditorConfig {

		/**
		 * The configuration of the {@link module:ckfinder/ckfinder~CKFinder CKFinder feature}.
		 *
		 * Read more in {@link module:ckfinder/ckfinder~CKFinderConfig}.
		 */
		ckfinder?: CKFinderConfig;
	}
}

/**
 * The configuration of the {@link module:ckfinder/ckfinder~CKFinder CKFinder feature}
 * and its {@link module:adapter-ckfinder/uploadadapter~CKFinderUploadAdapter upload adapter}.
 *
 * ```
 * ClassicEditor
 * 	.create( editorElement, {
 * 		ckfinder: {
 * 			options: {
 * 				resourceType: 'Images'
 * 			}
 * 		}
 * 	} )
 * 	.then( ... )
 * 	.catch( ... );
 * ```
 *
 * See {@link module:core/editor/editorconfig~EditorConfig all editor options}.
 */
interface CKFinderConfig {

	/**
	 * The configuration options passed to the CKFinder file manager instance.
	 *
	 * Check the file manager [documentation](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/api/CKFinder.Config-cfg-language)
	 * for the complete list of options.
	 */
	options: CKFinderOptions;

	/**
	 * The type of the CKFinder opener method.
	 *
	 * Supported types are:
	 *
	 * * `'modal'` &ndash; Opens CKFinder in a modal,
	 * * `'popup'` &ndash; Opens CKFinder in a new "pop-up" window.
	 *
	 * Defaults to `'modal'`.
	 */
	openerMethod: string;

	/**
	 * The path (URL) to the connector which handles the file upload in CKFinder file manager.
	 * When specified, it enables the automatic upload of resources such as images inserted into the content.
	 *
	 * For instance, to use CKFinder's
	 * [quick upload](https://ckeditor.com/docs/ckfinder/ckfinder3-php/commands.html#command_quick_upload)
	 * command, your can use the following (or similar) path:
	 *
	 * ```ts
	 * ClassicEditor
	 * 	.create( editorElement, {
	 * 		ckfinder: {
	 * 			uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
	 * 		}
	 * 	} )
	 * 	.then( ... )
	 * 	.catch( ... );
	 * ```
	 *
	 * Used by the {@link module:adapter-ckfinder/uploadadapter~CKFinderUploadAdapter upload adapter}.
	 */
	uploadUrl: string;
}

interface CKFinderOptions extends Record<string, unknown> {
	chooseFiles?: boolean;
	onInit?: ( finder: any ) => void;
	language?: string;
}
