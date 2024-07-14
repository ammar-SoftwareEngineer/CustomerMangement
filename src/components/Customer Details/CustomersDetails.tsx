import Header from "@components/layout/Header/Header"
import getCustomers from "@store/customer/getCustomers";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getTransaction from "@store/transactions/getTransactions";
import { useEffect } from "react";
import { Container, Table } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";


function CustomersDetails() {
    ChartJS.register = {
        Line
    }
    const { id } = useParams();
    console.log(id);
    const dispatchCustomers = useAppDispatch();
    const dispatchTransaction = useAppDispatch()
    const { loading: loadingCustomers, error: errorCustomers, records: customers } = useAppSelector((state) => state.customers);
    const { loading: loadingTransactions, error: errorTransactions, records: transactions } = useAppSelector((state) => state.transactions);

    useEffect(() => {
        dispatchCustomers(getCustomers())
        dispatchTransaction(getTransaction())
    }, [dispatchCustomers, dispatchTransaction]);

    const filteredData = customers.map((customer) => {
        const customerTransactions = transactions.filter(transaction => transaction.customer_id == customer.id);
        return {
            ...customer,
            transactions: customerTransactions
        };
    });

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
                                <Line data={{
                                    labels: dataLabel,
                                    datasets: [{
                                        label: "Total Amount",
                                        data: dataValue,
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
