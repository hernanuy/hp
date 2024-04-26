
(function ($) {

    'use strict';

    $.fn.wbfxChatSupport = function (options) {

        var defaults = {
            button: {
                position: "right",
                style: 1,
                src: '<i class="fab fa-whatsapp"></i>',
                backgroundColor: "#26c281",
                effect: 1,
                notificationNumber: "1",
                pulseEffect: true,
                text: {
                    title: "",
                    description: "",
                    online: "",
                    offline: ""
                },
                link: {
                    desktop: false,
                    mobile: false
                },
                onlineDay: {
                    sunday: false,
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false
                },
                delay: true
            },
            popup: {
                automaticOpen: false,
                outsideClickClosePopup: true,
                effect: 1,
                header: {
                    backgroundColor: "#26c281",
                    title: "",
                    description: ""
                },
                persons: [],
                personsSettings: {
                    avatar: {
                        src: '<i class="fab fa-whatsapp"></i>',
                        backgroundColor: "#26c281",
                        onlineCircle: true
                    },
                    text: {
                        title: "",
                        description: "",
                        online: "",
                        offline: "",
                        message: false,
                        textbox: false,
                        button: "Start Chat"
                    },
                    link: {
                        desktop: false,
                        mobile: false
                    },
                    onlineDay: {
                        sunday: false,
                        monday: false,
                        tuesday: false,
                        wednesday: false,
                        thursday: false,
                        friday: false,
                        saturday: false
                    }
                }
            },
            cookie: false,
            timezone: false,
            onLoad: function () {},
            onClick: function () {},
            onPopupOpen: function () {},
            onPopupClose: function () {}
        };

        /**************************************************************************************************/
        /**************************************************************************************************/
        /**************************************************************************************************/

        var settings = $.extend(true, {}, defaults, options);

        /**************************************************************************************************/
        /**************************************************************************************************/
        /**************************************************************************************************/
        /********** TIMEZONE **********/

        var mtimezone;

        if (window.moment) {

            if (settings.timezone !== false) {

                mtimezone = moment().tz(settings.timezone);

            } else {

                mtimezone = moment().tz(moment.tz.guess());
            }
        }

        /**************************************************************************************************/
        /**************************************************************************************************/
        /**************************************************************************************************/

        return this.each(function () {

            //console.log(settings);

            var wbfxID = this;

            /**************************************************************************************************/
            /**************************************************************************************************/
            /**************************************************************************************************/
            /********** COOKIE **********/

            if (getCookie('wbfxChatSupport') == 'true') {

                settings.button.pulseEffect = false;
                settings.button.notificationNumber = false;
                settings.button.delay = false;
                settings.popup.automaticOpen = false;
                
                }

            /**************************************************************************************************/
            /**************************************************************************************************/
            /**************************************************************************************************/

            if (settings.onLoad && typeof settings.onLoad === 'function') {

                settings.onLoad.call(this);
            }

            /**************************************************************************************************/
            /**************************************************************************************************/
            /**************************************************************************************************/

            if ((settings.button.position !== 'right') && (settings.button.position !== 'left')) {

                settings.button.speechBubble = false;
            }

            /********** BUTTON **********/

            $(wbfxID).addClass('wbfx-chat-support wbfx-chat-support-' + settings.button.style).prepend('<div class="wbfx-button"></div>');

            if ((settings.button.position == 'right') || (settings.button.position == 'left')) {

                $(wbfxID).addClass('wbfx-fixed');

                if (settings.button.position == 'right') {

                    $(wbfxID).addClass('wbfx-right');

                } else if (settings.button.position == 'left') {

                    $(wbfxID).addClass('wbfx-left');
                }

                if (settings.button.delay !== false) {

                    if ((settings.button.effect == 2) || (settings.button.effect == 4) || (settings.button.effect == 5) || (settings.button.effect == 7)) {

                        if (settings.button.position == 'right') {

                            settings.button.effect = settings.button.effect + '__1';

                        } else if (settings.button.position == 'left') {

                            settings.button.effect = settings.button.effect + '__2';
                        }
                    }

                    $(wbfxID).addClass('wbfx-chat-support-show');

                    $('.wbfx-button', wbfxID).addClass('animate__animated animate__' + settings.button.effect);

                    setInterval(function () {

                        $('.wbfx-button', wbfxID).removeClass('animate__animated animate__' + settings.button.effect);

                    }, 1000);

                } else {

                    $(wbfxID).addClass('wbfx-chat-support-show');
                }

            } else {

                $(wbfxID).addClass('wbfx-chat-support-show');
            }

            var buttonOnline = true;
            var buttonLink;

            if ((settings.button.link.desktop !== false) || (settings.button.link.mobile !== false)) {

                if (window.moment) {

                    if ((settings.button.onlineDay[mtimezone.format('dddd').toLowerCase()] == false) || (settings.button.onlineDay[mtimezone.format('dddd').toLowerCase()] == undefined)) {

                        buttonOnline = false;

                    } else if (moment(mtimezone.format('HH:mm:ss'), 'HH:mm:ss').isBetween(moment(settings.button.onlineDay[mtimezone.format('dddd').toLowerCase()].split('-')[0] + ':00', 'HH:mm:ss'), moment(settings.button.onlineDay[mtimezone.format('dddd').toLowerCase()].split('-')[1] + ':59', 'HH:mm:ss')) == false) {

                        buttonOnline = false;
                    }
                }

            } else if (settings.popup.persons.length == 0) {

                buttonOnline = false;
            }

            $('.wbfx-button', wbfxID).css('background-color', settings.button.backgroundColor);

            $('.wbfx-button', wbfxID).append('<div class="wbfx-button-person-avatar"></div>');

            $('.wbfx-button-person-avatar', wbfxID).append(settings.button.src);

            if ((settings.button.style == 6) || (settings.button.style == 7)) {

                $('.wbfx-button-person-avatar', wbfxID).css('background-color', settings.button.backgroundColor);
            }

            if ((settings.button.style == 3) || (settings.button.style == 5)) {

                $('.wbfx-button', wbfxID).append('<div class="wbfx-button-content"><div class="wbfx-button-content-title">' + settings.button.text.title + '</div></div>');

            } else if ((settings.button.style == 2) || (settings.button.style == 4) || (settings.button.style == 6) || (settings.button.style == 7)) {

                $('.wbfx-button', wbfxID).append('<div class="wbfx-button-content"><div class="wbfx-button-content-title">' + settings.button.text.title + '</div></div>');

                if (((settings.button.text.description !== false) && (settings.button.text.description !== '') && (settings.button.text.description !== undefined)) || ((settings.button.text.online !== false) && (settings.button.text.online !== '') && (settings.button.text.online !== undefined)) || (settings.button.text.offline !== false) && (settings.button.text.offline !== '') && (settings.button.text.offline !== undefined)) {

                    if ((settings.button.text.description !== false) && (settings.button.text.description !== '') && (settings.button.text.description !== undefined)) {

                        $('.wbfx-button-content', wbfxID).append('<div class="wbfx-button-content-description">' + settings.button.text.description + '</div>');
                    }

                    if (buttonOnline == true) {

                        if ((settings.button.text.online !== false) && (settings.button.text.online !== '') && (settings.button.text.online !== undefined)) {

                            $('.wbfx-button-content', wbfxID).append('<div class="wbfx-button-content-online-offline-text">' + settings.button.text.online + '</div>');
                        }

                    } else {

                        if ((settings.button.text.offline !== false) && (settings.button.text.offline !== '') && (settings.button.text.offline !== undefined)) {

                            $('.wbfx-button-content', wbfxID).append('<div class="wbfx-button-content-online-offline-text">' + settings.button.text.offline + '</div>');
                        }
                    }
                }
            }
			
			if (settings.button.src.search('img') !== -1) {

                $('.wbfx-button', wbfxID).addClass('wbfx-button-image');
            }

            if (buttonOnline == false) {

                $('.wbfx-button', wbfxID).addClass('wbfx-button-offline');
            }

            if (((settings.button.link.desktop !== false) || (settings.button.link.mobile !== false)) && (buttonOnline == true)) {

                $('.wbfx-button', wbfxID).click(function () {

                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                        if (settings.button.link.mobile !== false) {

                            buttonLink = settings.button.link.mobile;

                        } else {

                            buttonLink = settings.button.link.desktop;
                        }

                    } else {

                        buttonLink = settings.button.link.desktop;
                    }

                    window.open(buttonLink, '_blank');

                    if (settings.onClick && typeof settings.onClick === 'function') {

                        settings.onClick.call(this);
                    }
                });
            }

           /********** POPUP **********/

            if ((settings.button.link.desktop == false) && (settings.button.link.mobile == false) && (settings.popup.persons.length > 0) && ((settings.button.position == 'right') || (settings.button.position == 'left'))) {

                if (settings.popup.outsideClickClosePopup == true) {

                    $(document).click(function () {

                        if ($(wbfxID).hasClass('wbfx-popup-show')) {

                            wbfxHide();

                            if (settings.onPopupClose && typeof settings.onPopupClose === 'function') {

                                settings.onPopupClose.call(this);
                            }
                        }
                    });

                    $(wbfxID).click(function (e) {

                        e.stopPropagation();
                        return false;
                    });
                }

                $('.wbfx-button', wbfxID).click(function () {

                    wbfxHide();

                    if ($(wbfxID).hasClass('wbfx-popup-show')) {

                        if (settings.onPopupOpen && typeof settings.onPopupOpen === 'function') {

                            settings.onPopupOpen.call(this);
                        }

                    } else {

                        if (settings.onPopupClose && typeof settings.onPopupClose === 'function') {

                            settings.onPopupClose.call(this);
                        }
                    }
                });

                if ((settings.popup.effect == 2) || (settings.popup.effect == 10) || (settings.popup.effect == 12)) {

                    if (settings.button.position == 'right') {

                        settings.popup.effect = settings.popup.effect + '__1';

                    } else if (settings.button.position == 'left') {

                        settings.popup.effect = settings.popup.effect + '__2';
                    }
                }

                $(wbfxID).prepend('<div class="wbfx-popup animate__popup__' + settings.popup.effect + '"></div>');

                if (settings.popup.automaticOpen == true) {

                    var automaticOpenTime;

                    if (settings.button.delay == true) {

                        automaticOpenTime = 900;

                    } else {

                        automaticOpenTime = 200;
                    }

                    setTimeout(function () {

                        wbfxHide();

                        if (settings.onPopupOpen && typeof settings.onPopupOpen === 'function') {

                            settings.onPopupOpen.call(this);
                        }

                    }, automaticOpenTime);
                }

                $('.wbfx-popup', wbfxID).prepend('<div class="wbfx-popup-header"><span class="wbfx-popup-close"></span></div>');

                $('.wbfx-popup-close', wbfxID).click(function () {

                    wbfxHide();

                    if (settings.onPopupClose && typeof settings.onPopupClose === 'function') {

                        settings.onPopupClose.call(this);
                    }
                });

                $('.wbfx-popup-header', wbfxID).css('background-color', settings.popup.header.backgroundColor);

                if ((settings.popup.header.title == false) || (settings.popup.header.title == '') || (settings.popup.header.title == undefined)) {

                    $('.wbfx-popup-header', wbfxID).append('<div class="wbfx-popup-header-title"></div>');

                } else {

                    $('.wbfx-popup-header', wbfxID).append('<div class="wbfx-popup-header-title">' + settings.popup.header.title + '</div>');
                }

                if ((settings.popup.header.description !== false) && (settings.popup.header.description !== '') && (settings.popup.header.description !== undefined)) {

                    $('.wbfx-popup-header', wbfxID).append('<div class="wbfx-popup-header-description">' + settings.popup.header.description + '</div>');
                }

                $('.wbfx-popup', wbfxID).append('<div class="wbfx-popup-area"><div class="wbfx-popup-persons"></div></div>');
				
				if (settings.popup.persons.length > 5) {

                    $('.wbfx-popup', wbfxID).addClass('wbfx-popup-small');

                }

                var pn = 0;

                for (var p = 0; p < settings.popup.persons.length; p++) {

                    pn = p + 1;

                    var personLink;
                    var personOnline = true;

                    if (settings.popup.persons[p].link == undefined) {

                        settings.popup.persons[p].link = settings.popup.personsSettings.link;

                    } else {

                        if (settings.popup.persons[p].link.desktop == undefined) {

                            settings.popup.persons[p].link.desktop = settings.popup.personsSettings.link.desktop;
                        }

                        if (settings.popup.persons[p].link.mobile == undefined) {

                            settings.popup.persons[p].link.mobile = settings.popup.personsSettings.link.mobile;
                        }
                    }

                    if (settings.popup.persons[p].avatar == undefined) {

                        settings.popup.persons[p].avatar = settings.popup.personsSettings.avatar;

                    } else {

                        if (settings.popup.persons[p].avatar.src == undefined) {

                            settings.popup.persons[p].avatar.src = settings.popup.personsSettings.avatar.src;
                        }

                        if (settings.popup.persons[p].avatar.backgroundColor == undefined) {

                            settings.popup.persons[p].avatar.backgroundColor = settings.popup.personsSettings.avatar.backgroundColor;
                        }

                        if (settings.popup.persons[p].avatar.onlineCircle == undefined) {

                            settings.popup.persons[p].avatar.onlineCircle = settings.popup.personsSettings.avatar.onlineCircle;
                        }
                    }

                    if (settings.popup.persons[p].text == undefined) {

                        settings.popup.persons[p].text = settings.popup.personsSettings.text;

                    } else {

                        if (settings.popup.persons[p].text.title == undefined) {

                            settings.popup.persons[p].text.title = settings.popup.personsSettings.text.title;
                        }

                        if (settings.popup.persons[p].text.description == undefined) {

                            settings.popup.persons[p].text.description = settings.popup.personsSettings.text.description;
                        }

                        if (settings.popup.persons[p].text.online == undefined) {

                            settings.popup.persons[p].text.online = settings.popup.personsSettings.text.online;
                        }

                        if (settings.popup.persons[p].text.offline == undefined) {

                            settings.popup.persons[p].text.offline = settings.popup.personsSettings.text.offline;
                        }

                        if (settings.popup.persons[p].text.message == undefined) {

                            settings.popup.persons[p].text.message = settings.popup.personsSettings.text.message;
                        }

                        if (settings.popup.persons[p].text.textbox == undefined) {

                            settings.popup.persons[p].text.textbox = settings.popup.personsSettings.text.textbox;
                        }

                        if (settings.popup.persons[p].text.button == undefined) {

                            settings.popup.persons[p].text.button = settings.popup.personsSettings.text.button;
                        }
                    }

                    if (settings.popup.persons[p].onlineDay == undefined) {

                        settings.popup.persons[p].onlineDay = settings.popup.personsSettings.onlineDay;

                    } else {

                        if (settings.popup.persons[p].onlineDay.sunday == undefined) {

                            settings.popup.persons[p].onlineDay.sunday = settings.popup.personsSettings.onlineDay.sunday;
                        }

                        if (settings.popup.persons[p].onlineDay.monday == undefined) {

                            settings.popup.persons[p].onlineDay.monday = settings.popup.personsSettings.onlineDay.monday;
                        }

                        if (settings.popup.persons[p].onlineDay.tuesday == undefined) {

                            settings.popup.persons[p].onlineDay.tuesday = settings.popup.personsSettings.onlineDay.tuesday;
                        }

                        if (settings.popup.persons[p].onlineDay.wednesday == undefined) {

                            settings.popup.persons[p].onlineDay.wednesday = settings.popup.personsSettings.onlineDay.wednesday;
                        }

                        if (settings.popup.persons[p].onlineDay.thursday == undefined) {

                            settings.popup.persons[p].onlineDay.thursday = settings.popup.personsSettings.onlineDay.thursday;
                        }

                        if (settings.popup.persons[p].onlineDay.friday == undefined) {

                            settings.popup.persons[p].onlineDay.friday = settings.popup.personsSettings.onlineDay.friday;
                        }

                        if (settings.popup.persons[p].onlineDay.saturday == undefined) {

                            settings.popup.persons[p].onlineDay.saturday = settings.popup.personsSettings.onlineDay.saturday;
                        }
                    }

                    if (window.moment) {

                        if (settings.popup.persons[p].onlineDay[mtimezone.format('dddd').toLowerCase()] == false) {

                            personOnline = false;

                        } else if (moment(mtimezone.format('HH:mm:ss'), 'HH:mm:ss').isBetween(moment(settings.popup.persons[p].onlineDay[mtimezone.format('dddd').toLowerCase()].split('-')[0] + ':00', 'HH:mm:ss'), moment(settings.popup.persons[p].onlineDay[mtimezone.format('dddd').toLowerCase()].split('-')[1] + ':59', 'HH:mm:ss')) == false) {

                            personOnline = false;
                        }
                    }

                    $('.wbfx-popup-persons', wbfxID).append('<div class="wbfx-popup-person" data-id="' + p + '"><div class="wbfx-popup-person-content"></div></div>');

                    var personChild = $('.wbfx-popup-person:nth-child(' + pn + ')', wbfxID);

                    personChild.prepend('<div class="wbfx-popup-person-avatar"></div>');

                    $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-avatar', wbfxID).prepend(settings.popup.persons[p].avatar.src).css('background-color', settings.popup.persons[p].avatar.backgroundColor);

                    if ((settings.popup.persons[p].text.title == false) || (settings.popup.persons[p].text.title == '') || (settings.popup.persons[p].text.title == undefined)) {

                        settings.popup.persons[p].text.title = '';
                    }

                    $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-content', wbfxID).append('<div class="wbfx-popup-person-title">' + settings.popup.persons[p].text.title + '</div>');

                    if ((settings.popup.persons[p].text.description !== false) && (settings.popup.persons[p].text.description !== '') && (settings.popup.persons[p].text.description !== undefined)) {

                        $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-content', wbfxID).append('<div class="wbfx-popup-person-description">' + settings.popup.persons[p].text.description + '</div>');
                    }

                    if (personOnline == true) {

                        if (settings.popup.persons[p].avatar.onlineCircle == true) {

                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-avatar', wbfxID).append('<div class="wbfx-popup-person-avatar-status"></div>');
                        }

                        if ((settings.popup.persons[p].text.online !== false) && (settings.popup.persons[p].text.online !== '') && (settings.popup.persons[p].text.online !== undefined)) {

                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-content', wbfxID).append('<div class="wbfx-popup-person-online-offline-text">' + settings.popup.persons[p].text.online + '</div>');
                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-online-offline-text', wbfxID).css('background-color', settings.popup.header.backgroundColor);
                        }

                    } else {

                        personChild.addClass('wbfx-popup-person-offline');

                        if ((settings.popup.persons[p].text.offline !== false) && (settings.popup.persons[p].text.offline !== '') && (settings.popup.persons[p].text.offline !== undefined)) {

                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-content', wbfxID).append('<div class="wbfx-popup-person-online-offline-text">' + settings.popup.persons[p].text.offline + '</div>');
                        }
                    }

                    if (settings.popup.persons.length == 1) {

                        $('.wbfx-popup', wbfxID).addClass('wbfx-popup-single');

                        $('.wbfx-popup-header', wbfxID).css('background-color', settings.popup.header.backgroundColor);
                        $('.wbfx-popup-header-title', wbfxID).remove();
                        $('.wbfx-popup-header-description', wbfxID).remove();

                        $('.wbfx-popup-person:nth-child(' + pn + ')', wbfxID).css('background-color', settings.popup.header.backgroundColor);

                        $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-avatar', wbfxID).css('background-color', '#ffffff');
                        $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-avatar i', wbfxID).css('color', settings.popup.header.backgroundColor);

                        $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-person-online-offline-text', wbfxID).remove();

                        $('.wbfx-popup-person:nth-child(' + pn + ')', wbfxID).append('<div class="wbfx-popup-start-chat"></div>');

                        if (settings.popup.persons[p].text.message !== false) {

                            $('.wbfx-popup-person:nth-child(' + pn + ')', wbfxID).addClass('wbfx-popup-person-message');

                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat', wbfxID).append('<div class="wbfx-popup-start-chat-message"><div>' + settings.popup.persons[p].text.message + '</div></div>');
                        }

                        if (settings.popup.persons[p].text.textbox !== false) {

                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat', wbfxID).append('<div class="wbfx-popup-start-chat-textbox"><input type="text" placeholder="' + settings.popup.persons[p].text.textbox + '" autocomplete="off"><i class="fa fa-play"></i></div>');

                            if ((settings.popup.persons[p].link.desktop !== false) || (settings.popup.persons[p].link.mobile !== false)) {

                                $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat-textbox i', wbfxID).click(function () {

                                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                                        if (settings.popup.persons[0].link.mobile !== false) {

                                            personLink = settings.popup.persons[0].link.mobile;

                                        } else {

                                            personLink = settings.popup.persons[0].link.desktop;
                                        }

                                    } else {

                                        personLink = settings.popup.persons[0].link.desktop;
                                    }

                                    if (settings.popup.persons[0].text.textbox !== false) {

                                        if (personLink.search(/text/) != -1) {

                                            personLink = personLink.split('text')[0];
                                        }

                                        personLink = personLink + 'text=' + $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat-textbox input[type="text"]', wbfxID).val();
                                    }

                                    window.open(personLink, '_blank');
                                });

                                $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat-textbox input[type="text"]', wbfxID).keyup(function (e) {

                                    if (e.keyCode == 13) {

                                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                                            if (settings.popup.persons[0].link.mobile !== false) {

                                                personLink = settings.popup.persons[0].link.mobile;

                                            } else {

                                                personLink = settings.popup.persons[0].link.desktop;
                                            }

                                        } else {

                                            personLink = settings.popup.persons[0].link.desktop;
                                        }

                                        if (settings.popup.persons[0].text.textbox !== false) {

                                            if (personLink.search(/text/) != -1) {

                                                personLink = personLink.split('text')[0];
                                            }

                                            personLink = personLink + 'text=' + $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat-textbox input[type="text"]', wbfxID).val();
                                        }

                                        window.open(personLink, '_blank');
                                    }
                                });
                            }

                        } else {

                            $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat', wbfxID).append('<div class="wbfx-popup-start-chat-button"><span>' + settings.popup.persons[p].text.button + '</span></div>');

                            $('.wbfx-popup-start-chat-button', wbfxID).css('background-color', settings.popup.header.backgroundColor);

                            if ((settings.popup.persons[p].link.desktop !== false) || (settings.popup.persons[p].link.mobile !== false)) {

                                $('.wbfx-popup-person:nth-child(' + pn + ') .wbfx-popup-start-chat-button', wbfxID).click(function () {

                                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                                        if (settings.popup.persons[0].link.mobile !== false) {

                                            personLink = settings.popup.persons[0].link.mobile;

                                        } else {

                                            personLink = settings.popup.persons[0].link.desktop;
                                        }

                                    } else {

                                        personLink = settings.popup.persons[0].link.desktop;
                                    }

                                    window.open(personLink, '_blank');
                                });
                            }
                        }

                        if (personOnline == false) {

                            $('.wbfx-popup', wbfxID).remove();
                            $('.wbfx-button', wbfxID).addClass('wbfx-button-offline');

                            if ((settings.button.text.offline !== false) && (settings.button.text.offline !== '') && (settings.button.text.offline !== undefined)) {

                                $('.wbfx-button-content-online-offline-text', wbfxID).html(settings.button.text.offline);

                            } else {

                                $('.wbfx-button-content-online-offline-text', wbfxID).remove();
                            }

                            buttonOnline = false;
                        }

                    } else {

                        if ((settings.popup.persons[p].link.desktop !== false) || (settings.popup.persons[p].link.mobile !== false)) {

                            personChild.click(function (e) {

                                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                                    if (settings.popup.persons[e.currentTarget.dataset.id].link.mobile !== false) {

                                        personLink = settings.popup.persons[e.currentTarget.dataset.id].link.mobile;

                                    } else {

                                        personLink = settings.popup.persons[e.currentTarget.dataset.id].link.desktop;
                                    }

                                } else {

                                    personLink = settings.popup.persons[e.currentTarget.dataset.id].link.desktop;
                                }

                                window.open(personLink, '_blank');
                            });
                        }
                    }
                }
            }

           /********** PULSE EFFECT **********/

            if ((settings.button.pulseEffect == true) && (buttonOnline == true)) {

                if (settings.button.style == 1) {

                    $('.wbfx-button', wbfxID).append('<div class="wbfx-pulse"></div><div class="wbfx-pulse"></div>');
                    $('.wbfx-pulse', wbfxID).css('background-color', settings.button.backgroundColor);
                }
            }

           /********** NOTIFY **********/

            if ((settings.button.notificationNumber !== false) && (buttonOnline == true)) {

                $('.wbfx-button', wbfxID).append('<div class="wbfx-notify"><div class="wbfx-notify-circle"></div></div>');

                setTimeout(function () {

                    $('.wbfx-notify-circle', wbfxID).addClass('wbfx-notify-circle-show wbfx-bounce').html(settings.button.notificationNumber);

                    setInterval(function () {

                        $('.wbfx-notify-circle', wbfxID).toggleClass('wbfx-bounce');

                    }, 2000);

                }, 1500);
            }

           /********** SPEECH BUBBLE **********/
           /********** BU DOSYANIN TAM YOLU **********/

            window.getRunningScript = () => {

                return () => {
                    return new Error().stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)[0]
                }
            }

            var getCurrentScriptPath = function () {

                var script = getRunningScript()();
                var path = script.substring(0, script.lastIndexOf('/'));
                return path + '/';
            };

           /********** SOUND **********/
           /********** CHANGE BROWSER TITLE **********/
           /********** COOKIE **********/

            if ((settings.cookie !== false) && (buttonOnline == true)) {

                if (getCookie('wbfxChatSupport') !== 'true') {

                    setCookie('wbfxChatSupport', true, new Date(new Date().getTime() + (settings.cookie * 60) * 60 * 1000));
                }
            }

           /********** FUNCTION **********/

            function wbfxHide() {

                $(wbfxID).toggleClass('wbfx-popup-show');
            }

            function setCookie(cname, cvalue, exdays) {

                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }

            function getCookie(cname) {

                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');

                for (var i = 0; i < ca.length; i++) {

                    var c = ca[i];

                    while (c.charAt(0) === ' ') {

                        c = c.substring(1);
                    }

                    if (c.indexOf(name) === 0) {

                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }

        });
    };

}(jQuery));
