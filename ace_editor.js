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

var ace_debug_mode = true;

/**
 * Creates select element to change Ace mode
 * 
 * @param id  editor's id, used to make unique html id's and cookie names
 * @param modeSibling  jquery element after which the mode element should be inserted
 */
function insertModeChange(id, modeSibling) {
    if ($('#aceoptions' + id).length == 0) {
        $liveSettings = $('#ace-live-settings');
        modeSibling.after(
                '<span id="aceoptions' + id + '" class="ace_options">' +
                '<label for="acemode_select_' + id + '" ' +
                'id="acemode_label_' + id + '">' + $liveSettings.attr('data-modelabel') + '</label>' +
                '<select id="acemode_select_' + id + '">' +
                '  <option value="text">Plain text</option>' +
                '  <option value="css">CSS</option>' +
                '  <option value="html">HTML</option>' +
                '  <option value="javascript">Javascript</option>' +
                '  <option value="json">JSON</option>' +
                '  <option value="markdown">Markdown</option>' +
                '  <option value="php">PHP</option>' +
                '  <option value="textile">Textile</option>' +
                '  <option value="xml">XML</option>' +
                '</select> ' +
                '<label for="ace_wrap_tb' + id + '">' + $liveSettings.attr('data-wraplabel') + '</label>' +
                '<select class="ace_wrap_tb" id="ace_wrap_tb' + id + '" >' +
                '  <option value="n">' + $liveSettings.attr('data-wrapnonelabel') + '</option>' +
                '  <option value="h">' + $liveSettings.attr('data-wraphardlabel') + '</option>' +
                '  <option value="s">' + $liveSettings.attr('data-wrapsoftlabel') + '</option>' +
                '</select> ' +
                '<label for="ace_font_size_tb' + id + '">' + $('#ace-live-settings').attr('data-fontsizelabel') + '</label>' +
                '<select class="ace_font_size_tb" id="ace_font_size_tb' + id + '" >' +
                '  <option value="7">7px</option>' +
                '  <option value="8">8px</option>' +
                '  <option value="9">9px</option>' +
                '  <option value="10">10px</option>' +
                '  <option value="11">11px</option>' +
                '  <option value="12">12px</option>' +
                '  <option value="14">14px</option>' +
                '  <option value="16">16px</option>' +
                '</select> ' +
                '<a href="' + $liveSettings.attr('data-controller-url') + '" target="_blank" title=""><img src="' + $liveSettings.attr('data-iconsuri') + '/settings.png"/></a>' +
                '<span style="display: none" class="ace_resize_tb" id="ace_resize_tb' + id + '">resize</span> ' +
                '</span>');
    }
}

/**
 * Creates an Ace editor
 * 
 * @param id  editor's id, used to make unique html id's and cookie names
 * @param modeSibling  jquery element after which the mode element should be inserted
 * @param textareaElement  the textarea as jquery element 
 * @param options  an array of options for Editor setup
 * @returns the editor
 */
function setupEditor(id, modeSibling, textareaElement, options) {
    /*
     * Traces if something changed in Ace Editor
     */
    var somethingChanged = false;
    options = options || {};

    /**
     * Retrieving Live settings from Wolf
     * it's done through hidden #ace-live-settings DOM element
     */
    $liveSettings = $('#ace-live-settings');
    var defaultConfig = {
        'mode': $liveSettings.attr('data-mode'),
        'theme': $liveSettings.attr('data-theme'),
        'fontsize': $liveSettings.attr('data-fontsize'),
        'scrollspeed': $liveSettings.attr('data-scrollspeed'),
        'editorheight': $liveSettings.attr('data-editorheight'),
        'wraplines': $liveSettings.attr('data-wraplines'),
        'wraprange': $liveSettings.attr('data-wraprange'),
        'layoutintegrate': $liveSettings.attr('data-layoutintegrate'),
        'highlightactiveline': $liveSettings.attr('data-highlightactiveline'),
        'cookielife': $liveSettings.attr('data-cookielife')
    };

    /**
     * pre-configure cookie storage
     */
    if ((options.hasOwnProperty('cookielife')) && (options.cookielife !== '-1')) {
        $.aceCookie.defaults = {
            expires: parseInt(options.cookielife)
        };
    } else {
        $.aceCookie.defaults = {};
    }
    $.aceCookie.raw = true;

    /**
     * Store compacted Ace cookie
     *
     * @param  id     id of cookie
     * @returns null
     */
    var makeAceCookie = function(id) {
        cMode = ed.getSession().getMode().$id;
        mode = (typeof cMode !== 'undefined') ? cMode.replace('ace/mode/', '') : 'text';
        cStr = '';
        cStr += mode + '|';
        cStr += ed.getSession().selection.getCursor().row + '|';
        cStr += ed.getSession().selection.getCursor().column + '|';
        cStr += ed.getSession().getScrollTop();
        $.aceCookie('ace' + id, cStr);

        if ((typeof console === 'object') && ace_debug_mode)
            console.log('ACE cookie stored -> ace' + id + '=' + cStr);
    };

    /**
     * Read compacted Ace cookie as object
     *
     * @param  id     id of cookie
     * @returns object or null if cookie not found
     */
    var readAceCookie = function(id) {
        cStr = $.aceCookie('ace' + id);
        if (cStr !== null) {
            arr = cStr.split('|');
            if ((typeof console === 'object') && ace_debug_mode)
                console.log('ACE cookie read -> ace' + id + ' mode[' + arr[0] + '] row[' + arr[1] + '] column[' + arr[2] + '] scroll[' + arr[3] + ']');
            return ret = {
                mode: arr[0],
                row: parseInt(arr[1]),
                column: parseInt(arr[2]),
                scroll: parseInt(arr[3])
            };
        } else
            return null;
    };

    /**
     * getting cookie-stored config
     */
    var idCookie = readAceCookie(id);

    cmode = (idCookie !== null) ? idCookie.mode : $liveSettings.attr('data-mode');
    var cookieConfig = {
        'mode': cmode
    };

    // extending config with cookie-stored config and function passed options
    var config = $.extend(defaultConfig, cookieConfig, options);

    //insert Ace toolbar
    insertModeChange(id, modeSibling);

    //append div for Ace after textareaElement
    $(textareaElement).after('<div id="aceeditor' + id + '" style="height: ' + config.editorheight + 'px"></div>');

    var ed = ace.edit('aceeditor' + id);


    // display styles setup
    ed.setTheme('ace/theme/' + config.theme);
    ed.setBehavioursEnabled(true);
    ed.setScrollSpeed(config.scrollspeed);
    ed.setFontSize(config.fontsize + 'px');
    $('#ace_font_size_tb' + id).val(config.fontsize);
    ed.setPrintMarginColumn(config.wraprange);
    ed.setHighlightActiveLine(config.highlightactiveline);
    ed.setHighlightSelectedWord(true);

    // hide textarea and copy it's contents
    var textarea = $(textareaElement);
    textarea.hide();
    ed.getSession().setValue(textarea.val());

    // wrapping setup
    if (config.wraplines === 'n') {
        $('#ace_wrap_tb' + id).val('n');
        ed.getSession().setUseWrapMode(false);
    } else if (config.wraplines === 'h') {
        ed.getSession().setWrapLimitRange(config.wraprange, config.wraprange);
        ed.getSession().setUseWrapMode(true);
    } else if (config.wraplines === 's') {
        ed.getSession().setWrapLimitRange(null);
        ed.getSession().setUseWrapMode(true);
    }

    // setup mode
    $('#acemode_select_' + id).val(config.mode);
    ed.getSession().setMode('ace/mode/' + config.mode);

    // setup selection and scroll position
    if (idCookie !== null)
        ed.gotoLine(idCookie.row + 1, idCookie.column);
    if (idCookie !== null)
        ed.getSession().setScrollTop(idCookie.scroll);

    /**
     * ACE editor event handlers
     */
    ed.getSession().on('change', function() {
        textarea.val(ed.getSession().getValue());
        somethingChanged = true;
        if (typeof setConfirmUnload === 'function')
            setConfirmUnload(true);

    });

    ed.on('blur', function() {
        if (somethingChanged)
            textarea.trigger('change');
    });

    ed.getSession().on('changeScrollTop', function() {
        makeAceCookie(id);
    });

    ed.getSession().on('changeMode', function() {
        makeAceCookie(id);
    });

    ed.getSession().selection.on('changeCursor', function() {
        makeAceCookie(id);
    });

    /**
     * Toolbar buttons and input handlers
     */
    $(document).delegate('#acemode_select_' + id, 'change', function() {
        ed.getSession().setMode('ace/mode/' + $(this).val());
    });

    $(document).delegate('#ace_resize_tb' + id, 'click', function() {
        ed.resize();
    });

    $(document).delegate('#ace_wrap_tb' + id, 'change', function() {
        if ($(this).val() === 'n') {
            ed.getSession().setUseWrapMode(false);
        } else if ($(this).val() === 's') {
            ed.getSession().setUseWrapMode(true);
            ed.getSession().setWrapLimitRange(null);
        } else if ($(this).val() === 'h') {
            ed.getSession().setUseWrapMode(true);
            ed.getSession().setWrapLimitRange(config.wraprange, config.wraprange);
        }
    });

    $(document).delegate('#ace_font_size_tb' + id, 'change', function() {
        ed.setFontSize($(this).val() + 'px');
    });
//    ed.focus();

    return ed;
}

/**
 * Inserts Ace elements into a Pages edit page
 *  
 * @param partElement
 */
function insertPageAce(partElement) {
    var partId = partElement.attr('id').slice(5, -8);
    var pId = 'P' + window.location.pathname.split("/").pop() + '-' + partId;
    var ed = setupEditor(pId, $('#part_' + partId + '_filter_id'), $('#part_' + partId + '_content'));
    if ($('#page_title').val().trim().length > 0)
        ed.focus();
}

/**
 * Remove Ace elements from Pages edit page
 * 
 * @param partElement
 */
function removePageAce(partElement) {
    var partId = partElement.attr('id').slice(5, -8);
    var pId = 'P' + window.location.pathname.split("/").pop() + '-' + partId;
    $('#aceeditor' + pId).remove();
    $('#aceoptions' + pId).remove();
}

/**
 * Inserts Ace elements into a Snippets edit page
 */
function insertSnippetAce() {
    var sId = 'S' + window.location.pathname.split("/").pop();
    setupEditor(sId, $('#snippet_filter_id'), $('#snippet_content'));
}

/**
 * Remove Ace elements from Snippets edit page
 */
function removeSnippetAce() {
    var sId = 'S' + window.location.pathname.split("/").pop();
    $('#aceeditor' + sId).remove();
    $('#aceoptions' + sId).remove();
}

/**
 * Inserts Ace elements into a Layouts edit page
 */
function insertLayoutAce() {
    var lId = 'L' + window.location.pathname.split("/").pop();
    setupEditor(lId, $('#layout_content').prev(), $('#layout_content'));
}

/**
 * main initialization
 */
$(document).ready(function() {
    // the filter select changes from some state
    $('.filter-selector').live('wolfSwitchFilterOut', function(event, filtername, elem) {
        if (filtername === 'ace') {
            $('#' + elem.attr('id')).show();
            if ($('#body_page_edit').length > 0) { // we are in PAGE
                removePageAce(elem);
            }
            if ($('#body_snippet_edit').length > 0) { // we are in SNIPPET
                removeSnippetAce();
            }
        }
    });

    // the filter select changes to some state
    $('.filter-selector').live('wolfSwitchFilterIn', function(event, filtername, elem) {
        if (filtername === 'ace') {
            if ($('#body_page_edit').length > 0) { // we are in PAGE
                insertPageAce(elem);
            }
            if ($('#body_snippet_edit').length > 0) { // we are in SNIPPET
                insertSnippetAce();
            }
        }
    });

    // we are in LAYOUT
    // setCM indicates if CodeMirror is already active
    if (($("#body_layout_edit").length > 0) && (typeof(setCM) == 'undefined') && ($('#ace-live-settings').attr('data-layoutintegrate') !== '0')) {
        insertLayoutAce();
    }
});


/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($, document, undefined) {
    var pluses = /\+/g;
    function raw(s) {
        return s;
    }
    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }
    var config = $.aceCookie = function(key, value, options) {
        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);
            if (value === null)
                options.expires = -1;
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = config.json ? JSON.stringify(value) : String(value);
            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }
        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }
        return null;
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.aceCookie(key) !== null) {
            $.aceCookie(key, null, options);
            return true;
        }
        return false;
    };
})(jQuery, document);
