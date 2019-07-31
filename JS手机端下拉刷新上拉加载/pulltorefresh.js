var refresher = {
	info: {
		"pullDownLable": "下拉刷新...",
		"pullingDownLable": "松手刷新...",
		"pullUpLable": "加载更多...",
		"pullingUpLable": "松手加载...",
		"loadingLable": "加载中..."
	},
	init: function(parameter) {
		var komoWrapper = document.getElementById(parameter.id);
		var div = document.createElement("div");
		div.className = "komo-scroller";
		komoWrapper.appendChild(div);
		var scroller = komoWrapper.querySelector(".komo-scroller");
		var list = komoWrapper.querySelector("#" + parameter.id + " .komo-scroll-box");
		scroller.insertBefore(list, scroller.childNodes[0]);
		var pullDown = document.createElement("div");
		pullDown.className = "komo-pullDown";
		var loader = document.createElement("div");
		loader.className = "komo-loader";
		for (var i = 0; i < 3; i++) {
			var span = document.createElement("span");
			loader.appendChild(span);
		}
		pullDown.appendChild(loader);
		var pullDownLabel = document.createElement("div");
		pullDownLabel.className = "komo-pullDownLabel";
		pullDown.appendChild(pullDownLabel);
		scroller.insertBefore(pullDown, scroller.childNodes[0]);
		var pullUp = document.createElement("div");
		pullUp.className = "komo-pullUp";
		var loader = document.createElement("div");
		loader.className = "komo-loader";
		for (var i = 0; i < 3; i++) {
			var span = document.createElement("span");
			loader.appendChild(span);
		}
		pullUp.appendChild(loader);
		var pullUpLabel = document.createElement("div");
		pullUpLabel.className = "komo-pullUpLabel";
		var content = document.createTextNode(refresher.info.pullUpLable);
		pullUpLabel.appendChild(content);
		pullUp.appendChild(pullUpLabel);
		scroller.appendChild(pullUp);
		var pullDownEl = komoWrapper.querySelector(".komo-pullDown");
		var pullDownOffset = pullDownEl.offsetHeight;
		var pullUpEl = komoWrapper.querySelector(".komo-pullUp");
		var pullUpOffset = pullUpEl.offsetHeight;
		this.scrollIt(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset);
	},
	scrollIt: function(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset) {
		eval(parameter.id + "= new iScroll(parameter.id, {useTransition: true,vScrollbar: false,topOffset: pullDownOffset,onRefresh: function () {refresher.onRelease(pullDownEl,pullUpEl);},onScrollMove: function () {refresher.onScrolling(this,pullDownEl,pullUpEl,pullUpOffset);},onScrollEnd: function () {refresher.onPulling(pullDownEl,parameter.pullDownAction,pullUpEl,parameter.pullUpAction);},})");
		pullDownEl.querySelector('.komo-pullDownLabel').innerHTML = refresher.info.pullDownLable;
		// document.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// }, false);
	},
	onScrolling: function(e, pullDownEl, pullUpEl, pullUpOffset) {
		if (e.y > -(pullUpOffset)) {
			pullDownEl.id = '';
			pullDownEl.querySelector('.komo-pullDownLabel').innerHTML = refresher.info.pullDownLable;
			e.minScrollY = -pullUpOffset;
		}
		if (e.y > 0) {
			pullDownEl.classList.add("komo-flip");
			pullDownEl.querySelector('.komo-pullDownLabel').innerHTML = refresher.info.pullingDownLable;
			e.minScrollY = 0;
		}
		if (e.scrollerH < e.wrapperH && e.y < (e.minScrollY - pullUpOffset) || e.scrollerH > e.wrapperH && e.y < (e.maxScrollY - pullUpOffset)) {
			pullUpEl.style.display = "block";
			pullUpEl.classList.add("komo-flip");
			pullUpEl.querySelector('.komo-pullUpLabel').innerHTML = refresher.info.pullingUpLable;
		}
		if (e.scrollerH < e.wrapperH && e.y > (e.minScrollY - pullUpOffset) && pullUpEl.id.match('komo-flip') || e.scrollerH > e.wrapperH && e.y > (e.maxScrollY - pullUpOffset) && pullUpEl.id.match('komo-flip')) {
			pullDownEl.classList.remove("komo-flip");
			pullUpEl.querySelector('.komo-pullUpLabel').innerHTML = refresher.info.pullUpLable;
		}
	},
	onRelease: function(pullDownEl, pullUpEl) {
		if (pullDownEl.className.match('komo-loading')) {
			pullDownEl.classList.toggle("komo-loading");
			pullDownEl.querySelector('.komo-pullDownLabel').innerHTML = refresher.info.pullDownLable;
			pullDownEl.querySelector('.komo-loader').style.display = "none"
			pullDownEl.style.lineHeight = pullDownEl.offsetHeight + "px";
		}
		if (pullUpEl.className.match('komo-loading')) {
			pullUpEl.classList.toggle("komo-loading");
			pullUpEl.querySelector('.komo-pullUpLabel').innerHTML = refresher.info.pullUpLable;
			pullUpEl.querySelector('.komo-loader').style.display = "none"
			pullUpEl.style.lineHeight = pullUpEl.offsetHeight + "px";
		}
	},
	onPulling: function(pullDownEl, pullDownAction, pullUpEl, pullUpAction) {
		if (pullDownEl.className.match('komo-flip') /*&&!pullUpEl.className.match('loading')*/ ) {
			pullDownEl.classList.add("komo-loading");
			pullDownEl.classList.remove("komo-flip");
			pullDownEl.querySelector('.komo-pullDownLabel').innerHTML = refresher.info.loadingLable;
			pullDownEl.querySelector('.komo-loader').style.display = "block"
			pullDownEl.style.lineHeight = "20px";
			if (pullDownAction) pullDownAction();
		}
		if (pullUpEl.className.match('komo-flip') /*&&!pullDownEl.className.match('loading')*/ ) {
			pullUpEl.classList.add("komo-loading");
			pullUpEl.classList.remove("komo-flip");
			pullUpEl.querySelector('.komo-pullUpLabel').innerHTML = refresher.info.loadingLable;
			pullUpEl.querySelector('.komo-loader').style.display = "block"
			pullUpEl.style.lineHeight = "20px";
			if (pullUpAction) pullUpAction();
		}
	}
}