$(document).ready(function() {
    //비교
    Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
        'use strict';
        var operators = {
        '==': v1 == v2 ? true : false,
        '===': v1 === v2 ? true : false,
        '!=': v1 != v2 ? true : false,
        '!==': v1 !== v2 ? true : false,
        '>': v1 > v2 ? true : false,
        '>=': v1 >= v2 ? true : false,
        '<': v1 < v2 ? true : false,
        '<=': v1 <= v2 ? true : false,
        '||': v1 || v2 ? true : false,
        '&&': v1 && v2 ? true : false
        }
        if (operators.hasOwnProperty(operator)) {
            if (operators[operator]) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
        return console.error('Error: Expression "' + operator + '" not found');
    });

});