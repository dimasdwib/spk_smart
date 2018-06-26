import React from 'react';

class Criteria extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      criteria: this.props.criteria || [],
      name: '',
      bobot: '',
    };

    this.addCriteria = this.addCriteria.bind(this);
    this.deleteCriteria = this.deleteCriteria.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addCriteria() {
    const { criteria, name, bobot } = this.state;
    
    if (name === '') {
      window.alert('Masukan nama kriteria');
      return;
    }

    if (bobot === '') {
      window.alert('Masukan bobot kriteria');
      return;
    }

    if (isNaN(Number(bobot))) {
      window.alert('Invalid input');
      return;
    }

    if (Number(bobot) < 1 || Number(bobot) > 5) {
      window.alert('Bobot harus antara 1 - 5');
      return;
    }
    
    criteria.push({
      name,
      bobot,
    });
    this.setState({
      criteria,
      name: '',
      bobot: '',
    });
  }

  deleteCriteria(i) {
    if (!window.confirm('Are you sure  ?')) {
      return;
    }

    const { criteria } = this.state;
    criteria.splice(i, 1);

    this.setState({
      criteria,
    });
  }

  nextPage() {
    const { criteria } = this.state;
    this.props.setCriteria(criteria);
    this.props.setPage('alternative');
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {

    const { criteria, bobot, name } = this.state;

    const rowData = [];

    // if no data
    if (criteria.length === 0) {
      rowData.push(
        <tr key={1}>
          <td colSpan="4" style={{ textAlign: 'center' }} > Belum ada kriteria :( </td>
        </tr>
      );
    }

    criteria.forEach((d, i) => {
      rowData.push(
        <tr key={i}>
          <td>C{ i + 1 }</td>
          <td>{ d.name }</td>
          <td>{ d.bobot }</td>
          <td>
            <button className="btn btn-sm btn-secondary" onClick={() => this.deleteCriteria(i)} >Hapus</button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div className="row">
          <div className="col">
            <h3> Tambah Kriteria </h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Kriteria</label>
                      <input
                        name="name"
                        value={name}
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="Masukan nama kriteria"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Bobot</label>
                      <input
                        min="1"
                        max="5"
                        name="bobot"
                        value={bobot}
                        type="number"
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="Masukan bobot kriteria (1 - 5)"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label>&nbsp;</label><br />
                    <button
                      onClick={this.addCriteria}
                      className="btn btn-primary"
                    > Tambah </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <table className="table table-sm table-hover table-striped">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Kriteria</th>
                          <th>Bobot</th>
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
                    <button onClick={this.nextPage} disabled={criteria.length < 2 } className="btn btn-primary float-right">
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

export default Criteria;