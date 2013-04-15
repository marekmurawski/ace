Ace filter for Wolf CMS
=======================

Code editor and syntax highlighter based on Ajax.org Cloud9 Editor.

Features
--------

* Multiple themes selection
* css, html, javascript, json, markdown, php, text, textile and xml modes
* custom **font size**, **line wrapping** length, editor window height
* integrates with **page part, snippet** and (optionally) **layout** editing windows
* **keeps scroll** position in **every** editor instance
* **keeps cursor** position in **every** editor instance
* **keeps syntax highlighting mode in every** editor instance
* **live PHP syntax checking**


Installation
------------

Ace Plugin can be installed into your WolfCMS by uploading it to ***CMS_ROOT/wolf/plugins/ace/*** and enabling it in administration panel.

Changelog
---------

##### 0.1.1

- support for 0.7.6 i18n
- minor fixes

##### 0.1.0

- **default settings stored in database** _(instead of file)_
- major **javascript refactoring** - big thanks to **@dedlfix**
- shortcuts for **bold** and *italic* markup *(HTML, textile and markdown modes)*
- quick access to text-wrap options  _(temporary)_
- quick access to font size _(temporary)_
- 3 text wrapping modes 
  - wrap to editor
  - wrap to margin
  - no wrapping
- MultiEdit plugin integration
- updated Ace to current build
- German translation - by **@dedlfix**

##### 0.0.7

- updated Ace to current build
- live PHP syntax checking
- some more bugfixes

##### 0.0.6

- the editor now stores text cursor position and gets focus automatically
- bugfixes for scroll position persistence
- added option to toggle active line highlighting
- corrected selection color in monokai theme to black
- added new theme - Sublime Monokai - by **NicNLD**
- added dutch translation - by **NicNLD**
- some js code refactoring

##### 0.0.4

- fixed issues with multiple page parts editing
- per-page syntax highlighting mode storage
- per-page scroll position storage
- added icon to jump to global editor settings
- added notification in case of wrong settings file permissions
- fixed settings icon (thx David)

##### 0.0.2

- first release


License
-------

* GPLv3 license
* Ace - BSD license

Disclaimer
----------

While I make every effort to deliver quality plugins for Wolf CMS, I do not guarantee that they are free from defects. They are provided “as is," and you use it at your own risk. I'll be happy if you notice me of any errors.

I'm not really programmer nor web developer, however I like programming PHP and JavaScript. In fact I'm an [architekt](http://marekmurawski.pl).
