
requirejs.config({
    baseUrl: 'js',  //By default load any module IDs from the js folder
    paths: {
        jquery: ['//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', 'libs/jquery/dist/jquery.min.js']
    },
    waitSeconds: 45
});