import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    else return _.get(item, column.fieldname);
  };

  createKey = (item, column) => {
    return item._id + (column.fieldname || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
