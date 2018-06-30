import React from 'react';

/*
 * Alternative - Parameter Value Table
 * 
*/

class Param extends React.Component {

  render() {
    const { criteria, alternative } = this.props;

    const colThead = [];
    criteria.forEach((d, i) => {
      // push table head
      colThead.push(<th key={i}>C{i + 1}</th>);
    });

    const rowData = [];

    // if no data
    if (alternative.length === 0) {
      rowData.push(
        <tr key={1}>
          <td colSpan={criteria.length + 2} style={{ textAlign: 'center' }} > Belum ada alternatif :( </td>
        </tr>
      );
    }

    alternative.forEach((d, i) => {
      const colData = [];
      // console.log(d);
      d.parameterVal.forEach((p, i2) => {
        // console.log(c);
        colData.push(<td key={i2}>{p}</td>);
      });
      rowData.push(
        <tr key={i}>
          <td>A{i+1}</td>
          <td>{ d.name }</td>
          { colData }
        </tr>
      );
    });

    return (
      <table className="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Alternatif</th>
            { colThead }
          </tr>
        </thead>
        <tbody>
          { rowData }
        </tbody>  
      </table>
    );
  }
}

export default Param;