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

return array(
            '1 Day'                                                                                                                                                                            => '1 Tag',
            '1 Month'                                                                                                                                                                          => '1 Monat',
            '1 Week'                                                                                                                                                                           => '1 Woche',
            '1 Year'                                                                                                                                                                           => '1 Jahr',
            '10 Years'                                                                                                                                                                         => '10 Jahre',
            '2 Days'                                                                                                                                                                           => '2 Tage',
            '2 Weeks'                                                                                                                                                                          => '2 Wochen',
            'Ace - plugin settings initialized.'                                                                                                                                               => 'Ace - Plugin-Einstellungen initialisiert.',
            'Ace - settings saved!'                                                                                                                                                            => 'Ace - Einstellungen gespeichert!',
            'Ace - unable to store plugin settings!'                                                                                                                                           => 'Ace - Speichern der Plguin-Einstellungen war nicht möglich!',
            'Ace - unable to store settings in database!'                                                                                                                                      => 'Ace - Speichern in Datenbank war nicht möglich!',
            'Ace settings'                                                                                                                                                                     => 'Ace-Einstellungen',
            'Code editor and syntax highlighter based on Ajax.org Cloud9 Editor.'                                                                                                              => 'Code-Editor und Syntax-Hervorheber basierend auf Ajax.org Cloud9 Editor.',
            'Cookies'                                                                                                                                                                          => 'Cookies',
            'Default editor box height in pixels'                                                                                                                                              => 'Standard-Höhe der Editor-Box in Pixeln',
            'Documentation'                                                                                                                                                                    => 'Dokumentation',
            'Editor font size in pixels.'                                                                                                                                                      => 'Editor-Schriftgröße in Pixeln.',
            'Editor height'                                                                                                                                                                    => 'Editor-Höhe',
            'Font size'                                                                                                                                                                        => 'Schriftgröße',
            'Highlight active line'                                                                                                                                                            => 'Aktive Zeile hervorheben',
            'How fast should your mousewheel scroll the editor'                                                                                                                                => 'Wie schnell soll das Mausrad den Editor rollen.',
            'How long to store scroll and mode settings?'                                                                                                                                      => 'Wie lange Roll- und Modus-Einstellungen merken?',
            'Individual settings for page parts, layouts and snippets - scroll position and syntax mode will be stored in cookie of your browser. Choose the default lifetime of such cookie.' => 'Individuelle Einstellungen für Seiten-Tabs, Layouts und Snippets - Roll-Position und Syntax-Modus werden in Cookies in Ihrem Browser gespeichert. Wählen Sie die Standard-Lebenszeit solcher Cookies.',
            'Integrate Ace with Layout editing?'                                                                                                                                               => 'Ace in Layout-Editing integrieren?',
            'Integration'                                                                                                                                                                      => 'Integration',
            'Look and feel'                                                                                                                                                                    => 'Aussehen und Bedienung',
            'Mode'                                                                                                                                                                             => 'Modus',
            'Mouse scroll speed'                                                                                                                                                               => 'Maus-Scroll-Geschwindigkeit',
            'No'                                                                                                                                                                               => 'Nein',
            'Note that Ace won`t take precedence of other plugins being integrated with Layout (eg. Codemirror).'                                                                              => 'Beachten Sie, dass Ace keine anderen Plugins überschreibt, die ins Layout integriert wurden (z.B. Codemirror).',
            'Plugin'                                                                                                                                                                           => 'Plugin',
            'Save'                                                                                                                                                                             => 'Speichern',
            'Select default syntax highlighting mode'                                                                                                                                          => 'Wählen Sie den Standard-Syntax-Hervorhebungsmodus',
            'Session-long'                                                                                                                                                                     => 'für eine Session',
            'Settings'                                                                                                                                                                         => 'Einstellungen',
            'Successfully uninstalled plugin.'                                                                                                                                                 => 'Plugin erfolgreich deinstalliert.',
            'Syntax'                                                                                                                                                                           => 'Syntax',
            'Theme'                                                                                                                                                                            => 'Design',
            'Unable to delete plugin settings.'                                                                                                                                                => 'Plugin-Einstellungen konnten nicht gelöscht werden.',
            'Wrap lines'                                                                                                                                                                       => 'Zeilen umbrechen',
            'Wrap long lines'                                                                                                                                                                  => 'Lange Zeilen umbrechen',
            'Wrapping'                                                                                                                                                                         => 'Umbrechung',
            'Yes'                                                                                                                                                                              => 'Ja',
            'columns'                                                                                                                                                                          => 'Spalten',
//            'don`t wrap'                                                                                                                                                                       => '',
            'lines'                                                                                                                                                                            => 'Zeilen',
//            'margin'                                                                                                                                                                           => '',
            'px'                                                                                                                                                                               => 'Pixel',
//            'to editor'                                                                                                                                                                        => '',
//            'to margin'                                                                                                                                                                        => '',
            'unable to retrieve plugin settings.'                                                                                                                                              => 'Plugin-Einstellungen konnten nicht geholt werden.',
);
