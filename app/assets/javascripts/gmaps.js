/*
 *  GMAP3 Plugin for JQuery 
 *  Version   : 4.1
 *  Date      : 2011-11-18
 *  Licence   : GPL v3 : http://www.gnu.org/licenses/gpl.html  
 *  Author    : DEMONTE Jean-Baptiste
 *  Contact   : jbdemonte@gmail.com
 *  Web site  : http://gmap3.net
 *   
 *  Copyright (c) 2010-2011 Jean-Baptiste DEMONTE
 *  All rights reserved.
 *   
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 * 
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above 
 *     copyright notice, this list of conditions and the following 
 *     disclaimer in the documentation and/or other materials provided 
 *     with the distribution.
 *   - Neither the name of the author nor the names of its contributors 
 *     may be used to endorse or promote products derived from this 
 *     software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */
 
(function(c){function q(){var D=[];this.empty=function(){for(var E=0;E<D.length;E++){if(D[E]){return false}}return true};this.add=function(E){D.push(E)};this.addNext=function(F){var H=[],G,E=0;for(G=0;G<D.length;G++){if(!D[G]){continue}if(E==1){H.push(F)}H.push(D[G]);E++}if(E<2){H.push(F)}D=H};this.get=function(){for(var E=0;E<D.length;E++){if(D[E]){return D[E]}}return false};this.ack=function(){for(var E=0;E<D.length;E++){if(D[E]){delete D[E];break}}if(this.empty()){D=[]}}}function o(){var D={};this.add=function(F,G,E){F=F.toLowerCase();if(!D[F]){D[F]=[]}D[F].push({obj:G,tag:s(E,"tag")});return F+"-"+(D[F].length-1)};this.get=function(G,I,F){var H,E,J;G=G.toLowerCase();if(!D[G]||!D[G].length){return null}E=I?D[G].length:-1;J=I?-1:1;for(H=0;H<D[G].length;H++){E+=J;if(D[G][E]){if(F!==undefined){if((D[G][E].tag===undefined)||(c.inArray(D[G][E].tag,F)<0)){continue}}return D[G][E].obj}}return null};this.all=function(G,F){var H,E=[];G=G.toLowerCase();if(!D[G]||!D[G].length){return E}for(H=0;H<D[G].length;H++){if(!D[G][H]){continue}if((F!==undefined)&&((D[G][H].tag===undefined)||(c.inArray(D[G][H].tag,F)<0))){continue}E.push(D[G][H].obj)}return E};this.names=function(){var F,E=[];for(F in D){E.push(F)}return E};this.refToObj=function(E){E=E.split("-");if((E.length==2)&&D[E[0]]&&D[E[0]][E[1]]){return D[E[0]][E[1]].obj}return null};this.rm=function(H,F,G){var E,J,I;H=H.toLowerCase();if(!D[H]){return false}if(F!==undefined){if(G){for(E=D[H].length-1;E>=0;E--){if((D[H][E]!==undefined)&&(D[H][E].tag!==undefined)&&(c.inArray(D[H][E].tag,F)>=0)){break}}}else{for(E=0;E<D[H].length;E++){if((D[H][E]!==undefined)&&(D[H][E].tag!==undefined)&&(c.inArray(D[H][E].tag,F)>=0)){break}}}}else{E=G?D[H].length-1:0}if(!(E in D[H])){return false}if(typeof(D[H][E].obj.setMap)==="function"){D[H][E].obj.setMap(null)}if(typeof(D[H][E].obj.remove)==="function"){D[H][E].obj.remove()}if(typeof(D[H][E].obj.free)==="function"){D[H][E].obj.free()}delete D[H][E].obj;if(F!==undefined){I=[];for(J=0;J<D[H].length;J++){if(J!==E){I.push(D[H][J])}}D[H]=I}else{if(G){D[H].pop()}else{D[H].shift()}}return true};this.clear=function(J,I,K,E){var F,H,G;if(!J||!J.length){J=[];for(F in D){J.push(F)}}else{J=g(J)}for(H=0;H<J.length;H++){if(J[H]){G=J[H].toLowerCase();if(!D[G]){continue}if(I){this.rm(G,E,true)}else{if(K){this.rm(G,E,false)}else{while(this.rm(G,E,false)){}}}}}}}function z(){var H=[],E=[],F=[],D=[],G=false,I;this.events=function(){for(var J=0;J<arguments.length;J++){E.push(arguments[J])}};this.startRedraw=function(){if(!G){G=true;return true}return false};this.endRedraw=function(){G=false};this.redraw=function(){var K,J=[],L=this;for(K=0;K<arguments.length;K++){J.push(arguments[K])}if(this.startRedraw){I.apply(L,J);this.endRedraw()}else{setTimeout(function(){L.redraw.apply(L,J)},50)}};this.setRedraw=function(J){I=J};this.store=function(J,K,L){F.push({data:J,obj:K,shadow:L})};this.free=function(){for(var J=0;J<E.length;J++){google.maps.event.removeListener(E[J])}E=[];this.freeAll()};this.freeIndex=function(J){if(typeof(F[J].obj.setMap)==="function"){F[J].obj.setMap(null)}if(typeof(F[J].obj.remove)==="function"){F[J].obj.remove()}if(F[J].shadow){if(typeof(F[J].shadow.remove)==="function"){F[J].obj.remove()}if(typeof(F[J].shadow.setMap)==="function"){F[J].shadow.setMap(null)}delete F[J].shadow}delete F[J].obj;delete F[J].data;delete F[J]};this.freeAll=function(){var J;for(J=0;J<F.length;J++){if(F[J]){this.freeIndex(J)}}F=[]};this.freeDiff=function(M){var L,K,N={},J=[];for(L=0;L<M.length;L++){J.push(M[L].idx.join("-"))}for(L=0;L<F.length;L++){if(!F[L]){continue}K=c.inArray(F[L].data.idx.join("-"),J);if(K>=0){N[K]=true}else{this.freeIndex(L)}}return N};this.add=function(K,J){H.push({latLng:K,marker:J})};this.get=function(J){return H[J]};this.clusters=function(ai,L,W,K){var M=ai.getProjection(),Y=M.fromLatLngToPoint(new google.maps.LatLng(ai.getBounds().getNorthEast().lat(),ai.getBounds().getSouthWest().lng())),ae,ad,J,X,U,T,aa,R,S=ai.getZoom(),O={},ah={},ac={},Q=[],af,ag,N,ak,V,ab,P=ai.getBounds(),Z=W&&(W<=ai.getZoom()),aj=ai.getZoom()>2;ab=0;V={};for(ae=0;ae<H.length;ae++){if(aj&&!P.contains(H[ae].latLng)){continue}X=M.fromLatLngToPoint(H[ae].latLng);O[ae]=[Math.floor((X.x-Y.x)*Math.pow(2,S)),Math.floor((X.y-Y.y)*Math.pow(2,S))];V[ae]=true;ab++}if(!K&&!Z){for(aa=0;aa<D.length;aa++){if(aa in V){ab--}else{break}}if(!ab){return false}}D=V;V=[];for(ae in O){U=O[ae][0];T=O[ae][1];if(!(U in ah)){ah[U]={}}if(!(T in ah[U])){ah[U][T]=ae;ac[ae]={};V.push(ae)}ac[ah[U][T]][ae]=true}L=Math.pow(L,2);delete (ah);aa=0;while(1){while((aa<V.length)&&!(V[aa] in ac)){aa++}if(aa==V.length){break}ae=V[aa];N=O[ae][0];ak=O[ae][1];ah=null;if(Z){ah={lat:N,lng:ak,idx:[ae]}}else{do{af={lat:0,lng:0,idx:[]};for(R=aa;R<V.length;R++){if(!(V[R] in ac)){continue}ad=V[R];if(Math.pow(N-O[ad][0],2)+Math.pow(ak-O[ad][1],2)<=L){for(J in ac[ad]){af.lat+=H[J].latLng.lat();af.lng+=H[J].latLng.lng();af.idx.push(J)}}}af.lat/=af.idx.length;af.lng/=af.idx.length;if(!ah){ag=af.idx.length>1;ah=af}else{ag=af.idx.length>ah.idx.length;if(ag){ah=af}}if(ag){X=M.fromLatLngToPoint(new google.maps.LatLng(ah.lat,ah.lng));N=Math.floor((X.x-Y.x)*Math.pow(2,S));ak=Math.floor((X.y-Y.y)*Math.pow(2,S))}}while(ag)}for(R=0;R<ah.idx.length;R++){if(ah.idx[R] in ac){delete (ac[ah.idx[R]])}}Q.push(ah)}return Q};this.getBounds=function(){var J,K=new google.maps.LatLngBounds();for(J=0;J<H.length;J++){K.extend(H[J].latLng)}return K}}var e={verbose:false,queryLimit:{attempt:5,delay:250,random:250},init:{mapTypeId:google.maps.MapTypeId.ROADMAP,center:[46.578498,2.457275],zoom:2},classes:{Map:google.maps.Map,Marker:google.maps.Marker,InfoWindow:google.maps.InfoWindow,Circle:google.maps.Circle,Rectangle:google.maps.Rectangle,OverlayView:google.maps.OverlayView,StreetViewPanorama:google.maps.StreetViewPanorama,KmlLayer:google.maps.KmlLayer,TrafficLayer:google.maps.TrafficLayer,BicyclingLayer:google.maps.BicyclingLayer,GroundOverlay:google.maps.GroundOverlay,StyledMapType:google.maps.StyledMapType}},v=["events","onces","options","apply","callback","data","tag"],i=["init","geolatlng","getlatlng","getroute","getelevation","getdistance","addstyledmap","setdefault","destroy"],p=["get"],m=directionsService=elevationService=maxZoomService=distanceMatrixService=null;function B(E){for(var D in E){if(typeof(e[D])==="object"){e[D]=c.extend({},e[D],E[D])}else{e[D]=E[D]}}}function u(E){if(!E){return true}for(var D=0;D<i.length;D++){if(i[D]===E){return false}}return true}function n(D){var F=s(D,"action");for(var E=0;E<p.length;E++){if(p[E]===F){return true}}return false}function t(E,F){if(F.toLowerCase){F=F.toLowerCase();for(var D in E){if(D.toLowerCase&&(D.toLowerCase()==F)){return D}}}return false}function s(E,F,G){var D=t(E,F);return D?E[D]:G}function C(E,F){var G,D;if(!E||!F){return false}F=g(F);for(G in E){if(G.toLowerCase){G=G.toLowerCase();for(D in F){if(G==F[D]){return true}}}}return false}function h(F,E,D){if(C(F,v)||C(F,E)){var H,G;for(H=0;H<v.length;H++){G=t(F,v[H]);D[v[H]]=G?F[G]:{}}if(E&&E.length){for(H=0;H<E.length;H++){if(G=t(F,E[H])){D[E[H]]=F[G]}}}return D}else{D.options={};for(G in F){if(G!=="action"){D.options[G]=F[G]}}return D}}function A(H,F,E,G){var K=t(F,H),I,D={},J=["map"];D.callback=s(F,"callback");E=g(E);G=g(G);if(K){return h(F[K],E,D)}if(G&&G.length){for(I=0;I<G.length;I++){J.push(G[I])}}if(!C(F,J)){D=h(F,E,D)}for(I=0;I<v.length;I++){if(v[I] in D){continue}D[v[I]]={}}return D}function l(){if(!m){m=new google.maps.Geocoder()}return m}function a(){if(!directionsService){directionsService=new google.maps.DirectionsService()}return directionsService}function r(){if(!elevationService){elevationService=new google.maps.ElevationService()}return elevationService}function x(){if(!maxZoomService){maxZoomService=new google.maps.MaxZoomService()}return maxZoomService}function b(){if(!distanceMatrixService){distanceMatrixService=new google.maps.DistanceMatrixService()}return distanceMatrixService}function d(D){return(typeof(D)==="number"||typeof(D)==="string")&&D!==""&&!isNaN(D)}function g(F){var E,D=[];if(F!==undefined){if(typeof(F)==="object"){if(typeof(F.length)==="number"){D=F}else{for(E in F){D.push(F[E])}}}else{D.push(F)}}return D}function f(E,G,D){var F=G?E:null;if(!E||(typeof(E)==="string")){return F}if(E.latLng){return f(E.latLng)}if(typeof(E.lat)==="function"){return E}else{if(d(E.lat)){return new google.maps.LatLng(E.lat,E.lng)}else{if(!D&&E.length){if(!d(E[0])||!d(E[1])){return F}return new google.maps.LatLng(E[0],E[1])}}}return F}function j(E,F,I){var H,D,G;if(!E){return null}G=I?E:null;if(typeof(E.getCenter)==="function"){return E}if(E.length){if(E.length==2){H=f(E[0]);D=f(E[1])}else{if(E.length==4){H=f([E[0],E[1]]);D=f([E[2],E[3]])}}}else{if(("ne" in E)&&("sw" in E)){H=f(E.ne);D=f(E.sw)}else{if(("n" in E)&&("e" in E)&&("s" in E)&&("w" in E)){H=f([E.n,E.e]);D=f([E.s,E.w])}}}if(H&&D){return new google.maps.LatLngBounds(D,H)}return G}function w(I){var D=new q(),F=new o(),H=null,G={},E=false;this._plan=function(K){for(var J=0;J<K.length;J++){D.add(K[J])}this._run()};this._planNext=function(J){D.addNext(J)};this._direct=function(J){var K=s(J,"action");return this[K](c.extend({},K in e?e[K]:{},J.args?J.args:J))};this._end=function(){E=false;D.ack();this._run()},this._run=function(){if(E){return}var J=D.get();if(!J){return}E=true;this._proceed(J)};this._proceed=function(J){J=J||{};var O=s(J,"action")||"init",N=O.toLowerCase(),M=true,P=s(J,"target"),L=s(J,"args"),K;if(!H&&u(N)){this.init(c.extend({},e.init,J.args&&J.args.map?J.args.map:J.map?J.map:{}),true)}if(!P&&!L&&(N in this)&&(typeof(this[N])==="function")){this[N](c.extend({},N in e?e[N]:{},J.args?J.args:J))}else{if(P&&(typeof(P)==="object")){if(M=(typeof(P[O])==="function")){K=P[O].apply(P,J.args?J.args:[])}}else{if(H){if(M=(typeof(H[O])==="function")){K=H[O].apply(H,J.args?J.args:[])}}}if(!M&&e.verbose){alert("unknown action : "+O)}this._callback(K,J);this._end()}};this._resolveLatLng=function(J,Q,M,L){var K=s(J,"address"),P,N=this,O=typeof(Q)==="function"?Q:N[Q];if(K){if(!L){L=0}if(typeof(K)==="object"){P=K}else{P={address:K}}l().geocode(P,function(S,R){if(R===google.maps.GeocoderStatus.OK){O.apply(N,[J,M?S:S[0].geometry.location])}else{if((R===google.maps.GeocoderStatus.OVER_QUERY_LIMIT)&&(L<e.queryLimit.attempt)){setTimeout(function(){N._resolveLatLng(J,Q,M,L+1)},e.queryLimit.delay+Math.floor(Math.random()*e.queryLimit.random))}else{if(e.verbose){alert("Geocode error : "+R)}O.apply(N,[J,false])}}})}else{O.apply(N,[J,f(J,false,true)])}};this._resolveAllLatLng=function(J,N,O){var M=this,K=-1,L=function(){do{K++}while((K<J[N].length)&&!("address" in J[N][K]));if(K<J[N].length){(function(P){M._resolveLatLng(P,function(Q,R){Q.latLng=R;L.apply(M,[])})})(J[N][K])}else{M[O](J)}};L()};this._call=function(){var K,L=arguments[0],J=[];if(!arguments.length||!H||(typeof(H[L])!=="function")){return}for(K=1;K<arguments.length;K++){J.push(arguments[K])}return H[L].apply(H,J)};this._subcall=function(J,L){var K={};if(!J.map){return}if(!L){L=s(J.map,"latlng")}if(!H){if(L){K={center:L}}this.init(c.extend({},J.map,K),true)}else{if(J.map.center&&L){this._call("setCenter",L)}if(J.map.zoom!==undefined){this._call("setZoom",J.map.zoom)}if(J.map.mapTypeId!==undefined){this._call("setMapTypeId",J.map.mapTypeId)}}};this._attachEvent=function(K,J,N,M,L){google.maps.event["addListener"+(L?"Once":"")](K,J,function(O){N.apply(I,[K,O,M])})};this._attachEvents=function(L,J){var K;if(!J){return}if(J.events){for(K in J.events){if(typeof(J.events[K])==="function"){this._attachEvent(L,K,J.events[K],J.data,false)}}}if(J.onces){for(K in J.onces){if(typeof(J.onces[K])==="function"){this._attachEvent(L,K,J.onces[K],J.data,true)}}}};this._callback=function(K,J){if(typeof(J.callback)==="function"){J.callback.apply(I,[K])}else{if(typeof(J.callback)==="object"){for(var L=0;L<J.callback.length;L++){if(typeof(J.callback[L])==="function"){J.callback[k].apply(I,[K])}}}}};this._manageEnd=function(K,J,L){var N,M;if(K&&(typeof(K)==="object")){this._attachEvents(K,J);if(J.apply&&J.apply.length){for(N=0;N<J.apply.length;N++){M=J.apply[N];if(!M.action||(typeof(K[M.action])!=="function")){continue}if(M.args){K[M.action].apply(K,M.args)}else{K[M.action]()}}}}if(!L){this._callback(K,J);this._end()}};this.destroy=function(J){var K;F.clear();I.empty();for(K in G){delete G[K]}G={};if(H){delete H}this._callback(null,J);this._end()};this.init=function(J,K){var N,L,M;if(H){return this._end()}N=A("map",J);if((typeof(N.options.center)==="boolean")&&N.options.center){return false}M=c.extend({},e.init,N.options);if(!M.center){M.center=[e.init.center.lat,e.init.center.lng]}M.center=f(M.center);H=new e.classes.Map(I.get(0),M);for(L in G){H.mapTypes.set(L,G[L])}this._manageEnd(H,N,K);return true};this.getlatlng=function(J){this._resolveLatLng(J,"_getLatLng",true)},this._getLatLng=function(J,K){this._manageEnd(K,J)},this.getaddress=function(J,L){var N=f(J,false,true),K=s(J,"address"),O=N?{latLng:N}:(K?(typeof(K)==="string"?{address:K}:K):null),P=s(J,"callback"),M=this;if(!L){L=0}if(O&&typeof(P)==="function"){l().geocode(O,function(S,Q){if((Q===google.maps.GeocoderStatus.OVER_QUERY_LIMIT)&&(L<e.queryLimit.attempt)){setTimeout(function(){M.getaddress(J,L+1)},e.queryLimit.delay+Math.floor(Math.random()*e.queryLimit.random))}else{var R=Q===google.maps.GeocoderStatus.OK?S:false;P.apply(I,[R,Q]);if(!R&&e.verbose){alert("Geocode error : "+Q)}M._end()}})}else{this._end()}};this.getroute=function(J){var L=s(J,"callback"),K=this;if((typeof(L)==="function")&&J.options){J.options.origin=f(J.options.origin,true);J.options.destination=f(J.options.destination,true);a().route(J.options,function(O,M){var N=M==google.maps.DirectionsStatus.OK?O:false;L.apply(I,[N,M]);K._end()})}else{this._end()}};this.getelevation=function(K){var N,R,P,L,O=[],Q=s(K,"callback"),J=s(K,"latlng"),M=this;if(typeof(Q)==="function"){N=function(U,S){var T=S===google.maps.ElevationStatus.OK?U:false;Q.apply(I,[T,S]);M._end()};if(J){O.push(f(J))}else{O=s(K,"locations")||[];if(O){O=g(O);for(L=0;L<O.length;L++){O[L]=f(O[L])}}}if(O.length){r().getElevationForLocations({locations:O},N)}else{R=s(K,"path");P=s(K,"samples");if(R&&P){for(L=0;L<R.length;L++){O.push(f(R[L]))}if(O.length){r().getElevationAlongPath({path:O,samples:P},N)}}}}else{this._end()}};this.getdistance=function(J){var K,M=s(J,"callback"),L=this;if((typeof(M)==="function")&&J.options&&J.options.origins&&J.options.destinations){J.options.origins=g(J.options.origins);for(K=0;K<J.options.origins.length;K++){J.options.origins[K]=f(J.options.origins[K],true)}J.options.destinations=g(J.options.destinations);for(K=0;K<J.options.destinations.length;K++){J.options.destinations[K]=f(J.options.destinations[K],true)}b().getDistanceMatrix(J.options,function(P,N){var O=N==google.maps.DistanceMatrixStatus.OK?P:false;M.apply(I,[O,N]);L._end()})}else{this._end()}};this.addmarker=function(J){this._resolveLatLng(J,"_addMarker")};this._addMarker=function(K,N,L){var J,M,P,O=A("marker",K,"to");if(!L){if(!N){this._manageEnd(false,O);return}this._subcall(K,N)}else{if(!N){return}}if(O.to){P=F.refToObj(O.to);J=P&&(typeof(P.add)==="function");if(J){P.add(N,K);if(typeof(P.redraw)==="function"){P.redraw()}}if(!L){this._manageEnd(J,O)}}else{O.options.position=N;O.options.map=H;J=new e.classes.Marker(O.options);if(C(K,"infowindow")){M=A("infowindow",K.infowindow,"open");if((M.open===undefined)||M.open){M.apply=g(M.apply);M.apply.unshift({action:"open",args:[H,J]})}M.action="addinfowindow";this._planNext(M)}if(!L){F.add("marker",J,O);this._manageEnd(J,O)}}return J};this.addmarkers=function(J){if(s(J,"clusters")){this._resolveAllLatLng(J,"markers","_addclusteredmarkers")}else{this._resolveAllLatLng(J,"markers","_addmarkers")}};this._addmarkers=function(L){var S,J,N,K,P,R={},O,Q,M=s(L,"markers");this._subcall(L);if(typeof(M)!=="object"){return this._end()}J=A("marker",L,["to","markers"]);if(J.to){Q=F.refToObj(J.to);S=Q&&(typeof(Q.add)==="function");if(S){for(N=0;N<M.length;N++){if(K=f(M[N])){Q.add(K,M[N])}}if(typeof(Q.redraw)==="function"){Q.redraw()}}this._manageEnd(S,J)}else{c.extend(true,R,J.options);R.map=H;S=[];for(N=0;N<M.length;N++){if(K=f(M[N])){if(M[N].options){O={};c.extend(true,O,R,M[N].options);J.options=O}else{J.options=R}J.options.position=K;P=new e.classes.Marker(J.options);S.push(P);J.data=M[N].data;J.tag=M[N].tag;F.add("marker",P,J);this._manageEnd(P,J,true)}}J.options=R;this._callback(S,L);this._end()}};this._addclusteredmarkers=function(K){var N,M,J,R,O=this,P=s(K,"radius"),Q=s(K,"maxZoom"),L=s(K,"markers"),S=s(K,"clusters");if(!H.getBounds()){google.maps.event.addListenerOnce(H,"bounds_changed",function(){O._addclusteredmarkers(K)});return}if(typeof(P)==="number"){N=new z();for(M=0;M<L.length;M++){J=f(L[M]);N.add(J,L[M])}R=this._initClusters(K,N,P,Q,S)}this._callback(R,K);this._end()};this._initClusters=function(K,M,J,L,O){var N=this;M.setRedraw(function(Q){var R,P=M.clusters(H,J,L,Q);if(P){R=M.freeDiff(P);N._displayClusters(K,M,P,R,O)}});M.events(google.maps.event.addListener(H,"zoom_changed",function(){M.redraw(true)}),google.maps.event.addListener(H,"bounds_changed",function(){M.redraw()}));M.redraw();return F.add("cluster",M,K)};this._displayClusters=function(N,Y,M,X,O){var W,Z,R,V,T,S,L,aa,J,ac,Q,ab,K,P=C(N,"cluster")?A("",s(N,"cluster")):{},U=C(N,"marker")?A("",s(N,"marker")):{};for(Z=0;Z<M.length;Z++){if(Z in X){continue}aa=M[Z];T=false;if(aa.idx.length>1){V=0;for(W in O){if((W>V)&&(W<=aa.idx.length)){V=W}}if(O[V]){Q=s(O[V],"width");ab=s(O[V],"height");K={};c.extend(true,K,P,{options:{pane:"overlayLayer",content:O[V].content.replace("CLUSTER_COUNT",aa.idx.length),offset:{x:-Q/2,y:-ab/2}}});S=this._addOverlay(K,f(aa),true);K.options.pane="floatShadow";K.options.content=c("<div></div>");K.options.content.width(Q);K.options.content.height(ab);L=this._addOverlay(K,f(aa),true);P.data={latLng:f(aa),markers:[]};for(R=0;R<aa.idx.length;R++){P.data.markers.push(Y.get(aa.idx[R]).marker)}this._attachEvents(L,P);Y.store(aa,S,L);T=true}}if(!T){J={};c.extend(true,J,U.options);for(R=0;R<aa.idx.length;R++){V=Y.get(aa.idx[R]);U.latLng=V.latLng;U.data=V.marker.data;U.tag=V.marker.tag;if(V.marker.options){ac={};c.extend(true,ac,J,V.marker.options);U.options=ac}else{U.options=J}S=this._addMarker(U,U.latLng,true);this._attachEvents(S,U);Y.store(aa,S)}U.options=J}}};this.addinfowindow=function(J){this._resolveLatLng(J,"_addInfoWindow")};this._addInfoWindow=function(J,L){var N,M,K=[];this._subcall(J,L);N=A("infowindow",J,["open","anchor"]);if(L){N.options.position=L}M=new e.classes.InfoWindow(N.options);if((N.open===undefined)||N.open){N.apply=g(N.apply);K.push(H);if(N.anchor){K.push(N.anchor)}N.apply.unshift({action:"open",args:K})}F.add("infowindow",M,N);this._manageEnd(M,N)};this.addpolyline=function(J){this._addPoly(J,"Polyline","path")};this.addpolygon=function(J){this._addPoly(J,"Polygon","paths")};this._addPoly=function(J,M,O){var K,N,L,P=A(M.toLowerCase(),J,O);if(P[O]){P.options[O]=[];for(K=0;K<P[O].length;K++){if(L=f(P[O][K])){P.options[O].push(L)}}}N=new google.maps[M](P.options);N.setMap(H);F.add(M.toLowerCase(),N,P);this._manageEnd(N,P)};this.addcircle=function(J){this._resolveLatLng(J,"_addCircle")};this._addCircle=function(J,K){var M,L=A("circle",J);if(!K){K=f(L.options.center)}if(!K){return this._manageEnd(false,L)}this._subcall(J,K);L.options.center=K;L.options.map=H;M=new e.classes.Circle(L.options);F.add("circle",M,L);this._manageEnd(M,L)};this.addrectangle=function(J){this._resolveLatLng(J,"_addRectangle")};this._addRectangle=function(J,L){var K,M=A("rectangle",J);M.options.bounds=j(M.options.bounds,true);if(!M.options.bounds){return this._manageEnd(false,M)}this._subcall(J,M.options.bounds.getCenter());M.options.map=H;K=new e.classes.Rectangle(M.options);F.add("rectangle",K,M);this._manageEnd(K,M)};this.addoverlay=function(J){this._resolveLatLng(J,"_addOverlay")};this._addOverlay=function(N,L,O){var M,K=A("overlay",N),J=c.extend({pane:"floatPane",content:"",offset:{x:0,y:0}},K.options),R=c("<div></div>"),Q=[];R.css("border","none").css("borderWidth","0px").css("position","absolute");R.append(J.content);function P(){e.classes.OverlayView.call(this);this.setMap(H)}P.prototype=new e.classes.OverlayView();P.prototype.onAdd=function(){var S=this.getPanes();if(J.pane in S){c(S[J.pane]).append(R)}};P.prototype.draw=function(){var S=this.getProjection(),U=S.fromLatLngToDivPixel(L),T=this;R.css("left",(U.x+J.offset.x)+"px").css("top",(U.y+J.offset.y)+"px");c.each(("dblclick click mouseover mousemove mouseout mouseup mousedown").split(" "),function(W,V){Q.push(google.maps.event.addDomListener(R[0],V,function(X){google.maps.event.trigger(T,V)}))});Q.push(google.maps.event.addDomListener(R[0],"contextmenu",function(V){google.maps.event.trigger(T,"rightclick")}))};P.prototype.onRemove=function(){for(var S=0;S<Q.length;S++){google.maps.event.removeListener(Q[S])}R.remove()};P.prototype.hide=function(){R.hide()};P.prototype.show=function(){R.show()};P.prototype.toggle=function(){if(R){if(R.is(":visible")){this.show()}else{this.hide()}}};P.prototype.toggleDOM=function(){if(this.getMap()){this.setMap(null)}else{this.setMap(H)}};P.prototype.getDOMElement=function(){return R[0]};M=new P();if(!O){F.add("overlay",M,K);this._manageEnd(M,K)}return M};this.addfixpanel=function(K){var N=A("fixpanel",K),J=y=0,M,L;if(N.options.content){M=c(N.options.content);if(N.options.left!==undefined){J=N.options.left}else{if(N.options.right!==undefined){J=I.width()-M.width()-N.options.right}else{if(N.options.center){J=(I.width()-M.width())/2}}}if(N.options.top!==undefined){y=N.options.top}else{if(N.options.bottom!==undefined){y=I.height()-M.height()-N.options.bottom}else{if(N.options.middle){y=(I.height()-M.height())/2}}}L=c("<div></div>").css("position","absolute").css("top",y+"px").css("left",J+"px").css("z-index","1000").append(M);I.first().prepend(L);this._attachEvents(H,N);F.add("fixpanel",L,N);this._callback(L,N)}this._end()};this.adddirectionsrenderer=function(J,K){var L,M=A("directionrenderer",J,"panelId");M.options.map=H;L=new google.maps.DirectionsRenderer(M.options);if(M.panelId){L.setPanel(document.getElementById(M.panelId))}F.add("directionrenderer",L,M);this._manageEnd(L,M,K);return L};this.setdirectionspanel=function(J){var K=F.get("directionrenderer"),L=A("directionpanel",J,"id");if(K&&L.id){K.setPanel(document.getElementById(L.id))}this._manageEnd(K,L)};this.setdirections=function(J){var K=F.get("directionrenderer"),L=A("directions",J);if(J){L.options.directions=J.directions?J.directions:(J.options&&J.options.directions?J.options.directions:null)}if(L.options.directions){if(!K){K=this.adddirectionsrenderer(L,true)}else{K.setDirections(L.options.directions)}}this._manageEnd(K,L)};this.setstreetview=function(J){var K,L=A("streetview",J,"id");if(L.options.position){L.options.position=f(L.options.position)}K=new e.classes.StreetViewPanorama(document.getElementById(L.id),L.options);if(K){H.setStreetView(K)}this._manageEnd(K,L)};this.addkmllayer=function(K){var J,L=A("kmllayer",K,"url");L.options.map=H;if(typeof(L.url)==="string"){J=new e.classes.KmlLayer(L.url,L.options)}F.add("kmllayer",J,L);this._manageEnd(J,L)};this.addtrafficlayer=function(J){var L=A("trafficlayer",J),K=F.get("trafficlayer");if(!K){K=new e.classes.TrafficLayer();K.setMap(H);F.add("trafficlayer",K,L)}this._manageEnd(K,L)};this.addbicyclinglayer=function(J){var K=A("bicyclinglayer",J),L=F.get("bicyclinglayer");if(!L){L=new e.classes.BicyclingLayer();L.setMap(H);F.add("bicyclinglayer",L,K)}this._manageEnd(L,K)};this.addgroundoverlay=function(J){var K,L=A("groundoverlay",J,["bounds","url"]);L.bounds=j(L.bounds);if(L.bounds&&(typeof(L.url)==="string")){K=new e.classes.GroundOverlay(L.url,L.bounds);K.setMap(H);F.add("groundoverlay",K,L)}this._manageEnd(K,L)};this.geolatlng=function(J){var K=s(J,"callback");if(typeof(K)==="function"){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(L){var M=new google.maps.LatLng(L.coords.latitude,L.coords.longitude);K.apply(I,[M])},function(){var L=false;K.apply(I,[L])})}else{if(google.gears){google.gears.factory.create("beta.geolocation").getCurrentPosition(function(L){var M=new google.maps.LatLng(L.latitude,L.longitude);K.apply(I,[M])},function(){out=false;K.apply(I,[out])})}else{K.apply(I,[false])}}}this._end()};this.addstyledmap=function(J,K){var L=A("styledmap",J,["id","style"]);if(L.style&&L.id&&!G[L.id]){G[L.id]=new e.classes.StyledMapType(L.style,L.options);if(H){H.mapTypes.set(L.id,G[L.id])}}this._manageEnd(G[L.id],L,K)};this.setstyledmap=function(J){var K=A("styledmap",J,["id","style"]);if(K.id){this.addstyledmap(K,true);if(G[K.id]){H.setMapTypeId(K.id);this._callback(G[K.id],J)}}this._manageEnd(G[K.id],K)};this.clear=function(K){var M=g(s(K,"list")||s(K,"name")),L=s(K,"last",false),N=s(K,"first",false),J=s(K,"tag");if(J!==undefined){J=g(J)}F.clear(M,L,N,J);this._end()};this.get=function(K){var L=s(K,"name")||"map",N=s(K,"first"),M=s(K,"all"),J=s(K,"tag");L=L.toLowerCase();if(L==="map"){return H}if(J!==undefined){J=g(J)}if(N){return F.get(L,false,J)}else{if(M){return F.all(L,J)}else{return F.get(L,true,J)}}};this.getmaxzoom=function(J){this._resolveLatLng(J,"_getMaxZoom")};this._getMaxZoom=function(J,L){var M=s(J,"callback"),K=this;if(M&&typeof(M)==="function"){x().getMaxZoomAtLatLng(L,function(N){var O=N.status===google.maps.MaxZoomStatus.OK?N.zoom:false;M.apply(I,[O,N.status]);K._end()})}else{this._end()}};this.setdefault=function(J){B(J);this._end()};this.autofit=function(K,O){var R,Q,M,N,L,P=true,J=new google.maps.LatLngBounds(),S=s(K,"maxZoom",null);R=F.names();for(N=0;N<R.length;N++){Q=F.all(R[N]);for(L=0;L<Q.length;L++){M=Q[L];if(M.getPosition){J.extend(M.getPosition());P=false}else{if(M.getBounds){J.extend(M.getBounds().getNorthEast());J.extend(M.getBounds().getSouthWest());P=false}else{if(M.getPaths){M.getPaths().forEach(function(T){T.forEach(function(U){J.extend(U);P=false})})}else{if(M.getPath){M.getPath().forEach(function(T){J.extend(T);P=false})}else{if(M.getCenter){J.extend(M.getCenter());P=false}}}}}}}if(!P&&(!H.getBounds()||!H.getBounds().equals(J))){if(S!==null){google.maps.event.addListenerOnce(H,"bounds_changed",function(){if(this.getZoom()>S){this.setZoom(S)}})}H.fitBounds(J)}if(!O){this._manageEnd(P?false:J,K,O)}}}c.fn.gmap3=function(){var F,D,H=[],G=true,E=[];for(F=0;F<arguments.length;F++){D=arguments[F]||{};if(typeof(D)==="string"){D={action:D}}H.push(D)}if(!H.length){H.push({})}c.each(this,function(){var I=c(this),J=I.data("gmap3");G=false;if(!J){J=new w(I);I.data("gmap3",J)}if((H.length==1)&&(n(H[0]))){E.push(J._direct(H[0]))}else{J._plan(H)}});if(E.length){if(E.length===1){return E[0]}else{return E}}if(G&&(arguments.length==2)&&(typeof(arguments[0])==="string")&&(arguments[0].toLowerCase()==="setdefault")){B(arguments[1])}return this}}(jQuery));

(function(){var d=null;function e(a){return function(b){this[a]=b}}function h(a){return function(){return this[a]}}var j;
function k(a,b,c){this.extend(k,google.maps.OverlayView);this.c=a;this.a=[];this.f=[];this.ca=[53,56,66,78,90];this.j=[];this.A=!1;c=c||{};this.g=c.gridSize||60;this.l=c.minimumClusterSize||2;this.J=c.maxZoom||d;this.j=c.styles||[];this.X=c.imagePath||this.Q;this.W=c.imageExtension||this.P;this.O=!0;if(c.zoomOnClick!=void 0)this.O=c.zoomOnClick;this.r=!1;if(c.averageCenter!=void 0)this.r=c.averageCenter;l(this);this.setMap(a);this.K=this.c.getZoom();var f=this;google.maps.event.addListener(this.c,
"zoom_changed",function(){var a=f.c.getZoom();if(f.K!=a)f.K=a,f.m()});google.maps.event.addListener(this.c,"idle",function(){f.i()});b&&b.length&&this.C(b,!1)}j=k.prototype;j.Q="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m";j.P="png";j.extend=function(a,b){return function(a){for(var b in a.prototype)this.prototype[b]=a.prototype[b];return this}.apply(a,[b])};j.onAdd=function(){if(!this.A)this.A=!0,n(this)};j.draw=function(){};
function l(a){if(!a.j.length)for(var b=0,c;c=a.ca[b];b++)a.j.push({url:a.X+(b+1)+"."+a.W,height:c,width:c})}j.S=function(){for(var a=this.o(),b=new google.maps.LatLngBounds,c=0,f;f=a[c];c++)b.extend(f.getPosition());this.c.fitBounds(b)};j.z=h("j");j.o=h("a");j.V=function(){return this.a.length};j.ba=e("J");j.I=h("J");j.G=function(a,b){for(var c=0,f=a.length,g=f;g!==0;)g=parseInt(g/10,10),c++;c=Math.min(c,b);return{text:f,index:c}};j.$=e("G");j.H=h("G");
j.C=function(a,b){for(var c=0,f;f=a[c];c++)q(this,f);b||this.i()};function q(a,b){b.s=!1;b.draggable&&google.maps.event.addListener(b,"dragend",function(){b.s=!1;a.L()});a.a.push(b)}j.q=function(a,b){q(this,a);b||this.i()};function r(a,b){var c=-1;if(a.a.indexOf)c=a.a.indexOf(b);else for(var f=0,g;g=a.a[f];f++)if(g==b){c=f;break}if(c==-1)return!1;b.setMap(d);a.a.splice(c,1);return!0}j.Y=function(a,b){var c=r(this,a);return!b&&c?(this.m(),this.i(),!0):!1};
j.Z=function(a,b){for(var c=!1,f=0,g;g=a[f];f++)g=r(this,g),c=c||g;if(!b&&c)return this.m(),this.i(),!0};j.U=function(){return this.f.length};j.getMap=h("c");j.setMap=e("c");j.w=h("g");j.aa=e("g");
j.v=function(a){var b=this.getProjection(),c=new google.maps.LatLng(a.getNorthEast().lat(),a.getNorthEast().lng()),f=new google.maps.LatLng(a.getSouthWest().lat(),a.getSouthWest().lng()),c=b.fromLatLngToDivPixel(c);c.x+=this.g;c.y-=this.g;f=b.fromLatLngToDivPixel(f);f.x-=this.g;f.y+=this.g;c=b.fromDivPixelToLatLng(c);b=b.fromDivPixelToLatLng(f);a.extend(c);a.extend(b);return a};j.R=function(){this.m(!0);this.a=[]};
j.m=function(a){for(var b=0,c;c=this.f[b];b++)c.remove();for(b=0;c=this.a[b];b++)c.s=!1,a&&c.setMap(d);this.f=[]};j.L=function(){var a=this.f.slice();this.f.length=0;this.m();this.i();window.setTimeout(function(){for(var b=0,c;c=a[b];b++)c.remove()},0)};j.i=function(){n(this)};
function n(a){if(a.A)for(var b=a.v(new google.maps.LatLngBounds(a.c.getBounds().getSouthWest(),a.c.getBounds().getNorthEast())),c=0,f;f=a.a[c];c++)if(!f.s&&b.contains(f.getPosition())){for(var g=a,u=4E4,o=d,v=0,m=void 0;m=g.f[v];v++){var i=m.getCenter();if(i){var p=f.getPosition();if(!i||!p)i=0;else var w=(p.lat()-i.lat())*Math.PI/180,x=(p.lng()-i.lng())*Math.PI/180,i=Math.sin(w/2)*Math.sin(w/2)+Math.cos(i.lat()*Math.PI/180)*Math.cos(p.lat()*Math.PI/180)*Math.sin(x/2)*Math.sin(x/2),i=6371*2*Math.atan2(Math.sqrt(i),
Math.sqrt(1-i));i<u&&(u=i,o=m)}}o&&o.F.contains(f.getPosition())?o.q(f):(m=new s(g),m.q(f),g.f.push(m))}}function s(a){this.k=a;this.c=a.getMap();this.g=a.w();this.l=a.l;this.r=a.r;this.d=d;this.a=[];this.F=d;this.n=new t(this,a.z(),a.w())}j=s.prototype;
j.q=function(a){var b;a:if(this.a.indexOf)b=this.a.indexOf(a)!=-1;else{b=0;for(var c;c=this.a[b];b++)if(c==a){b=!0;break a}b=!1}if(b)return!1;if(this.d){if(this.r)c=this.a.length+1,b=(this.d.lat()*(c-1)+a.getPosition().lat())/c,c=(this.d.lng()*(c-1)+a.getPosition().lng())/c,this.d=new google.maps.LatLng(b,c),y(this)}else this.d=a.getPosition(),y(this);a.s=!0;this.a.push(a);b=this.a.length;b<this.l&&a.getMap()!=this.c&&a.setMap(this.c);if(b==this.l)for(c=0;c<b;c++)this.a[c].setMap(d);b>=this.l&&a.setMap(d);
a=this.c.getZoom();if((b=this.k.I())&&a>b)for(a=0;b=this.a[a];a++)b.setMap(this.c);else if(this.a.length<this.l)z(this.n);else{b=this.k.H()(this.a,this.k.z().length);this.n.setCenter(this.d);a=this.n;a.B=b;a.ga=b.text;a.ea=b.index;if(a.b)a.b.innerHTML=b.text;b=Math.max(0,a.B.index-1);b=Math.min(a.j.length-1,b);b=a.j[b];a.da=b.url;a.h=b.height;a.p=b.width;a.M=b.textColor;a.e=b.anchor;a.N=b.textSize;a.D=b.backgroundPosition;this.n.show()}return!0};
j.getBounds=function(){for(var a=new google.maps.LatLngBounds(this.d,this.d),b=this.o(),c=0,f;f=b[c];c++)a.extend(f.getPosition());return a};j.remove=function(){this.n.remove();this.a.length=0;delete this.a};j.T=function(){return this.a.length};j.o=h("a");j.getCenter=h("d");function y(a){a.F=a.k.v(new google.maps.LatLngBounds(a.d,a.d))}j.getMap=h("c");
function t(a,b,c){a.k.extend(t,google.maps.OverlayView);this.j=b;this.fa=c||0;this.u=a;this.d=d;this.c=a.getMap();this.B=this.b=d;this.t=!1;this.setMap(this.c)}j=t.prototype;
j.onAdd=function(){this.b=document.createElement("DIV");if(this.t)this.b.style.cssText=A(this,B(this,this.d)),this.b.innerHTML=this.B.text;this.getPanes().overlayMouseTarget.appendChild(this.b);var a=this;google.maps.event.addDomListener(this.b,"click",function(){var b=a.u.k;google.maps.event.trigger(b,"clusterclick",a.u);b.O&&a.c.fitBounds(a.u.getBounds())})};function B(a,b){var c=a.getProjection().fromLatLngToDivPixel(b);c.x-=parseInt(a.p/2,10);c.y-=parseInt(a.h/2,10);return c}
j.draw=function(){if(this.t){var a=B(this,this.d);this.b.style.top=a.y+"px";this.b.style.left=a.x+"px"}};function z(a){if(a.b)a.b.style.display="none";a.t=!1}j.show=function(){if(this.b)this.b.style.cssText=A(this,B(this,this.d)),this.b.style.display="";this.t=!0};j.remove=function(){this.setMap(d)};j.onRemove=function(){if(this.b&&this.b.parentNode)z(this),this.b.parentNode.removeChild(this.b),this.b=d};j.setCenter=e("d");
function A(a,b){var c=[];c.push("background-image:url("+a.da+");");c.push("background-position:"+(a.D?a.D:"0 0")+";");typeof a.e==="object"?(typeof a.e[0]==="number"&&a.e[0]>0&&a.e[0]<a.h?c.push("height:"+(a.h-a.e[0])+"px; padding-top:"+a.e[0]+"px;"):c.push("height:"+a.h+"px; line-height:"+a.h+"px;"),typeof a.e[1]==="number"&&a.e[1]>0&&a.e[1]<a.p?c.push("width:"+(a.p-a.e[1])+"px; padding-left:"+a.e[1]+"px;"):c.push("width:"+a.p+"px; text-align:center;")):c.push("height:"+a.h+"px; line-height:"+a.h+
"px; width:"+a.p+"px; text-align:center;");c.push("cursor:pointer; top:"+b.y+"px; left:"+b.x+"px; color:"+(a.M?a.M:"black")+"; position:absolute; font-size:"+(a.N?a.N:11)+"px; font-family:Arial,sans-serif; font-weight:bold");return c.join("")}window.MarkerClusterer=k;k.prototype.addMarker=k.prototype.q;k.prototype.addMarkers=k.prototype.C;k.prototype.clearMarkers=k.prototype.R;k.prototype.fitMapToMarkers=k.prototype.S;k.prototype.getCalculator=k.prototype.H;k.prototype.getGridSize=k.prototype.w;
k.prototype.getExtendedBounds=k.prototype.v;k.prototype.getMap=k.prototype.getMap;k.prototype.getMarkers=k.prototype.o;k.prototype.getMaxZoom=k.prototype.I;k.prototype.getStyles=k.prototype.z;k.prototype.getTotalClusters=k.prototype.U;k.prototype.getTotalMarkers=k.prototype.V;k.prototype.redraw=k.prototype.i;k.prototype.removeMarker=k.prototype.Y;k.prototype.removeMarkers=k.prototype.Z;k.prototype.resetViewport=k.prototype.m;k.prototype.repaint=k.prototype.L;k.prototype.setCalculator=k.prototype.$;
k.prototype.setGridSize=k.prototype.aa;k.prototype.setMaxZoom=k.prototype.ba;k.prototype.onAdd=k.prototype.onAdd;k.prototype.draw=k.prototype.draw;s.prototype.getCenter=s.prototype.getCenter;s.prototype.getSize=s.prototype.T;s.prototype.getMarkers=s.prototype.o;t.prototype.onAdd=t.prototype.onAdd;t.prototype.draw=t.prototype.draw;t.prototype.onRemove=t.prototype.onRemove;
})();

/**
 * @name InfoBox
 * @version 1.1.11 [January 9, 2012]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true */
/*global google */

/**
 * @name InfoBoxOptions
 * @class This class represents the optional parameter passed to the {@link InfoBox} constructor.
 * @property {string|Node} content The content of the InfoBox (plain text or an HTML DOM node).
 * @property {boolean} disableAutoPan Disable auto-pan on <tt>open</tt> (default is <tt>false</tt>).
 * @property {number} maxWidth The maximum width (in pixels) of the InfoBox. Set to 0 if no maximum.
 * @property {Size} pixelOffset The offset (in pixels) from the top left corner of the InfoBox
 *  (or the bottom left corner if the <code>alignBottom</code> property is <code>true</code>)
 *  to the map pixel corresponding to <tt>position</tt>.
 * @property {LatLng} position The geographic location at which to display the InfoBox.
 * @property {number} zIndex The CSS z-index style value for the InfoBox.
 *  Note: This value overrides a zIndex setting specified in the <tt>boxStyle</tt> property.
 * @property {string} boxClass The name of the CSS class defining the styles for the InfoBox container.
 *  The default name is <code>infoBox</code>.
 * @property {Object} [boxStyle] An object literal whose properties define specific CSS
 *  style values to be applied to the InfoBox. Style values defined here override those that may
 *  be defined in the <code>boxClass</code> style sheet. If this property is changed after the
 *  InfoBox has been created, all previously set styles (except those defined in the style sheet)
 *  are removed from the InfoBox before the new style values are applied.
 * @property {string} closeBoxMargin The CSS margin style value for the close box.
 *  The default is "2px" (a 2-pixel margin on all sides).
 * @property {string} closeBoxURL The URL of the image representing the close box.
 *  Note: The default is the URL for Google's standard close box.
 *  Set this property to "" if no close box is required.
 * @property {Size} infoBoxClearance Minimum offset (in pixels) from the InfoBox to the
 *  map edge after an auto-pan.
 * @property {boolean} isHidden Hide the InfoBox on <tt>open</tt> (default is <tt>false</tt>).
 * @property {boolean} alignBottom Align the bottom left corner of the InfoBox to the <code>position</code>
 *  location (default is <tt>false</tt> which means that the top left corner of the InfoBox is aligned).
 * @property {string} pane The pane where the InfoBox is to appear (default is "floatPane").
 *  Set the pane to "mapPane" if the InfoBox is being used as a map label.
 *  Valid pane names are the property names for the <tt>google.maps.MapPanes</tt> object.
 * @property {boolean} enableEventPropagation Propagate mousedown, mousemove, mouseover, mouseout,
 *  mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the InfoBox
 *  (default is <tt>false</tt> to mimic the behavior of a <tt>google.maps.InfoWindow</tt>). Set
 *  this property to <tt>true</tt> if the InfoBox is being used as a map label.
 */

/**
 * Creates an InfoBox with the options specified in {@link InfoBoxOptions}.
 *  Call <tt>InfoBox.open</tt> to add the box to the map.
 * @constructor
 * @param {InfoBoxOptions} [opt_opts]
 */
function InfoBox(opt_opts) {

  opt_opts = opt_opts || {};

  google.maps.OverlayView.apply(this, arguments);

  // Standard options (in common with google.maps.InfoWindow):
  //
  this.content_ = opt_opts.content || "";
  this.disableAutoPan_ = opt_opts.disableAutoPan || false;
  this.maxWidth_ = opt_opts.maxWidth || 0;
  this.pixelOffset_ = opt_opts.pixelOffset || new google.maps.Size(0, 0);
  this.position_ = opt_opts.position || new google.maps.LatLng(0, 0);
  this.zIndex_ = opt_opts.zIndex || null;

  // Additional options (unique to InfoBox):
  //
  this.boxClass_ = opt_opts.boxClass || "infoBox";
  this.boxStyle_ = opt_opts.boxStyle || {};
  this.closeBoxMargin_ = opt_opts.closeBoxMargin || "2px";
  this.closeBoxURL_ = opt_opts.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif";
  if (opt_opts.closeBoxURL === "") {
    this.closeBoxURL_ = "";
  }
  this.infoBoxClearance_ = opt_opts.infoBoxClearance || new google.maps.Size(1, 1);
  this.isHidden_ = opt_opts.isHidden || false;
  this.alignBottom_ = opt_opts.alignBottom || false;
  this.pane_ = opt_opts.pane || "floatPane";
  this.enableEventPropagation_ = opt_opts.enableEventPropagation || false;

  this.div_ = null;
  this.closeListener_ = null;
  this.moveListener_ = null;
  this.contextListener_ = null;
  this.eventListeners_ = null;
  this.fixedWidthSet_ = null;
}

/* InfoBox extends OverlayView in the Google Maps API v3.
 */
InfoBox.prototype = new google.maps.OverlayView();

/**
 * Creates the DIV representing the InfoBox.
 * @private
 */
InfoBox.prototype.createInfoBoxDiv_ = function () {

  var i;
  var events;
  var bw;
  var me = this;

  // This handler prevents an event in the InfoBox from being passed on to the map.
  //
  var cancelHandler = function (e) {
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  // This handler ignores the current event in the InfoBox and conditionally prevents
  // the event from being passed on to the map. It is used for the contextmenu event.
  //
  var ignoreHandler = function (e) {

    e.returnValue = false;

    if (e.preventDefault) {

      e.preventDefault();
    }

    if (!me.enableEventPropagation_) {

      cancelHandler(e);
    }
  };

  if (!this.div_) {

    this.div_ = document.createElement("div");

    this.setBoxStyle_();

    if (typeof this.content_.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(this.content_);
    }

    // Add the InfoBox DIV to the DOM
    this.getPanes()[this.pane_].appendChild(this.div_);

    this.addClickHandler_();

    if (this.div_.style.width) {

      this.fixedWidthSet_ = true;

    } else {

      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {

        this.div_.style.width = this.maxWidth_;
        this.div_.style.overflow = "auto";
        this.fixedWidthSet_ = true;

      } else { // The following code is needed to overcome problems with MSIE

        bw = this.getBoxWidths_();

        this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
        this.fixedWidthSet_ = false;
      }
    }

    this.panBox_(this.disableAutoPan_);

    if (!this.enableEventPropagation_) {

      this.eventListeners_ = [];

      // Cancel event propagation.
      //
      // Note: mousemove not included (to resolve Issue 152)
      events = ["mousedown", "mouseover", "mouseout", "mouseup",
      "click", "dblclick", "touchstart", "touchend", "touchmove"];

      for (i = 0; i < events.length; i++) {

        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
      }
      
      // Workaround for Google bug that causes the cursor to change to a pointer
      // when the mouse moves over a marker underneath InfoBox.
      this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
        this.style.cursor = "default";
      }));
    }

    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);

    /**
     * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
     * @name InfoBox#domready
     * @event
     */
    google.maps.event.trigger(this, "domready");
  }
};

/**
 * Returns the HTML <IMG> tag for the close box.
 * @private
 */
InfoBox.prototype.getCloseBoxImg_ = function () {

  var img = "";

  if (this.closeBoxURL_ !== "") {

    img  = "<img";
    img += " src='" + this.closeBoxURL_ + "'";
    img += " align=right"; // Do this because Opera chokes on style='float: right;'
    img += " style='";
    img += " position: relative;"; // Required by MSIE
    img += " cursor: pointer;";
    img += " margin: " + this.closeBoxMargin_ + ";";
    img += "'>";
  }

  return img;
};

/**
 * Adds the click handler to the InfoBox close box.
 * @private
 */
InfoBox.prototype.addClickHandler_ = function () {

  var closeBox;

  if (this.closeBoxURL_ !== "") {

    closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(closeBox, 'click', this.getCloseClickHandler_());
  } else {

    this.closeListener_ = null;
  }
};

/**
 * Returns the function to call when the user clicks the close box of an InfoBox.
 * @private
 */
InfoBox.prototype.getCloseClickHandler_ = function () {

  var me = this;

  return function (e) {

    // 1.0.3 fix: Always prevent propagation of a close box click to the map:
    e.cancelBubble = true;

    if (e.stopPropagation) {

      e.stopPropagation();
    }

    /**
     * This event is fired when the InfoBox's close box is clicked.
     * @name InfoBox#closeclick
     * @event
     */
    google.maps.event.trigger(me, "closeclick");

    me.close();
  };
};

/**
 * Pans the map so that the InfoBox appears entirely within the map's visible area.
 * @private
 */
InfoBox.prototype.panBox_ = function (disablePan) {

  var map;
  var bounds;
  var xOffset = 0, yOffset = 0;

  if (!disablePan) {

    map = this.getMap();

    if (map instanceof google.maps.Map) { // Only pan if attached to map, not panorama

      if (!map.getBounds().contains(this.position_)) {
      // Marker not in visible area of map, so set center
      // of map to the marker position first.
        map.setCenter(this.position_);
      }

      bounds = map.getBounds();

      var mapDiv = map.getDiv();
      var mapWidth = mapDiv.offsetWidth;
      var mapHeight = mapDiv.offsetHeight;
      var iwOffsetX = this.pixelOffset_.width;
      var iwOffsetY = this.pixelOffset_.height;
      var iwWidth = this.div_.offsetWidth;
      var iwHeight = this.div_.offsetHeight;
      var padX = this.infoBoxClearance_.width;
      var padY = this.infoBoxClearance_.height;
      var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (pixPosition.x < (-iwOffsetX + padX)) {
        xOffset = pixPosition.x + iwOffsetX - padX;
      } else if ((pixPosition.x + iwWidth + iwOffsetX + padX) > mapWidth) {
        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
      }
      if (this.alignBottom_) {
        if (pixPosition.y < (-iwOffsetY + padY + iwHeight)) {
          yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
        } else if ((pixPosition.y + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
        }
      } else {
        if (pixPosition.y < (-iwOffsetY + padY)) {
          yOffset = pixPosition.y + iwOffsetY - padY;
        } else if ((pixPosition.y + iwHeight + iwOffsetY + padY) > mapHeight) {
          yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
        }
      }

      if (!(xOffset === 0 && yOffset === 0)) {

        // Move the map to the shifted center.
        //
        var c = map.getCenter();
        map.panBy(xOffset, yOffset);
      }
    }
  }
};

/**
 * Sets the style of the InfoBox by setting the style sheet and applying
 * other specific styles requested.
 * @private
 */
InfoBox.prototype.setBoxStyle_ = function () {

  var i, boxStyle;

  if (this.div_) {

    // Apply style values from the style sheet defined in the boxClass parameter:
    this.div_.className = this.boxClass_;

    // Clear existing inline style values:
    this.div_.style.cssText = "";

    // Apply style values defined in the boxStyle parameter:
    boxStyle = this.boxStyle_;
    for (i in boxStyle) {

      if (boxStyle.hasOwnProperty(i)) {

        this.div_.style[i] = boxStyle[i];
      }
    }

    // Fix up opacity style for benefit of MSIE:
    //
    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {

      this.div_.style.filter = "alpha(opacity=" + (this.div_.style.opacity * 100) + ")";
    }

    // Apply required styles:
    //
    this.div_.style.position = "absolute";
    this.div_.style.visibility = 'hidden';
    if (this.zIndex_ !== null) {

      this.div_.style.zIndex = this.zIndex_;
    }
  }
};

/**
 * Get the widths of the borders of the InfoBox.
 * @private
 * @return {Object} widths object (top, bottom left, right)
 */
InfoBox.prototype.getBoxWidths_ = function () {

  var computedStyle;
  var bw = {top: 0, bottom: 0, left: 0, right: 0};
  var box = this.div_;

  if (document.defaultView && document.defaultView.getComputedStyle) {

    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");

    if (computedStyle) {

      // The computed styles are always in pixel units (good!)
      bw.top = parseInt(computedStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(computedStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(computedStyle.borderRightWidth, 10) || 0;
    }

  } else if (document.documentElement.currentStyle) { // MSIE

    if (box.currentStyle) {

      // The current styles may not be in pixel units, but assume they are (bad!)
      bw.top = parseInt(box.currentStyle.borderTopWidth, 10) || 0;
      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
      bw.left = parseInt(box.currentStyle.borderLeftWidth, 10) || 0;
      bw.right = parseInt(box.currentStyle.borderRightWidth, 10) || 0;
    }
  }

  return bw;
};

/**
 * Invoked when <tt>close</tt> is called. Do not call it directly.
 */
InfoBox.prototype.onRemove = function () {

  if (this.div_) {

    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/**
 * Draws the InfoBox based on the current map projection and zoom level.
 */
InfoBox.prototype.draw = function () {

  this.createInfoBoxDiv_();

  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.position_);

  this.div_.style.left = (pixPosition.x + this.pixelOffset_.width) + "px";
  
  if (this.alignBottom_) {
    this.div_.style.bottom = -(pixPosition.y + this.pixelOffset_.height) + "px";
  } else {
    this.div_.style.top = (pixPosition.y + this.pixelOffset_.height) + "px";
  }

  if (this.isHidden_) {

    this.div_.style.visibility = 'hidden';

  } else {

    this.div_.style.visibility = "visible";
  }
};

/**
 * Sets the options for the InfoBox. Note that changes to the <tt>maxWidth</tt>,
 *  <tt>closeBoxMargin</tt>, <tt>closeBoxURL</tt>, and <tt>enableEventPropagation</tt>
 *  properties have no affect until the current InfoBox is <tt>close</tt>d and a new one
 *  is <tt>open</tt>ed.
 * @param {InfoBoxOptions} opt_opts
 */
InfoBox.prototype.setOptions = function (opt_opts) {
  if (typeof opt_opts.boxClass !== "undefined") { // Must be first

    this.boxClass_ = opt_opts.boxClass;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.boxStyle !== "undefined") { // Must be second

    this.boxStyle_ = opt_opts.boxStyle;
    this.setBoxStyle_();
  }
  if (typeof opt_opts.content !== "undefined") {

    this.setContent(opt_opts.content);
  }
  if (typeof opt_opts.disableAutoPan !== "undefined") {

    this.disableAutoPan_ = opt_opts.disableAutoPan;
  }
  if (typeof opt_opts.maxWidth !== "undefined") {

    this.maxWidth_ = opt_opts.maxWidth;
  }
  if (typeof opt_opts.pixelOffset !== "undefined") {

    this.pixelOffset_ = opt_opts.pixelOffset;
  }
  if (typeof opt_opts.alignBottom !== "undefined") {

    this.alignBottom_ = opt_opts.alignBottom;
  }
  if (typeof opt_opts.position !== "undefined") {

    this.setPosition(opt_opts.position);
  }
  if (typeof opt_opts.zIndex !== "undefined") {

    this.setZIndex(opt_opts.zIndex);
  }
  if (typeof opt_opts.closeBoxMargin !== "undefined") {

    this.closeBoxMargin_ = opt_opts.closeBoxMargin;
  }
  if (typeof opt_opts.closeBoxURL !== "undefined") {

    this.closeBoxURL_ = opt_opts.closeBoxURL;
  }
  if (typeof opt_opts.infoBoxClearance !== "undefined") {

    this.infoBoxClearance_ = opt_opts.infoBoxClearance;
  }
  if (typeof opt_opts.isHidden !== "undefined") {

    this.isHidden_ = opt_opts.isHidden;
  }
  if (typeof opt_opts.enableEventPropagation !== "undefined") {

    this.enableEventPropagation_ = opt_opts.enableEventPropagation;
  }

  if (this.div_) {

    this.draw();
  }
};

/**
 * Sets the content of the InfoBox.
 *  The content can be plain text or an HTML DOM node.
 * @param {string|Node} content
 */
InfoBox.prototype.setContent = function (content) {
  this.content_ = content;

  if (this.div_) {

    if (this.closeListener_) {

      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }

    // Odd code required to make things work with MSIE.
    //
    if (!this.fixedWidthSet_) {

      this.div_.style.width = "";
    }

    if (typeof content.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + content;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(content);
    }

    // Perverse code required to make things work with MSIE.
    // (Ensures the close box does, in fact, float to the right.)
    //
    if (!this.fixedWidthSet_) {
      this.div_.style.width = this.div_.offsetWidth + "px";
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
    }

    this.addClickHandler_();
  }

  /**
   * This event is fired when the content of the InfoBox changes.
   * @name InfoBox#content_changed
   * @event
   */
  google.maps.event.trigger(this, "content_changed");
};

/**
 * Sets the geographic location of the InfoBox.
 * @param {LatLng} latlng
 */
InfoBox.prototype.setPosition = function (latlng) {

  this.position_ = latlng;

  if (this.div_) {

    this.draw();
  }

  /**
   * This event is fired when the position of the InfoBox changes.
   * @name InfoBox#position_changed
   * @event
   */
  google.maps.event.trigger(this, "position_changed");
};

/**
 * Sets the zIndex style for the InfoBox.
 * @param {number} index
 */
InfoBox.prototype.setZIndex = function (index) {

  this.zIndex_ = index;

  if (this.div_) {

    this.div_.style.zIndex = index;
  }

  /**
   * This event is fired when the zIndex of the InfoBox changes.
   * @name InfoBox#zindex_changed
   * @event
   */
  google.maps.event.trigger(this, "zindex_changed");
};

/**
 * Returns the content of the InfoBox.
 * @returns {string}
 */
InfoBox.prototype.getContent = function () {

  return this.content_;
};

/**
 * Returns the geographic location of the InfoBox.
 * @returns {LatLng}
 */
InfoBox.prototype.getPosition = function () {

  return this.position_;
};

/**
 * Returns the zIndex for the InfoBox.
 * @returns {number}
 */
InfoBox.prototype.getZIndex = function () {

  return this.zIndex_;
};

/**
 * Shows the InfoBox.
 */
InfoBox.prototype.show = function () {

  this.isHidden_ = false;
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
};

/**
 * Hides the InfoBox.
 */
InfoBox.prototype.hide = function () {

  this.isHidden_ = true;
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
};

/**
 * Adds the InfoBox to the specified map or Street View panorama. If <tt>anchor</tt>
 *  (usually a <tt>google.maps.Marker</tt>) is specified, the position
 *  of the InfoBox is set to the position of the <tt>anchor</tt>. If the
 *  anchor is dragged to a new location, the InfoBox moves as well.
 * @param {Map|StreetViewPanorama} map
 * @param {MVCObject} [anchor]
 */
InfoBox.prototype.open = function (map, anchor) {

  var me = this;

  if (anchor) {

    this.position_ = anchor.getPosition();
    this.moveListener_ = google.maps.event.addListener(anchor, "position_changed", function () {
      me.setPosition(this.getPosition());
    });
  }

  this.setMap(map);

  if (this.div_) {

    this.panBox_();
  }
};

/**
 * Removes the InfoBox from the map.
 */
InfoBox.prototype.close = function () {

  var i;

  if (this.closeListener_) {

    google.maps.event.removeListener(this.closeListener_);
    this.closeListener_ = null;
  }

  if (this.eventListeners_) {
    
    for (i = 0; i < this.eventListeners_.length; i++) {

      google.maps.event.removeListener(this.eventListeners_[i]);
    }
    this.eventListeners_ = null;
  }

  if (this.moveListener_) {

    google.maps.event.removeListener(this.moveListener_);
    this.moveListener_ = null;
  }

  if (this.contextListener_) {

    google.maps.event.removeListener(this.contextListener_);
    this.contextListener_ = null;
  }

  this.setMap(null);
};

// marker
(function(){var d=null;function e(a){return function(b){this[a]=b}}function h(a){return function(){return this[a]}}var j;
function k(a,b,c){this.extend(k,google.maps.OverlayView);this.c=a;this.a=[];this.f=[];this.ca=[53,56,66,78,90];this.j=[];this.A=!1;c=c||{};this.g=c.gridSize||60;this.l=c.minimumClusterSize||2;this.J=c.maxZoom||d;this.j=c.styles||[];this.X=c.imagePath||this.Q;this.W=c.imageExtension||this.P;this.O=!0;if(c.zoomOnClick!=void 0)this.O=c.zoomOnClick;this.r=!1;if(c.averageCenter!=void 0)this.r=c.averageCenter;l(this);this.setMap(a);this.K=this.c.getZoom();var f=this;google.maps.event.addListener(this.c,
"zoom_changed",function(){var a=f.c.getZoom();if(f.K!=a)f.K=a,f.m()});google.maps.event.addListener(this.c,"idle",function(){f.i()});b&&b.length&&this.C(b,!1)}j=k.prototype;j.Q="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m";j.P="png";j.extend=function(a,b){return function(a){for(var b in a.prototype)this.prototype[b]=a.prototype[b];return this}.apply(a,[b])};j.onAdd=function(){if(!this.A)this.A=!0,n(this)};j.draw=function(){};
function l(a){if(!a.j.length)for(var b=0,c;c=a.ca[b];b++)a.j.push({url:a.X+(b+1)+"."+a.W,height:c,width:c})}j.S=function(){for(var a=this.o(),b=new google.maps.LatLngBounds,c=0,f;f=a[c];c++)b.extend(f.getPosition());this.c.fitBounds(b)};j.z=h("j");j.o=h("a");j.V=function(){return this.a.length};j.ba=e("J");j.I=h("J");j.G=function(a,b){for(var c=0,f=a.length,g=f;g!==0;)g=parseInt(g/10,10),c++;c=Math.min(c,b);return{text:f,index:c}};j.$=e("G");j.H=h("G");
j.C=function(a,b){for(var c=0,f;f=a[c];c++)q(this,f);b||this.i()};function q(a,b){b.s=!1;b.draggable&&google.maps.event.addListener(b,"dragend",function(){b.s=!1;a.L()});a.a.push(b)}j.q=function(a,b){q(this,a);b||this.i()};function r(a,b){var c=-1;if(a.a.indexOf)c=a.a.indexOf(b);else for(var f=0,g;g=a.a[f];f++)if(g==b){c=f;break}if(c==-1)return!1;b.setMap(d);a.a.splice(c,1);return!0}j.Y=function(a,b){var c=r(this,a);return!b&&c?(this.m(),this.i(),!0):!1};
j.Z=function(a,b){for(var c=!1,f=0,g;g=a[f];f++)g=r(this,g),c=c||g;if(!b&&c)return this.m(),this.i(),!0};j.U=function(){return this.f.length};j.getMap=h("c");j.setMap=e("c");j.w=h("g");j.aa=e("g");
j.v=function(a){var b=this.getProjection(),c=new google.maps.LatLng(a.getNorthEast().lat(),a.getNorthEast().lng()),f=new google.maps.LatLng(a.getSouthWest().lat(),a.getSouthWest().lng()),c=b.fromLatLngToDivPixel(c);c.x+=this.g;c.y-=this.g;f=b.fromLatLngToDivPixel(f);f.x-=this.g;f.y+=this.g;c=b.fromDivPixelToLatLng(c);b=b.fromDivPixelToLatLng(f);a.extend(c);a.extend(b);return a};j.R=function(){this.m(!0);this.a=[]};
j.m=function(a){for(var b=0,c;c=this.f[b];b++)c.remove();for(b=0;c=this.a[b];b++)c.s=!1,a&&c.setMap(d);this.f=[]};j.L=function(){var a=this.f.slice();this.f.length=0;this.m();this.i();window.setTimeout(function(){for(var b=0,c;c=a[b];b++)c.remove()},0)};j.i=function(){n(this)};
function n(a){if(a.A)for(var b=a.v(new google.maps.LatLngBounds(a.c.getBounds().getSouthWest(),a.c.getBounds().getNorthEast())),c=0,f;f=a.a[c];c++)if(!f.s&&b.contains(f.getPosition())){for(var g=a,u=4E4,o=d,v=0,m=void 0;m=g.f[v];v++){var i=m.getCenter();if(i){var p=f.getPosition();if(!i||!p)i=0;else var w=(p.lat()-i.lat())*Math.PI/180,x=(p.lng()-i.lng())*Math.PI/180,i=Math.sin(w/2)*Math.sin(w/2)+Math.cos(i.lat()*Math.PI/180)*Math.cos(p.lat()*Math.PI/180)*Math.sin(x/2)*Math.sin(x/2),i=6371*2*Math.atan2(Math.sqrt(i),
Math.sqrt(1-i));i<u&&(u=i,o=m)}}o&&o.F.contains(f.getPosition())?o.q(f):(m=new s(g),m.q(f),g.f.push(m))}}function s(a){this.k=a;this.c=a.getMap();this.g=a.w();this.l=a.l;this.r=a.r;this.d=d;this.a=[];this.F=d;this.n=new t(this,a.z(),a.w())}j=s.prototype;
j.q=function(a){var b;a:if(this.a.indexOf)b=this.a.indexOf(a)!=-1;else{b=0;for(var c;c=this.a[b];b++)if(c==a){b=!0;break a}b=!1}if(b)return!1;if(this.d){if(this.r)c=this.a.length+1,b=(this.d.lat()*(c-1)+a.getPosition().lat())/c,c=(this.d.lng()*(c-1)+a.getPosition().lng())/c,this.d=new google.maps.LatLng(b,c),y(this)}else this.d=a.getPosition(),y(this);a.s=!0;this.a.push(a);b=this.a.length;b<this.l&&a.getMap()!=this.c&&a.setMap(this.c);if(b==this.l)for(c=0;c<b;c++)this.a[c].setMap(d);b>=this.l&&a.setMap(d);
a=this.c.getZoom();if((b=this.k.I())&&a>b)for(a=0;b=this.a[a];a++)b.setMap(this.c);else if(this.a.length<this.l)z(this.n);else{b=this.k.H()(this.a,this.k.z().length);this.n.setCenter(this.d);a=this.n;a.B=b;a.ga=b.text;a.ea=b.index;if(a.b)a.b.innerHTML=b.text;b=Math.max(0,a.B.index-1);b=Math.min(a.j.length-1,b);b=a.j[b];a.da=b.url;a.h=b.height;a.p=b.width;a.M=b.textColor;a.e=b.anchor;a.N=b.textSize;a.D=b.backgroundPosition;this.n.show()}return!0};
j.getBounds=function(){for(var a=new google.maps.LatLngBounds(this.d,this.d),b=this.o(),c=0,f;f=b[c];c++)a.extend(f.getPosition());return a};j.remove=function(){this.n.remove();this.a.length=0;delete this.a};j.T=function(){return this.a.length};j.o=h("a");j.getCenter=h("d");function y(a){a.F=a.k.v(new google.maps.LatLngBounds(a.d,a.d))}j.getMap=h("c");
function t(a,b,c){a.k.extend(t,google.maps.OverlayView);this.j=b;this.fa=c||0;this.u=a;this.d=d;this.c=a.getMap();this.B=this.b=d;this.t=!1;this.setMap(this.c)}j=t.prototype;
j.onAdd=function(){this.b=document.createElement("DIV");if(this.t)this.b.style.cssText=A(this,B(this,this.d)),this.b.innerHTML=this.B.text;this.getPanes().overlayMouseTarget.appendChild(this.b);var a=this;google.maps.event.addDomListener(this.b,"click",function(){var b=a.u.k;google.maps.event.trigger(b,"clusterclick",a.u);b.O&&a.c.fitBounds(a.u.getBounds())})};function B(a,b){var c=a.getProjection().fromLatLngToDivPixel(b);c.x-=parseInt(a.p/2,10);c.y-=parseInt(a.h/2,10);return c}
j.draw=function(){if(this.t){var a=B(this,this.d);this.b.style.top=a.y+"px";this.b.style.left=a.x+"px"}};function z(a){if(a.b)a.b.style.display="none";a.t=!1}j.show=function(){if(this.b)this.b.style.cssText=A(this,B(this,this.d)),this.b.style.display="";this.t=!0};j.remove=function(){this.setMap(d)};j.onRemove=function(){if(this.b&&this.b.parentNode)z(this),this.b.parentNode.removeChild(this.b),this.b=d};j.setCenter=e("d");
function A(a,b){var c=[];c.push("background-image:url("+a.da+");");c.push("background-position:"+(a.D?a.D:"0 0")+";");typeof a.e==="object"?(typeof a.e[0]==="number"&&a.e[0]>0&&a.e[0]<a.h?c.push("height:"+(a.h-a.e[0])+"px; padding-top:"+a.e[0]+"px;"):c.push("height:"+a.h+"px; line-height:"+a.h+"px;"),typeof a.e[1]==="number"&&a.e[1]>0&&a.e[1]<a.p?c.push("width:"+(a.p-a.e[1])+"px; padding-left:"+a.e[1]+"px;"):c.push("width:"+a.p+"px; text-align:center;")):c.push("height:"+a.h+"px; line-height:"+a.h+
"px; width:"+a.p+"px; text-align:center;");c.push("cursor:pointer; top:"+b.y+"px; left:"+b.x+"px; color:"+(a.M?a.M:"black")+"; position:absolute; font-size:"+(a.N?a.N:11)+"px; font-family:Arial,sans-serif; font-weight:bold");return c.join("")}window.MarkerClusterer=k;k.prototype.addMarker=k.prototype.q;k.prototype.addMarkers=k.prototype.C;k.prototype.clearMarkers=k.prototype.R;k.prototype.fitMapToMarkers=k.prototype.S;k.prototype.getCalculator=k.prototype.H;k.prototype.getGridSize=k.prototype.w;
k.prototype.getExtendedBounds=k.prototype.v;k.prototype.getMap=k.prototype.getMap;k.prototype.getMarkers=k.prototype.o;k.prototype.getMaxZoom=k.prototype.I;k.prototype.getStyles=k.prototype.z;k.prototype.getTotalClusters=k.prototype.U;k.prototype.getTotalMarkers=k.prototype.V;k.prototype.redraw=k.prototype.i;k.prototype.removeMarker=k.prototype.Y;k.prototype.removeMarkers=k.prototype.Z;k.prototype.resetViewport=k.prototype.m;k.prototype.repaint=k.prototype.L;k.prototype.setCalculator=k.prototype.$;
k.prototype.setGridSize=k.prototype.aa;k.prototype.setMaxZoom=k.prototype.ba;k.prototype.onAdd=k.prototype.onAdd;k.prototype.draw=k.prototype.draw;s.prototype.getCenter=s.prototype.getCenter;s.prototype.getSize=s.prototype.T;s.prototype.getMarkers=s.prototype.o;t.prototype.onAdd=t.prototype.onAdd;t.prototype.draw=t.prototype.draw;t.prototype.onRemove=t.prototype.onRemove;
})();
