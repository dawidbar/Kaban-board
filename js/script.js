"use strict";
document.addEventListener('DOMContentLoaded', function () {

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };

    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');

        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);

        return element;
    };

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', {
            name: this.name,
            id: this.id
        });

        this.element.querySelector('.column').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
                self.removeColumn();
            }

            if (event.target.classList.contains('add-card')) {
                self.addCard(new Card(prompt("Enter the name of the card")));
            }
        });
    }

    Column.prototype = {
        addCard: function (card) {
            this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function () {
            this.element.parentNode.removeChild(this.element);
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', {
            description: this.description
        }, 'li');

        this.element.querySelector('.card').addEventListener('click', function (event) {
            event.stopPropagation();
            if (event.target.classList.contains('btn-delete')) {
                self.removeCard();
            }

            if (event.target.classList.contains('btn-delete-card')) {
                self.removeCard();
            }
        });
    }

    Card.prototype = {
        removeCard: function () {
            this.element.parentNode.removeChild(this.element);
        }
    }

    var board = {
        name: 'Kanban Board',
        addColumn: function (column) {
            this.element.appendChild(column.element);
            initSortable(column.id);
        },
        element: document.querySelector('#board .column-container')
    };

    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
            group: 'kanban',
            sort: true
        });
    }

    document.querySelector('#board .create-column').addEventListener('click', function () {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);


});

$(function () {
    console.log("ready!");

    jQuery(document).ready(function () {
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