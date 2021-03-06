// Generated by CoffeeScript 1.9.2
var Bid, Button, ButtonGroup, CardImage, Col, DropdownButton, GameNavigation, Grid, Hand, HostConfigState, InitializingState, Input, JoinedState, Jumbotron, Label, ListGroup, ListGroupItem, MainState, MenuItem, Nav, NavItem, Navbar, PageHeader, Panel, Pot, Row, Turn, UsernameInput, WagerActions, WaitingForPlayersState, appendMessage, applicationID, client, initializeCastApi, namespace, onError, onInitSuccess, onStopAppSuccess, onSuccess, receiverListener, receiverMessage, sendMessage, session, sessionListener, sessionUpdateListener, stopApp, transcribe;

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

Label = ReactBootstrap.Label;

Panel = ReactBootstrap.Panel;

Grid = ReactBootstrap.Grid;

Row = ReactBootstrap.Row;

Col = ReactBootstrap.Col;

Nav = ReactBootstrap.Nav;

CardImage = React.createClass({
  render: function() {
    return React.createElement("object", {
      "data": (!this.props.card ? '/images/card_outline.svg' : !this.props.handVisible ? '/images/card_back.svg' : '/images/' + (this.props.card[this.props.card.length - 1] === "H" ? "Hearts" : (this.props.card[this.props.card.length - 1] === "S" ? "Spades" : (this.props.card[this.props.card.length - 1] === "C" ? "Clubs" : (this.props.card[this.props.card.length - 1] === "D" ? "Diamonds" : void 0)))) + "/" + this.props.card + '.svg'),
      "type": "image/svg+xml",
      "width": "290",
      "className": this.props.className
    });
  }
});

Hand = React.createClass({
  render: function() {
    var handVisible;
    handVisible = this.props.handVisible;
    return React.createElement("div", {
      "id": "card-container"
    }, this.props.hand.map(function(card, i, _) {
      return React.createElement("div", {
        "id": "card-" + (i === 0 ? "left" : "right")
      }, React.createElement(CardImage, {
        "card": card,
        "handVisible": handVisible
      }));
    }));
  }
});

WagerActions = React.createClass({
  render: function() {
    var buttonsDisabled;
    buttonsDisabled = this.props.turn !== client.name || this.props.fold;
    return React.createElement(ButtonGroup, {
      "className": "btn-group-vertical"
    }, React.createElement(Button, {
      "bsStyle": "primary",
      "bsSize": "large",
      "disabled": buttonsDisabled
    }, "Call"), React.createElement(DropdownButton, {
      "bsStyle": "warning",
      "bsSize": "large",
      "title": "Raise...",
      "disabled": buttonsDisabled
    }, React.createElement(MenuItem, {
      "eventKey": "1"
    }, "$5"), React.createElement(MenuItem, {
      "eventKey": "2"
    }, "$10"), React.createElement(MenuItem, {
      "eventKey": "3"
    }, "$25"), React.createElement(MenuItem, {
      "eventKey": "4"
    }, "$50"), React.createElement(MenuItem, {
      "divider": true
    }), React.createElement(MenuItem, {
      "eventKey": "4"
    }, "Enter")), React.createElement(Button, {
      "bsStyle": "danger",
      "bsSize": "large",
      "onClick": this.props.onFold,
      "disabled": buttonsDisabled
    }, "Fold"), React.createElement(Button, {
      "bsStyle": "default",
      "bsSize": "large",
      "onClick": this.props.toggleCards
    }, (this.props.handVisible ? "Hide Cards" : "Show Cards")));
  }
});

Pot = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "pot"
    }, React.createElement("h3", null, "Pot: ", React.createElement(Label, null, "$", this.props.amount)));
  }
});

Turn = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "turn-indicator"
    }, React.createElement("h3", null, "Turn: ", React.createElement(Label, {
      "bsStyle": (this.props.turn === client.name ? "success" : "default")
    }, this.props.turn)));
  }
});

Bid = React.createClass({
  render: function() {
    return React.createElement("div", {
      "className": "bid-indicator"
    }, React.createElement("h3", null, "My Bid: ", React.createElement(Label, {
      "bsStyle": (this.props.fold ? "default" : "warning")
    }, (this.props.fold ? "Fold" : "$" + this.props.bid))));
  }
});

GameNavigation = React.createClass({
  render: function() {
    return React.createElement(Navbar, {
      "className": "navbar",
      "brand": "Texas Holdem"
    }, React.createElement(Nav, null, (client.name ? React.createElement(NavItem, {
      "href": "#"
    }, "You are: " + client.name) : void 0)));
  }
});

UsernameInput = React.createClass({
  getInitialState: function() {
    var stored_name;
    stored_name = localStorage["username"];
    if (stored_name === null) {
      return {
        value: ""
      };
    } else {
      return {
        value: stored_name
      };
    }
  },
  handleChange: function() {
    return this.setState({
      value: this.refs.uname_input.getValue()
    });
  },
  onSubmit: function() {
    sendMessage({
      action: "join",
      data: {
        name: this.state.value
      }
    });
    localStorage["username"] = this.state.value;
    client.name = this.state.value;
    return client.setState("waiting", {});
  },
  render: function() {
    return React.createElement(Panel, {
      "header": "Enter username"
    }, React.createElement(Input, {
      "type": "text",
      "value": this.state.value,
      "placeholder": this.state.value,
      "ref": "uname_input",
      "onChange": this.handleChange
    }), React.createElement(Button, {
      "bsStyle": "primary",
      "bsSize": "large",
      "onClick": this.onSubmit
    }, "Join Table"));
  }
});

InitializingState = React.createClass({
  handleMessage: function(cli, msg) {
    return {};
  },
  render: function() {
    return React.createElement("div", null, React.createElement(GameNavigation, null), React.createElement(Grid, null, React.createElement(Row, null, React.createElement(Col, {
      "xs": 6.,
      "md": 6.,
      "lg": 6.,
      "xsoffset": 4.,
      "mdoffset": 4.,
      "lgoffset": 4.
    }, React.createElement("h3", null, " Please connect to the chromecast "), React.createElement("p", null, React.createElement(Button, {
      "bsStyle": "primary",
      "bsSize": "large"
    }, "Connect via the ", React.createElement("img", {
      "src": "/images/casticon.on.png",
      "id": "casticon",
      "width": "30"
    }), " button in your toolbar"))))));
  }
});

JoinedState = React.createClass({
  handleMessage: function(cli, msg) {
    return {};
  },
  render: function() {
    return React.createElement("div", null, React.createElement(GameNavigation, null), React.createElement(Grid, null, React.createElement(Row, null, React.createElement(Col, {
      "xs": 4.,
      "md": 4.,
      "lg": 4.,
      "xsoffset": 8.,
      "mdoffset": 8.,
      "lgoffset": 8.
    }, React.createElement(UsernameInput, null)))));
  }
});

HostConfigState = React.createClass({
  handleMessage: function(cli, msg) {
    return {};
  },
  onSubmit: function() {
    sendMessage({
      action: "start",
      data: {}
    });
    return client.setState("main", {
      initialRemaining: 1000
    });
  },
  render: function() {
    return React.createElement("div", null, React.createElement(GameNavigation, null), React.createElement(Grid, null, React.createElement(Row, null, React.createElement(Col, {
      "xs": 8.,
      "md": 8.,
      "lg": 8.,
      "xsoffset": 4.,
      "mdoffset": 4.,
      "lgoffset": 4.
    }, React.createElement("h3", null, "You are the host. Please configure the table"), React.createElement("h3", null, "Confirm using the button below once all players have joined"))), React.createElement(Button, {
      "bsStyle": "primary",
      "bsSize": "large",
      "onClick": this.onSubmit
    }, "Done")));
  }
});

WaitingForPlayersState = React.createClass({
  handleMessage: function(cli, msg) {
    switch (msg.status) {
      case "host":
        return client.setState("host", {});
      case "start":
        return client.setState("main", {
          initialRemaining: 1000
        });
      default:
        return console.log("Unrecognized status received: " + msg.status);
    }
  },
  render: function() {
    return React.createElement("div", null, React.createElement(GameNavigation, null), React.createElement(Grid, null, React.createElement(Row, null, React.createElement(Col, {
      "xs": 4.,
      "md": 4.,
      "lg": 4.,
      "xsoffset": 8.,
      "mdoffset": 8.,
      "lgoffset": 8.
    }, React.createElement("h3", null, "Waiting for additional players or\nfor the host to start the game!")))));
  }
});

MainState = React.createClass({
  handleMessage: function(cli, msg) {
    switch (msg.status) {
      case "deal":
        return this.setState(msg.data);
      case "turn":
        return this.setState(msg.data);
    }
  },
  onFold: function() {
    this.setState({
      fold: true
    });
    return sendMessage({
      action: "fold",
      data: {}
    });
  },
  onCall: function() {
    return this.setState();
  },
  toggleCards: function() {
    return this.setState({
      handVisible: !this.state.handVisible
    });
  },
  getInitialState: function() {
    return {
      hand: [null, null],
      handVisible: false,
      fold: false,
      bid: 0,
      remaining: this.props.initialRemaining,
      turn: null
    };
  },
  render: function() {
    return React.createElement("div", null, React.createElement(GameNavigation, null), React.createElement(Grid, {
      "id": "game-grid"
    }, React.createElement(Row, {
      "id": "row-game-main",
      "className": "row-centered"
    }, React.createElement(Col, {
      "xs": 8.,
      "md": 8.,
      "lg": 6.
    }, (this.state.fold ? React.createElement("h3", null, "You have folded") : this.state.hand ? React.createElement(Hand, {
      "hand": this.state.hand,
      "handVisible": this.state.handVisible
    }) : null)), React.createElement(Col, {
      "xs": 3.,
      "md": 3.,
      "lg": 3.,
      "xsoffset": 2.,
      "mdoffset": 3.,
      "lgoffset": 4.
    }, React.createElement(Row, null, React.createElement(Turn, {
      "turn": this.state.turn
    }), React.createElement(Bid, {
      "fold": this.state.fold,
      "bid": this.state.bid
    }), React.createElement("h3", null, "Remaining ", React.createElement(Label, null, "$", this.state.remaining)), React.createElement(WagerActions, {
      "turn": this.state.turn,
      "toggleCards": this.toggleCards,
      "onFold": this.onFold,
      "fold": this.state.fold,
      "handVisible": this.state.handVisible
    }))))));
  }
});

client = {
  state: null,
  name: null,
  prevState: null,
  container: null,
  state_data: null,
  states: {
    main: MainState,
    host: HostConfigState,
    joined: JoinedState,
    waiting: WaitingForPlayersState,
    initializing: InitializingState
  },
  handleMessage: function(m) {
    return this.container.handleMessage(this, m);
  },
  setState: function(state_name, state_data) {
    if (this.state === state_name && this.container !== null) {
      console.log("Updating state: " + state_data);
      return this.container.setProps(state_data);
    } else {
      this.prevState = this.state;
      this.state = state_name;
      return this.container = React.render(React.createElement(this.states[state_name], state_data), document.getElementById('content'));
    }
  }
};

applicationID = '409AB6BB';

namespace = 'urn:x-cast:sadikov.apps.pokair';

session = null;

initializeCastApi = function() {
  var apiConfig, sessionRequest;
  sessionRequest = new chrome.cast.SessionRequest(applicationID);
  apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
  return chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

onInitSuccess = function() {
  appendMessage("onInitSuccess");
  return client.setState("initializing", {});
};

onError = function(message) {
  return appendMessage("onError: " + JSON.stringify(message));
};

onSuccess = function(message) {
  return appendMessage("onSuccess: " + message);
};

onStopAppSuccess = function() {
  return appendMessage('onStopAppSuccess');
};

sessionListener = function(e) {
  appendMessage('New session ID:' + e.sessionId);
  e.sessionId;
  session = e;
  session.addUpdateListener(sessionUpdateListener);
  session.addMessageListener(namespace, receiverMessage);
  return client.setState('joined', {
    players: ['nan']
  });
};

sessionUpdateListener = function(isAlive) {
  var message;
  message = isAlive ? 'Session Updated' : 'Session Removed';
  message += ': ' + session.sessionId;
  appendMessage(message);
  if (!isAlive) {
    session = null;
    return client.setState("initializing");
  }
};

receiverMessage = function(namespace, message) {
  appendMessage("receiverMessage: " + namespace + ", " + message);
  return client.handleMessage(JSON.parse(message));
};

receiverListener = function(e) {
  if (e === 'available') {
    return appendMessage("receiver found");
  } else {
    return appendMessage("receiver list empty");
  }
};

stopApp = function() {
  return session.stop(onStopAppSuccess, onError);
};

sendMessage = function(message) {
  if (session !== null) {
    return session.sendMessage(namespace, message, onSuccess.bind(this, "Message sent: " + message), onError);
  } else {
    onSuccess = function(e) {
      session = e;
      return session.sendMessage(namespace, message, onSuccess.bind(this, "Message sent: " + message), onError);
    };
    return chrome.cast.requestSession(onSuccess, onError);
  }
};

appendMessage = function(message) {
  var dw, time;
  time = new Date();
  message = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "  " + message;
  console.log(message);
  dw = document.getElementById("debugmessage");
  return dw.innerHTML += '\n' + JSON.stringify(message);
};

transcribe = function(words) {
  return sendMessage(words);
};

if (!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}
