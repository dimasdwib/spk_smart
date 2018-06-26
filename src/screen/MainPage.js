import React from 'react';
import Criteria from './Criteria';
import Alternative from './Alternative';
import Result from './Result';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'criteria',
      criteria: [],
      alternative: [],
    };
    this.renderPage = this.renderPage.bind(this);
    this.setCriteria = this.setCriteria.bind(this);
    this.setAlternative = this.setAlternative.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  renderPage() {
    const { page, criteria, alternative } = this.state;
    switch(page) {
      case 'criteria':
        return <Criteria 
                criteria={criteria}
                setPage={this.setPage}
                setCriteria={this.setCriteria}
              />
      case 'alternative':
        return <Alternative
                criteria={criteria}
                alternative={alternative}
                setPage={this.setPage}
                setAlternative={this.setAlternative}
              />
      case 'result':
        return <Result 
                criteria={criteria}
                setPage={this.setPage}
                setAlternative={this.setAlternative}
                setCriteria={this.setCriteria}
                alternative={alternative}
              />
      default:
       return (<div> Undefined Page </div>)
    }
  }

  setPage(page) {
    this.setState({
      page,
    });
  }

  setCriteria(criteria) {
    this.setState({
      criteria,
    });
  }

  setAlternative(alternative) {
    this.setState({
      alternative,
    });
  }

  render() {
    return (
      <div style={{ marginBottom: 25, marginTop: 20 }}>
        <h3> Sistem Pendukung Keputusan dengan metode SMART</h3>
        <small>Dimas Dwi Budiarjo - G.131.15.0065 </small> <br />
        <small>Mochammad Dimasrur - G.141.16.0001 </small>
        <hr />
        <div className="card">
          <div className="card-body">
            { this.renderPage() }
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;