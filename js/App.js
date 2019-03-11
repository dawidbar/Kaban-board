var prefix = "https://cors-anywhere.herokuapp.com/";
// OGÓLNA FUNKCJA

function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
};

// Aminacje
$(function () {
    jQuery(".titleWrapper").addClass("ready");
    jQuery(".titleWrapper h1").each(function () {
        var fullString;
        var characters = jQuery(this).text().split("");

        var $this = jQuery(this);
        $this.empty();
        $.each(characters, function (i, el) {
            if (el == " ") {
                el = "&nbsp;"
            };
            $this.append("<span>" + el + "</span");
        });
    });
    var content = $('.content');
    var currentItem = content.filter('.active');
    var steps = $('.card-help').filter('.steps');
    var inactive1 = $('.inactive-1');
    var inactive2 = $('.inactive-2');

    $('.button').click(function () {
        var nextItem = currentItem.next();
        var lastItem = content.last();
        var contentFirst = content.first();

        currentItem.removeClass('active');

        if (currentItem.is(lastItem)) {
            currentItem = contentFirst.addClass('active');
            currentItem.css({
                'right': '10%',
                'opacity': '1'
            });
            $('.step').animate({
                width: '33%'
            });
            inactive1.animate({
                height: '8px',
                marginLeft: '20px',
                marginRight: '20px'
            }, 100);
            inactive2.animate({
                height: '8px',
                marginLeft: '10px',
                marginRight: '10px'
            }, 100);

        } else if (currentItem.is(contentFirst)) {
            currentItem.animate({
                opacity: 0
            }, 1000);
            currentItem = nextItem.addClass('active');
            $('.step').animate({
                width: '66%'
            });
            inactive2.animate({
                height: '0',
                marginLeft: '0px',
                marginRight: '0px'
            }, 100);

        } else {
            currentItem = nextItem.addClass('active');
            $('.step').animate({
                width: '100%'
            });
            inactive1.animate({
                height: '0',
                marginLeft: '0px',
                marginRight: '0px'
            }, 100);
        }
    });
});

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '3885',
    'X-Auth-Token': 'ef7ba5d769338c790b7b4a622b6fb581'
};

fetch(prefix + baseUrl + '/board', {
        headers: myHeaders
    })
    .then(function (resp) {
        return resp.json();
    })
    .then(function (resp) {
        setupColumns(resp.columns);
    });

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    });
}