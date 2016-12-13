"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadForm = function (_React$Component) {
  _inherits(UploadForm, _React$Component);

  function UploadForm(props) {
    _classCallCheck(this, UploadForm);

    var _this = _possibleConstructorReturn(this, (UploadForm.__proto__ || Object.getPrototypeOf(UploadForm)).call(this, props));

    _this.state = {
      file: null
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleConfInputChange = _this.handleConfInputChange.bind(_this);
    _this.handleSupInputChange = _this.handleSupInputChange.bind(_this);
    _this.handleConfBlur = _this.handleConfBlur.bind(_this);
    _this.handleSupBlur = _this.handleSupBlur.bind(_this);
    return _this;
  }

  _createClass(UploadForm, [{
    key: "handleFileChange",
    value: function handleFileChange(event) {
      var _this2 = this;

      event.preventDefault();
      var reader = new FileReader();
      var file = event.target.files[0];

      reader.onloadend = function () {
        _this2.setState({
          file: file,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }, {
    key: "triggerChooseFile",
    value: function triggerChooseFile(event) {
      event.preventDefault();
      document.getElementsByClassName('file-input')[0].click();
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.onSubmit(this.state.file);
    }
  }, {
    key: "handleConfInputChange",
    value: function handleConfInputChange(event) {
      this.props.onConfInputChange(event.target.value);
    }
  }, {
    key: "handleSupInputChange",
    value: function handleSupInputChange(event) {
      this.props.onSupInputChange(event.target.value);
    }
  }, {
    key: "handleConfBlur",
    value: function handleConfBlur(event) {
      this.props.onConfBlur(event.target.value);
    }
  }, {
    key: "handleSupBlur",
    value: function handleSupBlur(event) {
      this.props.onSupBlur(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "upload-form" },
        React.createElement(
          "h2",
          null,
          "Upload your CSV"
        ),
        React.createElement(
          "div",
          { className: "jumbotron" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-sm-12" },
              React.createElement(
                "div",
                { className: "alert alert-warning text-left " + (this.props.status ? '' : 'hidden') + (this.props.status === 'Choose a file to upload' && this.state.fileName ? 'hidden' : '') },
                this.props.status
              ),
              React.createElement(
                "div",
                { className: "col-sm-3" },
                React.createElement(
                  "button",
                  { className: "choose-file btn btn-default btn-md", onClick: function onClick(event) {
                      return _this3.triggerChooseFile(event);
                    } },
                  "Choose CSV"
                ),
                this.state.fileName
              ),
              React.createElement(
                "div",
                { className: "col-sm-6" },
                React.createElement(
                  "label",
                  { "data-toggle": "tooltip", title: "Float value of 0 - 1 inclusive" },
                  "Minimum support ",
                  React.createElement(
                    "span",
                    { className: "badge" },
                    "?"
                  )
                ),
                React.createElement("br", null),
                React.createElement("input", { min: "0", max: "1", step: "0.1", placeholder: "0.0000 - 1", type: "number", value: this.props.minSupport, onBlur: function onBlur(event) {
                    return _this3.handleSupBlur(event);
                  }, onChange: function onChange(event) {
                    return _this3.handleSupInputChange(event);
                  } }),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                  "label",
                  { "data-toggle": "tooltip", title: "Float value of 0 - 1 inclusive" },
                  "Minimum confidence ",
                  React.createElement(
                    "span",
                    { className: "badge" },
                    "?"
                  )
                ),
                React.createElement("br", null),
                React.createElement("input", { min: "0", max: "1", step: "0.1", placeholder: "0.0000 - 1", type: "number", value: this.props.minConfidence, onBlur: function onBlur(event) {
                    return _this3.handleConfBlur(event);
                  }, onChange: function onChange(event) {
                    return _this3.handleConfInputChange(event);
                  } }),
                React.createElement("br", null),
                React.createElement("br", null)
              ),
              React.createElement(
                "div",
                { className: "col-sm-3" },
                React.createElement(
                  "form",
                  { onSubmit: this.handleSubmit },
                  React.createElement("input", { className: "file-input", accept: ".csv", name: "csv", type: "file", onChange: function onChange(event) {
                      return _this3.handleFileChange(event);
                    } }),
                  React.createElement(
                    "button",
                    { className: "submitButton btn btn-info btn-md ", type: "submit" },
                    "Mine it",
                    React.createElement("i", { className: "upload-indicator" + (this.props.loading ? "loading" : "") })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return UploadForm;
}(React.Component);

var DataTableToggle = function (_React$Component2) {
  _inherits(DataTableToggle, _React$Component2);

  function DataTableToggle(props) {
    _classCallCheck(this, DataTableToggle);

    var _this4 = _possibleConstructorReturn(this, (DataTableToggle.__proto__ || Object.getPrototypeOf(DataTableToggle)).call(this, props));

    _this4.handleChange = _this4.handleChange.bind(_this4);
    return _this4;
  }

  _createClass(DataTableToggle, [{
    key: "handleChange",
    value: function handleChange() {
      // delegate change handling to parent
      this.props.onChange();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "ul",
        { className: "chart-nav nav nav-tabs nav-justified" },
        React.createElement(
          "li",
          { role: "presentation", onClick: function onClick() {
              return _this5.handleChange();
            }, className: this.props.showRules ? 'active' : '' },
          React.createElement(
            "a",
            null,
            "Rules"
          )
        ),
        React.createElement(
          "li",
          { role: "presentation", onClick: function onClick() {
              return _this5.handleChange();
            }, className: this.props.showRules ? '' : 'active' },
          React.createElement(
            "a",
            null,
            "Itemset Support"
          )
        )
      );
    }
  }]);

  return DataTableToggle;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this6 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this6.state = {
      aprioriData: null,
      status: null,
      minConfidence: 0.6,
      minSupport: 0.15
    };
    return _this6;
  }

  _createClass(App, [{
    key: "handleConfInputChange",
    value: function handleConfInputChange(value) {
      // validate and set state to new value
      if (value < 0) {
        this.setState({ 'minConfidence': 0 });
      } else if (value > 1) {
        this.setState({ 'minConfidence': 1 });
      } else if (isNaN(value)) {
        this.setState({ 'status': 'Please enter a numerical value in the range 0 to 1 (inclusive)' });
      } else {
        this.setState({ 'minConfidence': value });
      }
    }
  }, {
    key: "handleSupInputChange",
    value: function handleSupInputChange(value) {
      // validate and set state to new value
      if (value < 0) {
        this.setState({ 'minSupport': 0 });
      } else if (value > 1) {
        this.setState({ 'minSupport': 1 });
      } else if (isNaN(value)) {
        this.setState({ 'status': 'Please enter a numerical value in the range 0 to 1 (inclusive)' });
      } else {
        this.setState({ 'minSupport': value });
      }
    }
  }, {
    key: "handleSupBlur",
    value: function handleSupBlur(value) {
      // set minSupport to default if value is empty
      if (value === "") this.setState({ 'minSupport': 0.15 });
    }
  }, {
    key: "handleConfBlur",
    value: function handleConfBlur(value) {
      // set minConfidence to default if value is empty
      if (value === "") this.setState({ 'minConfidence': 0.6 });
    }
  }, {
    key: "handleChildSubmit",
    value: function handleChildSubmit(file) {
      var that = this;
      var data = new FormData();
      if ((typeof file === "undefined" ? "undefined" : _typeof(file)) != undefined && file != null) {
        data.append('csv', file);
        data.append('minConfidence', this.state.minConfidence);
        data.append('minSupport', this.state.minSupport);
        event.preventDefault();
        this.setState({ 'loading': true });
        $.ajax({
          type: 'POST',
          url: '/mine-csv',
          dataType: "json",
          data: data,
          processData: false,
          contentType: false
        }).done(function (data) {
          that.setState({
            'aprioriData': data,
            'loading': false
          });
        }).fail(function (jqXhr) {
          that.setState({
            'status': 'Sorry, your upload could not be completed. Make sure your file is a CSV under 50MB',
            'loading': false
          });
        });
      } else {
        that.setState({
          'status': 'Choose a file to upload',
          'loading': false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var csvLoaded = this.state.aprioriData == null;

      var uploadEl = React.createElement(UploadForm, {
        status: this.state.status,
        loading: this.state.loading,
        aprioriData: this.state.aprioriData,
        onSubmit: function onSubmit(file) {
          return _this7.handleChildSubmit(file);
        },
        minSupport: this.state.minSupport,
        minConfidence: this.state.minConfidence,
        onSupInputChange: function onSupInputChange(value) {
          return _this7.handleSupInputChange(value);
        },
        onConfInputChange: function onConfInputChange(value) {
          return _this7.handleConfInputChange(value);
        },
        onConfBlur: function onConfBlur(value) {
          return _this7.handleConfBlur(value);
        },
        onSupBlur: function onSupBlur(value) {
          return _this7.handleSupBlur(value);
        }
      });
      var ui = null;
      if (csvLoaded) {
        ui = React.createElement(
          "div",
          null,
          uploadEl
        );
      } else {
        ui = React.createElement(
          "div",
          null,
          uploadEl,
          React.createElement(TableControl, { className: "data-table ", aprioriData: this.state.aprioriData })
        );
      }
      return React.createElement(
        "div",
        null,
        React.createElement(InfoSection, null),
        React.createElement(PreprocessingInstructions, null),
        ui
      );
    }
  }]);

  return App;
}(React.Component);

var InfoSection = function (_React$Component4) {
  _inherits(InfoSection, _React$Component4);

  function InfoSection(props) {
    _classCallCheck(this, InfoSection);

    var _this8 = _possibleConstructorReturn(this, (InfoSection.__proto__ || Object.getPrototypeOf(InfoSection)).call(this, props));

    _this8.state = {
      expanded: false
    };
    return _this8;
  }

  _createClass(InfoSection, [{
    key: "toggleExpanded",
    value: function toggleExpanded() {
      var expanded = !this.state.expanded;
      this.setState({ expanded: true });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "What's association rule learning all about?"
        ),
        React.createElement(
          "div",
          { className: "jumbotron" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-sm-12" },
              React.createElement(
                "p",
                null,
                "Association rule learning is a machine learning method to extract interesting relations between large sets of data items. It was proposed by ",
                React.createElement(
                  "a",
                  { target: "_blank", href: "http://www.rakesh.agrawal-family.com/papers/sigmod93assoc.pdf" },
                  "Agrawal et al"
                ),
                " for use in market basket analysis, a technique used by retailers to understand purchase behavior of customers. In addition to market basket analysis, association rule learning is employed widely in web usage mining, intrusion detection, and bioinformatics."
              ),
              React.createElement(
                "h3",
                null,
                "Example"
              )
            ),
            React.createElement(
              "div",
              { className: "col-sm-6" },
              React.createElement(
                "table",
                { className: "table-striped table-bordered table" },
                React.createElement(
                  "tbody",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      null,
                      "TID"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Items"
                    )
                  ),
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      null,
                      "1"
                    ),
                    React.createElement(
                      "td",
                      null,
                      "Bread, Peanuts, Milk, Jam"
                    )
                  ),
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      null,
                      "2"
                    ),
                    React.createElement(
                      "td",
                      null,
                      "Bread, Jam, Soda, Chips, Milk, Fruit"
                    )
                  ),
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      null,
                      "3"
                    ),
                    React.createElement(
                      "td",
                      null,
                      "Steak, Jam, Soda, Chips, Bread"
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-sm-6" },
              React.createElement(
                "h4",
                null,
                "Rules"
              ),
              React.createElement(
                "code",
                null,
                '{',
                " Bread \u21D2 Milk ",
                '}'
              ),
              React.createElement("br", null),
              React.createElement(
                "code",
                null,
                '{',
                " Soda \u21D2 Chips ",
                '}'
              ),
              React.createElement("br", null),
              React.createElement(
                "code",
                null,
                '{',
                " Bread \u21D2 Jam ",
                '}'
              ),
              React.createElement("br", null),
              React.createElement("br", null)
            ),
            React.createElement(
              "div",
              { className: "col-sm-12 text-right" },
              React.createElement(
                "a",
                { onClick: function onClick() {
                    return _this9.toggleExpanded();
                  }, className: 'text-muted ' + (this.state.expanded ? 'hidden' : ''), href: "#continue", "data-toggle": "collapse" },
                "Continue reading"
              )
            ),
            React.createElement(
              "div",
              { id: "continue", className: "collapse" },
              React.createElement(
                "div",
                { className: "col-sm-12" },
                React.createElement(
                  "p",
                  null,
                  "The best known algorithm for association rule learning is Apriori. Like all other assocation rule learning algorithms, it finds frequent itemsets, which are itemsets that meet the user-specified minimum support  and confidence thresholds. The support count for a rule indicates that the rule holds with support sup in T  % of transactions (the data set) if sup% of the transactions contain X \u222A Y. The confidence level of a rule indicates that the rule holds with confidence conf in T % of transactions if conf% of transactions that contain X also contain Y. In two steps, Apriori first finds all frequent itemsets and then uses those frequent itemsets to generate rules. You can learn more about the details of the algorithm in the ",
                  React.createElement(
                    "a",
                    { href: "http://rakesh.agrawal-family.com/papers/vldb94apriori.pdf" },
                    "Agrawal paper"
                  ),
                  "."
                ),
                React.createElement(
                  "p",
                  null,
                  "I created an API and this client side interface for assocation rule learning because I wanted to apply the method in a real-world domain."
                )
              )
            )
          )
        )
      );
    }
  }]);

  return InfoSection;
}(React.Component);

var PreprocessingInstructions = function (_React$Component5) {
  _inherits(PreprocessingInstructions, _React$Component5);

  function PreprocessingInstructions() {
    _classCallCheck(this, PreprocessingInstructions);

    return _possibleConstructorReturn(this, (PreprocessingInstructions.__proto__ || Object.getPrototypeOf(PreprocessingInstructions)).apply(this, arguments));
  }

  _createClass(PreprocessingInstructions, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          "Get started already: preprocess your data"
        ),
        React.createElement(
          "div",
          { className: "jumbotron" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-sm-12" },
              React.createElement(
                "p",
                null,
                "Each tuple in your CSV should be an itemset in the form of ",
                React.createElement(
                  "code",
                  null,
                  "item a, item b, item c"
                ),
                ". Items in itemsets are expected to be comma delimited, and itemsets should be delimited by newlines. Numerical data isn't very useful for association rule learning, so you should consider discretizing it. Your CSV should not contain a header row."
              ),
              React.createElement(
                "p",
                null,
                React.createElement(
                  "a",
                  { href: "sample-data-tesco.csv" },
                  "Download sample data (CSV)"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PreprocessingInstructions;
}(React.Component);

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var TableControl = function (_React$Component6) {
  _inherits(TableControl, _React$Component6);

  function TableControl() {
    _classCallCheck(this, TableControl);

    var _this11 = _possibleConstructorReturn(this, (TableControl.__proto__ || Object.getPrototypeOf(TableControl)).call(this));

    _this11.state = {
      sorted: { 'bySupport': false, 'byConfidence': 'desc', 'byItemsetSupport': 'desc' },
      showRules: true,
      showItemsets: false
    };
    _this11.sortBySupport = _this11.sortBySupport.bind(_this11);
    _this11.sortByItemsetSupport = _this11.sortByItemsetSupport.bind(_this11);
    _this11.sortByConfidence = _this11.sortByConfidence.bind(_this11);
    _this11.handleChildChange = _this11.handleChildChange.bind(_this11);
    _this11.setSort = _this11.setSort.bind(_this11);
    return _this11;
  }

  _createClass(TableControl, [{
    key: "sortBySupport",
    value: function sortBySupport() {
      if (this.state.sorted.bySupport === 'desc') {
        this.setState({
          rows: this.props.aprioriData.rules.sort(function (a, b) {
            return b.support - a.support;
          })
        });
      } else if (this.state.sorted.bySupport === 'asc') {
        this.setState({
          rows: this.props.aprioriData.rules.sort(function (a, b) {
            return a.support - b.support;
          })
        });
      }
    }
  }, {
    key: "sortByItemsetSupport",
    value: function sortByItemsetSupport() {
      if (this.state.sorted.byItemsetSupport === 'desc') {
        this.setState({
          rows: this.props.aprioriData.itemsets.sort(function (a, b) {
            return b.support - a.support;
          })
        });
      } else if (this.state.sorted.byItemsetSupport === 'asc') {
        this.setState({
          rows: this.props.aprioriData.itemsets.sort(function (a, b) {
            return a.support - b.support;
          })
        });
      }
    }
  }, {
    key: "sortByConfidence",
    value: function sortByConfidence() {
      if (this.state.sorted.byConfidence === 'desc') {
        this.setState({
          rows: this.props.aprioriData.rules.sort(function (a, b) {
            return b.confidence - a.confidence;
          })
        });
      } else if (this.state.sorted.byConfidence === 'asc') {
        this.setState({
          rows: this.props.aprioriData.rules.sort(function (a, b) {
            return a.confidence - b.confidence;
          })
        });
      }
    }
  }, {
    key: "handleChildChange",
    value: function handleChildChange() {
      var showRules = !this.state.showRules;
      var showItemsets = !this.state.showItemsets;
      this.setState({
        showRules: showRules,
        showItemsets: showItemsets
      });
    }
  }, {
    key: "getRuleRow",
    value: function getRuleRow(rowIndex) {
      return this.props.aprioriData.rules[rowIndex];
    }
  }, {
    key: "getItemsetRow",
    value: function getItemsetRow(rowIndex) {
      return this.props.aprioriData.itemsets[rowIndex];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.sortByConfidence();
      this.sortByItemsetSupport();
    }
  }, {
    key: "setSort",
    value: function setSort(column) {
      var _this12 = this;

      if (column === 'itemsetSupport') {
        this.setState({
          sorted: { byItemsetSupport: this.state.sorted.byItemsetSupport === 'asc' ? 'desc' : 'asc', bySupport: this.state.sorted.bySupport, byConfidence: this.state.sorted.byConfidence }
        }, function () {
          _this12.sortByItemsetSupport();
        });
      } else if (column === 'ruleSupport') {
        this.setState({
          sorted: { bySupport: this.state.sorted.bySupport === 'asc' ? 'desc' : 'asc', byConfidence: false, byItemsetSupport: this.state.sorted.byItemsetSupport }
        }, function () {
          _this12.sortBySupport();
        });
      } else if (column === 'ruleConfidence') {
        this.setState({
          sorted: { byConfidence: this.state.sorted.byConfidence === 'asc' ? 'desc' : 'asc', bySupport: false, byItemsetSupport: this.state.sorted.byItemsetSupport }
        }, function () {
          _this12.sortByConfidence();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var width = window.innerWidth - 30 > 680 ? 680 : window.innerWidth - 30;
      if (this.state.showRules) {
        var supportHeaderRenderer = function () {
          return React.createElement(
            "div",
            {
              onClick: this.setSort.bind(this, 'ruleSupport') },
            "Support",
            React.createElement(
              "span",
              { className: this.state.sorted.bySupport === 'asc' ? 'dropup' : 'dropdown' },
              React.createElement("span", { className: "caret" })
            )
          );
        }.bind(this);
        var confidenceHeaderRenderer = function () {

          return React.createElement(
            "div",
            {
              onClick: this.setSort.bind(this, 'ruleConfidence') },
            "Confidence",
            React.createElement(
              "span",
              { className: this.state.sorted.byConfidence === 'asc' ? 'dropup' : 'dropdown' },
              React.createElement("span", { className: "caret" })
            )
          );
        }.bind(this);

        return React.createElement(
          "div",
          null,
          React.createElement(DataTableToggle, { showRules: this.state.showRules, onChange: this.handleChildChange }),
          React.createElement(
            Table,
            {
              className: "data",
              maxHeight: 700,
              width: width,
              rowsCount: this.props.aprioriData.rules.length,
              rowHeight: 50,
              headerHeight: 40,
              rowGetter: this.getRuleRow.bind(this) },
            React.createElement(Column, { dataKey: "yset",
              width: 185,
              flexGrow: 2,
              label: "Set x" }),
            React.createElement(Column, { dataKey: "xset",
              width: 185,
              flexGrow: 1,
              label: "Set y"
            }),
            React.createElement(Column, { dataKey: "support",
              width: 150,
              label: "Support",
              headerRenderer: supportHeaderRenderer
            }),
            React.createElement(Column, { dataKey: "confidence",
              width: 150,
              label: "Confidence",
              headerRenderer: confidenceHeaderRenderer
            })
          )
        );
      } else if (this.state.showItemsets) {
        var supportItemsetHeaderRenderer = function () {
          return React.createElement(
            "div",
            {
              onClick: this.setSort.bind(this, 'itemsetSupport') },
            "Support",
            React.createElement(
              "span",
              { className: this.state.sorted.byItemsetSupport === 'asc' ? 'dropup' : 'dropdown' },
              React.createElement("span", { className: "caret" })
            )
          );
        }.bind(this);
        return React.createElement(
          "div",
          null,
          React.createElement(DataTableToggle, { showRules: this.state.showRules, onChange: this.handleChildChange }),
          React.createElement(
            Table,
            { className: "data-table",
              maxHeight: 700,
              width: width,
              rowsCount: this.props.aprioriData.itemsets.length,
              rowHeight: 50,
              headerHeight: 40,
              rowGetter: this.getItemsetRow.bind(this) },
            React.createElement(Column, { dataKey: "itemset",
              width: 335,
              flexGrow: 2,
              label: "Itemset" }),
            React.createElement(Column, { dataKey: "support",
              width: 335,
              label: "Support",
              headerRenderer: supportItemsetHeaderRenderer
            })
          )
        );
      }
    }
  }]);

  return TableControl;
}(React.Component);

// ReactDOM.render(
//   <TableControl/>,
//   document.getElementById('container')
// );


ReactDOM.render(React.createElement(App, null), document.getElementById('container'));
//# sourceMappingURL=main.js.map
