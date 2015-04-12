'use strict';

angular.module('oliv.templates')

.run([
  '$templateCache'
  ($templateCache) ->

    $templateCache.put '404.html',
      '<div class="page-err">'+
        '<div class="err-container text-center">'+
          '<div class="err">'+
            '<h1>404</h1>'+
            '<h2>Sorry, page not found</h2>'+
          '</div>'+
          '<div class="err-body">'+
            '<a href="#/" class="btn btn-lg btn-goback">'+
              '<span class="ti-home"></span>'+
              '<span class="space"></span>'+
              'Go Back to Home Page'+
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'

    $templateCache.put '500.html',
      '<div class="page-err">'+
        '<div class="err-container text-center">'+
          '<div class="err">'+
            '<h1>500</h1>'+
            '<h2>Sorry, server goes wrong</h2>'+
          '</div>'+
          '<div class="err-body">'+
            '<a href="#/" class="btn btn-lg btn-goback">'+
              '<span class="ti-home"></span>'+
              '<span class="space"></span>'+
              'Go Back to Home Page'+
            '</a>'+
          '</div>'+
        '</div>'+
      '</div>'

    return
])