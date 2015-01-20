(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function() {
  cast.receiver.logger.setLevelValue(0);
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  console.log('Starting Receiver Manager');
  displayText('Starting Receiver Manager');

  // handler for the 'ready' event
  castReceiverManager.onReady = function(event) {
    // Ready to create games
    console.log('Received Ready event: ' + JSON.stringify(event.data));
    window.castReceiverManager.setApplicationState("Application status is ready...");
    displayText('Received Ready event: ' + JSON.stringify(event.data));
  };

  // handler for 'senderconnected' event
  castReceiverManager.onSenderConnected = function(event) {
    // TODO New player joining. Initiate buy-in on the client side.
    // NOTE Buy-in is typically:
    //        - 10x high limit
    //        - 20x big blind for no-limit games
    // If it is the only player, then make him the table owner
    console.log('Received Sender Connected event: ' + event.data);
    console.log(window.castReceiverManager.getSender(event.data).userAgent);
    displayText('Received Sender Connected event: ' + event.data);
  };

  // handler for 'senderdisconnected' event
  castReceiverManager.onSenderDisconnected = function(event) {
    // TODO
    // Player left the table. Allow that specific person to rejoin
    // Possibly keep their session in case their network died
    // What happens to their bid/pot contribution if we're in a
    // game?
    console.log('Received Sender Disconnected event: ' + event.data);
    if (window.castReceiverManager.getSenders().length === 0) {
      window.close();
    }
    displayText('Received Sender Disconnected event: ' + event.data);
  };

  // handler for 'systemvolumechanged' event
  castReceiverManager.onSystemVolumeChanged = function(event) {
    console.log('Received System Volume Changed event: ' + event.data.level + ' ' +
                event.data.muted);
    // REVIEW likely don't need to handle this for MVP, since
    // there will be nothing to really play
  };

  // create a CastMessageBus to handle messages for a custom namespace
  window.messageBus =
  window.castReceiverManager.getCastMessageBus(
    'urn:x-cast:sadikov.apps.pokair');

  // handler for the CastMessageBus message event
  window.messageBus.onMessage = function(event) {
    // TODO define message types valid during different
    // even.data will be a json object that:
    // 1. Confirms the client knows the current STATE
    //    by sending the game state info.
    // 2. Uses the senderId to confirm the correct player is
    //    playing on this turn. Any other clients that try to make
    //    a move while its the turn of someone else will get
    //    dropped, rejected with error ID + message
    // 3. Includes a payload specific to the current STATE
    console.log('Message [' + event.senderId + ']: ' +
                event.data);

    // display the message from the sender
    // TODO replace this with a call to update the state or
    // substate
    displayText(event.data);
    // inform all senders on the CastMessageBus of the incoming message event
    // sender message listener will be invoked

    // TODO Instead here send out the new state to all of the
    // clients.
    window.messageBus.send(event.senderId, event.data);

    // Make POST requests

    // RECEIVER STATES
    // Allow for state mixins for exceptions.
    // Allow for substates
    // *Use a state mixin for each different "Betting" type

    // - Pre Game configuration. Use this time to change table
    //   settings. Should be able to do this at almost any point
    //   in time, but need to be smart about it - maybe use a
    //   majority vote to all the other players at the table.

    // & If someone joins after a round is played before the
    // pre-flop bets are placed, then add this player's turn to
    // the end of the list and deal them two cards. Withdraw their
    // ante and add it to the pot

    // - Deck Shuffle + Card dealing

    // - Flop

    // - Flop Betting*

    // - Turn

    // - Turn Betting*

    // - River

    // - River Betting*

    // - Showdown
  };

  // initialize the CastReceiverManager with an application status message
  window.castReceiverManager.start({statusText: "Application is starting"});
  console.log('Receiver Manager started');
};

// utility function to display the text message in the input field
function displayText(text) {
  var dw = document.getElementById("message");
  dw.innerHTML += '\n' + text;
  window.castReceiverManager.setApplicationState(text);
}

},{}]},{},[1]);