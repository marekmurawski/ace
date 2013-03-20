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
?>
<p class="button"><a href="<?php echo get_url('plugin/ace/settings'); ?>"><img src="<?php echo URL_PUBLIC; ?>wolf/icons/settings-32.png" align="middle" /><?php echo __('Settings'); ?></a></p>
<div class="box">
    <h2><?php echo Plugin::$plugins_infos['ace']->title; ?></h2>
    <p>
<?php echo __('Plugin') . ': <b>' . Plugin::$plugins_infos['ace']->version ?></b><br/>
        Ace: <b>0.2.0</b> <em>(build 2013.03.14)</em>
    </p>
</div>
