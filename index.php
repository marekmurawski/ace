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
if ( !defined('IN_CMS') ) {
    exit();
}

if ( !defined("ACEDIR") ) {
    define('ACEDIR', PLUGINS_ROOT . '/ace');
}

Plugin::setInfos(array(
            'id'                   => 'ace',
            'title'                => 'Ace filter for Wolf CMS',
            'description'          => __('Code editor and syntax highlighter based on Ajax.org Cloud9 Editor.'),
            'version'              => '0.1.1',
            'license'              => 'GPL',
            'author'               => 'Marek Murawski',
            'website'              => 'http://marekmurawski.pl/',
            'update_url'           => 'http://marekmurawski.pl/static/wolfplugins/plugin-versions.xml',
            'require_wolf_version' => '0.7.3' // 0.7.5SP-1 fix -> downgrading requirement to 0.7.3
));

if ( Plugin::isEnabled('ace') ) {
    Filter::add('ace', 'ace/filter_ace.php');
    Plugin::addController('ace', 'ace', 'admin_view', true);
    Observer::observe('view_backend_list_plugin', 'ace_make_settings_div');

    $uri = $_SERVER['QUERY_STRING'];
    if ( preg_match('/(\/plugin\/ace|page\/edit|snippet\/edit|layout\/edit|page\/add|snippet\/add|layout\/add)/', $uri, $match) )
        ace_include_javascripts();
}

function ace_make_settings_div($plugin_name) {
    if ( $plugin_name === 'ace' ) {
        echo '<div id="ace-live-settings" style="display: none;" ';
        foreach ( Plugin::getAllSettings('ace') as $key => $value ) {
            echo ' data-' . $key . '="' . $value . '"';
        }
        echo ' data-modelabel="' . __('Syntax') . '"';
        echo ' data-wraplabel="' . __('Wrapping') . '"';
        echo ' data-wrapnonelabel="' . __('don`t wrap') . '"';
        echo ' data-wrapsoftlabel="' . __('to editor') . '"';
        echo ' data-wraphardlabel="' . __('to margin') . '"';
        echo ' data-fontsizelabel="' . __('Font size') . '"';
        echo ' data-iconsuri="' . PLUGINS_URI . 'ace/icons/' . '"';
        echo ' data-controller-url="' . URI_PUBLIC . ADMIN_DIR . '/plugin/ace"';
        echo '></div>';
    }

}


function ace_include_javascripts() {
    Plugin::addJavascript('ace', 'ace_editor.js');
    Plugin::addJavascript('ace', 'build/src-min/ace.js');

}