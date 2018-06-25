import React from 'react';

/*
 * Normalisasi 
 * 
*/

class Norm extends React.Component {
  render() {

    const { criteria } = this.props;

    let totalBobot = 0;
    criteria.forEach((d, i) => {
      // count total bobot (Wj)
      totalBobot += parseFloat(d.bobot);
    });

    // push Row Data
    const rowData = [];
    let normTotal = 0;
    criteria.forEach((d, i) => {
      // count normalisasi for each criteria
      const normVal = parseFloat(d.bobot) / totalBobot;
      normTotal += normVal;
      rowData.push(
        <tr key={i}>
          <td>C{i+1}</td>
          <td>{d.name}</td>
          <td>{d.bobot}</td>
          <td>{normVal.toFixed(4)}</td>
        </tr>
      );
    });

    // push row Total
    rowData.push(
      <tr key={999}>
        <td></td>
        <td style={{ textAlign: 'right' }}>TOTAL</td>
        <td>{totalBobot}</td>
        <td>{Math.round(normTotal)}</td>
      </tr>
    );

    return (
      <table className="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Kriteria</th>
            <th>Bobot</th>
            <th>Normaliasi</th>
          </tr>
        </thead>
        <tbody>
          { rowData }
        </tbody>  
      </table>
    );
  }
}

export default Norm;