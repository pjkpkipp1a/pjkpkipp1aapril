(function(){
    var script = {
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_D83C8239_F8DE_01A1_41D3_401F7AD1E733",
  "this.IconButton_DC8D8382_F8CA_0763_41EC_64D2A891BD4E",
  "this.Image_CBFC9856_F846_01E3_41EB_804DF5C5CBA6",
  "this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist,this.mainPlayList])",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Player",
 "borderSize": 0,
 "vrPolyfillScale": 1,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 20,
 "propagateClick": false,
 "scripts": {
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "unregisterKey": function(key){  delete window[key]; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "existsKey": function(key){  return key in window; },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "defaultVRPointer": "laser",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "downloadEnabled": false,
 "verticalAlign": "top",
 "layout": "absolute",
 "paddingTop": 0,
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Player22681"
 },
 "overflow": "visible",
 "mouseWheelEnabled": true,
 "scrollBarWidth": 10,
 "definitions": [{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AAA7485_5157_0269_41D2_36B2E66CD773",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.75,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F67631_534D_0EEF_41D1_2F6F10F30CF3",
 "easing": "cubic_out"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0189",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.42,
   "backwardYaw": 178.59,
   "distance": 1,
   "panorama": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.49,
   "backwardYaw": -4.03,
   "distance": 1,
   "panorama": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634"
  }
 ],
 "thumbnailUrl": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_t.jpg",
 "id": "panorama_5A484F54_514F_1596_41C1_91048E20962D",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5EE64798_515B_349E_41CE_16673EE0C2E7",
  "this.overlay_434285D3_515B_1492_4183_34804A0FEAA8",
  "this.overlay_7B0BCE8A_5355_7FB2_41D1_F2B4BBC0DFDB"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0203",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.4,
   "backwardYaw": -164.02,
   "distance": 1,
   "panorama": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 165.05,
   "backwardYaw": 4.71,
   "distance": 1,
   "panorama": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_t.jpg",
 "id": "panorama_5A4C4034_514F_0B96_41BA_58111AE764E1",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41F8B852_5155_1B95_41A5_A992D7C8E2D5",
  "this.overlay_41DD85A9_514B_14BE_41B8_89BCD3C976D0",
  "this.overlay_7A95C251_5355_06AE_41C4_AB4689BE33A6"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_78F56631_534D_0EEF_41D4_D9F4EA3B9B4A",
 "levels": [
  {
   "url": "media/zoomImage_758DC548_52CF_0ACD_41C7_3FFAD71AC15E_0_0.jpg",
   "width": 2835,
   "class": "ImageResourceLevel",
   "height": 1420
  },
  {
   "url": "media/zoomImage_758DC548_52CF_0ACD_41C7_3FFAD71AC15E_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_758DC548_52CF_0ACD_41C7_3FFAD71AC15E_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_758DC548_52CF_0ACD_41C7_3FFAD71AC15E_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4",
   "camera": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0",
   "camera": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634",
   "camera": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D",
   "camera": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D",
   "camera": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C",
   "camera": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F",
   "camera": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0",
   "camera": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655",
   "camera": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A",
   "camera": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C",
   "camera": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231",
   "camera": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B",
   "camera": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015",
   "camera": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47",
   "camera": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1",
   "camera": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795",
   "camera": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936",
   "camera": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51",
   "camera": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6",
   "camera": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370",
   "camera": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97",
   "camera": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229",
   "camera": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49",
   "camera": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988",
   "camera": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC",
   "camera": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291",
   "camera": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0",
   "camera": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821",
   "camera": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_acceleration"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0210",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 173.75,
   "backwardYaw": 1.14,
   "distance": 1,
   "panorama": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97"
  }
 ],
 "thumbnailUrl": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_t.jpg",
 "id": "panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_4138FB82_5157_7D72_41AC_6FBAC020FFB3",
  "this.overlay_41997D26_5155_15B3_41D1_4B6981B2F729",
  "this.overlay_7AB71779_534B_0D5F_41C5_9567A17B6956"
 ]
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_1A65691F_310E_0014_41BF_C2605660352F",
 "easing": "quad_in",
 "from": "left"
},
{
 "hfovMax": 130,
 "partial": false,
 "hfovMin": "301%",
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "DJI_0211",
 "id": "panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49",
 "thumbnailUrl": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_41EED2DD_5157_0C91_41CB_7A5A6D800075"
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0213",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -173.43,
   "backwardYaw": -177.36,
   "distance": 1,
   "panorama": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -4.72,
   "backwardYaw": -169.58,
   "distance": 1,
   "panorama": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291"
  }
 ],
 "thumbnailUrl": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_t.jpg",
 "id": "panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41F8FAE3_514B_1CB2_41B5_2F9053CEA241",
  "this.overlay_4318AC25_514B_1BB6_41C5_EA59395FA446",
  "this.overlay_7AA8F978_534D_055E_41D0_4E0382230C6F"
 ]
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_49353574_570C_A542_41D0_43B05AC58F9B",
 "easing": "quad_in",
 "to": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_6485E396_5157_066B_41CE_0F8B4108FC60",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.51,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64CE8380_5157_0667_41CD_83E5A8902D54",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.8,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_6451B351_5157_06E9_41D5_CB6F57AF856D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.95,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F7062F_534D_0EF3_41C9_1CFFA422A6E1",
 "easing": "cubic_out"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64E32386_5157_066B_4180_801430CA8244",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.98,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64A7E3A6_5157_05AB_4185_CC261A5D08B9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.77,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7A90C468_5157_02A7_4194_0925FA4D869C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.57,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0190",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 178.59,
   "backwardYaw": -1.42,
   "distance": 1,
   "panorama": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.14,
   "backwardYaw": 171.92,
   "distance": 1,
   "panorama": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_t.jpg",
 "id": "panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5EFC5EAD_515B_14B6_419C_9FEFCC212230",
  "this.overlay_5EAADB71_515D_1DAE_41CA_5FA0D9DEC457",
  "this.overlay_7AA20136_535B_02D2_41CE_AC6AA6B341AA"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AB53485_5157_0269_41C4_AC244D19330E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.6,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7ABC9496_5157_026B_4154_83546894EA40",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.65,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0186",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.2,
   "backwardYaw": 176.91,
   "distance": 1,
   "panorama": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0"
  }
 ],
 "thumbnailUrl": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_t.jpg",
 "id": "panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5FBEDC57_5157_FB92_41D2_3B4CA5746454",
  "this.overlay_64E29140_534B_02AD_419C_1A698A42451C",
  "this.overlay_7ABFD895_5355_03D6_41B0_91EA32DEE27A"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4F348F_514F_0B72_41D3_B4758189616C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_79477499_5157_0399_41BC_CBF47882C562",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.7,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0204",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -164.02,
   "backwardYaw": 1.4,
   "distance": 1,
   "panorama": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.3,
   "backwardYaw": -176.35,
   "distance": 1,
   "panorama": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936"
  }
 ],
 "thumbnailUrl": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_t.jpg",
 "id": "panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41DF99EA_5155_1CB3_41D1_67551DB04F99",
  "this.overlay_404A0233_514B_0F91_41A9_9BE7E6A3FE74",
  "this.overlay_7AA020DD_5355_0356_41D4_11436BBCF2F5"
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0215",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.5,
   "backwardYaw": -175.62,
   "distance": 1,
   "panorama": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -144.79,
   "backwardYaw": -5.6,
   "distance": 1,
   "panorama": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_t.jpg",
 "id": "panorama_5A4CBCF7_514D_1491_41C8_3281836592A0",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_419C4831_514D_1BAE_41C9_AFCCC936D566",
  "this.overlay_43E60DB4_514D_1496_41D0_BC3A322C257D",
  "this.overlay_7AB5918A_534F_05BD_41D4_76599469CD15"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7A83C456_5157_02EB_4150_DBB5E7A19AD3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.28,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F0662F_534D_0EF3_41CF_7970A968DE61",
 "easing": "cubic_in"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AA0E480_5157_0267_4196_D292F830ADA4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.09,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0207",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.39,
   "backwardYaw": 174.89,
   "distance": 1,
   "panorama": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 161.05,
   "backwardYaw": 0.1,
   "distance": 1,
   "panorama": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51"
  }
 ],
 "thumbnailUrl": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_t.jpg",
 "id": "panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41CD40F4_5157_0C97_41D0_DC4CC7A49C9A",
  "this.overlay_4189C96C_5155_1DB6_41C7_25E1513144E7",
  "this.overlay_7ABEF260_5355_076E_41C5_0A8F023BF52A"
 ]
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9",
 "easing": "quad_in",
 "to": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_636A33C6_5157_05EB_41D3_BDCE423A45EF",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.08,
  "pitch": 0
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_78F0562F_534D_0EF3_41D2_C0F8A2F0BE5D",
 "levels": [
  {
   "url": "media/zoomImage_75E6B157_52CD_0ACA_41C5_0B743094B81F_0_0.jpg",
   "width": 2835,
   "class": "ImageResourceLevel",
   "height": 1420
  },
  {
   "url": "media/zoomImage_75E6B157_52CD_0ACA_41C5_0B743094B81F_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_75E6B157_52CD_0ACA_41C5_0B743094B81F_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_75E6B157_52CD_0ACA_41C5_0B743094B81F_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7A96A468_5157_02A7_41C3_6F9A8E643490",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.4,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F6262F_534D_0EF3_41D3_4DFC3A09636E",
 "easing": "cubic_out"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_643EC376_5157_06AB_41C6_63438B9C0BCE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -15.27,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0195",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 179.08,
   "backwardYaw": 0.41,
   "distance": 1,
   "panorama": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 3.32,
   "backwardYaw": 154.97,
   "distance": 1,
   "panorama": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_t.jpg",
 "id": "panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_413125A3_515F_34B2_41D0_67237EE5CDC5",
  "this.overlay_413AC3A9_515F_0CBE_41CE_A9972270CEA7",
  "this.overlay_7A8579C9_535D_05BE_419F_DB934830E662"
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0192",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -3.98,
   "backwardYaw": -166.23,
   "distance": 1,
   "panorama": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 157.84,
   "backwardYaw": 11.9,
   "distance": 1,
   "panorama": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_t.jpg",
 "id": "panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_432C2763_515D_15B2_41C1_918B6C6E5E77",
  "this.overlay_410AB0FD_515D_0C96_41D4_0244A2C3E166",
  "this.overlay_7B4E1289_535D_07BF_41C9_1F7D8DBEF2D4"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_6495D3A0_5157_05A7_41AE_0F93CC13882E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.25,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_634873B6_5157_05AB_41C8_14258B5E52F1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.33,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0205",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -176.35,
   "backwardYaw": -2.3,
   "distance": 1,
   "panorama": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.67,
   "backwardYaw": 176.73,
   "distance": 1,
   "panorama": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51"
  }
 ],
 "thumbnailUrl": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_t.jpg",
 "id": "panorama_5A48BA89_514F_1F71_41D3_9699D79B7936",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_411DA448_5157_0BFF_41C0_B2231D92310E",
  "this.overlay_41FE8A12_5155_1F93_41D4_1DEC4498642C",
  "this.overlay_7ABC3681_5357_0FAE_41D5_41FD9425972F"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_78F6B631_534D_0EEF_41D1_4E6F014D6421",
 "levels": [
  {
   "url": "media/zoomImage_75F20BBD_52CD_3E41_41CA_B5B85E6F365F_0_0.jpg",
   "width": 2835,
   "class": "ImageResourceLevel",
   "height": 1420
  },
  {
   "url": "media/zoomImage_75F20BBD_52CD_3E41_41CA_B5B85E6F365F_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_75F20BBD_52CD_3E41_41CA_B5B85E6F365F_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_75F20BBD_52CD_3E41_41CA_B5B85E6F365F_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_635BC3B6_5157_05AB_41A6_D7B15BABD62D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.58,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0206",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.1,
   "backwardYaw": 161.05,
   "distance": 1,
   "panorama": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.73,
   "backwardYaw": -0.67,
   "distance": 1,
   "panorama": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_t.jpg",
 "id": "panorama_5A4D379D_514F_7496_41BA_EC9235080F51",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41D85261_5157_0FB1_41D0_46EC9777D69D",
  "this.overlay_41EE8E15_5155_7796_41CC_5070EC699372",
  "this.overlay_7A92A167_5357_0572_41AA_BC637E633741"
 ]
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_EDB05026_FD1A_0C44_41EA_7A7383BCF1B7",
 "easing": "quad_in",
 "to": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64D08386_5157_066B_41C5_7331CAA92EC4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.63,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0216",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -175.62,
   "backwardYaw": -0.5,
   "distance": 1,
   "panorama": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.61,
   "backwardYaw": -177.46,
   "distance": 1,
   "panorama": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F"
  }
 ],
 "thumbnailUrl": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_t.jpg",
 "id": "panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41FE3FDC_514D_3497_41CD_8F339149CD1C",
  "this.overlay_7450AC7E_5135_7B92_41C0_A320128757BB",
  "this.overlay_7A8518BD_534F_03D6_41C0_86ECF0F6D572"
 ]
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F1A62F_534D_0EF3_418D_0D2E6D2C68DE",
 "easing": "cubic_in"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7A8D1456_5157_02EB_41CC_6C5CC8D0EEC0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.38,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0196",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.25,
   "backwardYaw": 175.18,
   "distance": 1,
   "panorama": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 154.97,
   "backwardYaw": 3.32,
   "distance": 1,
   "panorama": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_t.jpg",
 "id": "panorama_5A4F348F_514F_0B72_41D3_B4758189616C",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5ED167B8_515F_149E_41D2_3817638AE939",
  "this.overlay_4623CB33_514B_FD92_41B4_2D5A27E06A6F",
  "this.overlay_7A46BAD3_535D_0753_41D1_A43686DA6538",
  "this.overlay_7B4F13A2_535D_05ED_41D5_05CBFC5F23A9"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AF9A456_5157_02EB_4192_B2701B19CBD9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 35.21,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_795124A6_5157_03AB_41CF_43214A4CB144",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.86,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65B9233C_5157_069F_41A3_8519F656DCF9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.82,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65954327_5157_06A9_41C6_90F380F2890D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.83,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7956E4A6_5157_03AB_41C4_4769664FC4F9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.86,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_2EF4EDF2_311A_002F_41B7_7476A5CB22BB",
 "easing": "quad_in",
 "to": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AF34446_5157_02EB_41D3_1CC0BACF6448",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.51,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F53631_534D_0EEF_41C6_B7C75B12E62E",
 "easing": "cubic_out"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0200",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.64,
   "backwardYaw": 168.49,
   "distance": 1,
   "panorama": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015"
  }
 ],
 "thumbnailUrl": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_t.jpg",
 "id": "panorama_5A508887_514F_1B72_41AE_1C46B632CD7B",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5EF1EDBC_5155_1497_41D0_B25475088196",
  "this.overlay_7A684180_535B_05AE_41D1_33A1ED295164"
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0208",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 174.89,
   "backwardYaw": -0.39,
   "distance": 1,
   "panorama": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.49,
   "backwardYaw": -168.44,
   "distance": 1,
   "panorama": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_t.jpg",
 "id": "panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41DBC183_5157_0D72_41C6_6CC82D65CE33",
  "this.overlay_41DBBA02_5155_3F73_41C9_C83500DC7FF1",
  "this.overlay_7A609D79_5355_1D5F_41B6_EB256CDF0D6D"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0191",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 171.92,
   "backwardYaw": -0.14,
   "distance": 1,
   "panorama": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.9,
   "backwardYaw": 157.84,
   "distance": 1,
   "panorama": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_t.jpg",
 "id": "panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_406FAF6E_515B_75B2_4179_2894AEF63312",
  "this.overlay_431B7130_515D_0DAF_41C9_5C3AA95C1C92",
  "this.overlay_78D74645_535D_0EB6_41BD_08CA3B0DC125"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AF40446_5157_02EB_41C3_EE56AFFE4DE7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.51,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0187",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 176.91,
   "backwardYaw": -0.2,
   "distance": 1,
   "panorama": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -2.09,
   "backwardYaw": -156.37,
   "distance": 1,
   "panorama": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634"
  }
 ],
 "thumbnailUrl": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_t.jpg",
 "id": "panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_4165CFB6_5154_F492_41D3_472B0671CEF3",
  "this.overlay_41165DAE_515B_14B3_41A7_87DFB5C09846",
  "this.overlay_7A4C85D3_5357_0D52_41C4_6BFD3E04E94D"
 ]
},
{
 "manualZoomSpeed": 4,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65ECA2F7_5157_07A9_41C1_25318DB1D763",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.54,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4D379D_514F_7496_41BA_EC9235080F51_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_647BA356_5157_06EB_41D0_8BFD96FC27A6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.9,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64B9A3B0_5157_05A7_41AD_A33C9F6219D4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -18.95,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_794E0499_5157_0399_41D4_8732891DD371",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.27,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78EDF62D_534D_0EF7_41C9_BBE4DAB51E03",
 "easing": "cubic_in"
},
{
 "class": "PlayList",
 "id": "ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist",
 "items": [
  {
   "media": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4",
   "camera": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0",
   "camera": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634",
   "camera": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D",
   "camera": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D",
   "camera": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C",
   "camera": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F",
   "camera": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0",
   "camera": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655",
   "camera": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A",
   "camera": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C",
   "camera": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231",
   "camera": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B",
   "camera": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015",
   "camera": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47",
   "camera": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1",
   "camera": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795",
   "camera": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936",
   "camera": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51",
   "camera": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6",
   "camera": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370",
   "camera": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97",
   "camera": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229",
   "camera": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49",
   "camera": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988",
   "camera": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC",
   "camera": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291",
   "camera": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0",
   "camera": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821",
   "camera": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F",
   "camera": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 29, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AA72475_5157_02A9_41CC_D2680A97D52F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -25.03,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64F57386_5157_066B_41C3_59A61F15D7D3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.29,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.73,
  "pitch": -32.44
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7A9DC475_5157_02A9_41D1_877E927C61BC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.59,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_659BA327_5157_06A9_41D1_25285C5FB22F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.02,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_641C536E_5157_06BB_41A2_B9A6DEE39DD4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.92,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_640DD366_5157_06AB_41A3_D66F424A0FE9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.76,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A504003_514D_0B72_41C4_1D59F44EE291_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_78EDE62D_534D_0EF7_4187_ADA4E5FD321E",
 "levels": [
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_0.jpg",
   "width": 28874,
   "class": "ImageResourceLevel",
   "height": 14465
  },
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_1.jpg",
   "width": 16384,
   "class": "ImageResourceLevel",
   "height": 8207
  },
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_2.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 4103
  },
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_3.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2051
  },
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_4.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_5.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_74BC4FCF_52CB_15D3_41D0_5B8229E7640F_0_6.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_78F6062F_534D_0EF3_419A_022615D38E0E",
 "levels": [
  {
   "url": "media/zoomImage_7A9F7FBC_52CD_1641_41D4_170E7E3B12D8_0_0.jpg",
   "width": 2835,
   "class": "ImageResourceLevel",
   "height": 1420
  },
  {
   "url": "media/zoomImage_7A9F7FBC_52CD_1641_41D4_170E7E3B12D8_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_7A9F7FBC_52CD_1641_41D4_170E7E3B12D8_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_7A9F7FBC_52CD_1641_41D4_170E7E3B12D8_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F6162F_534D_0EF3_41CE_37B00E28F37C",
 "easing": "cubic_in"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0193",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.24,
   "backwardYaw": 179.17,
   "distance": 1,
   "panorama": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -166.23,
   "backwardYaw": -3.98,
   "distance": 1,
   "panorama": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_t.jpg",
 "id": "panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5EEBC9C7_515D_7CF2_41C9_8F29474F7CB0",
  "this.overlay_41C773DD_515D_0C96_41C7_70E2B24E7314",
  "this.overlay_7AB83231_535F_06EE_41D3_357540ED266F"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65B5933C_5157_069F_41D1_DE64AD1F3FCD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.42,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_642E6376_5157_06AB_41B9_CE36BA2F4FB6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.36,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0214",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -5.6,
   "backwardYaw": -144.79,
   "distance": 1,
   "panorama": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -169.58,
   "backwardYaw": -4.72,
   "distance": 1,
   "panorama": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC"
  }
 ],
 "thumbnailUrl": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_t.jpg",
 "id": "panorama_5A504003_514D_0B72_41C4_1D59F44EE291",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41EEBC67_514B_1BB1_41B6_AD46B8B8937D",
  "this.overlay_430F5FE5_514B_14B6_41D2_B239299D205F",
  "this.overlay_7A8586CE_534D_0FB5_41C3_1823CD83F2A0"
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0212",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -177.36,
   "backwardYaw": -173.43,
   "distance": 1,
   "panorama": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_t.jpg",
 "id": "panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41B4C986_514B_3D73_41D1_2851209BD7E7",
  "this.overlay_7A86EC40_534B_02AD_41C6_03B4F494EF4E"
 ]
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_F2D95D32_FD1A_145D_41DF_3B15A8774774",
 "easing": "quad_in",
 "from": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64B783A6_5157_05AB_41C9_9035B7071FC0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.1,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_112869ED_311E_0034_41C2_70A247245BB7",
 "easing": "quad_in",
 "to": "left"
},
{
 "manualZoomSpeed": 4,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0194",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 179.17,
   "backwardYaw": -1.24,
   "distance": 1,
   "panorama": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.41,
   "backwardYaw": 179.08,
   "distance": 1,
   "panorama": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_t.jpg",
 "id": "panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5EFC11E3_515D_0CB2_41A7_9108514B646E",
  "this.overlay_5EA02E38_515C_F79E_41CC_DE87A4A88680",
  "this.overlay_7AB8A880_535F_03AD_41B4_4AA99F42759A"
 ]
},
{
 "class": "ImageResource",
 "id": "ImageResource_78F1962F_534D_0EF3_41C1_00477EADDD73",
 "levels": [
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_0.jpg",
   "width": 28874,
   "class": "ImageResourceLevel",
   "height": 14465
  },
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_1.jpg",
   "width": 16384,
   "class": "ImageResourceLevel",
   "height": 8207
  },
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_2.jpg",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 4103
  },
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_3.jpg",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2051
  },
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_4.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_5.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_74A3EB07_52CB_1E57_41D2_FABBD1E8A46E_0_6.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65F88317_5157_0669_41CB_1AE9F67EE6CC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.41,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4F3319_514F_0D91_41AE_16804C690B47_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_268FAF4D_310E_0075_4179_B2B3CFC7C47E",
 "easing": "quad_in",
 "from": "left"
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_19F0E9E8_310A_003B_41C2_00E6E4570ABD",
 "easing": "quad_in",
 "from": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7AFC4446_5157_02EB_41A4_8E403C858758",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.91,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65F2730A_5157_067B_41A4_2DC7FDAA74C0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.39,
  "pitch": 0
 }
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0209",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -168.44,
   "backwardYaw": -3.49,
   "distance": 1,
   "panorama": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.14,
   "backwardYaw": 173.75,
   "distance": 1,
   "panorama": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229"
  }
 ],
 "thumbnailUrl": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_t.jpg",
 "id": "panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_412BCA30_5157_1FAF_41CC_65357BBF42A6",
  "this.overlay_5EE742B7_5155_0C92_41B4_17B4C4E9C61C",
  "this.overlay_7A889908_534B_02BE_41C1_CB1F3EC7B572"
 ]
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F66631_534D_0EEF_4195_EF5D1ECAB174",
 "easing": "cubic_in"
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_2A237CC9_317A_007D_4176_36E090D2269C",
 "easing": "quad_in",
 "to": "left"
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F7762F_534D_0EF3_418F_4EA34475AF57",
 "easing": "cubic_in"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64684356_5157_06EB_4193_5531DC2F5C14",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.11,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_637AD3C6_5157_05EB_41D3_9D8757A5A89B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.61,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_644C3347_5157_06E9_41D0_C303C076D8B6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.68,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A484F54_514F_1596_41C1_91048E20962D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_7964E4B0_5157_03A7_41D4_F397AFD504FB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -22.16,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_EDB1AC01_FD1E_143F_41E0_CF7D100094DC",
 "easing": "quad_in",
 "from": "left"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0201",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 168.49,
   "backwardYaw": -2.64,
   "distance": 1,
   "panorama": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.62,
   "backwardYaw": 164.73,
   "distance": 1,
   "panorama": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_t.jpg",
 "id": "panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41E21091_5155_0B6E_41D0_F02724555A5B",
  "this.overlay_41D14541_514B_35EE_41D1_D7D4B30EC792",
  "this.overlay_7AAC7B73_535B_0552_41C2_A4CE421D5A7B"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_1622AA86_310A_00F4_41A8_DBA0885BA83A",
 "easing": "quad_in",
 "from": "left"
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_18885C2A_310A_003C_41B2_9B60A3A66C9F",
 "easing": "quad_in",
 "to": "left"
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_18BBC752_310E_006C_41B5_0D8B802FB057",
 "easing": "quad_in",
 "from": "left"
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_49B5BB1B_570B_6EC6_41BA_9E76A2F95A16",
 "easing": "quad_in",
 "from": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_658F9321_5157_06A8_41D5_A6F0FBCE969C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.97,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_64A2F141_5375_02AE_41CD_2997E77F9B40",
 "easing": "quad_in",
 "to": "left"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0188",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -4.03,
   "backwardYaw": 179.49,
   "distance": 1,
   "panorama": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -156.37,
   "backwardYaw": -2.09,
   "distance": 1,
   "panorama": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_t.jpg",
 "id": "panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_5EEA1AAC_5155_3CB7_41B9_0AD93A9E5999",
  "this.overlay_413EB448_515B_0BFE_41B8_CE92A3A1EB26",
  "this.overlay_7A921E81_5354_FFAF_41CA_7503A29BF58B"
 ]
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78ED962D_534D_0EF7_41D2_C014C0107352",
 "easing": "cubic_out"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65AEA336_5157_06AB_41B4_324D999AD396",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.64,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_630C03D1_5157_05E9_41A3_DB6AFFCC578D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 11.56,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F57631_534D_0EEF_41D4_0CA899B851E2",
 "easing": "cubic_in"
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0197",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 175.18,
   "backwardYaw": -0.25,
   "distance": 1,
   "panorama": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C"
  }
 ],
 "thumbnailUrl": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_t.jpg",
 "id": "panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_46A40E85_514B_1776_41C2_E9CE6584BC90"
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0202",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 4.71,
   "backwardYaw": 165.05,
   "distance": 1,
   "panorama": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 164.73,
   "backwardYaw": 11.62,
   "distance": 1,
   "panorama": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_t.jpg",
 "id": "panorama_5A4F3319_514F_0D91_41AE_16804C690B47",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_412B5C93_5155_3492_41B7_68F1CE15B91B",
  "this.overlay_41DAAFDD_514B_1496_41D2_69E42E06B471",
  "this.overlay_7A93A338_5355_06DD_41A4_6D1E9D3DD1E9"
 ]
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F1462F_534D_0EF3_41CF_312AA3422C8C",
 "easing": "cubic_out"
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_164A1542_310E_006C_41C8_B7C2AB9D709D",
 "easing": "quad_in",
 "to": "left"
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_163FEAB2_310E_002C_416A_B20913F49C44",
 "easing": "quad_in",
 "from": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_64A17141_5375_02AE_41D1_39CD203154A1",
 "easing": "quad_in",
 "from": "left"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "ImageResource",
 "id": "ImageResource_78F7662F_534D_0EF3_41C1_84A370969066",
 "levels": [
  {
   "url": "media/zoomImage_7A03A0AE_52CD_0A5C_41D0_BB301A32181B_0_0.jpg",
   "width": 2835,
   "class": "ImageResourceLevel",
   "height": 1420
  },
  {
   "url": "media/zoomImage_7A03A0AE_52CD_0A5C_41D0_BB301A32181B_0_1.jpg",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1025
  },
  {
   "url": "media/zoomImage_7A03A0AE_52CD_0A5C_41D0_BB301A32181B_0_2.jpg",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/zoomImage_7A03A0AE_52CD_0A5C_41D0_BB301A32181B_0_3.jpg",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "hfovMin": "301%",
 "hfov": 360,
 "label": "DJI_0217",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -177.46,
   "backwardYaw": 0.61,
   "distance": 1,
   "panorama": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821"
  }
 ],
 "thumbnailUrl": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_t.jpg",
 "id": "panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F",
 "pitch": 0,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_t.jpg"
  }
 ],
 "vfov": 180,
 "partial": false,
 "overlays": [
  "this.overlay_41C33FA2_514D_F4B3_41C7_4299D8730949",
  "this.overlay_7A8FFDE2_534F_1D72_41B4_5610FA5B1C25"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_64655356_5157_06EB_41D2_0D54E7C654AC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.38,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_65E492E7_5157_07A9_41CB_835A943D9433",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.5,
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F0762F_534D_0EF3_41D4_1E0E1BCE93DD",
 "easing": "cubic_out"
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_EDE31937_FD1A_1C43_41E4_B1DB0E7241B4",
 "easing": "quad_in",
 "to": "left"
},
{
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "MainViewer",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "borderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "playbackBarHeight": 10,
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "borderSize": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "transitionDuration": 500,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "children": [
  "this.Container_D83E6239_F8DE_01A1_41E6_78C235396A58",
  "this.Container_D83E2239_F8DE_01A1_41EC_4FC08A3084BC",
  "this.Image_D187F5F9_FD1A_37CF_41D6_04A4BE0CDCD6"
 ],
 "id": "Container_D83C8239_F8DE_01A1_41D3_401F7AD1E733",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 330,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "transparencyActive": true,
 "maxHeight": 128,
 "toolTipShadowColor": "#333333",
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "IconButton_DC8D8382_F8CA_0763_41EC_64D2A891BD4E",
 "backgroundOpacity": 0,
 "width": 38,
 "paddingRight": 0,
 "right": "0%",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "class": "IconButton",
 "toolTipDisplayTime": 600,
 "toolTipFontStyle": "normal",
 "toolTipPaddingLeft": 6,
 "iconURL": "skin/IconButton_DC8D8382_F8CA_0763_41EC_64D2A891BD4E.png",
 "borderRadius": 0,
 "borderSize": 0,
 "toolTip": "Fullscreen",
 "propagateClick": false,
 "minHeight": 1,
 "toolTipBorderRadius": 3,
 "toolTipFontFamily": "Arial",
 "verticalAlign": "middle",
 "toolTipTextShadowOpacity": 0,
 "top": "0.44%",
 "minWidth": 1,
 "toolTipBorderColor": "#767676",
 "mode": "toggle",
 "toolTipShadowSpread": 0,
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "height": 25,
 "shadow": false,
 "paddingBottom": 0,
 "toolTipFontColor": "#606060",
 "horizontalAlign": "center",
 "toolTipFontWeight": "normal",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "data": {
  "name": "IconButton1493"
 },
 "cursor": "hand",
 "toolTipShadowHorizontalLength": 0,
 "maxWidth": 128
},
{
 "maxHeight": 121,
 "id": "Image_CBFC9856_F846_01E3_41EB_804DF5C5CBA6",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "right": "0%",
 "width": "9.955%",
 "class": "Image",
 "url": "skin/Image_CBFC9856_F846_01E3_41EB_804DF5C5CBA6.jpg",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "0.22%",
 "minWidth": 1,
 "paddingTop": 0,
 "height": "4.741%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image132788"
 },
 "maxWidth": 480
},
{
 "scrollBarWidth": 10,
 "id": "ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 20,
 "scrollBarColor": "#FFFFFF",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "right": "0.3%",
 "width": 118,
 "itemLabelHorizontalAlign": "center",
 "class": "ThumbnailList",
 "itemThumbnailOpacity": 1,
 "scrollBarOpacity": 0.5,
 "borderRadius": 5,
 "minHeight": 20,
 "itemLabelFontFamily": "Arial",
 "backgroundColorRatios": [
  0
 ],
 "itemPaddingRight": 3,
 "verticalAlign": "top",
 "minWidth": 20,
 "itemThumbnailShadowOpacity": 0.27,
 "itemBorderRadius": 0,
 "itemPaddingLeft": 3,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemBackgroundOpacity": 0,
 "selectedItemLabelFontColor": "#FFCC00",
 "height": "94.381%",
 "itemOpacity": 1,
 "shadow": false,
 "itemThumbnailShadowSpread": 1,
 "itemThumbnailBorderRadius": 5,
 "itemBackgroundColor": [],
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontWeight": "bold",
 "backgroundOpacity": 0.33,
 "paddingRight": 20,
 "borderSize": 0,
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "propagateClick": false,
 "playList": "this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist",
 "bottom": "0.7%",
 "itemLabelFontSize": 14,
 "itemVerticalAlign": "middle",
 "scrollBarMargin": 2,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailShadowBlurRadius": 8,
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "itemThumbnailHeight": 75,
 "paddingTop": 10,
 "gap": 13,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailShadow": true,
 "paddingBottom": 10,
 "horizontalAlign": "left",
 "itemPaddingBottom": 3,
 "itemThumbnailShadowVerticalLength": 3,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelGap": 8,
 "itemThumbnailShadowColor": "#000000",
 "itemThumbnailWidth": 75
},
{
 "id": "veilPopupPanorama",
 "left": 0,
 "backgroundOpacity": 0.55,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "class": "UIComponent",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "top": 0,
 "showEffect": {
  "duration": 350,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "bottom": 0,
 "minWidth": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#000000"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "UIComponent88395"
 }
},
{
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "class": "ZoomImage",
 "borderSize": 0,
 "borderRadius": 0,
 "minHeight": 0,
 "propagateClick": false,
 "backgroundColorRatios": [],
 "top": 0,
 "bottom": 0,
 "minWidth": 0,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [],
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "ZoomImage88396"
 },
 "scaleMode": "custom"
},
{
 "fontFamily": "Arial",
 "data": {
  "name": "CloseButton88397"
 },
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "backgroundOpacity": 0.3,
 "paddingLeft": 5,
 "paddingRight": 5,
 "right": 10,
 "class": "CloseButton",
 "borderRadius": 0,
 "borderSize": 0,
 "iconColor": "#000000",
 "propagateClick": false,
 "minHeight": 0,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "top": 10,
 "showEffect": {
  "duration": 350,
  "class": "FadeInEffect",
  "easing": "cubic_in_out"
 },
 "verticalAlign": "middle",
 "minWidth": 0,
 "iconLineWidth": 5,
 "mode": "push",
 "fontSize": "1.29vmin",
 "iconHeight": 20,
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "backgroundColorDirection": "vertical",
 "paddingTop": 5,
 "label": "",
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 5,
 "horizontalAlign": "center",
 "visible": false,
 "iconBeforeLabel": true,
 "iconWidth": 20,
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 6,
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.12,
   "image": "this.AnimatedImageResource_45487F2F_517D_15B2_41D0_802D7202927F",
   "yaw": -1.42,
   "pitch": -6.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EE64798_515B_349E_41CE_16673EE0C2E7",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D, this.camera_65F88317_5157_0669_41CB_1AE9F67EE6CC); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.29,
   "image": "this.AnimatedImageResource_45480F2F_517D_15B2_41A3_315356DDF5D2",
   "yaw": 179.49,
   "pitch": -11.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_434285D3_515B_1492_4183_34804A0FEAA8",
 "data": {
  "label": "Arrow 02 Right-Up"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634, this.camera_658F9321_5157_06A8_41D5_A6F0FBCE969C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7B0BCE8A_5355_7FB2_41D1_F2B4BBC0DFDB",
 "data": {
  "label": "0+400"
 },
 "items": [
  {
   "hfov": 20.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.18,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 7.3,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_454C5F30_517D_15AE_41C5_FB3ACFC0E23E",
   "yaw": 1.4,
   "pitch": -9.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41F8B852_5155_1B95_41A5_A992D7C8E2D5",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795, this.camera_64E32386_5157_066B_4180_801430CA8244); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.83,
   "image": "this.AnimatedImageResource_454C0F30_517D_15AE_4182_A81D526FA06D",
   "yaw": 165.05,
   "pitch": -11.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41DD85A9_514B_14BE_41B8_89BCD3C976D0",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47, this.camera_64F57386_5157_066B_41C3_59A61F15D7D3); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A95C251_5355_06AE_41C4_AB4689BE33A6",
 "data": {
  "label": "0+500"
 },
 "items": [
  {
   "hfov": 21.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.78,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 8.7,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.74,
   "image": "this.AnimatedImageResource_45407F31_517D_15AE_41C0_1795CB461FDF",
   "yaw": -86.09,
   "pitch": -11.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4138FB82_5157_7D72_41AC_6FBAC020FFB3",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_45403F31_517D_15AE_41B2_ED67120D30D3",
   "yaw": 173.75,
   "pitch": -10.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41997D26_5155_15B3_41D1_4B6981B2F729",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97, this.camera_7956E4A6_5157_03AB_41C4_4769664FC4F9); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AB71779_534B_0D5F_41C5_9567A17B6956",
 "data": {
  "label": "1+450"
 },
 "items": [
  {
   "hfov": 14.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -55.12,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -10.16,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -10.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -55.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_41EED2DD_5157_0C91_41CB_7A5A6D800075",
 "data": {
  "label": "Arrow 01a"
 },
 "items": [
  {
   "hfov": 4.85,
   "image": "this.AnimatedImageResource_4543FF31_517D_15AE_41D0_4432FB5DA500",
   "yaw": 158.03,
   "pitch": -22.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.85,
   "image": "this.AnimatedImageResource_45432F31_517D_15AE_41CE_1A16D0DF01B9",
   "yaw": -4.72,
   "pitch": -12.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41F8FAE3_514B_1CB2_41B5_2F9053CEA241",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291, this.camera_65B5933C_5157_069F_41D1_DE64AD1F3FCD); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.85,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_4542CF31_517D_15AE_41C5_845BB34D9904",
   "yaw": -173.43,
   "pitch": -10.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4318AC25_514B_1BB6_41C5_EA59395FA446",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988, this.camera_65AEA336_5157_06AB_41B4_324D999AD396); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AA8F978_534D_055E_41D0_4E0382230C6F",
 "data": {
  "label": "0+225"
 },
 "items": [
  {
   "hfov": 16.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.93,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 9.33,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.72,
   "image": "this.AnimatedImageResource_454BDF2F_517D_15B2_41C0_B3B4DD2565A5",
   "yaw": -0.14,
   "pitch": -9.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EFC5EAD_515B_14B6_419C_9FEFCC212230",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C, this.camera_636A33C6_5157_05EB_41D3_BDCE423A45EF); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.46,
   "image": "this.AnimatedImageResource_454B6F2F_517D_15B2_41D1_AED516F00E8B",
   "yaw": 178.59,
   "pitch": -9.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EAADB71_515D_1DAE_41CA_5FA0D9DEC457",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A484F54_514F_1596_41C1_91048E20962D, this.camera_635BC3B6_5157_05AB_41A6_D7B15BABD62D); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AA20136_535B_02D2_41CE_AC6AA6B341AA",
 "data": {
  "label": "0+550"
 },
 "items": [
  {
   "hfov": 19.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.86,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 8.17,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.09,
   "image": "this.AnimatedImageResource_4549EF2D_517D_15B6_41CA_ACEAA68A762C",
   "yaw": -0.2,
   "pitch": -7.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5FBEDC57_5157_FB92_41D2_3B4CA5746454",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0, this.camera_7AA0E480_5157_0267_4196_D292F830ADA4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_64E29140_534B_02AD_419C_1A698A42451C",
 "data": {
  "label": "0+050"
 },
 "items": [
  {
   "hfov": 20.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0_HS_1_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.14,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 7.26,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7ABFD895_5355_03D6_41B0_91EA32DEE27A",
 "data": {
  "label": "0+000"
 },
 "items": [
  {
   "hfov": 19.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0_HS_2_0.png",
      "width": 570,
      "class": "ImageResourceLevel",
      "height": 570
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.88,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -170.87,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.77,
   "image": "this.AnimatedImageResource_454FAF30_517D_15AE_41D4_252B0AC3B698",
   "yaw": -2.3,
   "pitch": -9.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41DF99EA_5155_1CB3_41D1_67551DB04F99",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936, this.camera_7ABC9496_5157_026B_4154_83546894EA40); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.93,
   "image": "this.AnimatedImageResource_454F6F30_517D_15AE_41D3_6F0F9CB2FA17",
   "yaw": -164.02,
   "pitch": -11.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_404A0233_514B_0F91_41A9_9BE7E6A3FE74",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1, this.camera_7AB53485_5157_0269_41C4_AC244D19330E); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AA020DD_5355_0356_41D4_11436BBCF2F5",
 "data": {
  "label": "0+675"
 },
 "items": [
  {
   "hfov": 22.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0_HS_2_0.png",
      "width": 570,
      "class": "ImageResourceLevel",
      "height": 570
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.18,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 6.76,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 22.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.69,
   "image": "this.AnimatedImageResource_4543BF31_517D_1591_41BB_66730DCA8986",
   "yaw": -0.5,
   "pitch": -13.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_419C4831_514D_1BAE_41C9_AFCCC936D566",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821, this.camera_7A8D1456_5157_02EB_41CC_6C5CC8D0EEC0); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_45434F31_517D_1591_41B3_0B808CB4E2D4",
   "yaw": -144.79,
   "pitch": -11.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_43E60DB4_514D_1496_41D0_BC3A322C257D",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291, this.camera_7A96A468_5157_02A7_41C3_6F9A8E643490); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -144.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AB5918A_534F_05BD_41D4_76599469CD15",
 "data": {
  "label": "0+500"
 },
 "items": [
  {
   "hfov": 18.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.43,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 5.19,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_454E0F30_517D_15AE_41D3_A44A341877FD",
   "yaw": -0.39,
   "pitch": -7.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41CD40F4_5157_0C97_41D0_DC4CC7A49C9A",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370, this.camera_64684356_5157_06EB_4193_5531DC2F5C14); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.2,
   "image": "this.AnimatedImageResource_4541DF30_517D_15AE_41BE_1D140E1291C6",
   "yaw": 161.05,
   "pitch": -12.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4189C96C_5155_1DB6_41C7_25E1513144E7",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51, this.camera_647BA356_5157_06EB_41D0_8BFD96FC27A6); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.2,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 161.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7ABEF260_5355_076E_41C5_0A8F023BF52A",
 "data": {
  "label": "1+025"
 },
 "items": [
  {
   "hfov": 21.65,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.39,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 5.25,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 8.38,
   "image": "this.AnimatedImageResource_79F122B8_514B_0C9E_41D0_4A0CC6BECDB8",
   "yaw": 3.32,
   "pitch": -18.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_413125A3_515F_34B2_41D0_67237EE5CDC5",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C, this.camera_7AA72475_5157_02A9_41CC_D2680A97D52F); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_454A5F2F_517D_15B2_41CC_59F75E272656",
   "yaw": 179.08,
   "pitch": -10.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_413AC3A9_515F_0CBE_41CE_A9972270CEA7",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655, this.camera_7A9DC475_5157_02A9_41D1_877E927C61BC); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A8579C9_535D_05BE_419F_DB934830E662",
 "data": {
  "label": "1+325"
 },
 "items": [
  {
   "hfov": 20.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.41,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 11.92,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.95,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.12,
   "image": "this.AnimatedImageResource_454ABF2F_517D_15B2_41C8_4698CAECDBCF",
   "yaw": -3.98,
   "pitch": -8.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_432C2763_515D_15B2_41C1_918B6C6E5E77",
 "data": {
  "label": "Arrow 02 Left-Up"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0, this.camera_64A7E3A6_5157_05AB_4185_CC261A5D08B9); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.12,
   "image": "this.AnimatedImageResource_454A4F2F_517D_15B2_41CA_245989D389B5",
   "yaw": 157.84,
   "pitch": -8.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_410AB0FD_515D_0C96_41D4_0244A2C3E166",
 "data": {
  "label": "Arrow 02 Left-Up"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C, this.camera_64B783A6_5157_05AB_41C9_9035B7071FC0); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 157.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7B4E1289_535D_07BF_41C9_1F7D8DBEF2D4",
 "data": {
  "label": "0+850"
 },
 "items": [
  {
   "hfov": 19.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.22,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 8.5,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 8.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_454F2F30_517D_15AE_41C1_110229D7FADA",
   "yaw": -0.67,
   "pitch": -9.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_411DA448_5157_0BFF_41C0_B2231D92310E",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51, this.camera_794E0499_5157_0399_41D4_8732891DD371); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_454EEF30_517D_15AE_41C5_50304BECD492",
   "yaw": -176.35,
   "pitch": -10.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41FE8A12_5155_1F93_41D4_1DEC4498642C",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795, this.camera_79477499_5157_0399_41BC_CBF47882C562); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -176.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7ABC3681_5357_0FAE_41D5_41FD9425972F",
 "data": {
  "label": "0+750"
 },
 "items": [
  {
   "hfov": 22.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.46,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 9.08,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 22.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.62,
   "image": "this.AnimatedImageResource_454E8F30_517D_15AE_41C1_B7E66AAFF4E7",
   "yaw": 0.1,
   "pitch": -8.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41D85261_5157_0FB1_41D0_46EC9777D69D",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6, this.camera_64B9A3B0_5157_05A7_41AD_A33C9F6219D4); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.1,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.39,
   "image": "this.AnimatedImageResource_454E7F30_517D_15AE_41B8_4492E0CD3736",
   "yaw": 176.73,
   "pitch": -12.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41EE8E15_5155_7796_41CC_5070EC699372",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936, this.camera_634873B6_5157_05AB_41C8_14258B5E52F1); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A92A167_5357_0572_41AA_BC637E633741",
 "data": {
  "label": "0+850"
 },
 "items": [
  {
   "hfov": 12.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -61.34,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 6.68,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -61.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_45433F31_517D_1591_4193_ABADB818E15E",
   "yaw": 0.61,
   "pitch": -10.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41FE3FDC_514D_3497_41CD_8F339149CD1C",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F, this.camera_65ECA2F7_5157_07A9_41C1_25318DB1D763); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.08,
   "image": "this.AnimatedImageResource_78D51627_534D_0EF3_41BB_0D9E38D441BC",
   "yaw": -175.62,
   "pitch": -10.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_7450AC7E_5135_7B92_41C0_A320128757BB",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0, this.camera_65E492E7_5157_07A9_41CB_835A943D9433); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A8518BD_534F_03D6_41C0_86ECF0F6D572",
 "data": {
  "label": "0+700"
 },
 "items": [
  {
   "hfov": 20.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.67,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 6.7,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.65,
   "image": "this.AnimatedImageResource_454DEF2F_517D_15B2_41C3_EEF17A75321F",
   "yaw": 154.97,
   "pitch": -16.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5ED167B8_515F_149E_41D2_3817638AE939",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A, this.camera_644C3347_5157_06E9_41D0_C303C076D8B6); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 154.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 12.98,
   "image": "this.AnimatedImageResource_79F202B8_514B_0C9E_41C0_FC20CD806A0D",
   "yaw": -0.25,
   "pitch": -20.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4623CB33_514B_FD92_41B4_2D5A27E06A6F",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231, this.camera_65B9233C_5157_069F_41A3_8519F656DCF9); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 12.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A46BAD3_535D_0753_41D1_A43686DA6538",
 "data": {
  "label": "1+450"
 },
 "items": [
  {
   "hfov": 22.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.5,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 6.45,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 22.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7B4F13A2_535D_05ED_41D5_05CBFC5F23A9",
 "items": [
  {
   "hfov": 21.5,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0_HS_3_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.17,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 15.64
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.5,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 15.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0_HS_3_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_454DAF2F_517D_15B2_41A5_41C53E43483C",
   "yaw": -2.64,
   "pitch": -10.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EF1EDBC_5155_1497_41D0_B25475088196",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015, this.camera_7AF40446_5157_02EB_41C3_EE56AFFE4DE7); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A684180_535B_05AE_41D1_33A1ED295164",
 "data": {
  "label": "0+125"
 },
 "items": [
  {
   "hfov": 21.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0_HS_1_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.92,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 7.58,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.08,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.05,
   "image": "this.AnimatedImageResource_45418F30_517D_15AE_41BA_9132D095B3BA",
   "yaw": -3.49,
   "pitch": -6.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41DBC183_5157_0D72_41C6_6CC82D65CE33",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97, this.camera_630C03D1_5157_05E9_41A3_DB6AFFCC578D); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.12
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.09,
   "image": "this.AnimatedImageResource_45412F30_517D_15AE_41C8_042E03BF3D08",
   "yaw": 174.89,
   "pitch": -8.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41DBBA02_5155_3F73_41C9_C83500DC7FF1",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6, this.camera_637AD3C6_5157_05EB_41D3_9D8757A5A89B); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A609D79_5355_1D5F_41B6_EB256CDF0D6D",
 "data": {
  "label": "1+175"
 },
 "items": [
  {
   "hfov": 21.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.81,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 6.42,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.06,
   "image": "this.AnimatedImageResource_454B2F2F_517D_15B2_41A9_79C9161F8CDE",
   "yaw": 11.9,
   "pitch": -13.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_406FAF6E_515B_75B2_4179_2894AEF63312",
 "data": {
  "label": "Arrow 02 Right-Up"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F, this.camera_7964E4B0_5157_03A7_41D4_F397AFD504FB); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_454B1F2F_517D_15B2_41A9_81B4D75932DB",
   "yaw": 171.92,
   "pitch": -7.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_431B7130_515D_0DAF_41C9_5C3AA95C1C92",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D, this.camera_795124A6_5157_03AB_41CF_43214A4CB144); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_78D74645_535D_0EB6_41BD_08CA3B0DC125",
 "data": {
  "label": "0+750"
 },
 "items": [
  {
   "hfov": 21.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.55,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 11.22,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.25,
   "image": "this.AnimatedImageResource_45499F2D_517D_15B6_4195_E1487BC2AA3C",
   "yaw": -2.09,
   "pitch": -9.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_4165CFB6_5154_F492_41D3_472B0671CEF3",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634, this.camera_64D08386_5157_066B_41C5_7331CAA92EC4); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.37,
   "image": "this.AnimatedImageResource_45492F2D_517D_15B6_41CD_5C1E94167520",
   "yaw": 176.91,
   "pitch": -13.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41165DAE_515B_14B3_41A7_87DFB5C09846",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4, this.camera_64CE8380_5157_0667_41CD_83E5A8902D54); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A4C85D3_5357_0D52_41C4_6BFD3E04E94D",
 "data": {
  "label": "0+150"
 },
 "items": [
  {
   "hfov": 17.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.57,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 5.11,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.74,
   "image": "this.AnimatedImageResource_79F072B8_514B_0C9E_41D0_247EF96DFC23",
   "yaw": -1.24,
   "pitch": -9.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EEBC9C7_515D_7CF2_41C9_8F29474F7CB0",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655, this.camera_65954327_5157_06A9_41C6_90F380F2890D); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.99,
   "image": "this.AnimatedImageResource_454DCF2F_517D_15B2_41CB_26EA9CF45899",
   "yaw": -166.23,
   "pitch": -11.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41C773DD_515D_0C96_41C7_70E2B24E7314",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F, this.camera_659BA327_5157_06A9_41D1_25285C5FB22F); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AB83231_535F_06EE_41D3_357540ED266F",
 "data": {
  "label": "0+950"
 },
 "items": [
  {
   "hfov": 19.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.1,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 12.18,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.31,
   "image": "this.AnimatedImageResource_45403F31_517D_1591_4194_B92E63AD1BA9",
   "yaw": -5.6,
   "pitch": -16.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41EEBC67_514B_1BB1_41B6_AD46B8B8937D",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0, this.camera_7AF9A456_5157_02EB_4192_B2701B19CBD9); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.61,
   "image": "this.AnimatedImageResource_4543FF31_517D_1591_41BE_64BD3CD9AE21",
   "yaw": -169.58,
   "pitch": -17.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_430F5FE5_514B_14B6_41D2_B239299D205F",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC, this.camera_7A83C456_5157_02EB_4150_DBB5E7A19AD3); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A8586CE_534D_0FB5_41C3_1823CD83F2A0",
 "data": {
  "label": "0+375"
 },
 "items": [
  {
   "hfov": 18.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.5,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 4.25,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.93,
   "image": "this.AnimatedImageResource_4543BF31_517D_15AE_41BA_EB6454E54412",
   "yaw": -177.36,
   "pitch": -14.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41B4C986_514B_3D73_41D1_2851209BD7E7",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC, this.camera_7A90C468_5157_02A7_4194_0925FA4D869C); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A86EC40_534B_02AD_41C6_03B4F494EF4E",
 "data": {
  "label": "0+050"
 },
 "items": [
  {
   "hfov": 18.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0_HS_1_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.22,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 1.39,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.22
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.58,
   "image": "this.AnimatedImageResource_454D8F2F_517D_15B2_41D2_723601AD4B9C",
   "yaw": 0.41,
   "pitch": -9.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EFC11E3_515D_0CB2_41A7_9108514B646E",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A, this.camera_641C536E_5157_06BB_41A2_B9A6DEE39DD4); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.26,
   "image": "this.AnimatedImageResource_454AFF2F_517D_15B2_41C6_DA4311E25827",
   "yaw": 179.17,
   "pitch": -11.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EA02E38_515C_F79E_41CC_DE87A4A88680",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0, this.camera_640DD366_5157_06AB_41A3_D66F424A0FE9); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AB8A880_535F_03AD_41B4_4AA99F42759A",
 "data": {
  "label": "1+175"
 },
 "items": [
  {
   "hfov": 18.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.17,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 7.33,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.58,
   "image": "this.AnimatedImageResource_4540EF31_517D_15AE_41D0_6D6BBD6ECBE4",
   "yaw": 1.14,
   "pitch": -5.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_412BCA30_5157_1FAF_41CC_65357BBF42A6",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229, this.camera_6495D3A0_5157_05A7_41AE_0F93CC13882E); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_4540AF31_517D_15AE_41CF_6FDABD36559D",
   "yaw": -168.44,
   "pitch": -9.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EE742B7_5155_0C92_41B4_17B4C4E9C61C",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370, this.camera_6485E396_5157_066B_41CE_0F8B4108FC60); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A889908_534B_02BE_41C1_CB1F3EC7B572",
 "data": {
  "label": "1+300"
 },
 "items": [
  {
   "hfov": 19.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.18,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 2.24,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_454D6F2F_517D_15B2_41C3_6807D0E15E0C",
   "yaw": 11.62,
   "pitch": -10.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41E21091_5155_0B6E_41D0_F02724555A5B",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47, this.camera_643EC376_5157_06AB_41C6_63438B9C0BCE); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_454D0F30_517D_15AE_41D0_974985691072",
   "yaw": 168.49,
   "pitch": -10.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41D14541_514B_35EE_41D1_D7D4B30EC792",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B, this.camera_642E6376_5157_06AB_41B9_CE36BA2F4FB6); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7AAC7B73_535B_0552_41C2_A4CE421D5A7B",
 "data": {
  "label": "0+225"
 },
 "items": [
  {
   "hfov": 11.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -62.06,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 7.95,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -62.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.62,
   "image": "this.AnimatedImageResource_45491F2F_517D_15B2_41D0_DCDA54C590F2",
   "yaw": -4.03,
   "pitch": -8.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_5EEA1AAC_5155_3CB7_41B9_0AD93A9E5999",
 "data": {
  "label": "Arrow 01c"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A484F54_514F_1596_41C1_91048E20962D, this.camera_7AF34446_5157_02EB_41D3_1CC0BACF6448); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_4548BF2F_517D_15B2_4190_719639929A43",
   "yaw": -156.37,
   "pitch": -11.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_413EB448_515B_0BFE_41B8_CE92A3A1EB26",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0, this.camera_7AFC4446_5157_02EB_41A4_8E403C858758); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -156.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A921E81_5354_FFAF_41CA_7503A29BF58B",
 "data": {
  "label": "0+300"
 },
 "items": [
  {
   "hfov": 14.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0_HS_2_0.png",
      "width": 359,
      "class": "ImageResourceLevel",
      "height": 144
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.76,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 6.41,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.79,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_0_HS_2_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.63,
   "image": "this.AnimatedImageResource_79F2E2B8_514B_0C9E_418E_B109302C7C56",
   "yaw": 175.18,
   "pitch": -11.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_46A40E85_514B_1776_41C2_E9CE6584BC90",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C, this.camera_7AAA7485_5157_0269_41D2_36B2E66CD773); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.05,
   "image": "this.AnimatedImageResource_454CFF30_517D_15AE_41D0_480FAAF09A1D",
   "yaw": 4.71,
   "pitch": -13.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_412B5C93_5155_3492_41B7_68F1CE15B91B",
 "data": {
  "label": "Arrow 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1, this.camera_6451B351_5157_06E9_41D5_CB6F57AF856D); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.7,
   "image": "this.AnimatedImageResource_454CBF30_517D_15AE_41D0_03AF9B460DF5",
   "yaw": 164.73,
   "pitch": -13.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41DAAFDD_514B_1496_41D2_69E42E06B471",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015, this.camera_64655356_5157_06EB_41D2_0D54E7C654AC); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 164.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A93A338_5355_06DD_41A4_6D1E9D3DD1E9",
 "data": {
  "label": "0+375"
 },
 "items": [
  {
   "hfov": 21.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0_HS_2_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.85,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 12.42,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_0_HS_2_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.85
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.12,
   "image": "this.AnimatedImageResource_4542DF31_517D_1591_41D3_CDFE5A8B4D79",
   "yaw": -177.46,
   "pitch": -20.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_41C33FA2_514D_F4B3_41C7_4299D8730949",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821, this.camera_65F2730A_5157_067B_41A4_2DC7FDAA74C0); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_7A8FFDE2_534F_1D72_41B4_5610FA5B1C25",
 "data": {
  "label": "0+800"
 },
 "items": [
  {
   "hfov": 15.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0_HS_1_0.png",
      "width": 571,
      "class": "ImageResourceLevel",
      "height": 571
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -50.94,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 5.4,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.4,
   "image": {
    "levels": [
     {
      "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_0_HS_1_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -50.94
  }
 ]
},
{
 "children": [
  "this.Container_D83E5239_F8DE_01A1_41E2_92AEE4B33327",
  "this.IconButton_D83E4239_F8DE_01A1_418B_8EA356A42054"
 ],
 "id": "Container_D83E6239_F8DE_01A1_41E6_78C235396A58",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 66,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "- COLLAPSE"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_D83E1239_F8DE_01A1_41E5_88196F100AEF",
  "this.IconButton_6458015E_5375_0552_41C6_76E5D5ACC9D8"
 ],
 "id": "Container_D83E2239_F8DE_01A1_41EC_4FC08A3084BC",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 330,
 "class": "Container",
 "right": 0,
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": "100%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "- EXPANDED"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "maxHeight": 1044,
 "id": "Image_D187F5F9_FD1A_37CF_41D6_04A4BE0CDCD6",
 "left": "4.24%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "16.364%",
 "class": "Image",
 "url": "skin/Image_D187F5F9_FD1A_37CF_41D6_04A4BE0CDCD6.png",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "1.54%",
 "minWidth": 1,
 "paddingTop": 0,
 "height": "6.836%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image75720"
 },
 "maxWidth": 553
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45487F2F_517D_15B2_41D0_802D7202927F",
 "levels": [
  {
   "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45480F2F_517D_15B2_41A3_315356DDF5D2",
 "levels": [
  {
   "url": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_1_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454C5F30_517D_15AE_41C5_FB3ACFC0E23E",
 "levels": [
  {
   "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454C0F30_517D_15AE_4182_A81D526FA06D",
 "levels": [
  {
   "url": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45407F31_517D_15AE_41C0_1795CB461FDF",
 "levels": [
  {
   "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45403F31_517D_15AE_41B2_ED67120D30D3",
 "levels": [
  {
   "url": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4543FF31_517D_15AE_41D0_4432FB5DA500",
 "levels": [
  {
   "url": "media/panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45432F31_517D_15AE_41CE_1A16D0DF01B9",
 "levels": [
  {
   "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4542CF31_517D_15AE_41C5_845BB34D9904",
 "levels": [
  {
   "url": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454BDF2F_517D_15B2_41C0_B3B4DD2565A5",
 "levels": [
  {
   "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454B6F2F_517D_15B2_41D1_AED516F00E8B",
 "levels": [
  {
   "url": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4549EF2D_517D_15B6_41CA_ACEAA68A762C",
 "levels": [
  {
   "url": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454FAF30_517D_15AE_41D4_252B0AC3B698",
 "levels": [
  {
   "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454F6F30_517D_15AE_41D3_6F0F9CB2FA17",
 "levels": [
  {
   "url": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4543BF31_517D_1591_41BB_66730DCA8986",
 "levels": [
  {
   "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45434F31_517D_1591_41B3_0B808CB4E2D4",
 "levels": [
  {
   "url": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454E0F30_517D_15AE_41D3_A44A341877FD",
 "levels": [
  {
   "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4541DF30_517D_15AE_41BE_1D140E1291C6",
 "levels": [
  {
   "url": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_79F122B8_514B_0C9E_41D0_4A0CC6BECDB8",
 "levels": [
  {
   "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454A5F2F_517D_15B2_41CC_59F75E272656",
 "levels": [
  {
   "url": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454ABF2F_517D_15B2_41C8_4698CAECDBCF",
 "levels": [
  {
   "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_1_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454A4F2F_517D_15B2_41CA_245989D389B5",
 "levels": [
  {
   "url": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_1_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454F2F30_517D_15AE_41C1_110229D7FADA",
 "levels": [
  {
   "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454EEF30_517D_15AE_41C5_50304BECD492",
 "levels": [
  {
   "url": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454E8F30_517D_15AE_41C1_B7E66AAFF4E7",
 "levels": [
  {
   "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454E7F30_517D_15AE_41B8_4492E0CD3736",
 "levels": [
  {
   "url": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45433F31_517D_1591_4193_ABADB818E15E",
 "levels": [
  {
   "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_78D51627_534D_0EF3_41BB_0D9E38D441BC",
 "levels": [
  {
   "url": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454DEF2F_517D_15B2_41C3_EEF17A75321F",
 "levels": [
  {
   "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_79F202B8_514B_0C9E_41C0_FC20CD806A0D",
 "levels": [
  {
   "url": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454DAF2F_517D_15B2_41A5_41C53E43483C",
 "levels": [
  {
   "url": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45418F30_517D_15AE_41BA_9132D095B3BA",
 "levels": [
  {
   "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45412F30_517D_15AE_41C8_042E03BF3D08",
 "levels": [
  {
   "url": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454B2F2F_517D_15B2_41A9_79C9161F8CDE",
 "levels": [
  {
   "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_1_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454B1F2F_517D_15B2_41A9_81B4D75932DB",
 "levels": [
  {
   "url": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45499F2D_517D_15B6_4195_E1487BC2AA3C",
 "levels": [
  {
   "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45492F2D_517D_15B6_41CD_5C1E94167520",
 "levels": [
  {
   "url": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_79F072B8_514B_0C9E_41D0_247EF96DFC23",
 "levels": [
  {
   "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454DCF2F_517D_15B2_41CB_26EA9CF45899",
 "levels": [
  {
   "url": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45403F31_517D_1591_4194_B92E63AD1BA9",
 "levels": [
  {
   "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4543FF31_517D_1591_41BE_64BD3CD9AE21",
 "levels": [
  {
   "url": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4543BF31_517D_15AE_41BA_EB6454E54412",
 "levels": [
  {
   "url": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454D8F2F_517D_15B2_41D2_723601AD4B9C",
 "levels": [
  {
   "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454AFF2F_517D_15B2_41C6_DA4311E25827",
 "levels": [
  {
   "url": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4540EF31_517D_15AE_41D0_6D6BBD6ECBE4",
 "levels": [
  {
   "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4540AF31_517D_15AE_41CF_6FDABD36559D",
 "levels": [
  {
   "url": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454D6F2F_517D_15B2_41C3_6807D0E15E0C",
 "levels": [
  {
   "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454D0F30_517D_15AE_41D0_974985691072",
 "levels": [
  {
   "url": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_45491F2F_517D_15B2_41D0_DCDA54C590F2",
 "levels": [
  {
   "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4548BF2F_517D_15B2_4190_719639929A43",
 "levels": [
  {
   "url": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_79F2E2B8_514B_0C9E_418E_B109302C7C56",
 "levels": [
  {
   "url": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454CFF30_517D_15AE_41D0_480FAAF09A1D",
 "levels": [
  {
   "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_454CBF30_517D_15AE_41D0_03AF9B460DF5",
 "levels": [
  {
   "url": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4542DF31_517D_1591_41D3_CDFE5A8B4D79",
 "levels": [
  {
   "url": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "id": "Container_D83E5239_F8DE_01A1_41E2_92AEE4B33327",
 "left": "0%",
 "backgroundOpacity": 0.4,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 36,
 "class": "Container",
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container black"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": true,
 "maxHeight": 80,
 "id": "IconButton_D83E4239_F8DE_01A1_418B_8EA356A42054",
 "left": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 50,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83E4239_F8DE_01A1_418B_8EA356A42054.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "40%",
 "bottom": "40%",
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_D83E2239_F8DE_01A1_41EC_4FC08A3084BC, true, 0, this.effect_49B5BB1B_570B_6EC6_41BA_9E76A2F95A16, 'showEffect', false); this.setComponentVisibility(this.Container_D83E6239_F8DE_01A1_41E6_78C235396A58, false, 0, this.effect_49353574_570C_A542_41D0_43B05AC58F9B, 'hideEffect', false)",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83E4239_F8DE_01A1_418B_8EA356A42054_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton arrow"
 },
 "cursor": "hand",
 "maxWidth": 80
},
{
 "children": [
  "this.Container_D83E0239_F8DE_01A1_41D0_F56FFF66140C"
 ],
 "id": "Container_D83E1239_F8DE_01A1_41E5_88196F100AEF",
 "left": "0%",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "borderSize": 0,
 "width": "90%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Container"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": true,
 "maxHeight": 50,
 "id": "IconButton_6458015E_5375_0552_41C6_76E5D5ACC9D8",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 9,
 "width": 50,
 "class": "IconButton",
 "iconURL": "skin/IconButton_6458015E_5375_0552_41C6_76E5D5ACC9D8.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "40%",
 "bottom": "40%",
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_D83E2239_F8DE_01A1_41EC_4FC08A3084BC, false, 0, this.effect_64A2F141_5375_02AE_41CD_2997E77F9B40, 'hideEffect', false); this.setComponentVisibility(this.Container_D83E6239_F8DE_01A1_41E6_78C235396A58, true, 0, this.effect_64A17141_5375_02AE_41D1_39CD203154A1, 'showEffect', false)",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_6458015E_5375_0552_41C6_76E5D5ACC9D8_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton collapse"
 },
 "cursor": "hand",
 "maxWidth": 50
},
{
 "children": [
  "this.Image_D83FF239_F8DE_01A1_41E8_88289901D50C",
  "this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB",
  "this.Container_D83CF239_F8DE_01A1_41C9_AB076235A8E0",
  "this.Container_D83C2239_F8DE_01A1_41D3_297EB7FA0B8D",
  "this.Container_D83CC239_F8DE_01A1_41EA_A6F8389BC33D",
  "this.Container_D83F6239_F8DE_01A1_41DD_4D1CDFE35385",
  "this.Container_D83E1239_F8DE_01A1_41D7_04B6DD0F0CA4",
  "this.Container_D83F1239_F8DE_01A1_41D9_12715517E333",
  "this.Container_D83C1239_F8DE_01A1_41D9_B036D3CB90E7"
 ],
 "id": "Container_D83E0239_F8DE_01A1_41D0_F56FFF66140C",
 "left": "0%",
 "backgroundOpacity": 0.4,
 "paddingLeft": 40,
 "scrollBarColor": "#000000",
 "paddingRight": 40,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.68,
 "class": "Container",
 "borderSize": 0,
 "width": "100%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": true,
 "backgroundColorRatios": [
  0.11
 ],
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 40,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "shadow": false,
 "paddingBottom": 40,
 "horizontalAlign": "left",
 "data": {
  "name": "- Buttons set"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "maxHeight": 1095,
 "id": "Image_D83FF239_F8DE_01A1_41E8_88289901D50C",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scaleMode": "fit_inside",
 "paddingRight": 0,
 "width": "100%",
 "class": "Image",
 "url": "skin/Image_D83FF239_F8DE_01A1_41E8_88289901D50C.png",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 30,
 "borderSize": 0,
 "verticalAlign": "top",
 "top": "0%",
 "minWidth": 40,
 "paddingTop": 0,
 "height": "25%",
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "Image Company"
 },
 "maxWidth": 1095
},
{
 "children": [
  "this.Container_D83FD239_F8DE_01A1_41EB_F702C37C1EC3",
  "this.Button_D83FC239_F8DE_01A1_41E1_F6D3D0F13731",
  "this.Container_D83FB239_F8DE_01A1_41D1_DD7782C73A51",
  "this.Button_D83FA239_F8DE_01A1_41D6_194EBE0D2616",
  "this.Container_D83F9239_F8DE_01A1_41A4_5D0E0A77149D",
  "this.Button_D83F8239_F8DE_01A1_41E1_76FC118CAE45",
  "this.Container_D83F7239_F8DE_01A1_41C0_0443DA8D3FC3",
  "this.Button_D83F6239_F8DE_01A1_41E3_A895FDF814B9",
  "this.Container_D83F5239_F8DE_01A1_41C1_51CBD66A5270",
  "this.Button_D83F4239_F8DE_01A1_41B5_28F3F291CA5F",
  "this.Container_D83F3239_F8DE_01A1_41E5_BF45B4748C56",
  "this.Button_D83F2239_F8DE_01A1_41DB_D384749A91D3",
  "this.Container_D83F1239_F8DE_01A1_41D2_0E8D22A7A304",
  "this.Button_43D0B7AD_5175_14B1_41D3_014B9E659815"
 ],
 "id": "Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "right": "0%",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "26%",
 "bottom": "26%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "-Level 1"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_D83CE239_F8DE_01A1_41ED_667EE3235A14",
  "this.HTMLText_D83CD239_F8DE_01A1_41D9_0860B2AF7FB3",
  "this.Container_D83CC239_F8DE_01A1_41EE_85DF1A123FF2",
  "this.Container_D83C7239_F8DE_01A1_41D1_F44EDA364441"
 ],
 "id": "Container_D83CF239_F8DE_01A1_41C9_AB076235A8E0",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "bottom",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 5,
 "paddingTop": 0,
 "height": 130,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "-Container footer"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Button_D83C1239_F8DE_01A1_41D6_558AD54762AD",
  "this.Container_D83C0239_F8DE_01A1_41EE_BD3BD7A9642D",
  "this.Container_D83DF239_F8DE_01A1_4198_547846E01F95",
  "this.Button_D83DE239_F8DE_01A1_41B4_6E9C69515E17"
 ],
 "id": "Container_D83C2239_F8DE_01A1_41D3_297EB7FA0B8D",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "25%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "-Level 2-1"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Button_D83CB239_F8DE_01A1_41ED_9A6795E3E70D",
  "this.Container_D83CA239_F8DE_01A1_41BC_B2761C1F2FC7",
  "this.Container_D83C9239_F8DE_01A1_41DC_8AFD484DE6D7",
  "this.Button_D83C8239_F8DE_01A1_41DF_711BF6E51B6A"
 ],
 "id": "Container_D83CC239_F8DE_01A1_41EA_A6F8389BC33D",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "25%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "-Level 2-2"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Button_D83F5239_F8DE_01A1_41CE_14CC5EBEF12F",
  "this.Container_D83F4239_F8DE_01A1_41E4_ED596ADEA119",
  "this.Container_D83F3239_F8DE_01A1_41A1_4852C78B3F11",
  "this.Button_D83F2239_F8DE_01A1_41D9_732F6E60A6E7"
 ],
 "id": "Container_D83F6239_F8DE_01A1_41DD_4D1CDFE35385",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "25%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "-Level 2-3"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Button_D83E0239_F8DE_01A1_41D4_3098BEAEC6A4",
  "this.Container_D83FE239_F8DE_01A1_41D3_FBDA8CA40BC4",
  "this.Container_D83FD239_F8DE_01A1_41CD_E150A46E78BB",
  "this.Button_D83FC239_F8DE_01A1_41ED_A362839BA01E"
 ],
 "id": "Container_D83E1239_F8DE_01A1_41D7_04B6DD0F0CA4",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "25%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "-Level 2-4"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Button_D83F0239_F8DE_01A1_41EE_30315EC39D44",
  "this.Container_D83CF239_F8DE_01A1_41A0_7990D06A16E5",
  "this.Container_D83CE239_F8DE_01A1_41C8_03BE266C9216",
  "this.Button_D83CA239_F8DE_01A1_41E0_2A57361F3EEB",
  "this.Button_D83C9239_F8DE_01A1_41C7_9FD986659EA7",
  "this.Button_D83C8239_F8DE_01A1_41ED_1459DB6FE1FA",
  "this.Button_D83C7239_F8DE_01A1_41E8_81BD8A73CC3E",
  "this.Button_D83C6239_F8DE_01A1_41EC_FD9BEA80D5C6",
  "this.Button_D83C5239_F8DE_01A1_41D0_A8EA4615E52A",
  "this.Button_D83C4239_F8DE_01A1_41EC_75CFF5ABCA12"
 ],
 "id": "Container_D83F1239_F8DE_01A1_41D9_12715517E333",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "25%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "-Level 2-5"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Button_D83C0239_F8DE_01A1_41C4_33122759A932",
  "this.Container_D83DE239_F8DE_01A1_41E3_BF8402B43AD2",
  "this.Container_D83DD239_F8DE_01A1_41C9_1AE732875272",
  "this.Button_D83DC239_F8DE_01A1_41D3_5AF86AEFD7DE"
 ],
 "id": "Container_D83C1239_F8DE_01A1_41D9_B036D3CB90E7",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "creationPolicy": "inAdvance",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "middle",
 "top": "25%",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "visible": false,
 "data": {
  "name": "-Level 2-6"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83FD239_F8DE_01A1_41EB_F702C37C1EC3",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83FC239_F8DE_01A1_41E1_F6D3D0F13731",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Tour Info"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, false, 0, this.effect_2A237CC9_317A_007D_4176_36E090D2269C, 'hideEffect', false); this.setComponentVisibility(this.Container_D83C2239_F8DE_01A1_41D3_297EB7FA0B8D, true, 0, this.effect_1A65691F_310E_0014_41BF_C2605660352F, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "44c >",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83FB239_F8DE_01A1_41D1_DD7782C73A51",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83FA239_F8DE_01A1_41D6_194EBE0D2616",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Panorama List"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83CC239_F8DE_01A1_41EA_A6F8389BC33D, true, 0, this.effect_F2D95D32_FD1A_145D_41DF_3B15A8774774, 'showEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, false, 0, this.effect_EDE31937_FD1A_1C43_41E4_B1DB0E7241B4, 'hideEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "44b >",
 "fontStyle": "italic",
 "height": 50,
 "gap": 23,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83F9239_F8DE_01A1_41A4_5D0E0A77149D",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83F8239_F8DE_01A1_41E1_76FC118CAE45",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Location"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, false, 0, this.effect_112869ED_311E_0034_41C2_70A247245BB7, 'hideEffect', false); this.setComponentVisibility(this.Container_D83F6239_F8DE_01A1_41DD_4D1CDFE35385, true, 0, this.effect_18BBC752_310E_006C_41B5_0D8B802FB057, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "36 >",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "pressedLabel": "Inserdt Text",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83F7239_F8DE_01A1_41C0_0443DA8D3FC3",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83F6239_F8DE_01A1_41E3_A895FDF814B9",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Floorplan"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, false, 0, this.effect_2EF4EDF2_311A_002F_41B7_7476A5CB22BB, 'hideEffect', false); this.setComponentVisibility(this.Container_D83E1239_F8DE_01A1_41D7_04B6DD0F0CA4, true, 0, this.effect_163FEAB2_310E_002C_416A_B20913F49C44, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "ortho >",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83F5239_F8DE_01A1_41C1_51CBD66A5270",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83F4239_F8DE_01A1_41B5_28F3F291CA5F",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Photoalbum"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, false, 0, this.effect_164A1542_310E_006C_41C8_B7C2AB9D709D, 'hideEffect', false); this.setComponentVisibility(this.Container_D83F1239_F8DE_01A1_41D9_12715517E333, true, 0, this.effect_19F0E9E8_310A_003B_41C2_00E6E4570ABD, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "Panel >",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83F3239_F8DE_01A1_41E5_BF45B4748C56",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83F2239_F8DE_01A1_41DB_D384749A91D3",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Contact"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, false, 0, this.effect_18885C2A_310A_003C_41B2_9B60A3A66C9F, 'hideEffect', false); this.setComponentVisibility(this.Container_D83C1239_F8DE_01A1_41D9_B036D3CB90E7, true, 0, this.effect_1622AA86_310A_00F4_41A8_DBA0885BA83A, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "Direksi kit >",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83F1239_F8DE_01A1_41D2_0E8D22A7A304",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_43D0B7AD_5175_14B1_41D3_014B9E659815",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button Contact"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.openLink('https://pjkpkipp1a.github.io/8-feb-streetview-update/', '_blank')",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "Tampilan Maret",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83CE239_F8DE_01A1_41ED_667EE3235A14",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 40,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "top",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "minWidth": 1,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "blue line"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": 2
},
{
 "id": "HTMLText_D83CD239_F8DE_01A1_41D9_0860B2AF7FB3",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "paddingTop": 0,
 "height": 78,
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "scrollBarWidth": 10
},
{
 "children": [
  "this.IconButton_D83CB239_F8DE_01A1_41DC_B04D3941CE8A",
  "this.IconButton_D83CA239_F8DE_01A1_41D1_2D6CE7CB2422",
  "this.IconButton_D83C9239_F8DE_01A1_41BD_3E089183FA4A",
  "this.IconButton_D83C8239_F8DE_01A1_41C3_A0F65F66D13F"
 ],
 "id": "Container_D83CC239_F8DE_01A1_41EE_85DF1A123FF2",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "bottom",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "horizontal",
 "gap": 7,
 "paddingTop": 0,
 "height": 56,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "-Container Icons 1"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112",
  "this.IconButton_D83C4239_F8DE_01A1_41E6_36D2265B27BC",
  "this.IconButton_D83C6239_F8DE_01A1_41E3_66D1AAC77237",
  "this.IconButton_D83C3239_F8DE_01A1_41E4_0C0F3B4477E1"
 ],
 "id": "Container_D83C7239_F8DE_01A1_41D1_F44EDA364441",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": false,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "horizontal",
 "gap": 7,
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "-Container Icons 2"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "rollOverIconURL": "skin/Button_D83C1239_F8DE_01A1_41D6_558AD54762AD_rollover.png",
 "id": "Button_D83C1239_F8DE_01A1_41D6_558AD54762AD",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 5,
 "data": {
  "name": "Button <BACK"
 },
 "paddingRight": 0,
 "iconURL": "skin/Button_D83C1239_F8DE_01A1_41D6_558AD54762AD.png",
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83C2239_F8DE_01A1_41D3_297EB7FA0B8D, false, 0, this.effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9, 'hideEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, true, 0, this.effect_268FAF4D_310E_0075_4179_B2B3CFC7C47E, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "fontSize": 18,
 "iconHeight": 30,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "paddingTop": 0,
 "label": "BACK",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83C0239_F8DE_01A1_41EE_BD3BD7A9642D",
 "backgroundOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83DF239_F8DE_01A1_4198_547846E01F95",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 8,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83DE239_F8DE_01A1_41B4_6E9C69515E17",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 1"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.mainPlayList.set('selectedIndex', 12)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "3 April 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "rollOverIconURL": "skin/Button_D83CB239_F8DE_01A1_41ED_9A6795E3E70D_rollover.png",
 "id": "Button_D83CB239_F8DE_01A1_41ED_9A6795E3E70D",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 5,
 "data": {
  "name": "Button <BACK"
 },
 "paddingRight": 0,
 "iconURL": "skin/Button_D83CB239_F8DE_01A1_41ED_9A6795E3E70D.png",
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83CC239_F8DE_01A1_41EA_A6F8389BC33D, false, 0, this.effect_EDB05026_FD1A_0C44_41EA_7A7383BCF1B7, 'hideEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, true, 0, this.effect_EDB1AC01_FD1E_143F_41E0_CF7D100094DC, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "fontSize": 18,
 "iconHeight": 30,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "paddingTop": 0,
 "label": "BACK",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83CA239_F8DE_01A1_41BC_B2761C1F2FC7",
 "backgroundOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83C9239_F8DE_01A1_41DC_8AFD484DE6D7",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 8,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C8239_F8DE_01A1_41DF_711BF6E51B6A",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 1"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.mainPlayList.set('selectedIndex', 24)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "3 April 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "rollOverIconURL": "skin/Button_D83F5239_F8DE_01A1_41CE_14CC5EBEF12F_rollover.png",
 "id": "Button_D83F5239_F8DE_01A1_41CE_14CC5EBEF12F",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 5,
 "data": {
  "name": "Button <BACK"
 },
 "paddingRight": 0,
 "iconURL": "skin/Button_D83F5239_F8DE_01A1_41CE_14CC5EBEF12F.png",
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83F6239_F8DE_01A1_41DD_4D1CDFE35385, false, 0, this.effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9, 'hideEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, true, 0, this.effect_268FAF4D_310E_0075_4179_B2B3CFC7C47E, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "fontSize": 18,
 "iconHeight": 30,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "paddingTop": 0,
 "label": "BACK",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83F4239_F8DE_01A1_41E4_ED596ADEA119",
 "backgroundOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83F3239_F8DE_01A1_41A1_4852C78B3F11",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 8,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83F2239_F8DE_01A1_41D9_732F6E60A6E7",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 1"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "3 April 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "rollOverIconURL": "skin/Button_D83E0239_F8DE_01A1_41D4_3098BEAEC6A4_rollover.png",
 "id": "Button_D83E0239_F8DE_01A1_41D4_3098BEAEC6A4",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 5,
 "data": {
  "name": "Button <BACK"
 },
 "paddingRight": 0,
 "iconURL": "skin/Button_D83E0239_F8DE_01A1_41D4_3098BEAEC6A4.png",
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83E1239_F8DE_01A1_41D7_04B6DD0F0CA4, false, 0, this.effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9, 'hideEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, true, 0, this.effect_268FAF4D_310E_0075_4179_B2B3CFC7C47E, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "fontSize": 18,
 "iconHeight": 30,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "paddingTop": 0,
 "label": "BACK",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83FE239_F8DE_01A1_41D3_FBDA8CA40BC4",
 "backgroundOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83FD239_F8DE_01A1_41CD_E150A46E78BB",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 8,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83FC239_F8DE_01A1_41ED_A362839BA01E",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 1"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "Soon",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "rollOverIconURL": "skin/Button_D83F0239_F8DE_01A1_41EE_30315EC39D44_rollover.png",
 "id": "Button_D83F0239_F8DE_01A1_41EE_30315EC39D44",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 5,
 "data": {
  "name": "Button <BACK"
 },
 "paddingRight": 0,
 "iconURL": "skin/Button_D83F0239_F8DE_01A1_41EE_30315EC39D44.png",
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83F1239_F8DE_01A1_41D9_12715517E333, false, 0, this.effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9, 'hideEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, true, 0, this.effect_268FAF4D_310E_0075_4179_B2B3CFC7C47E, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "fontSize": 18,
 "iconHeight": 30,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "paddingTop": 0,
 "label": "BACK",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83CF239_F8DE_01A1_41A0_7990D06A16E5",
 "backgroundOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83CE239_F8DE_01A1_41C8_03BE266C9216",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 8,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83CA239_F8DE_01A1_41E0_2A57361F3EEB",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 2"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78EDE62D_534D_0EF7_4187_ADA4E5FD321E, null, '90%', '90%', this.FadeInEffect_78EDF62D_534D_0EF7_41C9_BBE4DAB51E03, this.FadeOutEffect_78ED962D_534D_0EF7_41D2_C014C0107352, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "8 februari 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 23,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C9239_F8DE_01A1_41C7_9FD986659EA7",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 3"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78F1962F_534D_0EF3_41C1_00477EADDD73, null, '90%', '90%', this.FadeInEffect_78F1A62F_534D_0EF3_418D_0D2E6D2C68DE, this.FadeOutEffect_78F1462F_534D_0EF3_41CF_312AA3422C8C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "15 Februari 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "pressedLabel": "Lorem Ipsum",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C8239_F8DE_01A1_41ED_1459DB6FE1FA",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 4"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78F0562F_534D_0EF3_41D2_C0F8A2F0BE5D, null, '90%', '90%', this.FadeInEffect_78F0662F_534D_0EF3_41CF_7970A968DE61, this.FadeOutEffect_78F0762F_534D_0EF3_41D4_1E0E1BCE93DD, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "22 Februari 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C7239_F8DE_01A1_41E8_81BD8A73CC3E",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 5"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78F7662F_534D_0EF3_41C1_84A370969066, null, '90%', '90%', this.FadeInEffect_78F7762F_534D_0EF3_418F_4EA34475AF57, this.FadeOutEffect_78F7062F_534D_0EF3_41C9_1CFFA422A6E1, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "01 Maret 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C6239_F8DE_01A1_41EC_FD9BEA80D5C6",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 6"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78F6062F_534D_0EF3_419A_022615D38E0E, null, '90%', '90%', this.FadeInEffect_78F6162F_534D_0EF3_41CE_37B00E28F37C, this.FadeOutEffect_78F6262F_534D_0EF3_41D3_4DFC3A09636E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "8 Maret 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C5239_F8DE_01A1_41D0_A8EA4615E52A",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 7"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78F6B631_534D_0EEF_41D1_4E6F014D6421, null, '90%', '90%', this.FadeInEffect_78F66631_534D_0EEF_4195_EF5D1ECAB174, this.FadeOutEffect_78F67631_534D_0EEF_41D1_2F6F10F30CF3, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "15 Maret 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83C4239_F8DE_01A1_41EC_75CFF5ABCA12",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 8"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.showPopupImage(this.ImageResource_78F56631_534D_0EEF_41D4_D9F4EA3B9B4A, null, '90%', '90%', this.FadeInEffect_78F57631_534D_0EEF_41D4_0CA899B851E2, this.FadeOutEffect_78F53631_534D_0EEF_41C6_B7C75B12E62E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverBorderColor':'#000000','pressedBorderSize':0,'rollOverIconColor':'#666666','backgroundOpacity':0.3,'paddingLeft':5,'backgroundColorDirection':'vertical','rollOverIconWidth':20,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','paddingTop':5,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'paddingRight':5,'pressedIconWidth':20,'iconColor':'#000000','rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "29 Maret 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "rollOverIconURL": "skin/Button_D83C0239_F8DE_01A1_41C4_33122759A932_rollover.png",
 "id": "Button_D83C0239_F8DE_01A1_41C4_33122759A932",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "paddingLeft": 5,
 "data": {
  "name": "Button <BACK"
 },
 "paddingRight": 0,
 "iconURL": "skin/Button_D83C0239_F8DE_01A1_41C4_33122759A932.png",
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "click": "this.setComponentVisibility(this.Container_D83C1239_F8DE_01A1_41D9_B036D3CB90E7, false, 0, this.effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9, 'hideEffect', false); this.setComponentVisibility(this.Container_D83FE239_F8DE_01A1_41EE_FD5410C8F9DB, true, 0, this.effect_268FAF4D_310E_0075_4179_B2B3CFC7C47E, 'showEffect', false)",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "fontSize": 18,
 "iconHeight": 30,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "paddingTop": 0,
 "label": "BACK",
 "fontStyle": "italic",
 "height": 50,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "id": "Container_D83DE239_F8DE_01A1_41E3_BF8402B43AD2",
 "backgroundOpacity": 0.5,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_D83DD239_F8DE_01A1_41C9_1AE732875272",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "Container",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "layout": "absolute",
 "gap": 10,
 "paddingTop": 0,
 "height": 8,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Oswald",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "id": "Button_D83DC239_F8DE_01A1_41D3_5AF86AEFD7DE",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "data": {
  "name": "Button text 1"
 },
 "paddingRight": 0,
 "iconBeforeLabel": true,
 "class": "Button",
 "width": "100%",
 "borderRadius": 0,
 "propagateClick": true,
 "minHeight": 1,
 "borderSize": 0,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 18,
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "15 Januari 2026",
 "fontStyle": "italic",
 "height": 36,
 "gap": 5,
 "shadow": false,
 "rollOverShadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "left",
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "fontWeight": "normal",
 "shadowSpread": 1
},
{
 "transparencyActive": true,
 "maxHeight": 101,
 "id": "IconButton_D83CB239_F8DE_01A1_41DC_B04D3941CE8A",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83CB239_F8DE_01A1_41DC_B04D3941CE8A.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83CB239_F8DE_01A1_41DC_B04D3941CE8A_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Info"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": false,
 "maxHeight": 101,
 "id": "IconButton_D83CA239_F8DE_01A1_41D1_2D6CE7CB2422",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83CA239_F8DE_01A1_41D1_2D6CE7CB2422.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83CA239_F8DE_01A1_41D1_2D6CE7CB2422_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Thumblist"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": false,
 "maxHeight": 101,
 "id": "IconButton_D83C9239_F8DE_01A1_41BD_3E089183FA4A",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83C9239_F8DE_01A1_41BD_3E089183FA4A.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "click": "this.openLink('https://maps.app.goo.gl/1pubcp9CUWTmDFFbA', '_blank')",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83C9239_F8DE_01A1_41BD_3E089183FA4A_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Location"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": false,
 "maxHeight": 101,
 "id": "IconButton_D83C8239_F8DE_01A1_41C3_A0F65F66D13F",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83C8239_F8DE_01A1_41C3_A0F65F66D13F.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83C8239_F8DE_01A1_41C3_A0F65F66D13F_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Photoalbum"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": false,
 "maxHeight": 101,
 "id": "IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112_pressed_rollover.png",
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112_pressed.png",
 "mode": "push",
 "click": "this.openLink('https://www.instagram.com/pjkp_kipp1a?igsh=MXE0NjBhbjdqYzVnaw==', '_blank')",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Realtor"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": false,
 "maxHeight": 101,
 "id": "IconButton_D83C4239_F8DE_01A1_41E6_36D2265B27BC",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83C4239_F8DE_01A1_41E6_36D2265B27BC.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83C4239_F8DE_01A1_41E6_36D2265B27BC_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Video"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": true,
 "maxHeight": 101,
 "id": "IconButton_D83C6239_F8DE_01A1_41E3_66D1AAC77237",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 44,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83C6239_F8DE_01A1_41E3_66D1AAC77237.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83C6239_F8DE_01A1_41E3_66D1AAC77237_rollover.png",
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton Floorplan"
 },
 "cursor": "hand",
 "maxWidth": 101
},
{
 "transparencyActive": false,
 "maxHeight": 101,
 "id": "IconButton_D83C3239_F8DE_01A1_41E4_0C0F3B4477E1",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 50,
 "class": "IconButton",
 "iconURL": "skin/IconButton_D83C3239_F8DE_01A1_41E4_0C0F3B4477E1.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_D83C3239_F8DE_01A1_41E4_0C0F3B4477E1_pressed_rollover.png",
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_D83C3239_F8DE_01A1_41E4_0C0F3B4477E1_pressed.png",
 "mode": "push",
 "paddingTop": 0,
 "height": 50,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "visible": false,
 "data": {
  "name": "IconButton --"
 },
 "cursor": "hand",
 "maxWidth": 101
}],
 "height": "100%",
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
