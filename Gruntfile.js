/*global module:false */
module.exports = function(grunt) {

    var cssFiles = [
        "bootstrap-responsive.css",
        "bootmetro.css",
        "metro-ui-light.css",
        "bootmetro-ui-light.css",
        "bootmetro-responsive.css",
        "datepicker.css"
    ];

    var fontFiles = [
        "IcoMoon.eot",
        "IcoMoon.svg",
        "IcoMoon.ttf",
        "IcoMoon.woff"
    ];

    grunt.initConfig({
        "curl-dir": {
            "src/css": [
                "https://raw.github.com/aozora/bootmetro/master/content/css/{" + cssFiles + "}"
            ],
            "src/font": [
                "https://raw.github.com/aozora/bootmetro/master/content/font/{" + fontFiles + "}"
            ]
        },
        copy: {
            font: { expand: true, flatten: true, src: ["src/font/*.*"], dest: "app/assets/", filter: "isFile" },
            lib: { expand: true, flatten: true, src: ["lib/**/*.js"], dest: "app/assets/", filter: "isFile" }
        },
        exec: {
            tsserve: {
                command: "cd app && tsapp serve",
                stdout: true
            },
            tspush: {
                command: "cd app && tsapp push tsretro_public",
                stdout: true
            }
        },
        cssmin: {
            "html-css": {
                options: {
                    banner: "/*!" +
                            "* BootMetro v1.0.0" +
                            "*" +
                            "* Copyright 2012 Marcello Palmitessa" +
                            "* Licensed under the Apache License v2.0" +
                            "* http://www.apache.org/licenses/LICENSE-2.0" +
                            "*" +
                            "*/"
                },
                files: {
                    "app/assets/HtmlCss.css": [
                        "src/css/*.css",
                        "app/assets/bootmetro-tiles.css",
                        "app/assets/bootmetro-icons.css"
                    ]
                }
            }
        },
        jshint: {
            files: {
                src: ["Gruntfile.js", "app/assets/*.js"]
            }
        },
        clean: ["src/css", "src/font", "app/assets/HtmlCss.css", "lib"]
    });

    grunt.registerTask("ts-deploy", "Deploy the application to TiddlySpace", function () {

        grunt.task.run("exec:tspush");
    });

    grunt.registerTask("ts-serve", "Host the application locally via tsapp", function () {

        grunt.task.run("exec:tsserve");
    });

    grunt.registerTask("default", ["clean", "jshint", "curl-dir", "cssmin", "copy"]);

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-curl");
};