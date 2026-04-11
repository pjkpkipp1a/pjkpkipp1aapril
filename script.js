(function(){
    var script = {
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist,this.mainPlayList])",
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
 "height": "100%",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
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
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "registerKey": function(key, value){  window[key] = value; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "existsKey": function(key){  return key in window; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
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
 "id": "camera_49348E37_7AE5_FA9A_41D2_C72FA26AA21A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 1.26,
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
 "id": "camera_51B57FCF_7AE5_F98A_41C6_66A2796BC981",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 35.21,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -160.03,
   "backwardYaw": -1.86,
   "distance": 1,
   "panorama": "this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.14,
   "backwardYaw": 179.87,
   "distance": 1,
   "panorama": "this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249",
 "thumbnailUrl": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_t.jpg",
 "label": "STA 00+550",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BDDC892_7A67_C79A_41BC_218BE608958B",
  "this.overlay_6B8D08A7_7A67_C7BA_41D5_3A7584431F8B"
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
 "id": "camera_51020015_7AE5_C69E_41BB_86E184894639",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.42,
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
 "id": "camera_5111C01C_7AE5_C68E_41CD_38D8374431EE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.1,
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
 "id": "camera_51E35FE8_7AE5_F9B6_41DD_AB8A84681080",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.57,
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
 "id": "camera_56BA3047_7AE5_C6FA_41C7_C51DFF68CC1D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.51,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -177.36,
   "backwardYaw": -173.43,
   "distance": 1,
   "panorama": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988",
 "thumbnailUrl": "media/panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_t.jpg",
 "label": "DJI_0212",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41B4C986_514B_3D73_41D1_2851209BD7E7",
  "this.overlay_7A86EC40_534B_02AD_41C6_03B4F494EF4E"
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
 "id": "panorama_5A504003_514D_0B72_41C4_1D59F44EE291_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 174.21,
   "backwardYaw": -8.31,
   "distance": 1,
   "panorama": "this.panorama_76617051_7A64_4699_41DB_26A545A2C31C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -7.73,
   "backwardYaw": -171.99,
   "distance": 1,
   "panorama": "this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2",
 "thumbnailUrl": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_t.jpg",
 "label": "STA 01+150",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BD3111A_7A64_468A_41D1_BBB98620573B",
  "this.overlay_6B86DE03_7A64_5A7A_41D2_F1F4C15ADA45"
 ]
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
 "id": "camera_518FCFDB_7AE5_F98A_41DC_FC861D4FBE4C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.43,
  "pitch": 0
 }
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
 "id": "camera_53185F06_7AE5_FA7B_41CC_3567A7F6CD05",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.05,
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
 "id": "panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "panorama_767FE791_7A65_C999_4195_54A36C05B936_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_579BF0BD_7AE5_C78E_41DA_CE5E21F60974",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -19.22,
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
 "id": "camera_51762029_7AE5_C6B6_41A8_D45AC6C99259",
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
 "id": "camera_50B3EF4B_7AE5_FA8A_41A5_233B9D00A4A6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.75,
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
 "id": "camera_5329AECE_7AE5_FB8A_41A6_6ABD142B56BE",
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
 "id": "panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 151.33,
   "backwardYaw": 165.62,
   "distance": 1,
   "panorama": "this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457",
 "thumbnailUrl": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_t.jpg",
 "label": "STA 00+000",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BE8F4D8_7A64_4F96_41B1_D6245E85E3FD"
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
 "id": "camera_56CE0067_7AE5_C6BA_41D5_230641F8EA9B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.27,
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
 "id": "camera_50E46F64_7AE5_FABF_41CF_4D645048D32B",
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
 "id": "camera_5147A02E_7AE5_C68B_41D1_4C130CDE77CA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.59,
  "pitch": 0
 }
},
{
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
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634",
 "thumbnailUrl": "media/panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_t.jpg",
 "label": "DJI_0188",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5EEA1AAC_5155_3CB7_41B9_0AD93A9E5999",
  "this.overlay_413EB448_515B_0BFE_41B8_CE92A3A1EB26",
  "this.overlay_7A921E81_5354_FFAF_41CA_7503A29BF58B"
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
 "id": "camera_50CF8F7D_7AE5_FA8E_41DA_EFC2329B3442",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.58,
  "pitch": 0
 }
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
 "id": "panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 164.56,
  "pitch": -29.21
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
 "id": "camera_56411098_7AE5_C796_41B2_821ADA43FD33",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.4,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 154.97,
   "backwardYaw": 3.32,
   "distance": 1,
   "panorama": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.25,
   "backwardYaw": 175.18,
   "distance": 1,
   "panorama": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4F348F_514F_0B72_41D3_B4758189616C",
 "thumbnailUrl": "media/panorama_5A4F348F_514F_0B72_41D3_B4758189616C_t.jpg",
 "label": "DJI_0196",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5ED167B8_515F_149E_41D2_3817638AE939",
  "this.overlay_4623CB33_514B_FD92_41B4_2D5A27E06A6F",
  "this.overlay_7A46BAD3_535D_0753_41D1_A43686DA6538",
  "this.overlay_7B4F13A2_535D_05ED_41D5_05CBFC5F23A9"
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
 "id": "camera_50026F9C_7AE5_F98F_41D2_0CC9D86CBD49",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.27,
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
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -3,
   "backwardYaw": -162.55,
   "distance": 1,
   "panorama": "this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -167.04,
   "backwardYaw": -1.97,
   "distance": 1,
   "panorama": "this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7678819E_7A64_498A_41D3_5619A440DC05",
 "thumbnailUrl": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_t.jpg",
 "label": "STA 00+200",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BDDFB26_7A6C_DABA_41D6_B0D7CABF9094",
  "this.overlay_6B9ED188_7A6C_C676_41D5_58EC6844F1C9"
 ]
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F0662F_534D_0EF3_41CF_7970A968DE61",
 "easing": "cubic_in"
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
 "id": "camera_53059EE7_7AE5_FBB9_41C3_A458A8AE6EB2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.53,
  "pitch": 0
 }
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
 "id": "camera_568BD04E_7AE5_C68A_41DB_7636D1F6FDBB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.38,
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
 "id": "camera_57B410AB_7AE5_C78A_41D3_B0113C1BE973",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.82,
  "pitch": 0
 }
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
 "id": "camera_57DE20D6_7AE5_C79A_41C2_B76F68CF6299",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 17.45,
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
 "id": "camera_49032E43_7AE5_FAF9_41CE_7B59013A5526",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.51,
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
 "id": "camera_50939F5D_7AE5_FA8E_41DB_8DFBD8A0B3F4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 11.56,
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
 "id": "camera_51A6EFC8_7AE5_F9F6_41C4_6DEE0BDD4999",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.28,
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
 "id": "camera_570D90E8_7AE5_C7B7_41C8_FD8914F55468",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.36,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 176.73,
   "backwardYaw": -0.67,
   "distance": 1,
   "panorama": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.1,
   "backwardYaw": 161.05,
   "distance": 1,
   "panorama": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4D379D_514F_7496_41BA_EC9235080F51",
 "thumbnailUrl": "media/panorama_5A4D379D_514F_7496_41BA_EC9235080F51_t.jpg",
 "label": "DJI_0206",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41D85261_5157_0FB1_41D0_46EC9777D69D",
  "this.overlay_41EE8E15_5155_7796_41CC_5070EC699372",
  "this.overlay_7A92A167_5357_0572_41AA_BC637E633741"
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
 "id": "camera_51C9FFFC_7AE5_F98E_41B4_CC4F92E40E3C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 12.96,
  "pitch": 0
 }
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
 "id": "panorama_7678819E_7A64_498A_41D3_5619A440DC05_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
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
 "id": "panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.86,
   "backwardYaw": -160.03,
   "distance": 1,
   "panorama": "this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 168.95,
   "backwardYaw": 2.13,
   "distance": 1,
   "panorama": "this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7662A477_7A64_4E99_41B3_522AF305A5D0",
 "thumbnailUrl": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_t.jpg",
 "label": "STA 00+400",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BDFD7BC_7A64_498F_41C0_1E4355B58FBF",
  "this.overlay_6B8EEC5B_7A64_3E8A_41CB_62F46B47196D"
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
 "id": "camera_49CD8E1C_7AE5_FA8E_41D8_50F699E5BCAF",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.25,
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
 "id": "camera_5016AFA3_7AE5_F9BA_41D9_74E643BFFD33",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.7,
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
 "id": "panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_53529F37_7AE5_FA9A_41C0_7384AA2ACA8C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -7.54,
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
 "id": "camera_57519107_7AE5_C67A_41D6_210486D9F384",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.63,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 161.05,
   "backwardYaw": 0.1,
   "distance": 1,
   "panorama": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.39,
   "backwardYaw": 174.89,
   "distance": 1,
   "panorama": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6",
 "thumbnailUrl": "media/panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_t.jpg",
 "label": "DJI_0207",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41CD40F4_5157_0C97_41D0_DC4CC7A49C9A",
  "this.overlay_4189C96C_5155_1DB6_41C7_25E1513144E7",
  "this.overlay_7ABEF260_5355_076E_41C5_0A8F023BF52A"
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
 "id": "camera_530E9EF3_7AE5_FB9A_41D1_A145CDB740EE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.11,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.14,
   "backwardYaw": 173.75,
   "distance": 1,
   "panorama": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -168.44,
   "backwardYaw": -3.49,
   "distance": 1,
   "panorama": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97",
 "thumbnailUrl": "media/panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_t.jpg",
 "label": "DJI_0209",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_412BCA30_5157_1FAF_41CC_65357BBF42A6",
  "this.overlay_5EE742B7_5155_0C92_41B4_17B4C4E9C61C",
  "this.overlay_7A889908_534B_02BE_41C1_CB1F3EC7B572"
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
 "id": "panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "effect_163FEAB2_310E_002C_416A_B20913F49C44",
 "easing": "quad_in",
 "from": "left"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 157.84,
   "backwardYaw": 11.9,
   "distance": 1,
   "panorama": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -3.98,
   "backwardYaw": -166.23,
   "distance": 1,
   "panorama": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F",
 "thumbnailUrl": "media/panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_t.jpg",
 "label": "DJI_0192",
 "pitch": 0,
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
 "class": "Panorama",
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
 "id": "camera_51619022_7AE5_C6BA_41D0_1704702E39FA",
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
 "id": "panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 163.72,
   "backwardYaw": 0.34,
   "distance": 1,
   "panorama": "this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7664727E_7A65_CA8B_41D3_14B7E893721F",
 "thumbnailUrl": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_t.jpg",
 "label": "STA 01+350",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BE714E5_7A65_CFB9_41D2_2CA65C3AB8A3",
  "this.overlay_6B963789_7A65_CA76_41A0_4CE85CE7570E"
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
 "id": "camera_53464F2B_7AE5_FA89_41D7_F34FE0DCDB8D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 111.16,
  "pitch": 0
 }
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
 "id": "panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_5773E0FB_7AE5_C78A_41D2_46ADB2ACD1A1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.45,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.57,
   "backwardYaw": -178.74,
   "distance": 1,
   "panorama": "this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -162.55,
   "backwardYaw": -3,
   "distance": 1,
   "panorama": "this.panorama_7678819E_7A64_498A_41D3_5619A440DC05"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93",
 "thumbnailUrl": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_t.jpg",
 "label": "STA 00+300",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BC62ADB_7A6C_3B8A_41DE_5957EF57DFC2",
  "this.overlay_6B824145_7A6C_46FE_41C2_6F77F8C44EED"
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
 "id": "camera_56F9D060_7AE5_C6B6_41C0_5A4B56F51A55",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.15,
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
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 179.49,
   "backwardYaw": -4.03,
   "distance": 1,
   "panorama": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.42,
   "backwardYaw": 178.59,
   "distance": 1,
   "panorama": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A484F54_514F_1596_41C1_91048E20962D",
 "thumbnailUrl": "media/panorama_5A484F54_514F_1596_41C1_91048E20962D_t.jpg",
 "label": "DJI_0189",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5EE64798_515B_349E_41CE_16673EE0C2E7",
  "this.overlay_434285D3_515B_1492_4183_34804A0FEAA8",
  "this.overlay_7B0BCE8A_5355_7FB2_41D1_F2B4BBC0DFDB"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.25,
   "backwardYaw": 178.75,
   "distance": 1,
   "panorama": "this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 177.47,
   "backwardYaw": 1.61,
   "distance": 1,
   "panorama": "this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767FE791_7A65_C999_4195_54A36C05B936",
 "thumbnailUrl": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_t.jpg",
 "label": "STA 01+150",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BE6899A_7A64_598A_41C9_8BD2925859F5",
  "this.overlay_6B912DDF_7A64_7989_41D4_30BD96F6392F"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 3.32,
   "backwardYaw": 154.97,
   "distance": 1,
   "panorama": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.08,
   "backwardYaw": 0.41,
   "distance": 1,
   "panorama": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A",
 "thumbnailUrl": "media/panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_t.jpg",
 "label": "DJI_0195",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_413125A3_515F_34B2_41D0_67237EE5CDC5",
  "this.overlay_413AC3A9_515F_0CBE_41CE_A9972270CEA7",
  "this.overlay_7A8579C9_535D_05BE_419F_DB934830E662"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -177.46,
   "backwardYaw": 0.61,
   "distance": 1,
   "panorama": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F",
 "thumbnailUrl": "media/panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_t.jpg",
 "label": "DJI_0217",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41C33FA2_514D_F4B3_41C7_4299D8730949",
  "this.overlay_7A8FFDE2_534F_1D72_41B4_5610FA5B1C25"
 ]
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_2A237CC9_317A_007D_4176_36E090D2269C",
 "easing": "quad_in",
 "to": "left"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 173.78,
   "backwardYaw": 176.58,
   "distance": 1,
   "panorama": "this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9",
 "thumbnailUrl": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_t.jpg",
 "label": "STA 00+000",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_tcap0",
  "this.overlay_6B1C85E0_7A6D_C9B6_41C3_F0FAD20468F0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 164.73,
   "backwardYaw": 11.62,
   "distance": 1,
   "panorama": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 4.71,
   "backwardYaw": 165.05,
   "distance": 1,
   "panorama": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4F3319_514F_0D91_41AE_16804C690B47",
 "thumbnailUrl": "media/panorama_5A4F3319_514F_0D91_41AE_16804C690B47_t.jpg",
 "label": "DJI_0202",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_412B5C93_5155_3492_41B7_68F1CE15B91B",
  "this.overlay_41DAAFDD_514B_1496_41D2_69E42E06B471",
  "this.overlay_7A93A338_5355_06DD_41A4_6D1E9D3DD1E9"
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
 "id": "panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_camera",
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
 "id": "camera_5132F00F_7AE5_C68A_41CA_0141A6DE927A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.41,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 2.13,
   "backwardYaw": 168.95,
   "distance": 1,
   "panorama": "this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 158.86,
   "backwardYaw": 4.5,
   "distance": 1,
   "panorama": "this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3",
 "thumbnailUrl": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_t.jpg",
 "label": "STA 00+375",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BDC871A_7A64_4A8A_41C3_900D4680AF8D",
  "this.overlay_6BA2E311_7A64_4A96_41DC_AA2F14B032C9"
 ]
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F1462F_534D_0EF3_41CF_312AA3422C8C",
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
 "id": "panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_18BBC752_310E_006C_41B5_0D8B802FB057",
 "easing": "quad_in",
 "from": "left"
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
 "id": "camera_5603F07F_7AE5_C689_4199_42F6767730B9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.87,
  "pitch": 0
 }
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
 "id": "panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F66631_534D_0EEF_4195_EF5D1ECAB174",
 "easing": "cubic_in"
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F0762F_534D_0EF3_41D4_1E0E1BCE93DD",
 "easing": "cubic_out"
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
 "id": "panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_504C9FBB_7AE5_F98A_41D8_B2C29A0C401E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.28,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 173.75,
   "backwardYaw": 1.14,
   "distance": 1,
   "panorama": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229",
 "thumbnailUrl": "media/panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_t.jpg",
 "label": "DJI_0210",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_4138FB82_5157_7D72_41AC_6FBAC020FFB3",
  "this.overlay_41997D26_5155_15B3_41D1_4B6981B2F729",
  "this.overlay_7AB71779_534B_0D5F_41C5_9567A17B6956"
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
 "id": "camera_50A74F3D_7AE5_FA89_41CF_A029403BFB13",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -17.4,
  "pitch": 0
 }
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
 "id": "camera_536BBF19_7AE5_FA96_41BE_A1A7CCAC0784",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.74,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 178.97,
   "backwardYaw": -0.02,
   "distance": 1,
   "panorama": "this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.52,
   "backwardYaw": 158.57,
   "distance": 1,
   "panorama": "this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767F2199_7A65_C996_4185_008BE631A081",
 "thumbnailUrl": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_t.jpg",
 "label": "STA 00+575",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BEB815B_7A6B_C68A_41D3_9219BF51F776",
  "this.overlay_6B8457DB_7A6B_C98A_41BF_9FC7681509DD"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.14,
   "backwardYaw": 171.92,
   "distance": 1,
   "panorama": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 178.59,
   "backwardYaw": -1.42,
   "distance": 1,
   "panorama": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D",
 "thumbnailUrl": "media/panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_t.jpg",
 "label": "DJI_0190",
 "pitch": 0,
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
 "class": "Panorama",
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
 "id": "camera_5657C09E_7AE5_C78A_41D4_86F95CAE0D09",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.38,
  "pitch": 0
 }
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
 "id": "camera_562C7073_7AE5_C699_4191_534268F48714",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.23,
  "pitch": 0
 }
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
 "id": "panorama_76617051_7A64_4699_41DB_26A545A2C31C_camera",
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
 "id": "panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_camera",
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
 "id": "camera_5303CEED_7AE5_FB8E_41B0_436B17BB649A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.9,
  "pitch": 0
 }
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
 "id": "panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.51,
  "pitch": -9.04
 }
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
 "id": "panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_53769F1F_7AE5_FA8A_41D1_15D91ED260B4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.75,
  "pitch": 0
 }
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
 "id": "panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -1.97,
   "backwardYaw": -167.04,
   "distance": 1,
   "panorama": "this.panorama_7678819E_7A64_498A_41D3_5619A440DC05"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.58,
   "backwardYaw": 173.78,
   "distance": 1,
   "panorama": "this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE",
 "thumbnailUrl": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_t.jpg",
 "label": "STA 00+175",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6B3B59F4_7A6C_599F_41B5_8570D0005786",
  "this.overlay_6B8ACE91_7A6C_5B99_41D7_63B99A93DE25"
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
 "id": "panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_camera",
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
 "id": "camera_50D12F83_7AE5_FA7A_41D4_D7DE2DA0D742",
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
 "id": "panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_camera",
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
 "id": "panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_49D47E23_7AE5_FABA_41D6_FA4CD984E531",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.39,
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
 "id": "camera_49D94E2A_7AE5_FA8A_41AB_4ED9D619CCBB",
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
 "id": "camera_54B61113_7AE5_C699_41C3_23A4A9EB5A78",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.86,
  "pitch": 0
 }
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
 "id": "camera_53350ED4_7AE5_FB9E_41B3_B37E853B5B42",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.54,
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
 "id": "camera_536D5F12_7AE5_FA9A_41D4_9B4D6B8CD372",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.22,
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
 "id": "panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_5663508B_7AE5_C78A_41A4_72EAADA0A07D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.13,
  "pitch": 0
 }
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
 "id": "panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_56139085_7AE5_C67E_41BF_D17E9C0281A1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.14,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 158.57,
   "backwardYaw": -0.52,
   "distance": 1,
   "panorama": "this.panorama_767F2199_7A65_C996_4185_008BE631A081"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.47,
   "backwardYaw": 172.46,
   "distance": 1,
   "panorama": "this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142",
 "thumbnailUrl": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_t.jpg",
 "label": "STA 00+700",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BECCC0B_7A64_3E89_41C5_9012BB17B094",
  "this.overlay_6BA2CAF2_7A64_5B9A_41D8_79667CDCC999"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 11.9,
   "backwardYaw": 157.84,
   "distance": 1,
   "panorama": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 171.92,
   "backwardYaw": -0.14,
   "distance": 1,
   "panorama": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C",
 "thumbnailUrl": "media/panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_t.jpg",
 "label": "DJI_0191",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_406FAF6E_515B_75B2_4179_2894AEF63312",
  "this.overlay_431B7130_515D_0DAF_41C9_5C3AA95C1C92",
  "this.overlay_78D74645_535D_0EB6_41BD_08CA3B0DC125"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -4.26,
   "backwardYaw": 173.55,
   "distance": 1,
   "panorama": "this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -171.77,
   "backwardYaw": -4.38,
   "distance": 1,
   "panorama": "this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA",
 "thumbnailUrl": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_t.jpg",
 "label": "STA 00+825",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BDE43F5_7A64_499E_41D4_3424852E0051",
  "this.overlay_687A1E4F_7A64_3A8A_41C1_53524B7F3ABF"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 168.78,
   "backwardYaw": -5.95,
   "distance": 1,
   "panorama": "this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -8.31,
   "backwardYaw": 174.21,
   "distance": 1,
   "panorama": "this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76617051_7A64_4699_41DB_26A545A2C31C",
 "thumbnailUrl": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_t.jpg",
 "label": "STA 01+075",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BE1609C_7A64_C78F_41DD_9964186FBA97",
  "this.overlay_6B89FB0F_7A64_5A89_41D5_31DC4A16C4B6"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -5.95,
   "backwardYaw": 168.78,
   "distance": 1,
   "panorama": "this.panorama_76617051_7A64_4699_41DB_26A545A2C31C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 173.55,
   "backwardYaw": -4.26,
   "distance": 1,
   "panorama": "this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348",
 "thumbnailUrl": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_t.jpg",
 "label": "STA 00+950",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BC2C099_7A64_C796_41B7_3CAB4C8915FC",
  "this.overlay_687DEE94_7A64_FB9E_41C6_6462EEBD756B"
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
 "id": "panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.02,
  "pitch": -8.5
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78EDF62D_534D_0EF7_41C9_BBE4DAB51E03",
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
 "id": "panorama_5A484F54_514F_1596_41C1_91048E20962D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -68.84,
   "backwardYaw": 160.78,
   "distance": 1,
   "panorama": "this.panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -177.61,
   "backwardYaw": 1.23,
   "distance": 1,
   "panorama": "this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB",
 "thumbnailUrl": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_t.jpg",
 "label": "STA 01+450",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BCA1A97_7A64_7B9A_41DC_A7AABAB41251",
  "this.overlay_6B81B9A0_7A64_59B6_41D5_CF8F4B07E48A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.64,
   "backwardYaw": 168.49,
   "distance": 1,
   "panorama": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A508887_514F_1B72_41AE_1C46B632CD7B",
 "thumbnailUrl": "media/panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_t.jpg",
 "label": "DJI_0200",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5EF1EDBC_5155_1497_41D0_B25475088196",
  "this.overlay_7A684180_535B_05AE_41D1_33A1ED295164"
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
 "id": "panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_camera",
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
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_EDE31937_FD1A_1C43_41E4_B1DB0E7241B4",
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
 "id": "panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_camera",
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
 "id": "camera_571D50EE_7AE5_C78B_41DA_E8CCF9A5B521",
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
 "id": "panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9",
   "camera": "this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE",
   "camera": "this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7678819E_7A64_498A_41D3_5619A440DC05",
   "camera": "this.panorama_7678819E_7A64_498A_41D3_5619A440DC05_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93",
   "camera": "this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8",
   "camera": "this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767F2199_7A65_C996_4185_008BE631A081",
   "camera": "this.panorama_767F2199_7A65_C996_4185_008BE631A081_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142",
   "camera": "this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8",
   "camera": "this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576",
   "camera": "this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767FE791_7A65_C999_4195_54A36C05B936",
   "camera": "this.panorama_767FE791_7A65_C999_4195_54A36C05B936_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237",
   "camera": "this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7664727E_7A65_CA8B_41D3_14B7E893721F",
   "camera": "this.panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8",
   "camera": "this.panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457",
   "camera": "this.panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518",
   "camera": "this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC",
   "camera": "this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3",
   "camera": "this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0",
   "camera": "this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249",
   "camera": "this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C",
   "camera": "this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA",
   "camera": "this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348",
   "camera": "this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76617051_7A64_4699_41DB_26A545A2C31C",
   "camera": "this.panorama_76617051_7A64_4699_41DB_26A545A2C31C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2",
   "camera": "this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C",
   "camera": "this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57",
   "camera": "this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB",
   "camera": "this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B",
   "camera": "this.panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4",
   "camera": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0",
   "camera": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634",
   "camera": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D",
   "camera": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D",
   "camera": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C",
   "camera": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F",
   "camera": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0",
   "camera": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655",
   "camera": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A",
   "camera": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C",
   "camera": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231",
   "camera": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B",
   "camera": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015",
   "camera": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47",
   "camera": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1",
   "camera": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795",
   "camera": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936",
   "camera": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51",
   "camera": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6",
   "camera": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370",
   "camera": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97",
   "camera": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229",
   "camera": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49",
   "camera": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988",
   "camera": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC",
   "camera": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291",
   "camera": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0",
   "camera": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821",
   "camera": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 57, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.61,
   "backwardYaw": -177.46,
   "distance": 1,
   "panorama": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -175.62,
   "backwardYaw": -0.5,
   "distance": 1,
   "panorama": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821",
 "thumbnailUrl": "media/panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_t.jpg",
 "label": "DJI_0216",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41FE3FDC_514D_3497_41CD_8F339149CD1C",
  "this.overlay_7450AC7E_5135_7B92_41C0_A320128757BB",
  "this.overlay_7A8518BD_534F_03D6_41C0_86ECF0F6D572"
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
 "id": "panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_camera",
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
 "id": "camera_519D9FE2_7AE5_F9BA_41C2_B8396DDAE420",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.39,
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
 "id": "camera_50A89F44_7AE5_FAFE_41D0_C24B8CEF9547",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -28.67,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_27C1F008_310D_FFFB_41A2_B5C1794EE5C9",
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
 "id": "camera_51BB6FD5_7AE5_F99E_41D9_5C4A936AB2A4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.03,
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
 "id": "camera_5486111A_7AE5_C68A_41BA_37B1176B1726",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -3.09,
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
 "id": "panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 0.41,
   "backwardYaw": 179.08,
   "distance": 1,
   "panorama": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 179.17,
   "backwardYaw": -1.24,
   "distance": 1,
   "panorama": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655",
 "thumbnailUrl": "media/panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_t.jpg",
 "label": "DJI_0194",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5EFC11E3_515D_0CB2_41A7_9108514B646E",
  "this.overlay_5EA02E38_515C_F79E_41CC_DE87A4A88680",
  "this.overlay_7AB8A880_535F_03AD_41B4_4AA99F42759A"
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
 "id": "camera_57C9F0CF_7AE5_C789_41DE_4A53ABBEC69E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 8.01,
  "pitch": 0
 }
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
 "id": "camera_573F50E2_7AE5_C7BA_41D8_565C9C90B283",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -15.27,
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
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 11.62,
   "backwardYaw": 164.73,
   "distance": 1,
   "panorama": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 168.49,
   "backwardYaw": -2.64,
   "distance": 1,
   "panorama": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015",
 "thumbnailUrl": "media/panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_t.jpg",
 "label": "DJI_0201",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41E21091_5155_0B6E_41D0_F02724555A5B",
  "this.overlay_41D14541_514B_35EE_41D1_D7D4B30EC792",
  "this.overlay_7AAC7B73_535B_0552_41C2_A4CE421D5A7B"
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
 "id": "camera_578430B1_7AE5_C796_41D8_B4C7EB28EBFE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.98,
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
 "id": "camera_506B0FAE_7AE5_F98A_419D_4C7FBAB22AC0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.92,
  "pitch": 0
 }
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
 "id": "camera_50533FC1_7AE5_F9F6_41B6_B727E64ADE33",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.39,
  "pitch": 0
 }
},
{
 "hfovMax": 130,
 "hfovMin": "301%",
 "partial": false,
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
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -3.49,
   "backwardYaw": -168.44,
   "distance": 1,
   "panorama": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 174.89,
   "backwardYaw": -0.39,
   "distance": 1,
   "panorama": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370",
 "thumbnailUrl": "media/panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_t.jpg",
 "label": "DJI_0208",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41DBC183_5157_0D72_41C6_6CC82D65CE33",
  "this.overlay_41DBBA02_5155_3F73_41C9_C83500DC7FF1",
  "this.overlay_7A609D79_5355_1D5F_41B6_EB256CDF0D6D"
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
 "id": "camera_4939BE3D_7AE5_FA8E_41C6_6845F5EC15F1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177,
  "pitch": 0
 }
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
 "id": "panorama_767F2199_7A65_C996_4185_008BE631A081_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_164A1542_310E_006C_41C8_B7C2AB9D709D",
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
 "id": "camera_50FABF76_7AE5_FA9A_41BF_ECA253CEE189",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.08,
  "pitch": 0
 }
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
 "id": "camera_5743B101_7AE5_C676_41D1_26FC2DD47D6F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.62,
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
 "id": "camera_56980054_7AE5_C69F_416E_B0419F01A6EC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 3.65,
  "pitch": 0
 }
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
 "id": "camera_533F6EE0_7AE5_FBB7_4184_3E1A0614836A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 18.71,
  "pitch": 0
 }
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
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -5.72,
   "backwardYaw": -175.85,
   "distance": 1,
   "panorama": "this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -171.99,
   "backwardYaw": -7.73,
   "distance": 1,
   "panorama": "this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C",
 "thumbnailUrl": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_t.jpg",
 "label": "STA 01+275",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BDE509A_7A65_C788_41C2_650D3A258296",
  "this.overlay_687E16C6_7A65_CBFA_41D8_6C1270CBD4DE"
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
 "id": "camera_5763D0F5_7AE5_C79E_41A0_091C45FF720A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.83,
  "pitch": 0
 }
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
 "id": "camera_57F9C0C9_7AE5_C789_41D1_68227AFA6F20",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 171.69,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.67,
   "backwardYaw": 176.73,
   "distance": 1,
   "panorama": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -176.35,
   "backwardYaw": -2.3,
   "distance": 1,
   "panorama": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A48BA89_514F_1F71_41D3_9699D79B7936",
 "thumbnailUrl": "media/panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_t.jpg",
 "label": "DJI_0205",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_411DA448_5157_0BFF_41C0_B2231D92310E",
  "this.overlay_41FE8A12_5155_1F93_41D4_1DEC4498642C",
  "this.overlay_7ABC3681_5357_0FAE_41D5_41FD9425972F"
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
 "id": "camera_5330DEDA_7AE5_FB8A_41C2_2FA13B95E283",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.5,
  "pitch": 0
 }
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
 "id": "camera_5314FEF9_7AE5_FB89_41CF_A6B292ADDF03",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -174.56,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -4.72,
   "backwardYaw": -169.58,
   "distance": 1,
   "panorama": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -173.43,
   "backwardYaw": -177.36,
   "distance": 1,
   "panorama": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC",
 "thumbnailUrl": "media/panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_t.jpg",
 "label": "DJI_0213",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41F8FAE3_514B_1CB2_41B5_2F9053CEA241",
  "this.overlay_4318AC25_514B_1BB6_41C5_EA59395FA446",
  "this.overlay_7AA8F978_534D_055E_41D0_4E0382230C6F"
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
 "id": "panorama_766F2212_7A64_4A9A_41D8_D52265712F57_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 179.87,
   "backwardYaw": -1.14,
   "distance": 1,
   "panorama": "this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -4.38,
   "backwardYaw": -171.77,
   "distance": 1,
   "panorama": "this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C",
 "thumbnailUrl": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_t.jpg",
 "label": "STA 00+675",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BD940F4_7A64_479E_418D_DAA10DF18398",
  "this.overlay_6B8C8FB0_7A64_5996_41C0_8445CD3A6B37"
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
 "id": "camera_51C5DFF5_7AE5_F99E_41D7_B901E1A33164",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.76,
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
 "id": "camera_50DA8F89_7AE5_FA76_41DC_1C2CBAF210AC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.95,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_1A65691F_310E_0014_41BF_C2605660352F",
 "easing": "quad_in",
 "from": "left"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 175.18,
   "backwardYaw": -0.25,
   "distance": 1,
   "panorama": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231",
 "thumbnailUrl": "media/panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_t.jpg",
 "label": "DJI_0197",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_46A40E85_514B_1776_41C2_E9CE6584BC90"
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
 "id": "camera_51578035_7AE5_C69E_4158_1048B3780D3A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.33,
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
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.02,
   "backwardYaw": 178.97,
   "distance": 1,
   "panorama": "this.panorama_767F2199_7A65_C996_4185_008BE631A081"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -178.74,
   "backwardYaw": 0.57,
   "distance": 1,
   "panorama": "this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8",
 "thumbnailUrl": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_t.jpg",
 "label": "STA 00+450",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BF0575A_7A6C_4A8A_41D5_6FF870602178",
  "this.overlay_6BA41B96_7A6C_399A_41CA_39DCECCA72D6"
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
 "id": "panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_563DC079_7AE5_C696_41B6_4D41973023F0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.97,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -175.85,
   "backwardYaw": -5.72,
   "distance": 1,
   "panorama": "this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.23,
   "backwardYaw": -177.61,
   "distance": 1,
   "panorama": "this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_766F2212_7A64_4A9A_41D8_D52265712F57",
 "thumbnailUrl": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_t.jpg",
 "label": "STA 01+375",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BD0750F_7A65_CE8A_41B5_54B095277D10",
  "this.overlay_6B84F2C5_7A64_4BFE_41D9_5D0E0E53C954"
 ]
},
{
 "hfovMax": 130,
 "hfovMin": "275%",
 "partial": false,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_0/r/3/{row}_{column}.jpg",
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
   }
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "STA 01+450",
 "id": "panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8",
 "thumbnailUrl": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BEA7C82_7A64_3E7B_41D7_80B43C0C19B4"
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
 "id": "camera_512DE008_7AE5_C677_41D2_1FD9391D5D68",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.97,
  "pitch": 0
 }
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
 "id": "camera_534B1F32_7AE5_FA9A_41B4_C5A6313AFD04",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.48,
  "pitch": 0
 }
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
 "id": "camera_5795F0B7_7AE5_C79A_41D5_4C29CDA0B50D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.43,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.09,
   "backwardYaw": -156.37,
   "distance": 1,
   "panorama": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 176.91,
   "backwardYaw": -0.2,
   "distance": 1,
   "panorama": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0",
 "thumbnailUrl": "media/panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_t.jpg",
 "label": "DJI_0187",
 "pitch": 0,
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
 "class": "Panorama",
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
 "id": "camera_537E0F25_7AE5_FABE_4176_9121F3713CE5",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -16.28,
  "pitch": 0
 }
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
 "id": "camera_57EB90C3_7AE5_C7FA_41C8_FB43AD474648",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.77,
  "pitch": 0
 }
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
 "id": "camera_5084CF51_7AE5_FA96_41D3_56F79218648B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.05,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.24,
   "backwardYaw": -161.29,
   "distance": 1,
   "panorama": "this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 172.46,
   "backwardYaw": -1.47,
   "distance": 1,
   "panorama": "this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8",
 "thumbnailUrl": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_t.jpg",
 "label": "STA 00+825",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BE50D16_7A64_5E9A_41D2_1A943C18D19C",
  "this.overlay_6B9E569B_7A64_4B89_41CD_C89D800727CF"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -166.23,
   "backwardYaw": -3.98,
   "distance": 1,
   "panorama": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -1.24,
   "backwardYaw": 179.17,
   "distance": 1,
   "panorama": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0",
 "thumbnailUrl": "media/panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_t.jpg",
 "label": "DJI_0193",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5EEBC9C7_515D_7CF2_41C9_8F29474F7CB0",
  "this.overlay_41C773DD_515D_0C96_41C7_70E2B24E7314",
  "this.overlay_7AB83231_535F_06EE_41D3_357540ED266F"
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
 "id": "camera_51F7FFF0_7AE5_F996_41DE_5FCF280AD4F2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -2.53,
  "pitch": 0
 }
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
 "id": "panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_camera",
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
 "id": "panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_camera",
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
 "id": "panorama_5A4F3319_514F_0D91_41AE_16804C690B47_camera",
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
 "id": "camera_54A1B10D_7AE5_C68E_41CE_BA5551245C18",
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
 "id": "panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_camera",
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
 "id": "camera_50281F8F_7AE5_F989_41D2_9F2757ADF3E0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.29,
  "pitch": 0
 }
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
 "id": "camera_5364CF0C_7AE5_FA8E_41CA_A139C6F095BD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.5,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 162.6,
   "backwardYaw": 5.44,
   "distance": 1,
   "panorama": "this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 4.5,
   "backwardYaw": 158.86,
   "distance": 1,
   "panorama": "this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC",
 "thumbnailUrl": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_t.jpg",
 "label": "STA 00+300",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BCE94FB_7A64_CF8A_41D3_61C7F7C07BCA",
  "this.overlay_6876E0B8_7A64_C796_41C6_BF4746916CD6"
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
 "id": "camera_5671A092_7AE5_C79A_418D_A4672246314C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.66,
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
 "id": "camera_50F33F70_7AE5_FA96_41D9_B85839E52E69",
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
 "id": "camera_50EFFF6A_7AE5_FA8B_41BD_12AF4FEF1EE9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -22.16,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -169.58,
   "backwardYaw": -4.72,
   "distance": 1,
   "panorama": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -5.6,
   "backwardYaw": -144.79,
   "distance": 1,
   "panorama": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A504003_514D_0B72_41C4_1D59F44EE291",
 "thumbnailUrl": "media/panorama_5A504003_514D_0B72_41C4_1D59F44EE291_t.jpg",
 "label": "DJI_0214",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41EEBC67_514B_1BB1_41B6_AD46B8B8937D",
  "this.overlay_430F5FE5_514B_14B6_41D2_B239299D205F",
  "this.overlay_7A8586CE_534D_0FB5_41C3_1823CD83F2A0"
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
 "id": "panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_camera",
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
 "id": "camera_56E9C05A_7AE5_C68B_41DA_54AA9548AE74",
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
 "id": "camera_49231E30_7AE5_FA97_41DB_1D7899F87B71",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 2.64,
  "pitch": 0
 }
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
 "id": "camera_51DE5002_7AE5_C67A_41A2_4AD073A41D1C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.22,
  "pitch": 0
 }
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
 "id": "camera_56DFC06D_7AE5_C68E_41D4_88B8BE7A1466",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.86,
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 160.78,
   "backwardYaw": -68.84,
   "distance": 1,
   "panorama": "this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B",
 "thumbnailUrl": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_t.jpg",
 "label": "Stockyard",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BD15742_7A64_CAFA_41CE_2CE3ABA67CF6"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 178.75,
   "backwardYaw": -1.25,
   "distance": 1,
   "panorama": "this.panorama_767FE791_7A65_C999_4195_54A36C05B936"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 0.34,
   "backwardYaw": 163.72,
   "distance": 1,
   "panorama": "this.panorama_7664727E_7A65_CA8B_41D3_14B7E893721F"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767B4D15_7A65_FE9E_41D1_F90F59059237",
 "thumbnailUrl": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_t.jpg",
 "label": "STA 01+200",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BEFDFAC_7A64_598F_41DA_901FCA0F51AC",
  "this.overlay_6B9FC080_7A65_C677_41CC_65B3A083A79C"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 5.44,
   "backwardYaw": 162.6,
   "distance": 1,
   "panorama": "this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 165.62,
   "backwardYaw": 151.33,
   "distance": 1,
   "panorama": "this.panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_7662B302_7A65_CA7B_41D9_EFA60050C518",
 "thumbnailUrl": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_t.jpg",
 "label": "STA 00+200",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BEC9E17_7A64_5A99_41C4_740BC33B19EF",
  "this.overlay_6BA3196A_7A64_468A_41A1_B7ABD1BD5D82"
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
 "id": "camera_572F80DD_7AE5_C78E_41D5_33D8C97A2B81",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.03,
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
 "id": "camera_507EDFB4_7AE5_F99E_41D4_F13276DA9846",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.76,
  "pitch": 0
 }
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
 "id": "camera_5313BF00_7AE5_FA76_41D4_D18E55AC86EC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -21.14,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "id": "ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist",
 "items": [
  {
   "media": "this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9",
   "camera": "this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE",
   "camera": "this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7678819E_7A64_498A_41D3_5619A440DC05",
   "camera": "this.panorama_7678819E_7A64_498A_41D3_5619A440DC05_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93",
   "camera": "this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8",
   "camera": "this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767F2199_7A65_C996_4185_008BE631A081",
   "camera": "this.panorama_767F2199_7A65_C996_4185_008BE631A081_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142",
   "camera": "this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8",
   "camera": "this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576",
   "camera": "this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767FE791_7A65_C999_4195_54A36C05B936",
   "camera": "this.panorama_767FE791_7A65_C999_4195_54A36C05B936_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237",
   "camera": "this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7664727E_7A65_CA8B_41D3_14B7E893721F",
   "camera": "this.panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8",
   "camera": "this.panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457",
   "camera": "this.panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518",
   "camera": "this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC",
   "camera": "this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3",
   "camera": "this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0",
   "camera": "this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249",
   "camera": "this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C",
   "camera": "this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA",
   "camera": "this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348",
   "camera": "this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76617051_7A64_4699_41DB_26A545A2C31C",
   "camera": "this.panorama_76617051_7A64_4699_41DB_26A545A2C31C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2",
   "camera": "this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C",
   "camera": "this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57",
   "camera": "this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB",
   "camera": "this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B",
   "camera": "this.panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4",
   "camera": "this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0",
   "camera": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634",
   "camera": "this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D",
   "camera": "this.panorama_5A484F54_514F_1596_41C1_91048E20962D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D",
   "camera": "this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C",
   "camera": "this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F",
   "camera": "this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0",
   "camera": "this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655",
   "camera": "this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A",
   "camera": "this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C",
   "camera": "this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231",
   "camera": "this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B",
   "camera": "this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015",
   "camera": "this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47",
   "camera": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1",
   "camera": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795",
   "camera": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936",
   "camera": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51",
   "camera": "this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6",
   "camera": "this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370",
   "camera": "this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97",
   "camera": "this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229",
   "camera": "this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49",
   "camera": "this.panorama_5A4DB928_514C_FDBF_41D4_4D51245A3E49_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988",
   "camera": "this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 52, 53)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC",
   "camera": "this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 53, 54)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291",
   "camera": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 54, 55)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0",
   "camera": "this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 55, 56)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821",
   "camera": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 56, 57)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F",
   "camera": "this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_7A69002C_5375_02F6_41A5_F39C32B7470C_playlist, 57, 0)",
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
 "id": "panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
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
 "id": "camera_50649FA8_7AE5_F9B6_41CD_A62B5CEA64EC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.51,
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
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78F7062F_534D_0EF3_41C9_1CFFA422A6E1",
 "easing": "cubic_out"
},
{
 "duration": 500,
 "class": "FadeOutEffect",
 "id": "FadeOutEffect_78ED962D_534D_0EF7_41D2_C014C0107352",
 "easing": "cubic_out"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 1.61,
   "backwardYaw": 177.47,
   "distance": 1,
   "panorama": "this.panorama_767FE791_7A65_C999_4195_54A36C05B936"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -161.29,
   "backwardYaw": -2.24,
   "distance": 1,
   "panorama": "this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8"
  }
 ],
 "hfovMin": "275%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_767E9229_7A65_CA89_41DB_9875C9D5F576",
 "thumbnailUrl": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_t.jpg",
 "label": "STA 00+975",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/d/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/f/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/u/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/r/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/b/3/{row}_{column}.jpg",
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
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "height": 3072
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0/l/3/{row}_{column}.jpg",
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
   "thumbnailUrl": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_6BEE65C9_7A64_C9F6_41D0_6C9F2BF03937",
  "this.overlay_6B8114FC_7A64_CF8E_41D1_D48A6EE0D16A"
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
 "id": "camera_57A7D0A4_7AE5_C7BF_41BA_2246F313D64D",
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
 "id": "panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.73,
  "pitch": -32.44
 }
},
{
 "duration": 400,
 "class": "SlideInEffect",
 "id": "effect_19F0E9E8_310A_003B_41C2_00E6E4570ABD",
 "easing": "quad_in",
 "from": "left"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -0.2,
   "backwardYaw": 176.91,
   "distance": 1,
   "panorama": "this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4",
 "thumbnailUrl": "media/panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4_t.jpg",
 "label": "DJI_0186",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_5FBEDC57_5157_FB92_41D2_3B4CA5746454",
  "this.overlay_64E29140_534B_02AD_419C_1A698A42451C",
  "this.overlay_7ABFD895_5355_03D6_41B0_91EA32DEE27A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 165.05,
   "backwardYaw": 4.71,
   "distance": 1,
   "panorama": "this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 1.4,
   "backwardYaw": -164.02,
   "distance": 1,
   "panorama": "this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4C4034_514F_0B96_41BA_58111AE764E1",
 "thumbnailUrl": "media/panorama_5A4C4034_514F_0B96_41BA_58111AE764E1_t.jpg",
 "label": "DJI_0203",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41F8B852_5155_1B95_41A5_A992D7C8E2D5",
  "this.overlay_41DD85A9_514B_14BE_41B8_89BCD3C976D0",
  "this.overlay_7A95C251_5355_06AE_41C4_AB4689BE33A6"
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
 "id": "camera_56A5C03B_7AE5_C68A_41C6_48EC13996A63",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -18.95,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F1A62F_534D_0EF3_418D_0D2E6D2C68DE",
 "easing": "cubic_in"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -2.3,
   "backwardYaw": -176.35,
   "distance": 1,
   "panorama": "this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -164.02,
   "backwardYaw": 1.4,
   "distance": 1,
   "panorama": "this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795",
 "thumbnailUrl": "media/panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795_t.jpg",
 "label": "DJI_0204",
 "pitch": 0,
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
 "class": "Panorama",
 "overlays": [
  "this.overlay_41DF99EA_5155_1CB3_41D1_67551DB04F99",
  "this.overlay_404A0233_514B_0F91_41A9_9BE7E6A3FE74",
  "this.overlay_7AA020DD_5355_0356_41D4_11436BBCF2F5"
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
 "id": "camera_503C6F95_7AE5_F999_41D3_6EA80B87E7B7",
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
 "id": "panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "duration": 500,
 "class": "FadeInEffect",
 "id": "FadeInEffect_78F6162F_534D_0EF3_41CE_37B00E28F37C",
 "easing": "cubic_in"
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
 "id": "camera_508E6F57_7AE5_FA9A_41CC_C529B49AAE5B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.79,
  "pitch": 0
 }
},
{
 "duration": 400,
 "class": "SlideOutEffect",
 "id": "effect_49353574_570C_A542_41D0_43B05AC58F9B",
 "easing": "quad_in",
 "to": "left"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -144.79,
   "backwardYaw": -5.6,
   "distance": 1,
   "panorama": "this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -0.5,
   "backwardYaw": -175.62,
   "distance": 1,
   "panorama": "this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821"
  }
 ],
 "hfovMin": "301%",
 "hfov": 360,
 "partial": false,
 "id": "panorama_5A4CBCF7_514D_1491_41C8_3281836592A0",
 "thumbnailUrl": "media/panorama_5A4CBCF7_514D_1491_41C8_3281836592A0_t.jpg",
 "label": "DJI_0215",
 "pitch": 0,
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
 "class": "Panorama",
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
 "id": "camera_56B43041_7AE5_C6F6_41C5_6488A1863ACE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.25,
  "pitch": 0
 }
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
 "playbackBarBorderColor": "#FFFFFF",
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
 "playbackBarHeadShadowVerticalLength": 0,
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
 "toolTipFontSize": "1.11vmin",
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
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
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
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
 "width": 132.03,
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
 "itemThumbnailShadowHorizontalLength": 3,
 "itemBorderRadius": 0,
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemBackgroundOpacity": 0,
 "itemHorizontalAlign": "center",
 "height": "94.377%",
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
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelGap": 8,
 "itemThumbnailShadowColor": "#000000",
 "itemThumbnailShadowVerticalLength": 3,
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
  "name": "UIComponent50692"
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
  "name": "ZoomImage50693"
 },
 "scaleMode": "custom"
},
{
 "fontFamily": "Arial",
 "data": {
  "name": "CloseButton50694"
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
   "hfov": 9.74,
   "image": "this.AnimatedImageResource_6CE5DAD9_7A9F_DB96_41B1_DA97179DD7EE",
   "yaw": -160.03,
   "pitch": -18.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BDDC892_7A67_C79A_41BC_218BE608958B",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0, this.camera_56139085_7AE5_C67E_41BF_D17E9C0281A1); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 9.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.72,
   "image": "this.AnimatedImageResource_6FA05C88_7AAC_3E76_41D8_B7D0CFBDAB6C",
   "yaw": -1.14,
   "pitch": -10.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B8D08A7_7A67_C7BA_41D5_3A7584431F8B",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C, this.camera_5663508B_7AE5_C78A_41A4_72EAADA0A07D); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.61
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC, this.camera_51E35FE8_7AE5_F9B6_41DD_AB8A84681080); this.mainPlayList.set('selectedIndex', 53)",
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
   "hfov": 6.48,
   "image": "this.AnimatedImageResource_6FA39C88_7AAC_3E76_4182_8393246CE10F",
   "yaw": 174.21,
   "pitch": -8.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BD3111A_7A64_468A_41D1_BBB98620573B",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76617051_7A64_4699_41DB_26A545A2C31C, this.camera_57F9C0C9_7AE5_C789_41D1_68227AFA6F20); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.48,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.97,
   "image": "this.AnimatedImageResource_6FA3EC89_7AAC_3E76_41C6_FF52A07FD5F1",
   "yaw": -7.73,
   "pitch": -9.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B86DE03_7A64_5A7A_41D2_F1F4C15ADA45",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C, this.camera_57C9F0CF_7AE5_C789_41DE_4A53ABBEC69E); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.66,
   "image": "this.AnimatedImageResource_6FA0BC87_7AAC_3E7A_41D6_6073F9543CE7",
   "yaw": 151.33,
   "pitch": -13.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BE8F4D8_7A64_4F96_41B1_D6245E85E3FD",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518, this.camera_568BD04E_7AE5_C68A_41DB_7636D1F6FDBB); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 151.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.57
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A484F54_514F_1596_41C1_91048E20962D, this.camera_49032E43_7AE5_FAF9_41CE_7B59013A5526); this.mainPlayList.set('selectedIndex', 31)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0, this.camera_5329AECE_7AE5_FB8A_41A6_6ABD142B56BE); this.mainPlayList.set('selectedIndex', 29)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A, this.camera_57A7D0A4_7AE5_C7BF_41BA_2246F313D64D); this.mainPlayList.set('selectedIndex', 37)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A53CAA4_514F_3CB6_41AE_229D7B933231, this.camera_57B410AB_7AE5_C78A_41D3_B0113C1BE973); this.mainPlayList.set('selectedIndex', 39)",
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
   "hfov": 4.97,
   "image": "this.AnimatedImageResource_6FAF4C86_7AAC_3E7A_41DC_C4414A2D961D",
   "yaw": -167.04,
   "pitch": -11.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BDDFB26_7A6C_DABA_41D6_B0D7CABF9094",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE, this.camera_572F80DD_7AE5_C78E_41D5_33D8C97A2B81); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.54,
   "image": "this.AnimatedImageResource_6FAFAC86_7AAC_3E7A_41C1_BB4FF66B693A",
   "yaw": -3,
   "pitch": -11.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B9ED188_7A6C_C676_41D5_58EC6844F1C9",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93, this.camera_57DE20D6_7AE5_C79A_41C2_B76F68CF6299); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.4
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6, this.camera_56A5C03B_7AE5_C68A_41C6_48EC13996A63); this.mainPlayList.set('selectedIndex', 47)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936, this.camera_51578035_7AE5_C69E_4158_1048B3780D3A); this.mainPlayList.set('selectedIndex', 45)",
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
   "hfov": 8.82,
   "image": "this.AnimatedImageResource_6CE55AD9_7A9F_DB96_4190_BEE3243877F9",
   "yaw": 168.95,
   "pitch": -12.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BDFD7BC_7A64_498F_41C0_1E4355B58FBF",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3, this.camera_5603F07F_7AE5_C689_4199_42F6767730B9); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 8.82,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.84,
   "image": "this.AnimatedImageResource_6FA01C88_7AAC_3E76_41A6_86D5671C7752",
   "yaw": -1.86,
   "pitch": -13.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B8EEC5B_7A64_3E8A_41CB_62F46B47196D",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249, this.camera_563DC079_7AE5_C696_41B6_4D41973023F0); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.87
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370, this.camera_530E9EF3_7AE5_FB9A_41D1_A145CDB740EE); this.mainPlayList.set('selectedIndex', 48)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51, this.camera_5303CEED_7AE5_FB8E_41B0_436B17BB649A); this.mainPlayList.set('selectedIndex', 46)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A561C2E_514F_1BB3_41C0_D04F43E5E229, this.camera_56B43041_7AE5_C6F6_41C5_6488A1863ACE); this.mainPlayList.set('selectedIndex', 50)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C01FC_514F_0C96_41D1_8001FA07C370, this.camera_56BA3047_7AE5_C6FA_41C7_C51DFF68CC1D); this.mainPlayList.set('selectedIndex', 48)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0, this.camera_51619022_7AE5_C6BA_41D0_1704702E39FA); this.mainPlayList.set('selectedIndex', 35)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C, this.camera_5111C01C_7AE5_C68E_41CD_38D8374431EE); this.mainPlayList.set('selectedIndex', 33)",
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
   "hfov": 4.95,
   "image": "this.AnimatedImageResource_6FA03C87_7AAC_3E7A_41D0_262CA5EA8469",
   "yaw": 163.72,
   "pitch": -7.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BE714E5_7A65_CFB9_41D2_2CA65C3AB8A3",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237, this.camera_5671A092_7AE5_C79A_418D_A4672246314C); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.95,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 163.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.72,
   "image": "this.AnimatedImageResource_6FA01C87_7AAC_3E7A_41D6_150F6AADBAB0",
   "yaw": 2.42,
   "pitch": -12.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B963789_7A65_CA76_41A0_4CE85CE7570E",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_6FAFFC86_7AAC_3E7A_41D3_16A0F12ECE4B",
   "yaw": -162.55,
   "pitch": -11.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BC62ADB_7A6C_3B8A_41DE_5957EF57DFC2",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7678819E_7A64_498A_41D3_5619A440DC05, this.camera_4939BE3D_7AE5_FA8E_41C6_6845F5EC15F1); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.98,
   "image": "this.AnimatedImageResource_6FAFDC86_7AAC_3E7A_41D4_E006768B2441",
   "yaw": 0.57,
   "pitch": -15.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B824145_7A6C_46FE_41C2_6F77F8C44EED",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8, this.camera_49348E37_7AE5_FA9A_41D2_C72FA26AA21A); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.15
  }
 ]
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D, this.camera_5132F00F_7AE5_C68A_41CA_0141A6DE927A); this.mainPlayList.set('selectedIndex', 32)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634, this.camera_512DE008_7AE5_C677_41D2_1FD9391D5D68); this.mainPlayList.set('selectedIndex', 30)",
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
   "hfov": 4.49,
   "image": "this.AnimatedImageResource_6FA14C87_7AAC_3E7A_41B5_56F7BC01CF5F",
   "yaw": -1.25,
   "pitch": -11.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BE6899A_7A64_598A_41C9_8BD2925859F5",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767B4D15_7A65_FE9E_41D1_F90F59059237, this.camera_49CD8E1C_7AE5_FA8E_41D8_50F699E5BCAF); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.61,
   "image": "this.AnimatedImageResource_6FA1AC87_7AAC_3E7A_41C2_343104312B9F",
   "yaw": 177.47,
   "pitch": -12.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B912DDF_7A64_7989_41D4_30BD96F6392F",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576, this.camera_49D47E23_7AE5_FABA_41D6_FA4CD984E531); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 177.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.55
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C, this.camera_51762029_7AE5_C6B6_41A8_D45AC6C99259); this.mainPlayList.set('selectedIndex', 38)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655, this.camera_5147A02E_7AE5_C68B_41D1_4C130CDE77CA); this.mainPlayList.set('selectedIndex', 36)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821, this.camera_519D9FE2_7AE5_F9BA_41C2_B8396DDAE420); this.mainPlayList.set('selectedIndex', 56)",
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
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_tcap0.png",
    "width": 2835,
    "class": "ImageResourceLevel",
    "height": 2835
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 45,
 "class": "TripodCapPanoramaOverlay",
 "id": "panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_tcap0",
 "distance": 50,
 "inertia": false
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.88,
   "image": "this.AnimatedImageResource_6FAC3C86_7AAC_3E7A_41B0_52150336877A",
   "yaw": 173.78,
   "pitch": -12.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B1C85E0_7A6D_C9B6_41C3_F0FAD20468F0",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE, this.camera_51020015_7AE5_C69E_41BB_86E184894639); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.88,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.87
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1, this.camera_50DA8F89_7AE5_FA76_41DC_1C2CBAF210AC); this.mainPlayList.set('selectedIndex', 43)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015, this.camera_50D12F83_7AE5_FA7A_41D4_D7DE2DA0D742); this.mainPlayList.set('selectedIndex', 41)",
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
   "hfov": 5.87,
   "image": "this.AnimatedImageResource_6FA36C88_7AAC_3E76_41C7_917FDC185520",
   "yaw": 158.86,
   "pitch": -9.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BDC871A_7A64_4A8A_41C3_900D4680AF8D",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC, this.camera_5364CF0C_7AE5_FA8E_41CA_A139C6F095BD); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.41,
   "image": "this.AnimatedImageResource_6FA1CC88_7AAC_3E76_41B6_7976793E8742",
   "yaw": 2.13,
   "pitch": -9.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BA2E311_7A64_4A96_41DC_AA2F14B032C9",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7662A477_7A64_4E99_41B3_522AF305A5D0, this.camera_53185F06_7AE5_FA7B_41CC_3567A7F6CD05); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.5
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
   "click": "this.mainPlayList.set('selectedIndex', 51)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97, this.camera_54B61113_7AE5_C699_41C3_23A4A9EB5A78); this.mainPlayList.set('selectedIndex', 49)",
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
 "items": [
  {
   "hfov": 3.97,
   "image": "this.AnimatedImageResource_6FAE6C87_7AAC_3E7A_41D5_C206CDE04ACA",
   "yaw": -0.52,
   "pitch": -9.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BEB815B_7A6B_C68A_41D3_9219BF51F776",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142, this.camera_5795F0B7_7AE5_C79A_41D5_4C29CDA0B50D); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.97,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.89,
   "image": "this.AnimatedImageResource_6FAE4C87_7AAC_3E7A_41CD_AB66F09806D1",
   "yaw": 178.97,
   "pitch": -13.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B8457DB_7A6B_C98A_41BF_9FC7681509DD",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8, this.camera_578430B1_7AE5_C796_41D8_B4C7EB28EBFE); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.48
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B79B6_514F_7C92_41CB_F2F72692D94C, this.camera_50FABF76_7AE5_FA9A_41BF_ECA253CEE189); this.mainPlayList.set('selectedIndex', 33)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A484F54_514F_1596_41C1_91048E20962D, this.camera_50CF8F7D_7AE5_FA8E_41DA_EFC2329B3442); this.mainPlayList.set('selectedIndex', 31)",
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
   "hfov": 5.12,
   "image": "this.AnimatedImageResource_6FAF1C86_7AAC_3E7A_41D6_6B83ADA75FDC",
   "yaw": -1.97,
   "pitch": -13.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B3B59F4_7A6C_599F_41B5_8570D0005786",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7678819E_7A64_498A_41D3_5619A440DC05, this.camera_51C9FFFC_7AE5_F98E_41B4_CC4F92E40E3C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.25,
   "image": "this.AnimatedImageResource_6FAF6C86_7AAC_3E7A_41B7_953F342B69D9",
   "yaw": 176.58,
   "pitch": -13.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B8ACE91_7A6C_5B99_41D7_63B99A93DE25",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9, this.camera_51DE5002_7AE5_C67A_41A2_4AD073A41D1C); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 176.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.86,
   "image": "this.AnimatedImageResource_6FAEAC87_7AAC_3E7A_41B9_890DC3DEFDA8",
   "yaw": 158.57,
   "pitch": -11.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BECCC0B_7A64_3E89_41C5_9012BB17B094",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767F2199_7A65_C996_4185_008BE631A081, this.camera_534B1F32_7AE5_FA9A_41B4_C5A6313AFD04); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 158.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.81,
   "image": "this.AnimatedImageResource_6FAEFC87_7AAC_3E7A_41D0_C61C2B5EFA2A",
   "yaw": -1.47,
   "pitch": -15.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BA2CAF2_7A64_5B9A_41D8_79667CDCC999",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8, this.camera_53529F37_7AE5_FA9A_41C0_7384AA2ACA8C); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.25
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F, this.camera_50EFFF6A_7AE5_FA8B_41BD_12AF4FEF1EE9); this.mainPlayList.set('selectedIndex', 34)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B4481_514F_0B6E_41BF_A4D2B2B4841D, this.camera_50F33F70_7AE5_FA96_41D9_B85839E52E69); this.mainPlayList.set('selectedIndex', 32)",
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
   "hfov": 6.59,
   "image": "this.AnimatedImageResource_6FA0FC88_7AAC_3E76_41D4_9D4797091235",
   "yaw": -171.77,
   "pitch": -7.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BDE43F5_7A64_499E_41D4_3424852E0051",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C, this.camera_5743B101_7AE5_C676_41D1_26FC2DD47D6F); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.65,
   "image": "this.AnimatedImageResource_6FA0DC88_7AAC_3E76_41BA_41E65272C5FF",
   "yaw": -4.26,
   "pitch": -9.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_687A1E4F_7A64_3A8A_41C1_53524B7F3ABF",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348, this.camera_5773E0FB_7AE5_C78A_41D2_46ADB2ACD1A1); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.94,
   "image": "this.AnimatedImageResource_6FA36C88_7AAC_3E76_41D1_4045849DB339",
   "yaw": 168.78,
   "pitch": -9.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BE1609C_7A64_C78F_41DD_9964186FBA97",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348, this.camera_5084CF51_7AE5_FA96_41D3_56F79218648B); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0_HS_0_0_0_map.gif",
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
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_6FA34C88_7AAC_3E76_41D5_17B0C7DF32B0",
   "yaw": -8.31,
   "pitch": -6.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B89FB0F_7A64_5A89_41D5_31DC4A16C4B6",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2, this.camera_508E6F57_7AE5_FA9A_41CC_C529B49AAE5B); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.78,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -8.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.69,
   "image": "this.AnimatedImageResource_54697A95_7AA4_DB9E_41DE_42140E2DC979",
   "yaw": 173.55,
   "pitch": -8.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BC2C099_7A64_C796_41B7_3CAB4C8915FC",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA, this.camera_536BBF19_7AE5_FA96_41BE_A1A7CCAC0784); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.4,
   "image": "this.AnimatedImageResource_6FA30C88_7AAC_3E76_41CB_45E152E459F4",
   "yaw": -5.95,
   "pitch": -6.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_687DEE94_7A64_FB9E_41C6_6462EEBD756B",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76617051_7A64_4699_41DB_26A545A2C31C, this.camera_536D5F12_7AE5_FA9A_41D4_9B4D6B8CD372); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.13,
   "image": "this.AnimatedImageResource_6CEE4ADA_7A9F_DB8A_41C6_09ED219E133E",
   "yaw": -177.61,
   "pitch": -10.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BCA1A97_7A64_7B9A_41DC_A7AABAB41251",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57, this.camera_57EB90C3_7AE5_C7FA_41C8_FB43AD474648); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -177.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.67,
   "image": "this.AnimatedImageResource_6FA2BC89_7AAC_3E76_4184_CBAD991F9320",
   "yaw": -68.84,
   "pitch": -11.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B81B9A0_7A64_59B6_41D5_CF8F4B07E48A",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B, this.camera_579BF0BD_7AE5_C78E_41DA_CE5E21F60974); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -68.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.78
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4DC5EB_514F_F4B2_418F_578698D5D015, this.camera_50649FA8_7AE5_F9B6_41CD_A62B5CEA64EC); this.mainPlayList.set('selectedIndex', 41)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4DC67D_514D_1791_41A0_D6BD0CA2FB2F, this.camera_53350ED4_7AE5_FB9E_41B3_B37E853B5B42); this.mainPlayList.set('selectedIndex', 57)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0, this.camera_5330DEDA_7AE5_FB8A_41C2_2FA13B95E283); this.mainPlayList.set('selectedIndex', 55)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4E5F50_514F_15EE_41D3_149A9F743E6A, this.camera_506B0FAE_7AE5_F98A_419D_4C7FBAB22AC0); this.mainPlayList.set('selectedIndex', 37)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9450_514F_0BEE_41D1_0B5324F049B0, this.camera_507EDFB4_7AE5_F99E_41D4_F13276DA9846); this.mainPlayList.set('selectedIndex', 35)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47, this.camera_573F50E2_7AE5_C7BA_41D8_565C9C90B283); this.mainPlayList.set('selectedIndex', 42)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A508887_514F_1B72_41AE_1C46B632CD7B, this.camera_570D90E8_7AE5_C7B7_41C8_FD8914F55468); this.mainPlayList.set('selectedIndex', 40)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A52CED1_514F_34EE_41A3_4EAD6BC64E97, this.camera_50939F5D_7AE5_FA8E_41DB_8DFBD8A0B3F4); this.mainPlayList.set('selectedIndex', 49)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A5044AF_514F_14B2_41C9_4BEBC2B5E6F6, this.camera_50E46F64_7AE5_FABF_41CF_4D645048D32B); this.mainPlayList.set('selectedIndex', 47)",
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
   "hfov": 6.52,
   "image": "this.AnimatedImageResource_6FA3CC89_7AAC_3E76_41B9_F73786EE06B0",
   "yaw": -171.99,
   "pitch": -13.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BDE509A_7A65_C788_41C2_650D3A258296",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2, this.camera_56CE0067_7AE5_C6BA_41D5_230641F8EA9B); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -171.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.55,
   "image": "this.AnimatedImageResource_6FA22C89_7AAC_3E76_41D5_A05BAB2D48D5",
   "yaw": -5.72,
   "pitch": -5.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_687E16C6_7A65_CBFA_41D8_6C1270CBD4DE",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_766F2212_7A64_4A9A_41D8_D52265712F57, this.camera_56F9D060_7AE5_C6B6_41C0_5A4B56F51A55); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.29
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4D379D_514F_7496_41BA_EC9235080F51, this.camera_50026F9C_7AE5_F98F_41D2_0CC9D86CBD49); this.mainPlayList.set('selectedIndex', 46)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795, this.camera_5016AFA3_7AE5_F9BA_41D9_74E643BFFD33); this.mainPlayList.set('selectedIndex', 44)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291, this.camera_49D94E2A_7AE5_FA8A_41AB_4ED9D619CCBB); this.mainPlayList.set('selectedIndex', 54)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C95F3_514D_1492_41C7_421E0A7C4988, this.camera_49231E30_7AE5_FA97_41DB_1D7899F87B71); this.mainPlayList.set('selectedIndex', 52)",
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
   "hfov": 10.12,
   "image": "this.AnimatedImageResource_6CEA4AD9_7A9F_DB96_41D2_D9D80100AE9B",
   "yaw": 179.87,
   "pitch": -10.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BD940F4_7A64_479E_418D_DAA10DF18398",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249, this.camera_56DFC06D_7AE5_C68E_41D4_88B8BE7A1466); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.12,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 179.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 6.16,
   "image": "this.AnimatedImageResource_6FA0AC88_7AAC_3E76_41CD_BA9313F5B3BE",
   "yaw": -4.38,
   "pitch": -7.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B8C8FB0_7A64_5996_41C0_8445CD3A6B37",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA, this.camera_562C7073_7AE5_C699_4191_534268F48714); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.83
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F348F_514F_0B72_41D3_B4758189616C, this.camera_50B3EF4B_7AE5_FA8A_41A5_233B9D00A4A6); this.mainPlayList.set('selectedIndex', 38)",
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
   "hfov": 6.39,
   "image": "this.AnimatedImageResource_6FAE3C86_7AAC_3E7A_4182_C073DEA2FEEB",
   "yaw": -178.74,
   "pitch": -11.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BF0575A_7A6C_4A8A_41D5_6FF870602178",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93, this.camera_518FCFDB_7AE5_F98A_41DC_FC861D4FBE4C); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -178.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.8
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.73,
   "image": "this.AnimatedImageResource_6FAE1C86_7AAC_3E7A_41C2_DBEE835D5621",
   "yaw": -0.02,
   "pitch": -11.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BA41B96_7A6C_399A_41CA_39DCECCA72D6",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767F2199_7A65_C996_4185_008BE631A081, this.camera_51BB6FD5_7AE5_F99E_41D9_5C4A936AB2A4); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 10.05,
   "image": "this.AnimatedImageResource_6CE9BADA_7A9F_DB8A_41CF_0966B53813D5",
   "yaw": -175.85,
   "pitch": -12.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BD0750F_7A65_CE8A_41B5_54B095277D10",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C, this.camera_504C9FBB_7AE5_F98A_41D8_B2C29A0C401E); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 10.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.55,
   "image": "this.AnimatedImageResource_6FA26C89_7AAC_3E76_41B0_3ECBC1F75685",
   "yaw": 1.23,
   "pitch": -9.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B84F2C5_7A64_4BFE_41D9_5D0E0E53C954",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB, this.camera_50533FC1_7AE5_F9F6_41B6_B727E64ADE33); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.23,
   "image": {
    "levels": [
     {
      "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.31
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
 "id": "overlay_6BEA7C82_7A64_3E7B_41D7_80B43C0C19B4",
 "data": {
  "label": "Arrow 01a"
 },
 "items": [
  {
   "hfov": 5.31,
   "image": "this.AnimatedImageResource_6FA05C87_7AAC_3E7A_41CC_DD4B6684229D",
   "yaw": 162.68,
   "pitch": -13.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 162.68,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.25
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B99F4_514F_1C97_41C0_7AAC0DC0F634, this.camera_57519107_7AE5_C67A_41D6_210486D9F384); this.mainPlayList.set('selectedIndex', 30)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5D92FEAD_514F_34B6_41B1_26CD98C8C1D4, this.camera_54A1B10D_7AE5_C68E_41CE_BA5551245C18); this.mainPlayList.set('selectedIndex', 28)",
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
   "hfov": 7.29,
   "image": "this.AnimatedImageResource_6FAEDC87_7AAC_3E7A_41BB_D72FCD38511C",
   "yaw": 172.46,
   "pitch": -14.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BE50D16_7A64_5E9A_41D2_1A943C18D19C",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142, this.camera_53059EE7_7AE5_FBB9_41C3_A458A8AE6EB2); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 172.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.71,
   "image": "this.AnimatedImageResource_6FA13C87_7AAC_3E7A_41DD_AC2963EB4193",
   "yaw": -2.24,
   "pitch": -12.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B9E569B_7A64_4B89_41CD_C89D800727CF",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767E9229_7A65_CA89_41DB_9875C9D5F576, this.camera_533F6EE0_7AE5_FBB7_4184_3E1A0614836A); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.7
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4B9A02_514F_1F73_41C1_3E40EED22655, this.camera_5763D0F5_7AE5_C79E_41A0_091C45FF720A); this.mainPlayList.set('selectedIndex', 36)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4A7EE8_514F_74BE_41BB_B0C9B0F74A6F, this.camera_571D50EE_7AE5_C78B_41DA_E8CCF9A5B521); this.mainPlayList.set('selectedIndex', 34)",
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
   "hfov": 6.06,
   "image": "this.AnimatedImageResource_6FA0CC88_7AAC_3E76_41D0_C6C55F0E08A9",
   "yaw": 162.6,
   "pitch": -10.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BCE94FB_7A64_CF8A_41D3_61C7F7C07BCA",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7662B302_7A65_CA7B_41D9_EFA60050C518, this.camera_5314FEF9_7AE5_FB89_41CF_A6B292ADDF03); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 162.6,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.38,
   "image": "this.AnimatedImageResource_6FA31C88_7AAC_3E76_41C7_4F7E32DAB6DC",
   "yaw": 4.5,
   "pitch": -10.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6876E0B8_7A64_C796_41C6_BF4746916CD6",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3, this.camera_5313BF00_7AE5_FA76_41D4_D18E55AC86EC); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.98
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4CBCF7_514D_1491_41C8_3281836592A0, this.camera_51B57FCF_7AE5_F98A_41C6_66A2796BC981); this.mainPlayList.set('selectedIndex', 55)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A53D2F3_514D_0C92_41AE_7B2F49F880BC, this.camera_51A6EFC8_7AE5_F9F6_41C4_6DEE0BDD4999); this.mainPlayList.set('selectedIndex', 53)",
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
   "hfov": 9.77,
   "image": "this.AnimatedImageResource_6CEEFADA_7A9F_DB8A_41C4_2B000F079F85",
   "yaw": 160.78,
   "pitch": -18.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BD15742_7A64_CAFA_41CE_2CE3ABA67CF6",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB, this.camera_53464F2B_7AE5_FA89_41D7_F34FE0DCDB8D); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 9.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 3.28,
   "image": "this.AnimatedImageResource_6FA1FC87_7AAC_3E7A_41DA_D804F2AC1A8E",
   "yaw": 178.75,
   "pitch": -8.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BEFDFAC_7A64_598F_41DA_901FCA0F51AC",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767FE791_7A65_C999_4195_54A36C05B936, this.camera_53769F1F_7AE5_FA8A_41D1_15D91ED260B4); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 3.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 2.64,
   "image": "this.AnimatedImageResource_6FA1DC87_7AAC_3E7A_41D1_8191BA025623",
   "yaw": 0.34,
   "pitch": -11.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B9FC080_7A65_C677_41CC_65B3A083A79C",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7664727E_7A65_CA8B_41D3_14B7E893721F, this.camera_537E0F25_7AE5_FABE_4176_9121F3713CE5); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 2.64,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 7.05,
   "image": "this.AnimatedImageResource_6FA09C87_7AAC_3E7A_41B7_ED3C04FC9714",
   "yaw": 165.62,
   "pitch": -9.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BEC9E17_7A64_5A99_41C4_740BC33B19EF",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457, this.camera_50A89F44_7AE5_FAFE_41D0_C24B8CEF9547); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 7.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.47,
   "image": "this.AnimatedImageResource_6FA0EC87_7AAC_3E7A_41C5_42602A919221",
   "yaw": 5.44,
   "pitch": -11.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BA3196A_7A64_468A_41A1_B7ABD1BD5D82",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC, this.camera_50A74F3D_7AE5_FA89_41CF_A029403BFB13); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 5.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.32
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 4.76,
   "image": "this.AnimatedImageResource_6FA11C87_7AAC_3E7A_41D7_2C18698008C0",
   "yaw": 1.61,
   "pitch": -10.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6BEE65C9_7A64_C9F6_41D0_6C9F2BF03937",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767FE791_7A65_C999_4195_54A36C05B936, this.camera_51F7FFF0_7AE5_F996_41DE_5FCF280AD4F2); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 4.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "items": [
  {
   "hfov": 5.41,
   "image": "this.AnimatedImageResource_6FA16C87_7AAC_3E7A_41D1_BE95C7C876CD",
   "yaw": -161.29,
   "pitch": -12.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B8114FC_7A64_CF8E_41D1_D48A6EE0D16A",
 "data": {
  "label": "Arrow 01a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8, this.camera_51C5DFF5_7AE5_F99E_41D7_B901E1A33164); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -161.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.84
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
   "click": "this.startPanoramaWithCamera(this.panorama_5BBF34C3_514F_14F2_41BD_0181AFDAD1F0, this.camera_5486111A_7AE5_C68A_41BA_37B1176B1726); this.mainPlayList.set('selectedIndex', 29)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A52BD94_514F_3496_41C0_EF4DA1A28795, this.camera_503C6F95_7AE5_F999_41D3_6EA80B87E7B7); this.mainPlayList.set('selectedIndex', 44)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4F3319_514F_0D91_41AE_16804C690B47, this.camera_50281F8F_7AE5_F989_41D2_9F2757ADF3E0); this.mainPlayList.set('selectedIndex', 42)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A48BA89_514F_1F71_41D3_9699D79B7936, this.camera_56980054_7AE5_C69F_416E_B0419F01A6EC); this.mainPlayList.set('selectedIndex', 45)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A4C4034_514F_0B96_41BA_58111AE764E1, this.camera_56E9C05A_7AE5_C68B_41DA_54AA9548AE74); this.mainPlayList.set('selectedIndex', 43)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A510A4E_514D_7FF2_41B4_9A2D60EBA821, this.camera_5657C09E_7AE5_C78A_41D4_86F95CAE0D09); this.mainPlayList.set('selectedIndex', 56)",
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
   "click": "this.startPanoramaWithCamera(this.panorama_5A504003_514D_0B72_41C4_1D59F44EE291, this.camera_56411098_7AE5_C796_41B2_821ADA43FD33); this.mainPlayList.set('selectedIndex', 54)",
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
 "id": "AnimatedImageResource_6CE5DAD9_7A9F_DB96_41B1_DA97179DD7EE",
 "levels": [
  {
   "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA05C88_7AAC_3E76_41D8_B7D0CFBDAB6C",
 "levels": [
  {
   "url": "media/panorama_7663CA6D_7A64_5A8E_41C6_BFBBD2332249_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA39C88_7AAC_3E76_4182_8393246CE10F",
 "levels": [
  {
   "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA3EC89_7AAC_3E76_41C6_FF52A07FD5F1",
 "levels": [
  {
   "url": "media/panorama_7661165B_7A64_4A8A_41C8_624122B7BBE2_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA0BC87_7AAC_3E7A_41D6_6073F9543CE7",
 "levels": [
  {
   "url": "media/panorama_76648D77_7A65_DE9A_41D5_0C68AE0F7457_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAF4C86_7AAC_3E7A_41DC_C4414A2D961D",
 "levels": [
  {
   "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAFAC86_7AAC_3E7A_41C1_BB4FF66B693A",
 "levels": [
  {
   "url": "media/panorama_7678819E_7A64_498A_41D3_5619A440DC05_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6CE55AD9_7A9F_DB96_4190_BEE3243877F9",
 "levels": [
  {
   "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA01C88_7AAC_3E76_41A6_86D5671C7752",
 "levels": [
  {
   "url": "media/panorama_7662A477_7A64_4E99_41B3_522AF305A5D0_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA03C87_7AAC_3E7A_41D0_262CA5EA8469",
 "levels": [
  {
   "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA01C87_7AAC_3E7A_41D6_150F6AADBAB0",
 "levels": [
  {
   "url": "media/panorama_7664727E_7A65_CA8B_41D3_14B7E893721F_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FAFFC86_7AAC_3E7A_41D3_16A0F12ECE4B",
 "levels": [
  {
   "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAFDC86_7AAC_3E7A_41D4_E006768B2441",
 "levels": [
  {
   "url": "media/panorama_767F56F6_7A64_4B9A_41C2_52C18A175F93_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA14C87_7AAC_3E7A_41B5_56F7BC01CF5F",
 "levels": [
  {
   "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA1AC87_7AAC_3E7A_41C2_343104312B9F",
 "levels": [
  {
   "url": "media/panorama_767FE791_7A65_C999_4195_54A36C05B936_0_HS_1_0.png",
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
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6FAC3C86_7AAC_3E7A_41B0_52150336877A",
 "levels": [
  {
   "url": "media/panorama_76C206BC_7A64_4B8E_41DD_2D646FCAB5C9_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA36C88_7AAC_3E76_41C7_917FDC185520",
 "levels": [
  {
   "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA1CC88_7AAC_3E76_41B6_7976793E8742",
 "levels": [
  {
   "url": "media/panorama_76626E72_7A64_3A9B_41D8_BFC53EDFA3B3_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FAE6C87_7AAC_3E7A_41D5_C206CDE04ACA",
 "levels": [
  {
   "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAE4C87_7AAC_3E7A_41CD_AB66F09806D1",
 "levels": [
  {
   "url": "media/panorama_767F2199_7A65_C996_4185_008BE631A081_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FAF1C86_7AAC_3E7A_41D6_6B83ADA75FDC",
 "levels": [
  {
   "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAF6C86_7AAC_3E7A_41B7_953F342B69D9",
 "levels": [
  {
   "url": "media/panorama_7678CC2C_7A64_5E8E_41D5_29C146FEA1BE_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FAEAC87_7AAC_3E7A_41B9_890DC3DEFDA8",
 "levels": [
  {
   "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAEFC87_7AAC_3E7A_41D0_C61C2B5EFA2A",
 "levels": [
  {
   "url": "media/panorama_767E375F_7A65_CA8A_41D7_5AAF05CD3142_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA0FC88_7AAC_3E76_41D4_9D4797091235",
 "levels": [
  {
   "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA0DC88_7AAC_3E76_41BA_41E65272C5FF",
 "levels": [
  {
   "url": "media/panorama_7662C563_7A64_4EBA_41C8_1059F499A2DA_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA36C88_7AAC_3E76_41D1_4045849DB339",
 "levels": [
  {
   "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA34C88_7AAC_3E76_41D5_17B0C7DF32B0",
 "levels": [
  {
   "url": "media/panorama_76617051_7A64_4699_41DB_26A545A2C31C_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_54697A95_7AA4_DB9E_41DE_42140E2DC979",
 "levels": [
  {
   "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA30C88_7AAC_3E76_41CB_45E152E459F4",
 "levels": [
  {
   "url": "media/panorama_7663EACF_7A64_7B89_41D9_F6A66DB69348_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6CEE4ADA_7A9F_DB8A_41C6_09ED219E133E",
 "levels": [
  {
   "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA2BC89_7AAC_3E76_4184_CBAD991F9320",
 "levels": [
  {
   "url": "media/panorama_7665E7A4_7A64_49BF_41D4_6E5754985FBB_0_HS_1_0.png",
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
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_6FA3CC89_7AAC_3E76_41B9_F73786EE06B0",
 "levels": [
  {
   "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA22C89_7AAC_3E76_41D5_A05BAB2D48D5",
 "levels": [
  {
   "url": "media/panorama_7666DBFC_7A64_598E_41C7_A3DE4F645C4C_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6CEA4AD9_7A9F_DB96_41D2_D9D80100AE9B",
 "levels": [
  {
   "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA0AC88_7AAC_3E76_41CD_BA9313F5B3BE",
 "levels": [
  {
   "url": "media/panorama_767AFFDE_7A64_598B_41D8_5C2F2838E98C_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FAE3C86_7AAC_3E7A_4182_C073DEA2FEEB",
 "levels": [
  {
   "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAE1C86_7AAC_3E7A_41C2_DBEE835D5621",
 "levels": [
  {
   "url": "media/panorama_767FCC3D_7A64_3E8E_41C4_91B5239560D8_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6CE9BADA_7A9F_DB8A_41CF_0966B53813D5",
 "levels": [
  {
   "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA26C89_7AAC_3E76_41B0_3ECBC1F75685",
 "levels": [
  {
   "url": "media/panorama_766F2212_7A64_4A9A_41D8_D52265712F57_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA05C87_7AAC_3E7A_41CC_DD4B6684229D",
 "levels": [
  {
   "url": "media/panorama_7664C806_7A65_C67A_41CC_2C0E2EB515F8_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FAEDC87_7AAC_3E7A_41BB_D72FCD38511C",
 "levels": [
  {
   "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA13C87_7AAC_3E7A_41DD_AC2963EB4193",
 "levels": [
  {
   "url": "media/panorama_767E9CD2_7A65_DF9A_41D2_DECDFD960CB8_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA0CC88_7AAC_3E76_41D0_C6C55F0E08A9",
 "levels": [
  {
   "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA31C88_7AAC_3E76_41C7_4F7E32DAB6DC",
 "levels": [
  {
   "url": "media/panorama_7661687B_7A65_C68A_4194_25F7BCDF7BEC_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6CEEFADA_7A9F_DB8A_41C4_2B000F079F85",
 "levels": [
  {
   "url": "media/panorama_76614D38_7A64_3E96_41DB_CD0E228F3A1B_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA1FC87_7AAC_3E7A_41DA_D804F2AC1A8E",
 "levels": [
  {
   "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA1DC87_7AAC_3E7A_41D1_8191BA025623",
 "levels": [
  {
   "url": "media/panorama_767B4D15_7A65_FE9E_41D1_F90F59059237_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA09C87_7AAC_3E7A_41B7_ED3C04FC9714",
 "levels": [
  {
   "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA0EC87_7AAC_3E7A_41C5_42602A919221",
 "levels": [
  {
   "url": "media/panorama_7662B302_7A65_CA7B_41D9_EFA60050C518_0_HS_1_0.png",
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
 "id": "AnimatedImageResource_6FA11C87_7AAC_3E7A_41D7_2C18698008C0",
 "levels": [
  {
   "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0_HS_0_0.png",
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
 "id": "AnimatedImageResource_6FA16C87_7AAC_3E7A_41D1_BE95C7C876CD",
 "levels": [
  {
   "url": "media/panorama_767E9229_7A65_CA89_41DB_9875C9D5F576_0_HS_1_0.png",
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
  "this.Button_D83DE239_F8DE_01A1_41B4_6E9C69515E17",
  "this.Button_52DC85F8_7A9F_C997_41D5_8E53C01AA0FE"
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
  "this.Button_D83F2239_F8DE_01A1_41D9_732F6E60A6E7",
  "this.Button_530531E4_7A9C_49BE_41B0_B527C8C29F33"
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
 "click": "this.mainPlayList.set('selectedIndex', 40)",
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
 "id": "Button_52DC85F8_7A9F_C997_41D5_8E53C01AA0FE",
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
 "click": "this.mainPlayList.set('selectedIndex', 13)",
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
 "label": "10 April 2026",
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
 "click": "this.mainPlayList.set('selectedIndex', 52)",
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
 "click": "this.mainPlayList.set('selectedIndex', 28)",
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
 "id": "Button_530531E4_7A9C_49BE_41B0_B527C8C29F33",
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
 "label": "10 April 2026",
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
 "mode": "push",
 "click": "this.openLink('https://www.instagram.com/pjkp_kipp1a?igsh=MXE0NjBhbjdqYzVnaw==', '_blank')",
 "paddingTop": 0,
 "height": 44,
 "shadow": false,
 "paddingBottom": 0,
 "rollOverIconURL": "skin/IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112_rollover.png",
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_D83C5239_F8DE_01A1_41DD_A1EA905A1112_pressed.png",
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
 "mode": "push",
 "paddingTop": 0,
 "height": 50,
 "shadow": false,
 "paddingBottom": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_D83C3239_F8DE_01A1_41E4_0C0F3B4477E1_pressed.png",
 "visible": false,
 "data": {
  "name": "IconButton --"
 },
 "cursor": "hand",
 "maxWidth": 101
}],
 "backgroundPreloadEnabled": true,
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
