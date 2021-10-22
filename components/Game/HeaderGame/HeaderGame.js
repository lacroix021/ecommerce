import React, {useState, useEffect} from 'react';
import {Grid, Image, Icon, Button, GridColumn} from "semantic-ui-react";
import {size} from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

import {
        isFavoriteApi, 
        addFavoriteApi, 
        deleteFavoriteApi
    } from "../../../api/favorite";
import { toast } from 'react-toastify';

export default function HeaderGame(props) {
    const {game} = props;
    const {poster, title} = game;
    

    return (
        <Grid className="header-game">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={poster.url} alt={title} fluid/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info game={game}/>

            </Grid.Column>
        </Grid>
    )
}


function Info(props){
    const {game} = props;
    const {title, summary, price, discount, url} = game;
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorites, setReloadFavorites] = useState(false);
    const {auth, logout} = useAuth();
    const {addProductCart} = useCart();

    

    useEffect(() => {
        (async () =>{
            if(auth){
                const response = await isFavoriteApi(auth.idUser, game.id, logout);
                if(size(response) > 0) setIsFavorite(true);
                else setIsFavorite(false);
            }else{
                return null;
            }
        })();
        setReloadFavorites(false);
    }, [game, reloadFavorites]);


    const addFavorite = async () => {
        if(auth){
            await addFavoriteApi(auth.idUser, game.id, logout);
            setReloadFavorites(true);
        }
        else{
            toast.warning("Debes estar registrado para añadirlo a tus favoritos");
        }
    };

    const deleteFavorite = async () => {
        if(auth){
            await deleteFavoriteApi(auth.idUser, game.id, logout);
            setReloadFavorites(true);
        }
    };

    return(
        <>
            <div className="header-game__title">
                {title}
                {auth ? <Icon 
                    name={isFavorite? "heart" : "heart outline"} 
                    className={classNames({
                        like: isFavorite
                    })} 
                    link
                    onClick={isFavorite ? deleteFavorite : addFavorite}
                />: null}
                
                
            </div>
            <div className="header-game__delivery">Entrega en 24/48h</div>
            <div 
                className="header-game__summary" 
                //para permitir html desde strapi en el campo descripcion
                dangerouslySetInnerHTML={{__html: summary}} 
            />
            <div className="header-game__buy">
                <div className="header-game__buy-price">
                    {discount === 0 ? null : <p>Precio de venta sin descuento: {price} $</p>}
                    
                    <div className="header-game__buy-price-actions">
                        {discount === 0 ? null: <p>-{discount} %</p>}
                        
                        {/* se añade la funcion .toFixed(2) para que en el calculo nos de 2 decimales nada mas*/}
                        <p>{(price - Math.floor(price*discount) / 100).toFixed(1)} $</p>
                    </div>
                </div>
                <Button 
                    className="header-game__buy-btn" 
                    onClick={() => addProductCart(url)}
                >Comprar</Button>
            </div>
                
        </>
    )

}