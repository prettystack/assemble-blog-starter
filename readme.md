# Assemble.io blog starter by [Prettystack](http://prettystack.com)

## Description

This is a complete [Assemble](http://assemble.io) boilerplate to get you started quickly on your next blog. Simply clone the repo, create new blog posts, hit `grunt prod` and you get a fully optimized website ready to be deployed!

[![Striped Preview](http://www.prettystack.com/img/ce673ad7.donquiblog.png)](http://prettystack.github.io/jekyll-blog-starter)

This starter kit contains integration to external services such as Disqus, Google Analytics, Facebook, ... It also comes with one of the great themes made by [HTML5 UP](http://html5up.net/) and to break from the boring 'lorem ipsum' our content comes from the [Gutenberg project](http://www.gutenberg.org/).

Make sure to check out all our [starter kits](https://github.com/prettystack/), we will soon have starter kit for corporate website and admin interface.

### Features
* Handlebars.js layouts and partials 
* Blog index with preview
* Pagination (work in progress)
* External services integration (Disqus, Analytics)
* Pagespeed optimizations: assets minification, image compression

## Getting started

* Install [Grunt](http://gruntjs.com/) `npm install -g grunt-cli`
* Clone repository (`git clone https://github.com/prettystack/assemble-blog-starter.git`)
* Install dependencies `npm install`
* Launch dev server `grunt`
* Browse the site at [localhost:8000](http://localhost:8000)
* Customize your `config.yml` (see below)
* Add new posts by creating markdown file in the `posts` directory


## Configuration

Your blog options are located in `config.yml`

### Menu configuration

To add / remove menu items, edit the `menu` section in `config.yml`. Also do not forget to add the corresponding pages to the `pages/` directory

### Google analytics integration

Add your GA code to *config.yml* to enable analyics

### Disqus integration

Add your disqus shortname in *config.yml* to enable disqus threads. For correct display, go to [settings/general](http://disqus.com/admin/settings/general/) and only keep numbers in "Comment Count Link".


## Credits

* *Striped!* theme from [HTML5 UP](http://html5up.net/) (Creative Commons Attribution 3.0).
* [Assemble](http://assemble.io) static site generator. (MIT license)

Placeholder content:

* Text: "The Ingenious Gentleman Don Quixote of La Mancha" by Miguel de Cervantes (public domain)
* Illustrations by Gustave Doré (public domain)
* Public domain novel made available by the [Gutenberg project](http://www.gutenberg.org/)


## License

See LICENSE.
