import React from 'react';

class Alternative extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alternative: this.props.alternative || [],
      name: '',
      criteriaVal: [],
    };

    this.addAlternative = this.addAlternative.bind(this);
    this.deleteAlternative = this.deleteAlternative.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCriteriaVal = this.handleCriteriaVal.bind(this);
  }

  addAlternative() {
    const { criteriaVal, alternative, name } = this.state;

    if (name === '') {
      window.alert('Masukan nama alternatif');
      return;
    }

    // Push criteria with parameter
    /* Parameter | Value
     *    < 20 = 1
     * 20 - 39 = 2
     * 40 - 59 = 3
     * 60 - 80 = 4
     *    > 80 = 5
    */
    const parameterVal = [];
    let isValid = true;
    criteriaVal.forEach((c) => {
      if (!c || c > 100 || c < 1 || c === '') {
        isValid = false;
      }

      let p = 0;
      if (c < 20) { p = 1 }
      if (c >= 20 && c <= 39) { p = 2 }
      if (c >= 40 && c <= 59) { p = 3 }
      if (c >= 60 && c <= 79) { p = 4 }
      if (c >= 80) { p = 5 }
      parameterVal.push(p);
    });

    if (!isValid || criteriaVal.length === 0) {
      window.alert('Masukan nilai kriteria antara 1 - 100');
      return;
    }

    alternative.push({
      name,
      criteriaVal,
      parameterVal,
    });

    this.setState({
      name: '',
      criteriaVal: [],
    });
  }

  deleteAlternative(i) {
    if (!window.confirm('Are you sure  ?')) {
      return;
    }

    const { alternative } = this.state;
    alternative.splice(i, 1);

    this.setState({
      alternative,
    });
  }

  nextPage() {
    const { alternative } = this.state;
    this.props.setAlternative(alternative);
    this.props.setPage('result');
  }

  prevPage() {
    const { alternative } = this.state;

    if (alternative.length === 0) {
      this.props.setPage('criteria');
      return;
    }

    if (window.confirm('Anda yakin ? data di halaman ini akan hilang')) {
      this.props.setPage('criteria');
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCriteriaVal(e, i) {
    const { criteriaVal } = this.state;
    criteriaVal[i] = e.target.value;
    this.setState({
      criteriaVal,
    })
  }

  render() {

    const { alternative, criteriaVal, name } = this.state;
    const { criteria } = this.props;

    const criteriaInput = [];
    const colThead = [];
    criteria.forEach((d, i) => {
      // push input
      criteriaInput.push(
        <div key={i} className="col">
          <div className="form-group">
            <small>C{i + 1} - { d.name }</small><br />
            <small>bobot : { d.bobot }</small>
            <input
              min="0"
              max="100"
              type="number"
              onChange={(e) => this.handleCriteriaVal(e, i)}
              placeholder={ d.name }
              className="form-control form-control-sm"
              value={criteriaVal[i] || ''}
            />
          </div>
        </div>
      );

      // push table head
      colThead.push(<th key={i}>C{i + 1}</th>)
    });

    const rowData = [];

    // if no data
    if (alternative.length === 0) {
      rowData.push(
        <tr key={1}>
          <td colSpan={criteria.length + 3} style={{ textAlign: 'center' }} > Belum ada alternatif :( </td>
        </tr>
      );
    }

    alternative.forEach((d, i) => {
      const colData = [];
      // console.log(d);
      d.criteriaVal.forEach((c, i2) => {
        // console.log(c);
        colData.push(<td key={i2}>{c}</td>);
      });
      rowData.push(
        <tr key={i}>
          <td>A{i+1}</td>
          <td>{ d.name }</td>
          { colData }
          <td>
            <button className="btn btn-sm btn-secondary" onClick={() => this.deleteAlternative(i)}>Hapus</button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="col">
            <h3> Tambah Alternative </h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Alternatif</label>
                      <input
                        name="name"
                        value={name}
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="Masukan nama alternatif"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    Nilai Kriteria (1 - 100)
                  </div>
                </div>
                <div className="row">
                  { criteriaInput }
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <button onClick={this.addAlternative} className="btn btn-primary"> Tambah Alternatif </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <table className="table table-sm table-hover table-striped">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Alternatif</th>
                          { colThead }
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        { rowData }
                      </tbody>  
                    </table>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <hr />
                    <button onClick={this.prevPage} className="btn btn-default float-left">
                      Kembali
                    </button>
                    <button onClick={this.nextPage} disabled={alternative.length < 2 } className="btn btn-primary float-right">
                      Lanjutkan
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Alternative;