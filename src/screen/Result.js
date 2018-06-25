import React from 'react';
import AltCrit from './table/AltCrit';
import Norm from './table/Norm';
import Param from './table/Param';
import Utility from './table/Utility';

class Result extends React.Component {

  constructor(props) {
    super(props);
    this.done = this.done.bind(this);
  }

  done() {
    this.props.setCriteria([]);
    this.props.setAlternative([]);
    this.props.setPage('criteria');
  }

  render() {
    
    const { criteria, alternative } = this.props;
    
    const criteriaList = [];
    criteria.forEach((d, i) => {
      criteriaList.push(
        <li key={i}>
          C{i+1} - {d.name}
        </li>
      );
    });

    const alternativeList = [];
    alternative.forEach((d, i) => {
      alternativeList.push(
        <li key={i}>
          A{i+1} - {d.name}
        </li>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="col">
            <h3> Hasil </h3>
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5> Alternatif </h5>
                <ul>
                  {alternativeList}
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5> Kriteria </h5>
                <ul>
                  {criteriaList}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h5> Nilai kriteria setiap alternatif </h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <AltCrit
                  criteria={criteria}
                  alternative={alternative}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col">
            <h5> Normalisasi setiap kriteria </h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <Norm
                  criteria={criteria}
                  alternative={alternative}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col">
            <h5> Nilai utility </h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <Param
                  criteria={criteria}
                  alternative={alternative}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <Utility
                  criteria={criteria}
                  alternative={alternative}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <hr />
            <div className="float-left">
              <button className="btn btn-default" onClick={() => this.props.setPage('alternative')}>Kembali</button>
            </div>
            <div className="float-right">
              <button className="btn btn-primary" onClick={() => this.done()}>Done</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Result;