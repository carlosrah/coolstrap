/*!
 * iScroll v4.1.9 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(){var a=Math,b=function(a){return a>>0},c=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":/trident/i.test(navigator.userAgent)?"ms":"opera"in window?"O":"",d=/android/gi.test(navigator.appVersion),e=/iphone|ipad/gi.test(navigator.appVersion),f=/playbook/gi.test(navigator.appVersion),g=/hp-tablet/gi.test(navigator.appVersion),h="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,i="ontouchstart"in window&&!g,j=c+"Transform"in document.documentElement.style,k=e||f,l=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return setTimeout(a,1)}}(),m=function(){return window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}(),n="onorientationchange"in window?"orientationchange":"resize",o=i?"touchstart":"mousedown",p=i?"touchmove":"mousemove",q=i?"touchend":"mouseup",r=i?"touchcancel":"mouseup",s=c=="Moz"?"DOMMouseScroll":"mousewheel",t="translate"+(h?"3d(":"("),u=h?",0)":")",v=function(a,b){var f=this,g=document,l;f.wrapper=typeof a=="object"?a:g.getElementById(a),f.wrapper.style.overflow="hidden",f.scroller=f.wrapper.children[0],f.options={hScroll:!0,vScroll:!0,x:0,y:0,bounce:!0,bounceLock:!1,momentum:!0,lockDirection:!0,useTransform:!0,useTransition:!1,topOffset:0,checkDOMChanges:!1,hScrollbar:!0,vScrollbar:!0,fixedScrollbar:d,hideScrollbar:e,fadeScrollbar:e&&h,scrollbarClass:"",zoom:!1,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:!1,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(a){a.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(l in b)f.options[l]=b[l];f.x=f.options.x,f.y=f.options.y,f.options.useTransform=j?f.options.useTransform:!1,f.options.hScrollbar=f.options.hScroll&&f.options.hScrollbar,f.options.vScrollbar=f.options.vScroll&&f.options.vScrollbar,f.options.zoom=f.options.useTransform&&f.options.zoom,f.options.useTransition=k&&f.options.useTransition,f.options.zoom&&d&&(t="translate(",u=")"),f.scroller.style[c+"TransitionProperty"]=f.options.useTransform?"-"+c.toLowerCase()+"-transform":"top left",f.scroller.style[c+"TransitionDuration"]="0",f.scroller.style[c+"TransformOrigin"]="0 0",f.options.useTransition&&(f.scroller.style[c+"TransitionTimingFunction"]="cubic-bezier(0.33,0.66,0.66,1)"),f.options.useTransform?f.scroller.style[c+"Transform"]=t+f.x+"px,"+f.y+"px"+u:f.scroller.style.cssText+=";position:absolute;top:"+f.y+"px;left:"+f.x+"px",f.options.useTransition&&(f.options.fixedScrollbar=!0),f.refresh(),f._bind(n,window),f._bind(o),i||(f._bind("mouseout",f.wrapper),f.options.wheelAction!="none"&&f._bind(s)),f.options.checkDOMChanges&&(f.checkDOMTime=setInterval(function(){f._checkDOMChanges()},500))};v.prototype={enabled:!0,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(a){var b=this;switch(a.type){case o:if(!i&&a.button!==0)return;b._start(a);break;case p:b._move(a);break;case q:case r:b._end(a);break;case n:b._resize();break;case s:b._wheel(a);break;case"mouseout":b._mouseout(a);break;case"webkitTransitionEnd":b._transitionEnd(a)}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)return;this.refresh()},_scrollbar:function(d){var e=this,f=document,g;if(!e[d+"Scrollbar"]){e[d+"ScrollbarWrapper"]&&(j&&(e[d+"ScrollbarIndicator"].style[c+"Transform"]=""),e[d+"ScrollbarWrapper"].parentNode.removeChild(e[d+"ScrollbarWrapper"]),e[d+"ScrollbarWrapper"]=null,e[d+"ScrollbarIndicator"]=null);return}e[d+"ScrollbarWrapper"]||(g=f.createElement("div"),e.options.scrollbarClass?g.className=e.options.scrollbarClass+d.toUpperCase():g.style.cssText="position:absolute;z-index:100;"+(d=="h"?"height:7px;bottom:1px;left:2px;right:"+(e.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(e.hScrollbar?"7":"2")+"px;top:2px;right:1px"),g.style.cssText+=";pointer-events:none;-"+c+"-transition-property:opacity;-"+c+"-transition-duration:"+(e.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(e.options.hideScrollbar?"0":"1"),e.wrapper.appendChild(g),e[d+"ScrollbarWrapper"]=g,g=f.createElement("div"),e.options.scrollbarClass||(g.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-"+c+"-background-clip:padding-box;-"+c+"-box-sizing:border-box;"+(d=="h"?"height:100%":"width:100%")+";-"+c+"-border-radius:3px;border-radius:3px"),g.style.cssText+=";pointer-events:none;-"+c+"-transition-property:-"+c+"-transform;-"+c+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-"+c+"-transition-duration:0;-"+c+"-transform:"+t+"0,0"+u,e.options.useTransition&&(g.style.cssText+=";-"+c+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"),e[d+"ScrollbarWrapper"].appendChild(g),e[d+"ScrollbarIndicator"]=g),d=="h"?(e.hScrollbarSize=e.hScrollbarWrapper.clientWidth,e.hScrollbarIndicatorSize=a.max(b(e.hScrollbarSize*e.hScrollbarSize/e.scrollerW),8),e.hScrollbarIndicator.style.width=e.hScrollbarIndicatorSize+"px",e.hScrollbarMaxScroll=e.hScrollbarSize-e.hScrollbarIndicatorSize,e.hScrollbarProp=e.hScrollbarMaxScroll/e.maxScrollX):(e.vScrollbarSize=e.vScrollbarWrapper.clientHeight,e.vScrollbarIndicatorSize=a.max(b(e.vScrollbarSize*e.vScrollbarSize/e.scrollerH),8),e.vScrollbarIndicator.style.height=e.vScrollbarIndicatorSize+"px",e.vScrollbarMaxScroll=e.vScrollbarSize-e.vScrollbarIndicatorSize,e.vScrollbarProp=e.vScrollbarMaxScroll/e.maxScrollY),e._scrollbarPos(d,!0)},_resize:function(){var a=this;setTimeout(function(){a.refresh()},d?200:0)},_pos:function(a,d){a=this.hScroll?a:0,d=this.vScroll?d:0,this.options.useTransform?this.scroller.style[c+"Transform"]=t+a+"px,"+d+"px"+u+" scale("+this.scale+")":(a=b(a),d=b(d),this.scroller.style.left=a+"px",this.scroller.style.top=d+"px"),this.x=a,this.y=d,this._scrollbarPos("h"),this._scrollbarPos("v")},_scrollbarPos:function(a,d){var e=this,f=a=="h"?e.x:e.y,g;if(!e[a+"Scrollbar"])return;f=e[a+"ScrollbarProp"]*f,f<0?(e.options.fixedScrollbar||(g=e[a+"ScrollbarIndicatorSize"]+b(f*3),g<8&&(g=8),e[a+"ScrollbarIndicator"].style[a=="h"?"width":"height"]=g+"px"),f=0):f>e[a+"ScrollbarMaxScroll"]&&(e.options.fixedScrollbar?f=e[a+"ScrollbarMaxScroll"]:(g=e[a+"ScrollbarIndicatorSize"]-b((f-e[a+"ScrollbarMaxScroll"])*3),g<8&&(g=8),e[a+"ScrollbarIndicator"].style[a=="h"?"width":"height"]=g+"px",f=e[a+"ScrollbarMaxScroll"]+(e[a+"ScrollbarIndicatorSize"]-g))),e[a+"ScrollbarWrapper"].style[c+"TransitionDelay"]="0",e[a+"ScrollbarWrapper"].style.opacity=d&&e.options.hideScrollbar?"0":"1",e[a+"ScrollbarIndicator"].style[c+"Transform"]=t+(a=="h"?f+"px,0":"0,"+f+"px")+u},_start:function(b){var d=this,e=i?b.touches[0]:b,f,g,h,j,k;if(!d.enabled)return;d.options.onBeforeScrollStart&&d.options.onBeforeScrollStart.call(d,b),(d.options.useTransition||d.options.zoom)&&d._transitionTime(0),d.moved=!1,d.animating=!1,d.zoomed=!1,d.distX=0,d.distY=0,d.absDistX=0,d.absDistY=0,d.dirX=0,d.dirY=0,d.options.zoom&&i&&b.touches.length>1&&(j=a.abs(b.touches[0].pageX-b.touches[1].pageX),k=a.abs(b.touches[0].pageY-b.touches[1].pageY),d.touchesDistStart=a.sqrt(j*j+k*k),d.originX=a.abs(b.touches[0].pageX+b.touches[1].pageX-d.wrapperOffsetLeft*2)/2-d.x,d.originY=a.abs(b.touches[0].pageY+b.touches[1].pageY-d.wrapperOffsetTop*2)/2-d.y,d.options.onZoomStart&&d.options.onZoomStart.call(d,b));if(d.options.momentum){d.options.useTransform?(f=getComputedStyle(d.scroller,null)[c+"Transform"].replace(/[^0-9-.,]/g,"").split(","),g=f[4]*1,h=f[5]*1):(g=getComputedStyle(d.scroller,null).left.replace(/[^0-9-]/g,"")*1,h=getComputedStyle(d.scroller,null).top.replace(/[^0-9-]/g,"")*1);if(g!=d.x||h!=d.y)d.options.useTransition?d._unbind("webkitTransitionEnd"):m(d.aniTime),d.steps=[],d._pos(g,h)}d.absStartX=d.x,d.absStartY=d.y,d.startX=d.x,d.startY=d.y,d.pointX=e.pageX,d.pointY=e.pageY,d.startTime=b.timeStamp||Date.now(),d.options.onScrollStart&&d.options.onScrollStart.call(d,b),d._bind(p),d._bind(q),d._bind(r)},_move:function(b){var d=this,e=i?b.touches[0]:b,f=e.pageX-d.pointX,g=e.pageY-d.pointY,h=d.x+f,j=d.y+g,k,l,m,n=b.timeStamp||Date.now();d.options.onBeforeScrollMove&&d.options.onBeforeScrollMove.call(d,b);if(d.options.zoom&&i&&b.touches.length>1){k=a.abs(b.touches[0].pageX-b.touches[1].pageX),l=a.abs(b.touches[0].pageY-b.touches[1].pageY),d.touchesDist=a.sqrt(k*k+l*l),d.zoomed=!0,m=1/d.touchesDistStart*d.touchesDist*this.scale,m<d.options.zoomMin?m=.5*d.options.zoomMin*Math.pow(2,m/d.options.zoomMin):m>d.options.zoomMax&&(m=2*d.options.zoomMax*Math.pow(.5,d.options.zoomMax/m)),d.lastScale=m/this.scale,h=this.originX-this.originX*d.lastScale+this.x,j=this.originY-this.originY*d.lastScale+this.y,this.scroller.style[c+"Transform"]=t+h+"px,"+j+"px"+u+" scale("+m+")",d.options.onZoom&&d.options.onZoom.call(d,b);return}d.pointX=e.pageX,d.pointY=e.pageY;if(h>0||h<d.maxScrollX)h=d.options.bounce?d.x+f/2:h>=0||d.maxScrollX>=0?0:d.maxScrollX;if(j>d.minScrollY||j<d.maxScrollY)j=d.options.bounce?d.y+g/2:j>=d.minScrollY||d.maxScrollY>=0?d.minScrollY:d.maxScrollY;d.distX+=f,d.distY+=g,d.absDistX=a.abs(d.distX),d.absDistY=a.abs(d.distY);if(d.absDistX<6&&d.absDistY<6)return;d.options.lockDirection&&(d.absDistX>d.absDistY+5?(j=d.y,g=0):d.absDistY>d.absDistX+5&&(h=d.x,f=0)),d.moved=!0,d._pos(h,j),d.dirX=f>0?-1:f<0?1:0,d.dirY=g>0?-1:g<0?1:0,n-d.startTime>300&&(d.startTime=n,d.startX=d.x,d.startY=d.y),d.options.onScrollMove&&d.options.onScrollMove.call(d,b)},_end:function(d){if(i&&d.touches.length!=0)return;var e=this,f=i?d.changedTouches[0]:d,g,h,j={dist:0,time:0},k={dist:0,time:0},l=(d.timeStamp||Date.now())-e.startTime,m=e.x,n=e.y,o,s,v,w,x;e._unbind(p),e._unbind(q),e._unbind(r),e.options.onBeforeScrollEnd&&e.options.onBeforeScrollEnd.call(e,d);if(e.zoomed){x=e.scale*e.lastScale,x=Math.max(e.options.zoomMin,x),x=Math.min(e.options.zoomMax,x),e.lastScale=x/e.scale,e.scale=x,e.x=e.originX-e.originX*e.lastScale+e.x,e.y=e.originY-e.originY*e.lastScale+e.y,e.scroller.style[c+"TransitionDuration"]="200ms",e.scroller.style[c+"Transform"]=t+e.x+"px,"+e.y+"px"+u+" scale("+e.scale+")",e.zoomed=!1,e.refresh(),e.options.onZoomEnd&&e.options.onZoomEnd.call(e,d);return}if(!e.moved){i&&(e.doubleTapTimer&&e.options.zoom?(clearTimeout(e.doubleTapTimer),e.doubleTapTimer=null,e.options.onZoomStart&&e.options.onZoomStart.call(e,d),e.zoom(e.pointX,e.pointY,e.scale==1?e.options.doubleTapZoom:1),e.options.onZoomEnd&&setTimeout(function(){e.options.onZoomEnd.call(e,d)},200)):e.doubleTapTimer=setTimeout(function(){e.doubleTapTimer=null,g=f.target;while(g.nodeType!=1)g=g.parentNode;g.tagName!="SELECT"&&g.tagName!="INPUT"&&g.tagName!="TEXTAREA"&&(h=document.createEvent("MouseEvents"),h.initMouseEvent("click",!0,!0,d.view,1,f.screenX,f.screenY,f.clientX,f.clientY,d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,0,null),h._fake=!0,g.dispatchEvent(h))},e.options.zoom?250:0)),e._resetPos(200),e.options.onTouchEnd&&e.options.onTouchEnd.call(e,d);return}if(l<300&&e.options.momentum){j=m?e._momentum(m-e.startX,l,-e.x,e.scrollerW-e.wrapperW+e.x,e.options.bounce?e.wrapperW:0):j,k=n?e._momentum(n-e.startY,l,-e.y,e.maxScrollY<0?e.scrollerH-e.wrapperH+e.y-e.minScrollY:0,e.options.bounce?e.wrapperH:0):k,m=e.x+j.dist,n=e.y+k.dist;if(e.x>0&&m>0||e.x<e.maxScrollX&&m<e.maxScrollX)j={dist:0,time:0};if(e.y>e.minScrollY&&n>e.minScrollY||e.y<e.maxScrollY&&n<e.maxScrollY)k={dist:0,time:0}}if(j.dist||k.dist){v=a.max(a.max(j.time,k.time),10),e.options.snap&&(o=m-e.absStartX,s=n-e.absStartY,a.abs(o)<e.options.snapThreshold&&a.abs(s)<e.options.snapThreshold?e.scrollTo(e.absStartX,e.absStartY,200):(w=e._snap(m,n),m=w.x,n=w.y,v=a.max(w.time,v))),e.scrollTo(b(m),b(n),v),e.options.onTouchEnd&&e.options.onTouchEnd.call(e,d);return}if(e.options.snap){o=m-e.absStartX,s=n-e.absStartY,a.abs(o)<e.options.snapThreshold&&a.abs(s)<e.options.snapThreshold?e.scrollTo(e.absStartX,e.absStartY,200):(w=e._snap(e.x,e.y),(w.x!=e.x||w.y!=e.y)&&e.scrollTo(w.x,w.y,w.time)),e.options.onTouchEnd&&e.options.onTouchEnd.call(e,d);return}e._resetPos(200),e.options.onTouchEnd&&e.options.onTouchEnd.call(e,d)},_resetPos:function(a){var b=this,d=b.x>=0?0:b.x<b.maxScrollX?b.maxScrollX:b.x,e=b.y>=b.minScrollY||b.maxScrollY>0?b.minScrollY:b.y<b.maxScrollY?b.maxScrollY:b.y;if(d==b.x&&e==b.y){b.moved&&(b.moved=!1,b.options.onScrollEnd&&b.options.onScrollEnd.call(b)),b.hScrollbar&&b.options.hideScrollbar&&(c=="webkit"&&(b.hScrollbarWrapper.style[c+"TransitionDelay"]="300ms"),b.hScrollbarWrapper.style.opacity="0"),b.vScrollbar&&b.options.hideScrollbar&&(c=="webkit"&&(b.vScrollbarWrapper.style[c+"TransitionDelay"]="300ms"),b.vScrollbarWrapper.style.opacity="0");return}b.scrollTo(d,e,a||0)},_wheel:function(a){var b=this,c,d,e,f,g;if("wheelDeltaX"in a)c=a.wheelDeltaX/12,d=a.wheelDeltaY/12;else if("wheelDelta"in a)c=d=a.wheelDelta/12;else if("detail"in a)c=d=-a.detail*3;else return;if(b.options.wheelAction=="zoom"){g=b.scale*Math.pow(2,1/3*(d?d/Math.abs(d):0)),g<b.options.zoomMin&&(g=b.options.zoomMin),g>b.options.zoomMax&&(g=b.options.zoomMax),g!=b.scale&&(!b.wheelZoomCount&&b.options.onZoomStart&&b.options.onZoomStart.call(b,a),b.wheelZoomCount++,b.zoom(a.pageX,a.pageY,g,400),setTimeout(function(){b.wheelZoomCount--,!b.wheelZoomCount&&b.options.onZoomEnd&&b.options.onZoomEnd.call(b,a)},400));return}e=b.x+c,f=b.y+d,e>0?e=0:e<b.maxScrollX&&(e=b.maxScrollX),f>b.minScrollY?f=b.minScrollY:f<b.maxScrollY&&(f=b.maxScrollY),b.scrollTo(e,f,0)},_mouseout:function(a){var b=a.relatedTarget;if(!b){this._end(a);return}while(b=b.parentNode)if(b==this.wrapper)return;this._end(a)},_transitionEnd:function(a){var b=this;if(a.target!=b.scroller)return;b._unbind("webkitTransitionEnd"),b._startAni()},_startAni:function(){var b=this,c=b.x,d=b.y,e=Date.now(),f,g,h;if(b.animating)return;if(!b.steps.length){b._resetPos(400);return}f=b.steps.shift(),f.x==c&&f.y==d&&(f.time=0),b.animating=!0,b.moved=!0;if(b.options.useTransition){b._transitionTime(f.time),b._pos(f.x,f.y),b.animating=!1,f.time?b._bind("webkitTransitionEnd"):b._resetPos(0);return}h=function(){var i=Date.now(),j,k;if(i>=e+f.time){b._pos(f.x,f.y),b.animating=!1,b.options.onAnimationEnd&&b.options.onAnimationEnd.call(b),b._startAni();return}i=(i-e)/f.time-1,g=a.sqrt(1-i*i),j=(f.x-c)*g+c,k=(f.y-d)*g+d,b._pos(j,k),b.animating&&(b.aniTime=l(h))},h()},_transitionTime:function(a){a+="ms",this.scroller.style[c+"TransitionDuration"]=a,this.hScrollbar&&(this.hScrollbarIndicator.style[c+"TransitionDuration"]=a),this.vScrollbar&&(this.vScrollbarIndicator.style[c+"TransitionDuration"]=a)},_momentum:function(c,d,e,f,g){var h=6e-4,i=a.abs(c)/d,j=i*i/(2*h),k=0,l=0;return c>0&&j>e?(l=g/(6/(j/i*h)),e+=l,i=i*e/j,j=e):c<0&&j>f&&(l=g/(6/(j/i*h)),f+=l,i=i*f/j,j=f),j*=c<0?-1:1,k=i/h,{dist:j,time:b(k)}},_offset:function(a){var b=-a.offsetLeft,c=-a.offsetTop;while(a=a.offsetParent)b-=a.offsetLeft,c-=a.offsetTop;return a!=this.wrapper&&(b*=this.scale,c*=this.scale),{left:b,top:c}},_snap:function(c,d){var e=this,f,g,h,i,j,k;h=e.pagesX.length-1;for(f=0,g=e.pagesX.length;f<g;f++)if(c>=e.pagesX[f]){h=f;break}h==e.currPageX&&h>0&&e.dirX<0&&h--,c=e.pagesX[h],j=a.abs(c-e.pagesX[e.currPageX]),j=j?a.abs(e.x-c)/j*500:0,e.currPageX=h,h=e.pagesY.length-1;for(f=0;f<h;f++)if(d>=e.pagesY[f]){h=f;break}return h==e.currPageY&&h>0&&e.dirY<0&&h--,d=e.pagesY[h],k=a.abs(d-e.pagesY[e.currPageY]),k=k?a.abs(e.y-d)/k*500:0,e.currPageY=h,i=b(a.max(j,k))||200,{x:c,y:d,time:i}},_bind:function(a,b,c){(b||this.scroller).addEventListener(a,this,!!c)},_unbind:function(a,b,c){(b||this.scroller).removeEventListener(a,this,!!c)},destroy:function(){var a=this;a.scroller.style[c+"Transform"]="",a.hScrollbar=!1,a.vScrollbar=!1,a._scrollbar("h"),a._scrollbar("v"),a._unbind(n,window),a._unbind(o),a._unbind(p),a._unbind(q),a._unbind(r),a.options.hasTouch||(a._unbind("mouseout",a.wrapper),a._unbind(s)),a.options.useTransition&&a._unbind("webkitTransitionEnd"),a.options.checkDOMChanges&&clearInterval(a.checkDOMTime),a.options.onDestroy&&a.options.onDestroy.call(a)},refresh:function(){var a=this,d,e,f,g,h=0,i=0;a.scale<a.options.zoomMin&&(a.scale=a.options.zoomMin),a.wrapperW=a.wrapper.clientWidth||1,a.wrapperH=a.wrapper.clientHeight||1,a.minScrollY=-a.options.topOffset||0,a.scrollerW=b(a.scroller.offsetWidth*a.scale),a.scrollerH=b((a.scroller.offsetHeight+a.minScrollY)*a.scale),a.maxScrollX=a.wrapperW-a.scrollerW,a.maxScrollY=a.wrapperH-a.scrollerH+a.minScrollY,a.dirX=0,a.dirY=0,a.options.onRefresh&&a.options.onRefresh.call(a),a.hScroll=a.options.hScroll&&a.maxScrollX<0,a.vScroll=a.options.vScroll&&(!a.options.bounceLock&&!a.hScroll||a.scrollerH>a.wrapperH),a.hScrollbar=a.hScroll&&a.options.hScrollbar,a.vScrollbar=a.vScroll&&a.options.vScrollbar&&a.scrollerH>a.wrapperH,d=a._offset(a.wrapper),a.wrapperOffsetLeft=-d.left,a.wrapperOffsetTop=-d.top;if(typeof a.options.snap=="string"){a.pagesX=[],a.pagesY=[],g=a.scroller.querySelectorAll(a.options.snap);for(e=0,f=g.length;e<f;e++)h=a._offset(g[e]),h.left+=a.wrapperOffsetLeft,h.top+=a.wrapperOffsetTop,a.pagesX[e]=h.left<a.maxScrollX?a.maxScrollX:h.left*a.scale,a.pagesY[e]=h.top<a.maxScrollY?a.maxScrollY:h.top*a.scale}else if(a.options.snap){a.pagesX=[];while(h>=a.maxScrollX)a.pagesX[i]=h,h-=a.wrapperW,i++;a.maxScrollX%a.wrapperW&&(a.pagesX[a.pagesX.length]=a.maxScrollX-a.pagesX[a.pagesX.length-1]+a.pagesX[a.pagesX.length-1]),h=0,i=0,a.pagesY=[];while(h>=a.maxScrollY)a.pagesY[i]=h,h-=a.wrapperH,i++;a.maxScrollY%a.wrapperH&&(a.pagesY[a.pagesY.length]=a.maxScrollY-a.pagesY[a.pagesY.length-1]+a.pagesY[a.pagesY.length-1])}a._scrollbar("h"),a._scrollbar("v"),a.zoomed||(a.scroller.style[c+"TransitionDuration"]="0",a._resetPos(200))},scrollTo:function(a,b,c,d){var e=this,f=a,g,h;e.stop(),f.length||(f=[{x:a,y:b,time:c,relative:d}]);for(g=0,h=f.length;g<h;g++)f[g].relative&&(f[g].x=e.x-f[g].x,f[g].y=e.y-f[g].y),e.steps.push({x:f[g].x,y:f[g].y,time:f[g].time||0});e._startAni()},scrollToElement:function(b,c){var d=this,e;b=b.nodeType?b:d.scroller.querySelector(b);if(!b)return;e=d._offset(b),e.left+=d.wrapperOffsetLeft,e.top+=d.wrapperOffsetTop,e.left=e.left>0?0:e.left<d.maxScrollX?d.maxScrollX:e.left,e.top=e.top>d.minScrollY?d.minScrollY:e.top<d.maxScrollY?d.maxScrollY:e.top,c=c===undefined?a.max(a.abs(e.left)*2,a.abs(e.top)*2):c,d.scrollTo(e.left,e.top,c)},scrollToPage:function(a,b,c){var d=this,e,f;c=c===undefined?400:c,d.options.onScrollStart&&d.options.onScrollStart.call(d),d.options.snap?(a=a=="next"?d.currPageX+1:a=="prev"?d.currPageX-1:a,b=b=="next"?d.currPageY+1:b=="prev"?d.currPageY-1:b,a=a<0?0:a>d.pagesX.length-1?d.pagesX.length-1:a,b=b<0?0:b>d.pagesY.length-1?d.pagesY.length-1:b,d.currPageX=a,d.currPageY=b,e=d.pagesX[a],f=d.pagesY[b]):(e=-d.wrapperW*a,f=-d.wrapperH*b,e<d.maxScrollX&&(e=d.maxScrollX),f<d.maxScrollY&&(f=d.maxScrollY)),d.scrollTo(e,f,c)},disable:function(){this.stop(),this._resetPos(0),this.enabled=!1,this._unbind(p),this._unbind(q),this._unbind(r)},enable:function(){this.enabled=!0},stop:function(){this.options.useTransition?this._unbind("webkitTransitionEnd"):m(this.aniTime),this.steps=[],this.moved=!1,this.animating=!1},zoom:function(a,b,d,e){var f=this,g=d/f.scale;if(!f.options.useTransform)return;f.zoomed=!0,e=e===undefined?200:e,a=a-f.wrapperOffsetLeft-f.x,b=b-f.wrapperOffsetTop-f.y,f.x=a-a*g+f.x,f.y=b-b*g+f.y,f.scale=d,f.refresh(),f.x=f.x>0?0:f.x<f.maxScrollX?f.maxScrollX:f.x,f.y=f.y>f.minScrollY?f.minScrollY:f.y<f.maxScrollY?f.maxScrollY:f.y,f.scroller.style[c+"TransitionDuration"]=e+"ms",f.scroller.style[c+"Transform"]=t+f.x+"px,"+f.y+"px"+u+" scale("+d+")",f.zoomed=!1},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating}},typeof exports!="undefined"?exports.iScroll=v:window.iScroll=v})()