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

if ( !defined( 'IN_CMS' ) ) {
    exit();
}

if ( !function_exists( 'boolval' ) ) {

    function boolval( $val ) {
        return (bool) $val;

    }


}


class AceController extends PluginController {

    public function __construct() {
        AuthUser::load();
        if ( !AuthUser::isLoggedIn() ) {
            redirect( get_url( 'login' ) );
        }

        $this->setLayout( 'backend' );
        $this->assignToLayout( 'sidebar', new View( '../../plugins/ace/views/sidebar' ) );

    }


    public function index() {
        $this->settings();

    }


    function settings() {
        $settings = Plugin::getAllSettings( 'ace' );

        if ( !$settings ) {
            Flash::set( 'error', 'Ace - ' . __( 'unable to retrieve plugin settings.' ) );
            redirect( get_url( 'setting' ) );
        }

        $this->display( 'ace/views/settings', array(
                    'settings' => $settings,
                    'themes'   => $this->getThemes(),
                    'modes'    => $this->getModes(),
        ) );

    }


    public function save() {
        $aceAllowedSettings = array(
                    'cookielife'          => 'intval',
                    'editorheight'        => 'intval',
                    'fontsize'            => 'intval',
                    'highlightactiveline' => 'intval',
                    'layoutintegrate'     => 'intval',
                    'mode'                => 'trim,strval',
                    'scrollspeed'         => 'intval',
                    'theme'               => 'trim,strval',
                    'wraplines'           => 'trim,strval',
                    'wraprange'           => 'intval',
        );
        $newSettings      = array( );
        foreach ( $aceAllowedSettings as $key => $filtersString ) {
            if ( isset( $_POST[$key] ) ) {
                $filters = explode( ',', $filtersString );
                $value   = $_POST[$key];
                foreach ( $filters as $filter ) {
                    $value               = $filter( $value );
                }
                $newSettings[$key] = $value;
            }
        }
        if ( Plugin::setAllSettings( $newSettings, 'ace' ) ) {
            Flash::set( 'success', __( 'Ace - settings saved!' ) );
        } else {
            Flash::set( 'error', __( 'Ace - unable to store settings in database!' ) );
        }

        redirect( get_url( 'plugin/ace/settings' ) );

    }


    /**
     * getModes
     *
     */
    protected function getThemes() {
        $scandir = scandir( ACEDIR . '/build/src-min/' );

        foreach ( $scandir as $k => $v ) {
            if ( $v != '.' && $v != '..' && startsWith( $v, 'theme-' ) ) {
                $themes[$v]['id']    = str_replace( '.js', '', str_replace( 'theme-', '', $v ) );
                $themes[$v]['label'] = Inflector::humanize( str_replace( '.js', '', str_replace( 'theme-', '', $v ) ) );
            }
        }
        return $themes;

    }


    /**
     * getModes
     *
     */
    protected function getModes() {
        $scandir = scandir( ACEDIR . '/build/src-min/' );

        foreach ( $scandir as $k => $v ) {
            if ( $v != '.' && $v != '..' && startsWith( $v, 'mode-' ) ) {
                $modes[$v]['id']    = str_replace( '.js', '', str_replace( 'mode-', '', $v ) );
                $modes[$v]['label'] = Inflector::humanize( str_replace( '.js', '', str_replace( 'mode-', '', $v ) ) );
            }
        }
        return $modes;

    }


}