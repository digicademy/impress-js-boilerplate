/*
 Copyright (c) 2016 Tanay PrabhuDesai

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
var initSlideNo = function (obj) {

	var impressApi = obj;
	var slideNo = 1;
	var toSlideStr = "";
	var slides = [];

	var div = document.createElement('div');
	div.id = 'slide-div';
	div.setAttribute('class', 'slide-div-'+slideNo);
	div.innerHTML = "<p id='slide-text'>"+slideNo+"</p>";

	document.body.appendChild(div);

	document.body.onresize = function() {
		var x = window.innerWidth;
		var y = window.innerHeight;
		div.style.marginTop = -y;
		div.style.marginLeft = -x;
	}

	var arrayify = function ( a ) {
		return [].slice.call( a );
	};

	var $$ = function ( selector, context ) {
		context = context || document;
		return arrayify( context.querySelectorAll(selector) );
	};

	var getSlides = function (elem, i, arr) {
		slides.push(elem.id);
	}

	var steps = $$(".step", impress.root);
	steps.forEach(getSlides);

	document.addEventListener("impress:stepenter", function (e) {
		var x = window.innerWidth;
		var y = window.innerHeight;
		var time = new Date().toLocaleTimeString('de-DE', { hour: "numeric", minute: "numeric"});
		div.style.paddingTop = -y;
		div.style.paddingLeft = -x;
		slideNo = slides.indexOf(e.target.id)+1;
		div.setAttribute('class', 'slide-div-'+slideNo);
		div.innerHTML = "<p id='slide-text'>"+slideNo+" / "+slides.length+" ("+time+")</p>";
	});

	var keyEventHandler = function(oEvent) {
		var oEvent = oEvent || window.event;
		var code = oEvent.keyCode || oEvent.charCode;
		if (code >= 48 && code <= 57) {
			toSlideStr += (code-48)+"";
			console.log(toSlideStr);
		} else if (code == 13) {
			var toSlide = Number(toSlideStr);
			toSlideStr = "";
			if(toSlide <= slides.length && toSlide > 0) {
				impressApi.goto(slides[toSlide-1]);
			}
		}
	};

	document.addEventListener("keypress", keyEventHandler);

};