import React from 'react';
import {map} from "lodash";
import {Image, Grid} from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {breakPointUpSm, breakPointUpMd, breakPointUpLg} from "../../utils/breakPoint";


export default function ListGames(props) {
    const {games} = props;
    const {width} = useWindowSize();
    

    const getColumnsRender = () =>{
        switch(true){
            case width > breakPointUpLg:
                return 5;
            case width > breakPointUpMd:
                return 3;
            case width > breakPointUpSm:
                return 2;
            default:
                 return 1;
        }
    };

    return (
        <div className="list-games">
            <Grid>
                <Grid.Row columns ={getColumnsRender()}>
                    {map(games, (game)=>(
                        <Game game={game}/>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
}


function Game(props){
    const {game} =props;

    return (
        <Grid.Column className="list-games__game">
            <Link href={`/${game.url}`}>
                <a>
                    <div className="list-games__games-poster">
                        <Image src={game.poster.url} alt={game.title}/>
                        <div className="list-games__game-poster-info">
                            {game.discount ?(
                                <span className = "discount">-{game.discount}%</span>
                            ):(
                                <span />
                            )}
                            <span className="price">{game.price} $</span>
                        </div>
                    </div>
                    <h2>{game.title}</h2>
                </a>
            </Link>
        </Grid.Column>
    );
}