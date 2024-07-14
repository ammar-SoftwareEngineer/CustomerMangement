import Header from "@components/layout/Header/Header"
import { useContext } from "react";
import { DataContext } from "@hooks/context/DataContext";
import { Container, Table } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


function CustomersDetails() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
    const { id } = useParams();
   // ################# Start Context #################################
   const { filteredData } = useContext(DataContext)
   // ################# End Context #################################
   

    let name: string = ""

    const customer = filteredData.find((f) => Number(f.id) === Number(id))
    if (customer) {
        name = customer.name;
    }

    const customersList = customer ? customer.transactions.map((record) => {
        return <tr key={record.id} className="text-center">
            <td>{record.id}</td>
            <td>{record.amount}</td>
            <td>{record.date}</td>
        </tr>
    }) : "Not Customers"


    const dataLabel = customer?.transactions.map((d) => d.date)
    const dataValue = customer?.transactions.map((d) => d.amount)
    return (
        <div className="customer-details">
            <div className="header">

                <Header title="Customer Details" details={true} dataLink="/customers" />
                <div className="date pt-4 ">
                    <Container fluid >
                        <div className="dataCustomer  bg-white shadow-sm p-4 rounded-3">
                            <div className="nameCustomer">
                                <h4 style={{ color: "#021E87", fontWeight: "600" }}>{name}</h4>
                                <hr />
                            </div>
                            <div className="chartCustomer mt-3">
                                <div className="total  mt-3">
                                <h4 className=" text-secondary">Total Amount </h4>
                                <p className=" fw-medium fs-3">${dataValue?.reduce((acc,amount)=>acc+amount,0)}</p>
                                </div>
                              
                                <Line data={{
                                    labels: dataLabel,
                                    datasets: [{
                                        label: "Total Amount",
                                        data: dataValue,
                                        borderColor: 'rgb(09, 130, 180)',
                                    }
                                    ]
                                }} />
                            </div>

                            <div className="table mt-3">
                                <Table hover responsive className="table align-middle">
                                    <thead>
                                        <tr className="text-center">
                                            <th>Id</th>
                                            <th>Transaction amount</th>
                                            <th>Transaction Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {customersList}


                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </Container>
                </div>
            </div>
        </div>
    )
}

export default CustomersDetails
