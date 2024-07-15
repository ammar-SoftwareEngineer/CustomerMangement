import { Dropdown, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import FilterListIcon from "@mui/icons-material/FilterList";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useContext, useState } from "react";
import { IconButton } from "@mui/material";

import { DataContext } from "@hooks/context/DataContext";

function CustomersTable() {
  // ################# Start Context #################################
  const { filteredData } = useContext(DataContext)
  // ################# End Context #################################
  const [dataFilter, setFilter] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string | number>("");

  const handleSelect = (eventKey: string | null): void => {
    if (eventKey && !dataFilter.includes(eventKey)) {
      setFilter([eventKey]);
    }
    clearData()
  };

  function sliceFilter(key: string): void {
    setFilter(dataFilter.filter((f) => f !== key))
  }
function clearData(){
  setSearchFilter("")
}

  const valueFilter = dataFilter.map((value: string) => (
    <span
      key={value}
      className="bg-primary px-3 rounded-2 text-white d-flex align-items-center"
    >
      {value}
      <IconButton className=" text-white" onClick={() => { sliceFilter(value);clearData() }}>
        <HighlightOffIcon />
      </IconButton>
    </span>

  ));
  //  ################## Filter Data After Click #################
  let renderData = filteredData
  console.log(renderData);

  const hasFirstNameFilter = dataFilter.some((d) => d.includes("First Name"));
  const hasAmountFilter = dataFilter.some((d) => d.includes("Amount"));

  if (hasFirstNameFilter) {
    const filteredByName = filteredData.filter(customer =>
      customer.name.toLowerCase().includes(searchFilter.toString().toLowerCase())
    );
    renderData = filteredByName;
  } else if (hasAmountFilter) {
    const totalAmount = filteredData.map(customer => ({
      ...customer,
      totalAmount: customer.transactions.reduce((total, transaction) => total + transaction.amount, 0)
    }));
    const filteredByAmount = searchFilter
      ? totalAmount.filter(amount =>
        amount.totalAmount === Number(searchFilter)
      )
      : filteredData;

    renderData = filteredByAmount;
  }


  const customersList = renderData.length > 0 ? renderData.map((record) => {
    return (
      <tr key={record.id} onClick={() => window.location.href = `/customers/${record.id}`} style={{ cursor: 'pointer' }}>
        <td className="py-3 ">{record.id}</td>
        <td>{record.name}</td>
        <td className="text-center">${record.transactions.reduce((totalAmount, transaction) => totalAmount + transaction.amount, 0)}</td>
        <td className="text-center">{record.transactions.length}</td>
      </tr >
    )
  }) : "Not Customers"

  return (
    <div className="bg-white p-3 rounded-3">


    

      <h3 style={{ color: "#021E87", fontWeight: "600" }}>Customers List</h3>
      <hr />
      <div className="search-filter mb-4 d-flex justify-content-between flex-md-nowrap flex-wrap-reverse gap-3 gap-lg-0">
        <div className="filter w-100 d-flex gap-3 align-items-center">
          <Dropdown className="dropdown-toggle" onSelect={handleSelect}>
            <Dropdown.Toggle
              variant=""
              color="white"
              className="btn btn-outline-dark"
            >
              <FilterListIcon />
              <span className="ms-2">Filter</span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "40px" }}>
              <Dropdown.Item eventKey={"First Name"}>First Name</Dropdown.Item>
              <Dropdown.Item eventKey={"Amount"}>Amount</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="valueFilter d-flex flex-wrap gap-2 ">{valueFilter}</div>
        </div>

        <div className="search w-75">
          <Form.Group
            className="position-relative border border-1 rounded-3 shadow-sm"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className="position-absolute end-0 top-50 translate-middle me-1">
              <svg
                style={{ width: "20px", height: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                id="search"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="#666666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  transform="translate(2 2)"
                >
                  <circle cx="9.767" cy="9.767" r="8.989"></circle>
                  <line x1="16.018" x2="19.542" y1="16.485" y2="20"></line>
                </g>
              </svg>
            </Form.Label>
            <Form.Control
              type="text"
              className="border-0"
              placeholder="Search"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
      <Table hover responsive className="table align-middle">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th className="text-center">Transaction amount</th>
            <th className="text-center">Number of transactions</th>
          </tr>
        </thead>
        <tbody>
          {customersList.length > 0 ? customersList : (
            <tr>
              <td >No customers found</td>
            </tr>
          )}
        </tbody>
      </Table>


    </div>
  );
}

export default CustomersTable;
