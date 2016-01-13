// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');

var Package = require('dgeni').Package;

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
module.exports = new Package('docs_conf', [
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/nunjucks'),
    require('dgeni-packages/links')
])

// Configure our dgeni-example package. We can ask the Dgeni dependency injector
// to provide us with access to services and processors that we wish to configure
    .config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {

        // Set logging level
        log.level = 'info';

        // Specify the base path used when resolving relative paths to source and output files
        readFilesProcessor.basePath = path.resolve(__dirname, '..');
        console.log(readFilesProcessor.basePath);

        // Specify collections of source files that should contain the documentation to extract
        readFilesProcessor.sourceFiles = [
            {
                // Process all js files in `app` and its subfolders ...
                include: 'app/components/**/*.js',
                // ... except for this one!
                exclude: 'app/**/*_test.js',
                // When calculating the relative path to these files use this as the base path.
                // So `src/foo/bar.js` will have relative path of `foo/bar.js`
                basePath: 'app'
            }
        ];

        // Add a folder to search for our own templates to use when rendering docs
        templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

        // Specify how to match docs to templates.
        // In this case we just use the same static template for all docs
        templateFinder.templatePatterns.unshift('docs-template.html');

        // Specify where the writeFilesProcessor will write our generated doc files
        writeFilesProcessor.outputFolder  = 'docs/html';
    });