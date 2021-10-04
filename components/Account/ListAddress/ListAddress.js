import React, {useState, useEffect} from 'react';
import {Grid, Button} from "semantic-ui-react";
import {map, size} from "lodash";
import { getAddressesApi } from '../../../api/address';
import useAuth from "../../../hooks/useAuth";
import { deleteAddressesApi } from '../../../api/address';

export default function ListAddress(props) {
    const {reloadAddresses, setReloadAddresses, openModal} = props;
    const [addresses, setAddresses] = useState(null);
    const {auth, logout} = useAuth();
    //console.log(addresses);   //para identificar las direcciones guardadas

    useEffect(() => {
        (async () =>{
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
            setReloadAddresses(false);
        })();
    
    }, [reloadAddresses]);

    if(!addresses) return null;

    return (
        <div className="list-address">
            {size(addresses) === 0 ? (
                <h3>No hay ninguna direccion creada</h3>
            ) : (
                <Grid>
                    {map(addresses, (address) => (
                        <Grid.Column key ={address.id} mobile ={16} tablet ={8} computer={4}>
                            <Address 
                                address={address} 
                                logout={logout} 
                                setReloadAddresses={setReloadAddresses}
                                openModal={openModal}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    );
}


function Address(props){
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { address, logout, setReloadAddresses, openModal} = props;

    const deleteAddress = async() =>{
        setLoadingDelete(true);
        const response = await deleteAddressesApi(address._id, logout);
        if(response) 
            setReloadAddresses(true);
        else
            setLoadingDelete(false);  //se agrego en caso de fallos de servidor extraordinarios
    };

    return (
        <div className="address">
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.state}, {address.city}, {address.postalCode}</p>
            <p>{address.phone}</p>

            <div className="actions">
                <Button primary onClick={() => openModal(`Editar: ${address.title}`, address)}> Editar</Button>
                <Button onClick={deleteAddress} loading={loadingDelete}> Eliminar</Button>

            </div>
        </div>
    )
}