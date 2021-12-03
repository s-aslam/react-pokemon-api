import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Button, Table } from "react-bootstrap";
import { TableLoadingText } from "./TableLoadingText";
import { fetchList } from "../store/reducer";
import Paginations from "./Paginations";
import {
  ON_DELETE,
  SET_CURRENT_PAGE,
  SET_EDIT_FORM,
  SET_SHOW_ADD_FORM,
} from "../store/action";
import { AddForm } from "./AddForm";

export const ListItems = () => {
  const dispatch = useDispatch();
  const {
    showAddForm,
    currentEditIndex,
    currentPage,
    items,
    totalCounts,
    showLoader,
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchList);
  }, [currentPage]);

  let listItems;
  if (items?.length > 0) {
    listItems = items.map((element, index) => {
      if (showAddForm && currentEditIndex === index) {
        return (
          <tr key={element.name}>
            <td colSpan={2}>
              <AddForm editItem={element} />
            </td>
          </tr>
        );
      }
      return (
        <tr key={element.name}>
          <td>{element.name}</td>
          <td>
            <span
              className="text-primary cursor-pointer"
              onClick={() => dispatch({ type: SET_EDIT_FORM, value: index })}
            >
              Edit
            </span>{" "}
            |{" "}
            <span
              className="text-danger cursor-pointer"
              onClick={() => dispatch({ type: ON_DELETE, value: index })}
            >
              Delete
            </span>
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
            <Button
              onClick={() => dispatch({ type: SET_SHOW_ADD_FORM, value: true })}
            >
              Add New
            </Button>
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
            {showAddForm && currentEditIndex === null && (
              <tr>
                <td colSpan={2}>
                  <AddForm />
                </td>
              </tr>
            )}
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
