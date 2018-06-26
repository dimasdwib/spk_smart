import React from 'react';

/*
 * Result 
 * Utility
*/

class Utility extends React.Component {
  render() {

    const { criteria, alternative } = this.props;

    let totalBobot = 0;
    criteria.forEach((d, i) => {
      // count total bobot (Wj)
      totalBobot += parseFloat(d.bobot);
    });

    const normVal = [];
    criteria.forEach((d, i) => {
      // count normalisasi for each criteria
      normVal.push(parseFloat(d.bobot) / totalBobot) ;
    });

    // cMin & cMax
    let cMin = 0;
    let cMax = 0;
    alternative.forEach((a) => {
      a.parameterVal.forEach(p => {
        cMax = Math.max(p, cMax);
        if (cMin === 0 || p <= cMin) {
          cMin = p;
        }
      });
    });

    const skorVal = [];
    const utilityVal = [];
    let selectedAlt = 0;
    let higestScore = 0;
    alternative.forEach((a, i) => {
      
      // utility Value
      utilityVal[i] = [];
      let skorTotal = 0;
      criteria.forEach((c, i2) => {
        // count utility
        const u = (a.parameterVal[i2] - cMin) / (cMax - cMin);
        // console.log(a.name, c.name, a.parameterVal[i2], cMin, cMax, u);
        utilityVal[i].push(u);

        // count skor
        // utility * bobot normalisasi
        const skor = u * normVal[i2];
        skorTotal += skor;
      });

      // selected alternative - higest score
      if (skorTotal >= higestScore) {
        higestScore = skorTotal;
        selectedAlt = i;
      }
      skorVal.push(skorTotal);
    });

    // create Row Data
    const rowData = [];
    alternative.forEach((a, i) => {
      let rowCount = 0;
      criteria.forEach((c, i3) => {
        rowData.push(
          <tr key={`${i}-${i3}`} className={ i === selectedAlt ? 'table-info' : null }>
            { rowCount === 0 ? <td style={{ verticalAlign: 'middle', textAlign: 'center' }} rowSpan={criteria.length}>A{i + 1}-{a.name} { i === selectedAlt ? <span><br/>(Alternatif Terpilih)</span> : null }</td> : null }
            <td>C{i3 + 1}-{c.name} </td>
            <td>{ utilityVal[i][i3].toFixed(4) }</td>
            <td>{ normVal[i3].toFixed(4) }</td>
            { rowCount === 0 ? <td style={{ verticalAlign: 'middle' }} rowSpan={criteria.length}>{ skorVal[i].toFixed(4) }</td> : null }
          </tr>
        );
        rowCount += 1;
      });
    });

    return (
      <table className="table table-sm table-hover table-bordered">
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Kriteria</th>
            <th>Nilai Utility</th>
            <th>Bobot Normalisasi</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          { rowData }
        </tbody>  
      </table>
    );
  }
}

export default Utility;