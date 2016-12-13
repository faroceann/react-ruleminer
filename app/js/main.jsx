class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfInputChange = this.handleConfInputChange.bind(this);
    this.handleSupInputChange = this.handleSupInputChange.bind(this);
    this.handleConfBlur = this.handleConfBlur.bind(this);
    this.handleSupBlur = this.handleSupBlur.bind(this);
  }
  handleFileChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        fileName: file.name,
      });
    }
    reader.readAsDataURL(file)

  }
  triggerChooseFile(event) {
    event.preventDefault();
    document.getElementsByClassName('file-input')[0].click();
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.file);
  }
  handleConfInputChange(event) {
    this.props.onConfInputChange(event.target.value);
  }
  handleSupInputChange(event) {
    this.props.onSupInputChange(event.target.value);
  }
  handleConfBlur(event) {
    this.props.onConfBlur(event.target.value)
  }
  handleSupBlur(event) {
    this.props.onSupBlur(event.target.value)
  }
  render() {
    return (
      <div className="upload-form">
        <h2>Upload your CSV</h2>
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm-12">
              {/* TODO: move file/filename state up to get rid of these confusing ternary expressions */}
              <div className={"alert alert-warning text-left " + (this.props.status ? '': 'hidden') + (this.props.status === 'Choose a file to upload' &&  this.state.fileName ? 'hidden': '') }>
                {this.props.status}
              </div>
              <div className="col-sm-3">
                <button className="choose-file btn btn-default btn-md" onClick={(event) => this.triggerChooseFile(event)}>Choose CSV</button>
                {this.state.fileName}
              </div>
               <div className="col-sm-6">
                <label data-toggle="tooltip" title="Float value of 0 - 1 inclusive">Minimum support <span className="badge">?</span></label><br/>
                <input min="0" max="1" step="0.1" placeholder="0.0000 - 1" type="number" value={this.props.minSupport} onBlur={(event) => this.handleSupBlur(event)} onChange={(event) => this.handleSupInputChange(event)}/><br/><br/>
                <label data-toggle="tooltip" title="Float value of 0 - 1 inclusive">Minimum confidence <span className="badge">?</span></label><br/>
                <input min="0" max="1" step="0.1" placeholder="0.0000 - 1" type="number" value={this.props.minConfidence} onBlur={(event) => this.handleConfBlur(event)} onChange={(event) => this.handleConfInputChange(event)}/>
                <br/><br/>
              </div>
              <div className="col-sm-3">
                <form onSubmit={this.handleSubmit}>
                  <input className="file-input" accept=".csv" name="csv" type="file" onChange={(event) => this.handleFileChange(event)} />
                  <button className="submitButton btn btn-info btn-md " type="submit">
                    Mine it
                    <i className={"upload-indicator" + (this.props.loading ? "loading": "")}></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class DataTableToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    // delegate change handling to parent
    this.props.onChange();
  }
  render() {
    return (
      <ul className="chart-nav nav nav-tabs nav-justified">
        <li role="presentation" onClick={() => this.handleChange()} className={this.props.showRules ? 'active' : ''}><a>Rules</a></li>
        <li role="presentation" onClick={() => this.handleChange()} className={this.props.showRules ? '' : 'active'}><a>Itemset Support</a></li>
      </ul>
    )
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aprioriData: null,
      status: null,
      minConfidence: 0.6,
      minSupport: 0.15
    };
  }
  handleConfInputChange(value) {
    // validate and set state to new value
    if (value < 0) { 
      this.setState({ 'minConfidence': 0})
    } else if (value > 1) { 
      this.setState({ 'minConfidence': 1})
    } else if (isNaN(value) ) {
      this.setState({'status': 'Please enter a numerical value in the range 0 to 1 (inclusive)'});
    } else {
      this.setState({'minConfidence': value})
    }
  }
  handleSupInputChange(value) {
    // validate and set state to new value
    if (value < 0) { 
      this.setState({ 'minSupport': 0})
    } else if (value > 1) {
      this.setState({ 'minSupport': 1})
    } else if (isNaN(value) ) {
      this.setState({'status': 'Please enter a numerical value in the range 0 to 1 (inclusive)'});
    } else {
      this.setState({'minSupport': value})
    }
  }
  handleSupBlur(value) {
    // set minSupport to default if value is empty
    if(value === "")
      this.setState({'minSupport': 0.15})
  }
  handleConfBlur(value) {
    // set minConfidence to default if value is empty
    if(value === "")
      this.setState({'minConfidence': 0.6})
  }
  handleChildSubmit(file) {
    var that = this;
    var data = new FormData();
    if (typeof file != undefined && file != null) {
      data.append('csv', file);
      data.append('minConfidence', this.state.minConfidence);
      data.append('minSupport', this.state.minSupport)
      event.preventDefault();
      this.setState({'loading': true})
      $.ajax({
        type: 'POST',
        url: '/mine-csv',
        dataType: "json",
        data: data,
        processData: false,
        contentType: false,
      })
        .done(function(data) {
          that.setState({
            'aprioriData': data,
            'loading': false
          }); 
        })
        .fail(function(jqXhr) {
          that.setState({
            'status': 'Sorry, your upload could not be completed. Make sure your file is a CSV under 50MB',
            'loading': false
          })
        });
      }
      else {
        that.setState({
          'status': 'Choose a file to upload',
          'loading': false
        })
      }
  }
  render() {
      const csvLoaded = this.state.aprioriData == null;
      
      var uploadEl = <UploadForm 
                      status={this.state.status} 
                      loading={this.state.loading} 
                      aprioriData={this.state.aprioriData} 
                      onSubmit={(file) => this.handleChildSubmit(file)} 
                      minSupport={this.state.minSupport} 
                      minConfidence={this.state.minConfidence} 
                      onSupInputChange={(value) => this.handleSupInputChange(value)} 
                      onConfInputChange={(value) => this.handleConfInputChange(value)}
                      onConfBlur={(value) => this.handleConfBlur(value)}
                      onSupBlur={(value) => this.handleSupBlur(value)}
                      />;
      var ui = null;
      if (csvLoaded) {
        ui = <div>{uploadEl}</div>;
      }
      else {
        ui = <div>{uploadEl}<TableControl className="data-table " aprioriData={this.state.aprioriData}/></div>;
      }
      return (
        <div>
          <InfoSection/>
          <PreprocessingInstructions/> 
          {ui}
           
        </div>
      )
  }
}
class InfoSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  toggleExpanded() {
    let expanded = ! this.state.expanded;
    this.setState({expanded: true})
  }
  render() {
    return (
      <div>
        <h2>What's association rule learning all about?</h2>
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm-12">
              <p>Association rule learning is a machine learning method to extract interesting relations between large sets of data items. 
              It was proposed by <a target="_blank" href="http://www.rakesh.agrawal-family.com/papers/sigmod93assoc.pdf">Agrawal et al</a> for use in market basket analysis, a technique used by retailers to understand purchase behavior of customers.
              In addition to market basket analysis, association rule learning is employed widely in web usage mining, intrusion detection, and bioinformatics. 
              </p>
              <h3>Example</h3>
            </div>
            <div className="col-sm-6">
              <table className="table-striped table-bordered table">
              <tbody>
              <tr>
                <th>TID</th>
                <th>Items</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Bread, Peanuts, Milk, Jam</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bread, Jam, Soda, Chips, Milk, Fruit</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Steak, Jam, Soda, Chips, Bread</td>
              </tr>
              </tbody>
              </table>
            </div>
            <div className="col-sm-6">
                <h4>Rules</h4>
                <code>{'{'} Bread ⇒ Milk {'}'}</code><br/>
                <code>{'{'} Soda ⇒ Chips {'}'}</code><br/>
                <code>{'{'} Bread ⇒ Jam {'}'}</code><br/>
                <br/>
            </div>
            <div className="col-sm-12 text-right">
              <a onClick={() => this.toggleExpanded()} className={'text-muted ' + (this.state.expanded ? 'hidden': '')} href="#continue" data-toggle="collapse">Continue reading</a>
            </div>
            <div id="continue" className="collapse">
              <div className="col-sm-12">
                <p>
                The best known algorithm for association rule learning is Apriori. Like all other assocation rule learning algorithms, it finds frequent itemsets, which are itemsets that meet the user-specified minimum support  and confidence thresholds. The support count for a rule indicates that the rule holds with support sup in T  % of transactions (the data set) if sup% of the transactions contain X ∪ Y. The confidence level of a rule indicates that the rule holds with confidence conf in T % of transactions if conf% of transactions that contain X also contain Y. In two steps, Apriori first finds all frequent itemsets and then uses those frequent itemsets to generate rules. You can learn more about the details of the algorithm in the <a href="http://rakesh.agrawal-family.com/papers/vldb94apriori.pdf">Agrawal paper</a>.
                </p>
                <p>
                I created an API and this client side interface for assocation rule learning because I wanted to apply the method in a real-world domain. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class PreprocessingInstructions extends React.Component {
  render() {
    return (
      <div>
        <h2>Get started already: preprocess your data</h2>
        <div className="jumbotron">
          <div className="row">
            <div className="col-sm-12">
             <p>Each tuple in your CSV should be an itemset in the form of <code>item a, item b, item c</code>. Items in itemsets are expected to be comma delimited, and itemsets should be delimited by newlines. Numerical data isn't very useful for association rule learning, so you should consider discretizing it. Your CSV should not contain a header row.</p>
             <p><a href="sample-data-tesco.csv">Download sample data (CSV)</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
class TableControl extends React.Component {
  constructor() {
    super();
    this.state = {
      sorted: {'bySupport': false, 'byConfidence': 'desc', 'byItemsetSupport': 'desc'},
      showRules: true,
      showItemsets: false
    };
    this.sortBySupport = this.sortBySupport.bind(this);
    this.sortByItemsetSupport = this.sortByItemsetSupport.bind(this);
    this.sortByConfidence = this.sortByConfidence.bind(this);
    this.handleChildChange = this.handleChildChange.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  sortBySupport() {
    if (this.state.sorted.bySupport === 'desc') {
      this.setState({
        rows: this.props.aprioriData.rules.sort(function(a, b) {
          return b.support - a.support 
        })
      });
    } else if (this.state.sorted.bySupport === 'asc') {
      this.setState({
        rows: this.props.aprioriData.rules.sort(function(a, b) {
          return a.support - b.support 
        })
      });
    }
  }
  sortByItemsetSupport() {
    if (this.state.sorted.byItemsetSupport === 'desc') {
      this.setState({
        rows: this.props.aprioriData.itemsets.sort(function(a, b) {
          return b.support - a.support 
        })
      });
    } else if (this.state.sorted.byItemsetSupport === 'asc') {
      this.setState({
        rows: this.props.aprioriData.itemsets.sort(function(a, b) {
          return a.support - b.support 
        })
      });
    }
  }
  sortByConfidence() {
    if (this.state.sorted.byConfidence === 'desc') {
      this.setState({
        rows: this.props.aprioriData.rules.sort(function(a, b) {
          return b.confidence - a.confidence 
        })
      });
    } else if (this.state.sorted.byConfidence === 'asc') {
      this.setState({
        rows: this.props.aprioriData.rules.sort(function(a, b) {
          return a.confidence - b.confidence 
        })
      });
    }
  }
  handleChildChange() {
    var showRules = !this.state.showRules;
    var showItemsets = !this.state.showItemsets;
    this.setState({
      showRules: showRules,
      showItemsets: showItemsets
    })
  }
  getRuleRow(rowIndex) {
    return this.props.aprioriData.rules[rowIndex];
  }
  getItemsetRow(rowIndex) {
    return this.props.aprioriData.itemsets[rowIndex];
  }
  componentWillMount() {
    this.sortByConfidence();
    this.sortByItemsetSupport();
  }
  setSort(column) {
    if(column === 'itemsetSupport')
    {
      this.setState({
        sorted: {byItemsetSupport: this.state.sorted.byItemsetSupport === 'asc' ? 'desc' : 'asc', bySupport: this.state.sorted.bySupport, byConfidence: this.state.sorted.byConfidence }
      }, () => {
        this.sortByItemsetSupport();
      });
    } else if (column === 'ruleSupport') {
      this.setState({
        sorted: {bySupport: this.state.sorted.bySupport === 'asc' ? 'desc' : 'asc', byConfidence: false, byItemsetSupport: this.state.sorted.byItemsetSupport}
      }, () => {
        this.sortBySupport()
      });
    } else if (column === 'ruleConfidence') {
      this.setState({
        sorted: {byConfidence: this.state.sorted.byConfidence === 'asc' ? 'desc' : 'asc', bySupport: false, byItemsetSupport: this.state.sorted.byItemsetSupport}
      }, () => {
        this.sortByConfidence();
      });
      
    }

  }
  render() {
    var width = window.innerWidth - 30 > 680 ? 680 : window.innerWidth - 30;
    if (this.state.showRules) {
      var supportHeaderRenderer = function() {
        return (<div 
                onClick={this.setSort.bind(this, 'ruleSupport')}>Support
                    <span className={this.state.sorted.bySupport === 'asc' ? 'dropup' : 'dropdown'} >
                        <span className="caret"></span>
                    </span>
                </div>);
      }.bind(this);
      var confidenceHeaderRenderer = function() {

        return (<div 
                onClick={this.setSort.bind(this, 'ruleConfidence')}>Confidence 
                  <span className={this.state.sorted.byConfidence === 'asc' ? 'dropup' : 'dropdown'} >
                      <span className="caret"></span>
                  </span>
                </div>);
      }.bind(this);

      return (
        <div>
          <DataTableToggle showRules={this.state.showRules} onChange={this.handleChildChange}/>
          <Table 
          className="data"
          maxHeight={700}
          width={width}
          rowsCount={this.props.aprioriData.rules.length}
          rowHeight={50}
          headerHeight={40}
          rowGetter={this.getRuleRow.bind(this)}>
        <Column dataKey="yset"
          width={185}
          flexGrow={2}
          label="Set x"/>

        <Column dataKey="xset"
          width={185}
          flexGrow={1}
          label="Set y"
        />

        <Column dataKey="support"
          width={150}
          label="Support"
          headerRenderer={supportHeaderRenderer}
        />
        <Column dataKey="confidence"
          width={150}
          label="Confidence"
          headerRenderer={confidenceHeaderRenderer}
        />
        </Table>
      </div>
      );
    } else if (this.state.showItemsets) {
      var supportItemsetHeaderRenderer = function() {
        return (<div 
                onClick={this.setSort.bind(this, 'itemsetSupport')}>Support
                  <span className={this.state.sorted.byItemsetSupport === 'asc' ? 'dropup' : 'dropdown'} >
                      <span className="caret"></span>
                  </span>
                </div>);
      }.bind(this);
      return (
        <div>
          <DataTableToggle showRules={this.state.showRules} onChange={this.handleChildChange}/>
          <Table className="data-table"
          maxHeight={700}
          width={width}
          rowsCount={this.props.aprioriData.itemsets.length}
          rowHeight={50}
          headerHeight={40}
          rowGetter={this.getItemsetRow.bind(this)}>
        <Column dataKey="itemset"
          width={335}
          flexGrow={2}
          label="Itemset"/>
        <Column dataKey="support"
          width={335}
          label="Support"
          headerRenderer={supportItemsetHeaderRenderer}
        /> 
        </Table>
      </div>
      );
    }
  }
}

// ReactDOM.render(
//   <TableControl/>,
//   document.getElementById('container')
// );
ReactDOM.render(
  <App />,
  document.getElementById('container')
);
