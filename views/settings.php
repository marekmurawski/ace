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
if ( !defined( 'IN_CMS' ) ) {
    exit();
}
?>
<?php Observer::notify( 'mm_core_stylesheet' ); ?>
<h1><?php echo __( 'Ace settings' ); ?></h1>
<div id="mm_plugin">
    <form action="<?php echo get_url( 'plugin/ace/save' ); ?>" method="post">
        <fieldset>
            <legend style="margin-left: 1em;"><strong><?php echo __( 'Look and feel' ); ?></strong></legend>
            <table class="fieldset" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td class="label wide"><label><?php echo __( 'Theme' ); ?> </label></td>
                    <td class="field">
                        <select name="theme" id="theme">
                            <?php foreach ( $themes as $id => $value ): ?>
                                <option value="<?php echo $value['id'] ?>"<?php echo (isset( $settings['theme'] ) && ($settings['theme'] == $value['id'])) ? 'selected="selected"' : ''; ?>><?php echo $value['label'] ?></option>
<?php endforeach; ?>
                        </select>

                    </td>
                    <td class="help"></td>
                </tr>
                <tr>
                    <td class="label wide"><label><?php echo __( 'Mode' ); ?> </label></td>
                    <td class="field">
                        <select name="mode" id="mode">
                            <?php foreach ( $modes as $id => $value ): ?>
                                <option value="<?php echo $value['id'] ?>"<?php echo (isset( $settings['mode'] ) && ($settings['mode'] == $value['id'])) ? 'selected="selected"' : ''; ?>><?php echo $value['label'] ?></option>
<?php endforeach; ?>
                        </select>

                    </td>
                    <td class="help"><?php echo __( 'Select default syntax highlighting mode' ); ?></td>
                </tr>
                <tr>
                    <td class="label wide"><label><?php echo __( 'Font size' ); ?> </label></td>
                    <td class="field">
                        <input type="number" id="fontsize" name="fontsize" min="7" max="18" step="1" value="<?php echo isset( $settings['fontsize'] ) ? $settings['fontsize'] : 11; ?>"> <?php echo __( 'px' ); ?>
                    </td>
                    <td class="help"><?php echo __( 'Editor font size in pixels.' ); ?></td>
                </tr>
                <tr>
                    <td class="label wide"><label><?php echo __( 'Mouse scroll speed' ); ?> </label></td>
                    <td class="field">
                        <input type="number" id="scrollspeed" name="scrollspeed" min="1" max="10" step="1" value="<?php echo isset( $settings['scrollspeed'] ) ? $settings['scrollspeed'] : 3; ?>"> <?php echo __( 'lines' ); ?>
                    </td>
                    <td class="help"><?php echo __( 'How fast should your mousewheel scroll the editor' ); ?></td>
                </tr>
                <tr>
                    <td class="label wide"><label><?php echo __( 'Editor height' ); ?> </label></td>
                    <td class="field">
                        <input type="number" id="editorheight" name="editorheight" min="100" max="1000" step="10" value="<?php echo isset( $settings['editorheight'] ) ? $settings['editorheight'] : 300; ?>"> <?php echo __( 'px' ); ?>
                    </td>
                    <td class="help"><?php echo __( 'Default editor box height in pixels' ); ?></td>
                </tr>
                <tr>
                    <td class="label wide"><label><?php echo __( 'Highlight active line' ); ?> </label></td>
                    <td class="field">
                        <select name="highlightactiveline" id="highlightactiveline">
                            <option value="1" <?php echo (isset( $settings['highlightactiveline'] ) && ($settings['highlightactiveline'] == '1')) ? 'selected="selected"' : ''; ?>><?php echo __( 'Yes' ); ?></option>
                            <option value="0" <?php echo (isset( $settings['highlightactiveline'] ) && ($settings['highlightactiveline'] == '0')) ? 'selected="selected"' : ''; ?>><?php echo __( 'No' ); ?></option>
                        </select>
                    </td>
                    <td class="help"></td>
                </tr>
                <tr>
                    <td class="label wide"><label><?php echo __( 'Wrap lines' ); ?> </label></td>
                    <td class="field">
                        <select name="wraplines" id="wraplines">
                            <option value="n" <?php echo (isset( $settings['wraplines'] ) && ($settings['wraplines'] == 'n')) ? 'selected="selected"' : ''; ?>><?php echo __( 'don`t wrap' ); ?></option>
                            <option value="s" <?php echo (isset( $settings['wraplines'] ) && ($settings['wraplines'] == 's')) ? 'selected="selected"' : ''; ?>><?php echo __( 'to editor' ); ?></option>
                            <option value="h" <?php echo (isset( $settings['wraplines'] ) && ($settings['wraplines'] == 'h')) ? 'selected="selected"' : ''; ?>><?php echo __( 'to margin' ); ?></option>
                        </select> <?php echo __( 'margin' ); ?>
                        <input type="number" id="wraprange" name="wraprange" min="20" max="200" step="4" value="<?php echo isset( $settings['wraprange'] ) ? $settings['wraprange'] : 80; ?>"> <?php echo __( 'columns' ); ?>
                    </td>
                    <td class="help wide"><?php echo __( 'Wrap long lines' ); ?></td>
                </tr>
                <tr>
                    <td class="field" colspan="3">
                        <div id="acecontainer" style="position: relative; display:block; height: 100px; width: 100%; border: 1px solid #888;">
                            <div id="previewAce" style="width:100%; height: 100px">
                            </div></div>
                        <textarea id="previewTextarea" style="display: none">
<?php echo file_get_contents( realpath( PLUGINS_ROOT ) . '/ace/AceController.php' ); ?>
                        </textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
        <fieldset>
            <legend style="margin-left: 1em;"><strong><?php echo __( 'Cookies' ); ?></strong></legend>
            <table class="fieldset" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td class="label wide"><label><?php echo __( 'How long to store scroll and mode settings?' ); ?> </label></td>
                    <td class="field">
                        <select name="cookielife" id="cookielife">
                            <option value="-1" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '-1')) ? 'selected="selected"' : ''; ?>><?php echo __( 'Session-long' ); ?></option>
                            <option value="1" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '1')) ? 'selected="selected"' : ''; ?>><?php echo __( '1 Day' ); ?></option>
                            <option value="2" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '2')) ? 'selected="selected"' : ''; ?>><?php echo __( '2 Days' ); ?></option>
                            <option value="7" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '7')) ? 'selected="selected"' : ''; ?>><?php echo __( '1 Week' ); ?></option>
                            <option value="14" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '14')) ? 'selected="selected"' : ''; ?>><?php echo __( '2 Weeks' ); ?></option>
                            <option value="28" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '28')) ? 'selected="selected"' : ''; ?>><?php echo __( '1 Month' ); ?></option>
                            <option value="365" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '365')) ? 'selected="selected"' : ''; ?>><?php echo __( '1 Year' ); ?></option>
                            <option value="3650" <?php echo (isset( $settings['cookielife'] ) && ($settings['cookielife'] == '3650')) ? 'selected="selected"' : ''; ?>><?php echo __( '10 Years' ); ?></option>
                        </select>
                    </td>
                    <td class="help"><?php echo __( 'Individual settings for page parts, layouts and snippets - scroll position and syntax mode will be stored in cookie of your browser. Choose the default lifetime of such cookie.' ); ?></td>
                </tr>
            </table>
        </fieldset>
        <fieldset>
            <legend style="margin-left: 1em;"><strong><?php echo __( 'Integration' ); ?></strong></legend>
            <table class="fieldset" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td class="label wide"><label><?php echo __( 'Integrate Ace with Layout editing?' ); ?> </label></td>
                    <td class="field">
                        <select name="layoutintegrate" id="layoutintegrate">
                            <option value="1" <?php echo (isset( $settings['layoutintegrate'] ) && ($settings['layoutintegrate'] == '1')) ? 'selected="selected"' : ''; ?>><?php echo __( 'Yes' ); ?></option>
                            <option value="0" <?php echo (isset( $settings['layoutintegrate'] ) && ($settings['layoutintegrate'] == '0')) ? 'selected="selected"' : ''; ?>><?php echo __( 'No' ); ?></option>
                        </select>
                    </td>
                    <td class="help"><?php echo __( 'Note that Ace won`t take precedence of other plugins being integrated with Layout (eg. Codemirror).' ); ?></td>
                </tr>
            </table>
        </fieldset>
        <p class="buttons">
            <input class="button" name="commit" type="submit" accesskey="s" value="<?php echo __( 'Save' ); ?>" />
        </p>
    </form>
</div>
<script>
    var textarea = $('#previewTextarea');
    var editor = ace.edit('previewAce');

    function updatePreview() {
        $('#acecontainer').css('height', $('#editorheight').val() + 'px');
        $('#previewAce').css('height', $('#editorheight').val() + 'px');
        editor.setTheme('ace/theme/' + $('#theme').val());
        editor.setBehavioursEnabled(true);
        editor.setScrollSpeed($('#scrollspeed').val());
        editor.setFontSize($('#fontsize').val() + 'px');

        editor.setPrintMarginColumn($('#wraprange').val());
        doHighlight = ($('#highlightactiveline').val() === '1') ? true : false;
        editor.setHighlightActiveLine(doHighlight);
        editor.setHighlightSelectedWord(true);

        // wrapping setup
        if ($('#wraplines').val() === 'n') {
            editor.getSession().setUseWrapMode(false);
        } else if ($('#wraplines').val() === 'h') {
            editor.getSession().setWrapLimitRange($('#wraprange').val(), $('#wraprange').val());
            editor.getSession().setUseWrapMode(true);
        } else if ($('#wraplines').val() === 's') {
            editor.getSession().setWrapLimitRange(null);
            editor.getSession().setUseWrapMode(true);
        }
        //    editor.getSession().setWrapLimitRange($('#wraprange').val(),$('#wraprange').val());
        //    doWrap = ($('#wraplines').val()==='1') ? true : false;
        //    editor.getSession().setUseWrapMode(doWrap);



        editor.getSession().setMode('ace/mode/' + $('#mode').val());
    }

    $(document).ready(function() {
        updatePreview();
        editor.getSession().setValue(textarea.val());
        editor.focus();
    });
    $('input, select').live('change', function() {
        updatePreview();
    });
</script>
