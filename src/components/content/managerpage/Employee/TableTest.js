import React, { Component } from 'react';
import Table          from 'react-toolbox/lib/table/Table';
import TableHead      from 'react-toolbox/lib/table/TableHead';
import TableRow       from 'react-toolbox/lib/table/TableRow';
import TableCell      from 'react-toolbox/lib/table/TableCell';

import Tooltip      from 'react-toolbox/lib/tooltip/Tooltip';

const data = [
  {name: 'Cupcake', calories: 305, fat: 3.7, sodium: 413, calcium: '3%', iron: '8%'},
  {name: 'Donut', calories: 452, fat: 25.0, sodium: 326, calcium: '2%', iron: '22%'},
  {name: 'Eclair', calories: 262, fat: 16.0, sodium: 337, calcium: '6%', iron: '7%'},
  {name: 'Frozen yogurt', calories: 159, fat: 6.0, sodium: 87, calcium: '14%', iron: '1%'},
  {name: 'Gingerbread', calories: 356, fat: 16.0, sodium: 327, calcium: '7%', iron: '16%'},
  {name: 'Ice cream sandwich', calories: 237, fat: 9.0, sodium: 129, calcium: '8%', iron: '1%'},
  {name: 'Jelly bean', calories: 375, fat: 0.0, sodium: 50, calcium: '0%', iron: '0%'},
  {name: 'KitKat', calories: 518, fat: 26.0, sodium: 54, calcium: '12%', iron: '6%'}
];

const TooltipCell = Tooltip(TableCell);

const sortByCaloriesAsc = (a, b) => {
  if (a.calories < b.calories) return -1;
  if (a.calories > b.calories) return 1;
  return 0;
};

const sortByCaloriesDesc = (a, b) => {
  if (a.calories > b.calories) return -1;
  if (a.calories < b.calories) return 1;
  return 0;
};

class TableTest extends Component {
  state = {
    selected: ['Donut'],
    sorted: 'asc'
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
    return data.sort(compare);
  }

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TooltipCell tooltip="The total amount of food energy in the given serving size">
            Dessert (100g serving)
          </TooltipCell>
          <TableCell onClick={this.handleSortClick} numeric sorted={sorted}>Calories</TableCell>
          <TableCell numeric>Fat (g)</TableCell>
          <TableCell numeric>Sodium (mg)</TableCell>
          <TableCell numeric>Calcium (%)</TableCell>
          <TableCell numeric>Iron (%)</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
          <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell numeric>{item.calories}</TableCell>
            <TableCell numeric>{item.fat}</TableCell>
            <TableCell numeric>{item.sodium}</TableCell>
            <TableCell numeric>{item.calcium}</TableCell>
            <TableCell numeric>{item.iron}</TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}

export default TableTest;