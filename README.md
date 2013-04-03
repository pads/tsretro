# tsretro

Work in progress.

## What

A TiddlySpace space to help facilitate project retrospectives.

## Why

This app is just more applied learning of webby things, it uses:

* [Angular JS](http://angularjs.org/)
* [twangular](https://github.com/pads/twangular/)
* [BootMetro](http://aozora.github.com/bootmetro/hub.html)

## How

You'll need:

* Python 2.x
* pip
* node
* grunt

Then:

    pip install -U tsapp

Then:

    npm install -g grunt-cli bower

Then:

    npm install && bower install

Finally:

    grunt
    grunt ts-serve

Navigate to `http://localhost:8080/tsretro.html`

## Who

[pads](http://thisispads.me.uk)

# To do

* Form validation
* Install twangular from bower
* Move status sevice to twangular
* Provide option to make tiddlers public or private