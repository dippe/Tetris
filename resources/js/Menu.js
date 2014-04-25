this.dippejs = this.dippejs || {};

(function (ns) {
    'use strict';

    var menuItems = [
        {name: "Start", onSelect: getTestFunc("startgame")},
        {name: "Scoreboard", onSelect: getTestFunc("scoreboard")},
        {name: "Quit", onSelect: getTestFunc("quit")}
    ];


    var Menu = {};

    Menu.init = function (cssId) {
        if (_.isEmpty(cssId)) {
            throw "menu init: invalid arguments";
        }

        var menuDomElem = document.getElementById(cssId);

        this.redraw = getRedrawMenuFunc(menuDomElem, menuItems);
        this.show = getShowFunc(menuDomElem);
        this.hide = getHideFunc(menuDomElem);

    }

    Menu.redraw = undefined;

    Menu.show = undefined;

    Menu.hide = undefined;


    /**
     *
     * @param menuItems : [{text:"mnu1", onSelect: function}, ...]
     * @param animationFunc
     */
    function getRedrawMenuFunc(menuDomElem, menuItems) {

        if (!_.isObject(menuDomElem) || !_.isArray(menuItems)) {
            throw "getRedrawMenuFunc: invalid arguments";
        }

        return function () {
            var pageBorderElem = getPageBorderElem();

            var domMenu = _.chain(menuItems).map(getButtonElem).reduce(
                function (memo, item) {
                    memo.appendChild(item);
                    return memo;
                }, pageBorderElem
            ).value();

            menuDomElem.children = [];
            menuDomElem.appendChild(domMenu);
        }

    }

    function getShowFunc(menuDomElem) {

        return function (menuItemAnimFunc) {
            _.each(menuDomElem.children, menuItemAnimFunc)
        }

    }

    function getHideFunc(menuDomElem) {

        return function (menuItemAnimFunc) {
            _.each(menuDomElem.children, menuItemAnimFunc)
        }

    }


    function slideIn(domElem) {
        domElem.classList.add("slideInTransform");
    }

    function slideOut(domElem) {
        domElem.classList.add("slideOutTransform");
    }


    function getPageBorderElem() {
        var newElem = document.createElement("div");
        newElem.classList.add("pageBorder");

        return newElem;
    }

    function getButtonElem(menuItem) {
        var newElem = document.createElement("div");
        newElem.classList.add("Button");
        newElem.innerText = menuItem.name;
        newElem.onclick = menuItem.onSelect;

        return newElem;
    }


    // TODO: remove this temp func later
    function getTestFunc(name) {
        return function () {
            console.log(name);
        }
    }


    ns.Menu = Menu;

})(this.dippejs)