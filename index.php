<?php
/*
 * Wolf CMS - Content Management Simplified. <http://www.wolfcms.org>
 * Copyright (C) 2008-2010 Martijn van der Kleijn <martijn.niji@gmail.com>
 * 
 * Ace filter for Wolf CMS
 * Code editor and syntax highlighter based on Ajax.org Cloud9 Editor.
 *  
 * @package Plugins
 * @subpackage ace
 *
 * @author Marek Murawski <http://marekmurawski.pl>
 * @copyright Marek Murawski, 2012
 * @license http://www.gnu.org/licenses/gpl.html GPLv3 license
 * @license Ace http://opensource.org/licenses/BSD-3-Clause BSD
 * 
 */

/* Security measure */
if (!defined('IN_CMS')) { exit(); }

if(!defined("ACEDIR"))
{
	define('ACEDIR', PLUGINS_ROOT.'/ace');
}

Plugin::setInfos(array(
		'id'          => 'ace',
		'title'       => 'Ace filter for Wolf CMS',
		'description' => __('Code editor and syntax highlighter based on Ajax.org Cloud9 Editor.'),
		'version'     => '0.0.2',
			'license'     => 'GPL',
			'author'      => 'Marek Murawski',
		'website'     => 'http://marekmurawski.pl/',
		'update_url'  => 'http://marekmurawski.pl/static/wolfplugins/plugin-versions.xml',
		'require_wolf_version' => '0.7.3' // 0.7.5SP-1 fix -> downgrading requirement to 0.7.3
));

if ( AuthUser::hasPermission('admin_view')&&Plugin::isEnabled('ace') ) {
        Filter::add('ace', 'ace/filter_ace.php');
        Plugin::addController('ace', 'ace', 'administrator,developer', false);

        Plugin::addJavascript('ace', 'build/src-min/ace.js');
// seems Ace loads neccesary files automatically
//        Plugin::addJavascript('ace', 'build/src-min/mode-php.js');
//        Plugin::addJavascript('ace', 'build/src-min/mode-css.js');
//        Plugin::addJavascript('ace', 'build/src-min/mode-html.js');
//        Plugin::addJavascript('ace', 'build/src-min/mode-markdown.js');
//        Plugin::addJavascript('ace', 'build/src-min/mode-textile.js');
//        Plugin::addJavascript('ace', 'build/src-min/mode-javascript.js');
        Plugin::addJavascript('ace', 'ace_config.js');
}