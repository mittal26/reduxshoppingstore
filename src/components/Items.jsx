import React, { Component } from "react";
import Pagination from "./../common/pagination";
import { paginate } from "./../utils/paginate";
import List from "./../common/list";
import ItemsTable from "./itemsTable";
import { Link } from "react-router-dom";
import _ from "lodash";
import Search from "./Search";
//import { toast } from "react-toastify";
// import withLoader from "../components/withLoader";
import {
  loadItems,
  deleteItem,
  selectChange,
  toggleLike,
} from "../store/items";
import { loadCategory } from "../store/categories";
import { addToCart } from "../store/cart";
import { connect } from "react-redux";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 4,
      sortColumn: { fieldname: "title", order: "asc" },
      searchValue: "",
    };
  }

  async componentDidMount() {
    this.props.loadItems();
    this.props.loadCategory();
    //console.log(this.props.loading);
  }

  onHandlePageClick = (page) => {
    //console.log(page);
    this.setState({ currentPage: page });
  };

  onListItemFilter = (itemselected) => {
    //console.log(itemselected);
    this.setState({
      selectedItem: itemselected,
      searchValue: "",
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      itemsPerPage,
      selectedItem,
      sortColumn,
      searchValue,
    } = this.state;

    const { items: allItems } = this.props;

    let filterItems = allItems;
    if (searchValue) {
      filterItems = allItems.filter((itemData) =>
        itemData.title.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    } else if (selectedItem && selectedItem._id) {
      filterItems = allItems.filter(
        (itemData) => itemData.category._id === selectedItem._id
      );
    }

    const sorted = _.orderBy(
      filterItems,
      [sortColumn.fieldname],
      [sortColumn.order]
    );
    const items = paginate(sorted, itemsPerPage, currentPage);

    return { totalCountFiltered: filterItems.length, data: items };
  };

  handleSearch = (query) => {
    const searchValue = query;
    this.setState({
      searchValue: searchValue,
      selectedItem: null,
      currentPage: 1,
    });
  };

  render() {
    const { currentPage, itemsPerPage, sortColumn, searchValue } = this.state;
    const { user } = this.props;
    const { totalCountFiltered, data: items } = this.getPageData();
    const { length: count } = this.props.items;

    return count === 0 ? (
      <div>
        <p>There are no items in the Database</p>
      </div>
    ) : (
      <div className="row">
        <div className="col-4">
          <List
            handleListItem={this.onListItemFilter}
            selectedItem={this.state.selectedItem}
            categoryItems={this.props.category}
          />
        </div>
        <div className="col">
          {this.props.loading && (
            <div style={{ display: "inline-block", textAlign: "center" }}>
              <i className="fa fa-refresh fa-spin fa-2x" aria-hidden="true"></i>
            </div>
          )}
          {user && (
            <Link to="items/new" style={{ marginBottom: "20px" }}>
              <button className="btn btn-primary">New Item</button>
            </Link>
          )}
          <p> Showing {totalCountFiltered} items in the Database</p>
          <Search onChange={this.handleSearch} value={searchValue} />
          <ItemsTable
            items={items}
            onSelectChange={this.props.handleSelectChange}
            onAddtoCart={this.props.handleAddToCart}
            onDelete={this.props.handleDelete}
            onLike={this.props.handletoggleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />

          <Pagination
            totalItems={totalCountFiltered}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            handlePageClick={this.onHandlePageClick}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.entities.items.list,
  category: state.entities.categories.list,
  loading: state.entities.items.loading,
});

const mapDispatchToProps = (dispatch) => ({
  loadItems: () => dispatch(loadItems()),
  loadCategory: () => dispatch(loadCategory()),
  handleDelete: (id) => dispatch(deleteItem(id)),
  handleAddToCart: (item) => {
    dispatch(addToCart(item));
  },
  handletoggleLike: (item) => {
    dispatch(toggleLike(item));
  },
  handleSelectChange: ({ currentTarget: input }, item) => {
    dispatch(selectChange({ currentTarget: input }, item));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
