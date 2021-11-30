import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Button, Table } from "react-bootstrap";
import { TableLoadingText } from "./TableLoadingText";
import { fetchList } from "../store/reducer";
import Paginations from "./Paginations";
import { SET_CURRENT_PAGE } from "../store/action";

export const ListItems = () => {
  const dispatch = useDispatch();
  const { currentPage, items, totalCounts, showLoader } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchList);
  }, [currentPage]);

  let listItems;
  if (items?.length > 0) {
    listItems = items.map((element) => {
      return (
        <tr key={element.name}>
          <td>{element.name}</td>
          <td>
            <span className="text-primary cursor-pointer">Edit</span> |{" "}
            <span className="text-danger cursor-pointer">Delete</span>
          </td>
        </tr>
      );
    });
  } else {
    listItems = <TableLoadingText colSpan={2} text="No Record Found..." />;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Pokemon List
          <div className="float-right">
            <Button>Add New</Button>
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showLoader ? (
              <TableLoadingText colSpan={2} text="Loading data..." />
            ) : (
              listItems
            )}
          </tbody>
        </Table>
        <Paginations
          page={currentPage}
          totalCounts={totalCounts}
          onPageChange={(page) =>
            dispatch({ type: SET_CURRENT_PAGE, value: page })
          }
        />
      </Card.Body>
    </Card>
  );
};
