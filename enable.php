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

$settings = array(
            'mode'                => 'php',
            'theme'               => 'monokai',
            'fontsize'            => 12,
            'scrollspeed'         => 6,
            'editorheight'        => 400,
            'wraplines'           => 'h',
            'wraprange'           => 80,
            'layoutintegrate'     => 1,
            'highlightactiveline' => 1,
            'cookielife'          => '365', // in days, -1 defaults to Session cookie
);

// Store settings.
if ( Plugin::setAllSettings($settings, 'ace') ) {
    Flash::set('success', __('Ace - plugin settings initialized.'));
}
else
    Flash::set('error', __('Ace - unable to store plugin settings!'));
?>
