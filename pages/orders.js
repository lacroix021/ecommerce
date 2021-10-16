import React, {useState, useEffect } from 'react';
import {Grid} from "semantic-ui-react";
import {map, size} from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import {getOrdersApi} from "../api/order";
import useAuth from '../hooks/useAuth';
import Order from '../components/Order/Order';
import Seo from '../components/Seo';

export default function Orders() {
    const [orders, setOrders] = useState(null);
    const {auth, logout} = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout);
            setOrders(response || []);
        })();
    }, []);

    return (
        <BasicLayout className="orders">
            <Seo title="Mis Pedidos" description = "Listado de todos tus pedidos"/>
            <div className="orders__block">
                <div className="title">Mis Pedidos</div>
                <div className="data">
                    {size(orders) === 0 ? (
                        <h2 style ={{textAlign: "center"}}>
                            Todavia no has realizado ninguna compra
                        </h2>
                    ):(
                        <OrderList orders={orders}/>
                    )}
                </div>
            </div>
        </BasicLayout>
    )
}

function OrderList(props) {
    const {orders} = props;

    return(
        <Grid>
            {/*se añadio el valor i de "orders" el cuales el valor de key, cada elemento tiene una key
            unica y si no se especifica, la consola empieza a dar warnings*/}
            {map(orders, (order, i)=> (
                <Grid.Column key={i} mobile={16} table={6} computer={8}>
                    <Order order={order} />
                </Grid.Column>
            ))}
        </Grid>
    )
}