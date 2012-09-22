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
?>
<h1><?php echo __('Documentation');?></h1>
<p>
    Apart from the normal TinyMCE usage, a few special features have been implemented which are described here in more detail.
    Please read carefully on how to use these features.
</p>
<h3><?php echo __('Internal pages listing');?></h3>
<p>
    This feature allows you to easily link to pages in Wolf CMS from within the TinyMCE editor.
</p>
<ul style="list-style: square inside none; font-size: 0.8em;">
    <li>Edit a page using the TinyMCE editor.</li>
    <li>Select a piece of text.</li>
    <li>Click on the "insert/edit link" button in the TinyMCE toolbar which looks like a chain link.</li>
</ul>
