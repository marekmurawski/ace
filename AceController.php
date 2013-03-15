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

if (!defined('IN_CMS')) { exit(); }

class AceController extends PluginController {

    public function __construct() {
        AuthUser::load();
        if ( ! AuthUser::isLoggedIn()) {
            redirect(get_url('login'));
        }

        $this->setLayout('backend');
        $this->assignToLayout('sidebar', new View('../../plugins/ace/views/sidebar'));
    }

    public function index() {
        $this->settings();
    }

    function settings() {
        $settings = Plugin::getAllSettings('ace');

        if (!$settings) {
            Flash::set('error', 'Ace - '.__('unable to retrieve plugin settings.'));
            redirect(get_url('setting'));

        }

        $this->display('ace/views/settings', array(
                                'settings'  => $settings,
                                'themes'    => $this->getThemes(),
                                'modes'    => $this->getModes(),
                                ));
    }

    public function save() {
      $configFile = PLUGINS_ROOT.DS.'ace'.DS.'ace_config.js';
      echo PLUGINS_ROOT.DS.'ace'.DS.'ace_config.js'.'<br/>';
      $conf = '
        /*
         *  THIS FILE IS AUTOMATICALLY GENERATED IN SETTINGS PANEL OF ACE PLUGIN
         *  IT SHOULD BE WRITABLE FOR PHP - chmod 0777
         *  DO NOT MODIFY THESE SETTINGS MANUALLY
         */

        var aceMode = "'. strip_tags($_POST['aceMode']) .'";
        var aceStrMode = "'. __('Mode') .'";
        var aceStrConfig = "'. __('Config') .'";
        var aceTheme = "'. strip_tags($_POST['aceTheme']) .'";
        var aceFontSize = '. intval($_POST['aceFontSize']) .';
        var aceScrollSpeed = '. intval($_POST['aceScrollSpeed']) .';
        var aceEditorHeight = '. intval($_POST['aceEditorHeight']) .';
        var aceWrapLines = '. strip_tags($_POST['aceWrapLines']) .';
        var aceWrapRange = '. strip_tags($_POST['aceWrapRange']) .';
        var aceLayoutIntegrate = '. strip_tags($_POST['aceLayoutIntegrate']) .';
        var aceCookieLife = '. intval($_POST['aceCookieLife']) .';
        var aceHighlightActiveLine = '. strip_tags($_POST['aceHighlightActiveLine']) .';
        ';

        if (file_exists($configFile)) {
            if (@!chmod($configFile, octdec('0777')))
                Flash::set('error', __('Could not change ace_config.js file permissions to 0777. Do it manually!'));
        }

      if (file_put_contents($configFile, $conf)) {
        if (Plugin::setAllSettings($_POST, 'ace')) {
            Flash::set('success', __('Ace - settings saved!'));
          } else {
            Flash::set('error', __('Ace - unable to store settings in database!'));
          }
      } else {
        Flash::set('error', __('Ace - unable to save ace_config.js file. Check permissions!'));
      }
        redirect(get_url('plugin/ace/settings'));
	}

    /**
     * getModes
     *
    */
    protected function getThemes()
    {
    	$scandir = scandir(ACEDIR.'/build/src-min/');

    	foreach($scandir as $k => $v)
    	{
    		if($v != '.' && $v != '..' && startsWith($v, 'theme-'))
    		{
                $themes[$v]['id'] = str_replace('.js','',str_replace('theme-','',$v));
                $themes[$v]['label'] = Inflector::humanize(str_replace('.js','',str_replace('theme-','',$v)));
    		}
    	}
    	return $themes;
    }
    /**
     * getModes
     *
    */
    protected function getModes()
    {
    	$scandir = scandir(ACEDIR.'/build/src-min/');

    	foreach($scandir as $k => $v)
    	{
    		if($v != '.' && $v != '..' && startsWith($v, 'mode-'))
    		{
                $modes[$v]['id'] = str_replace('.js','',str_replace('mode-','',$v));
                $modes[$v]['label'] = Inflector::humanize(str_replace('.js','',str_replace('mode-','',$v)));
    		}
    	}
    	return $modes;
    }
}