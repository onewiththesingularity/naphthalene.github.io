// Generated by CoffeeScript 1.9.2
var Button, ButtonGroup, CardImage, Col, CommunityCards, ConnectedPlayers, DropdownButton, Grid, Input, Jumbotron, Label, ListGroup, ListGroupItem, MainState, MenuItem, Nav, NavItem, Navbar, PageHeader, Panel, Row, Table, WaitingForPlayers, displayText, table;

DropdownButton = ReactBootstrap.DropdownButton;

ListGroupItem = ReactBootstrap.ListGroupItem;

ButtonGroup = ReactBootstrap.ButtonGroup;

PageHeader = ReactBootstrap.PageHeader;

Jumbotron = ReactBootstrap.Jumbotron;

ListGroup = ReactBootstrap.ListGroup;

MenuItem = ReactBootstrap.MenuItem;

NavItem = ReactBootstrap.NavItem;

Button = ReactBootstrap.Button;

Navbar = ReactBootstrap.Navbar;

Input = ReactBootstrap.Input;

Table = ReactBootstrap.Table;

Label = ReactBootstrap.Label;

Panel = ReactBootstrap.Panel;

Grid = ReactBootstrap.Grid;

Row = ReactBootstrap.Row;

Col = ReactBootstrap.Col;

Nav = ReactBootstrap.Nav;

CardImage = React.createClass({
  render: function() {
    if (this.props.card === null) {
      return React.createElement("h3", null, " NO CARD ");
    } else {
      return React.createElement("object", {
        "data": '/images/' + (this.props.card[1] === "H" ? "Hearts" : (this.props.card[1] === "S" ? "Spades" : (this.props.card[1] === "C" ? "Clubs" : (this.props.card[1] === "D" ? "Diamonds" : void 0)))) + "/" + this.props.card + '.svg',
        "type": "image/svg+xml",
        "width": "100px",
        "className": this.props.className
      });
    }
  }
});

CommunityCards = React.createClass({
  render: function() {
    return React.createElement("ul", {
      "className": "list-inline"
    }, React.createElement("li", null, React.createElement(CardImage, {
      "card": this.props.cards.flop[0]
    })), React.createElement("li", null, React.createElement(CardImage, {
      "card": this.props.cards.flop[1]
    })), React.createElement("li", null, React.createElement(CardImage, {
      "card": this.props.cards.flop[2]
    })), React.createElement("li", null, React.createElement(CardImage, {
      "card": this.props.cards.turn
    })), React.createElement("li", null, React.createElement(CardImage, {
      "card": this.props.cards.river
    })));
  }
});

ConnectedPlayers = React.createClass({
  render: function() {
    return React.createElement(Panel, {
      "header": "Connected players"
    }, React.createElement(Table, {
      "striped": true,
      "bordered": true,
      "condensed": true
    }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "ID"), React.createElement("th", null, "name"))), this.props.players.map(function(p) {
      return React.createElement("tr", null, React.createElement("td", null, p.id), React.createElement("td", null, p.name));
    })));
  }
});

WaitingForPlayers = React.createClass({
  handleMessage: function(tbl, sender, msg) {
    if (msg.action === "start") {
      window.messageBus.broadcast(JSON.stringify({
        status: "start",
        data: msg.data
      }));
      return table.setState('main', {});
    }
  },
  getInitialState: function() {
    return {
      players: []
    };
  },
  render: function() {
    return React.createElement("div", null, React.createElement(Grid, {
      "id": "game-grid"
    }, React.createElement(Row, {
      "id": "row-game-main",
      "className": "row-centered"
    }, React.createElement(Col, {
      "xs": 8.,
      "md": 8.,
      "lg": 6.
    }, React.createElement("h3", null, "Waiting for players to join...")), React.createElement(Col, {
      "xs": 3.,
      "md": 3.,
      "lg": 3.,
      "xsoffset": 2.,
      "mdoffset": 3.,
      "lgoffset": 4.
    }, React.createElement(ConnectedPlayers, {
      "players": this.state.players
    })))));
  }
});

MainState = React.createClass({
  handleMessage: function(tbl, sender, msg) {
    return {};
  },
  generateSortedDeck: function() {
    var c, cards, i, len, results, s, suits;
    suits = ["H", "D", "S", "C"];
    cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    results = [];
    for (i = 0, len = suits.length; i < len; i++) {
      s = suits[i];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (j = 0, len1 = cards.length; j < len1; j++) {
          c = cards[j];
          results1.push(s + c);
        }
        return results1;
      })());
    }
    return results;
  },
  shuffle: function(cards) {
    var counter, index, temp;
    counter = cards.length;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = cards[counter];
      cards[counter] = cards[index];
      cards[index] = temp;
    }
    return cards;
  },
  getInitialState: function() {
    return {
      community: "preflop",
      communityCards: {
        flop: ["AH", "4D", "8H"],
        turn: "7S",
        river: "8C"
      },
      players: table.players,
      dealer: table.players[Math.floor(Math.random() * table.players.length)],
      deck: this.shuffle(this.generateSortedDeck()),
      hand: 1
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "vertical-center"
    }, React.createElement(CommunityCards, {
      "cards": this.state.communityCards
    }));
  }
});

table = {
  state: null,
  prevState: null,
  container: null,
  players: [],
  state_data: null,
  host: null,
  states: {
    init: WaitingForPlayers,
    main: MainState
  },
  handleMessage: function(sender, m) {
    var host_msg, i, len, p, reconnect, ref;
    switch (m.action) {
      case "join":
        if (this.state === "init") {
          reconnect = false;
          ref = this.players;
          for (i = 0, len = ref.length; i < len; i++) {
            p = ref[i];
            if (p.name === m.data.name && p.id.split(':')[0] === sender.split(':')[0]) {
              console.log("Reconnecting user " + p.name);
              reconnect = true;
              if (this.host === p.name) {
                host_msg = {
                  status: "host",
                  data: {}
                };
                window.messageBus.send(sender, JSON.stringify(host_msg));
              }
            }
          }
          if (!reconnect) {
            if (this.players.length === 0) {
              console.log("First person joined: " + m.data.name);
              this.host = m.data.name;
              host_msg = {
                status: "host",
                data: {}
              };
              window.messageBus.send(sender, JSON.stringify(host_msg));
            }
            this.players.push({
              name: m.data.name,
              id: sender
            });
            console.log(this.players);
            return this.container.setState({
              players: this.players
            });
          }
        } else {
          return console.error("Cannot join once game has begun!");
        }
        break;
      default:
        return this.container.handleMessage(this, sender, m);
    }
  },
  setState: function(state_name, state_data) {
    if (this.state === state_name && this.container !== null) {
      displayText("Updating state: " + state_data);
      return this.container.setProps(state_data);
    } else {
      displayText("Setting state to: " + state_name);
      this.prevState = this.state;
      this.state = state_name;
      return this.container = React.render(React.createElement(this.states[state_name], state_data), document.getElementById('content'));
    }
  }
};

window.onload = function() {
  cast.receiver.logger.setLevelValue(0);
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  if (typeof console !== "undefined") {
    if (typeof console.log !== 'undefined') {
      console.olog = console.log;
    } else {
      console.olog = function() {
        return {};
      };
    }
  }
  console.log = function(message) {
    console.olog(message);
    return displayText(message);
  };
  console.error = console.debug = console.info = console.log;
  console.log('Starting Receiver Manager');
  table.setState('init', {});
  castReceiverManager.onReady = function(event) {
    console.log('Received Ready event: ' + JSON.stringify(event.data));
    return window.castReceiverManager.setApplicationState("Application status is ready...");
  };
  castReceiverManager.onSenderConnected = function(event) {
    console.log('Received Sender Connected event: ' + event.data);
    return console.log(window.castReceiverManager.getSender(event.datxa).userAgent);
  };
  castReceiverManager.onSenderDisconnected = function(event) {
    console.log('Received Sender Disconnected event: ' + event.data);
    if (window.castReceiverManager.getSenders().length === 0) {
      return window.close();
    }
  };
  castReceiverManager.onSystemVolumeChanged = function(event) {
    return console.log('Received System Volume Changed event: ' + event.data.level + ' ' + event.data.muted);
  };
  window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:sadikov.apps.pokair');
  window.messageBus.onMessage = function(event) {
    console.log('Message [' + event.senderId + ']: ' + event.data);
    return table.handleMessage(event.senderId, JSON.parse(event.data));
  };
  window.castReceiverManager.start({
    statusText: "Application is starting"
  });
  return console.log('Receiver Manager started');
};

displayText = function(text) {
  var dw;
  dw = document.getElementById("message");
  dw.innerHTML += '\n' + text;
  return dw.scrollTop = dw.scrollHeight;
};
