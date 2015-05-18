// Generated by CoffeeScript 1.9.2
var Button, ButtonGroup, CardImage, Col, DropdownButton, GameNavigation, Grid, Hand, HostConfigState, InitializingState, Input, JoinedState, Jumbotron, Label, ListGroup, ListGroupItem, MainState, MenuItem, Nav, NavItem, Navbar, PageHeader, Panel, PlayerOverview, Pot, Row, Turn, UsernameInput, WagerActions, WaitingForPlayersState, appendMessage, applicationID, client, initializeCastApi, namespace, onError, onInitSuccess, onStopAppSuccess, onSuccess, receiverListener, receiverMessage, sendMessage, session, sessionListener, sessionUpdateListener, stopApp, transcribe;

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
      "data": '/images/' + (this.props.card[1] === "H" ? "Hearts" : (this.props.card[1] === "S" ? "Spades" : (this.props.card[1] === "C" ? "Clubs" : (this.props.card[1] === "D" ? "Diamonds" : void 0)))) + "/" + this.props.card + '.svg',
      "type": "image/svg+xml",
      "className": this.props.className
    });
  }
});

Hand = React.createClass({
  render: function() {
    return React.createElement("div", {
      "id": "card-container"
    }, this.props.hand.map(function(card, i, _) {
      return React.createElement("div", {
        "id": "card-" + (i === 0 ? "left" : "right")
      }, React.createElement(CardImage, {
        "card": card
      }));
    }));
  }
});

WagerActions = React.createClass({
  render: function() {
    return React.createElement(ButtonGroup, {
      "className": "btn-group-vertical"
    }, React.createElement(Button, {
      "bsStyle": "primary",
      "bsSize": "large"
    }, "Call"), React.createElement(DropdownButton, {
      "bsStyle": "warning",
      "bsSize": "large",
      "title": "Raise..."
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
      "bsSize": "large"
    }, "Fold"), React.createElement(Button, {
      "bsStyle": "default",
      "bsSize": "large"
    }, "Show\x2FHide Cards"));
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
      "bsStyle": "success"
    }, "Mine")));
  }
});

GameNavigation = React.createClass({
  handleSelect: function(key) {
    if (key === 2) {
      client.setState('help', {});
    }
    if (client.state === 'help' && key !== 2) {
      return client.setState(client.prevState);
    }
  },
  render: function() {
    return React.createElement(Navbar, {
      "className": "navbar"
    }, React.createElement(Nav, {
      "onSelect": this.handleSelect
    }, React.createElement(NavItem, {
      "href": "#",
      "eventkey": 1.
    }, "Texas Holdem"), React.createElement(NavItem, {
      "href": "../poker/help.html",
      "eventKey": 2.
    }, "Help")));
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
    return localStorage["username"] = this.state.value;
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

PlayerOverview = React.createClass({
  render: function() {
    return React.createElement(Panel, {
      "header": "Connected players"
    }, React.createElement(ListGroup, null, this.props.players.map(function(name) {
      return React.createElement(ListGroupItem, {
        "key": name
      }, name);
    })));
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
    }, React.createElement(UsernameInput, null)), React.createElement(Col, {
      "xs": 4.,
      "md": 4.,
      "lg": 4.
    }, React.createElement(PlayerOverview, {
      "players": this.props.players
    })))));
  }
});

HostConfigState = React.createClass({
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
    }, React.createElement("h3", null, "You are the host. Please configure the table"), "Confirm using the button below once all players have joined"))));
  }
});

WaitingForPlayersState = React.createClass({
  handleMessage: function(cli, msg) {
    if (msg.status === "host") {
      return client.setState("host", {});
    } else {
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
    }, React.createElement("h3", null, "Waiting for additional players or for the host to start the game!")))));
  }
});

MainState = React.createClass({
  handleMessage: function(cli, msg) {
    return {};
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
    }, (this.props.hand ? React.createElement(Hand, {
      "hand": this.props.hand
    }) : null)), React.createElement(Col, {
      "xs": 3.,
      "md": 3.,
      "lg": 3.,
      "xsoffset": 2.,
      "mdoffset": 3.,
      "lgoffset": 4.
    }, React.createElement(Row, null, React.createElement(Turn, null), React.createElement("h3", null, "Remaining ", React.createElement(Label, null, "$", this.props.remaining)), React.createElement(WagerActions, null))))));
  }
});

client = {
  state: null,
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
    console.log("Received message from receiver");
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
  return client.handleMessage(message);
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
