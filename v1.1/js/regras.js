/**
 * @package     Cattive.Site
 * @subpackage  Templates.cattive
 *
 * @copyright   Copyright (C) 2015, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* global  $, Pace, SelectFx, FForm, classie, DialogFx */

$(function () {
	$('.vamos-conversar').wrap('<div class="container-fluid bg-form-wrap"></div>');
	
	//Facebook
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3&appId=1490439691210886";
		fjs.parentNode.insertBefore(js, fjs);
	} (document, 'script', 'facebook-jssdk'));

	initForm();
	
	//Aqui começa o efeito da logo do bottom
	$(window).scroll(function () {
		var colocaLogo = 0;
		if ($(window).scrollTop() + $(window).height() == $(document).height()) {
			$('.aproveite').delay("medium").fadeOut('slow', function () {
				$('.img-cattive-bottom').fadeIn('slow');
				colocaLogo = 1;
			});
		}
		else  {
			$('.img-cattive-bottom').delay("medium").fadeOut('slow', function () {
				$('.aproveite').fadeIn('slow');
				colocaLogo = 0;
			});
		}
	});


	/* Ativador da "Wilma */
	var dlgTrigger = document.querySelectorAll('[data-dialog]');
	var someDialog, dlg;
	for (var i = 0; i < dlgTrigger.length; i++) {
		someDialog = document.getElementById(dlgTrigger[i].getAttribute('data-dialog'));
		dlg = new DialogFx(someDialog);
		dlgTrigger[i].addEventListener('click', dlg.toggle.bind(dlg));

	}
	
	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
      }
    });
	
	
	
});

function ajustaArquitetura() {
	var pai = $('.fs-continue').parents('.fs-form-wrap');
	var varContinue = $('.fs-continue').remove();
	var progress = $('.fs-progress').remove();
	
	pai.append(progress);
	pai.append(varContinue);
	$('button.fs-continue').wrap('<div class="container-btn-continue text-right"></div>');
	$('div.fs-progress').wrap('<div class="container"></div>');
}
	
//Form Full
function initForm() {
	var formWrap = document.getElementById('fs-form-wrap');

	[].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
		new SelectFx(el, {
			stickyPlaceholder: false,
			onChange: function (val) {
				document.querySelector('span.cs-placeholder').style.backgroundColor = val;
			}
		});
	});

	//Msg no final do form
	new FForm(formWrap, {
		onReview: function () {
			$('.fs-progress-grey').hide();
			$('.obrigado').fadeIn();
		}
	});

	ajustaArquitetura();
}