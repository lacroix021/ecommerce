import React from 'react';
import {Tab} from "semantic-ui-react";
import InfoGame from '../InfoGame';

const TabsGame(props) {
    const {game} = props;
    //creacion de pestañas dentro del juego
    const panes = [
        {
            menuItem: "Informacion",
            render: () => (
                <Tab.Pane>
                    <InfoGame game={game}/>
                </Tab.Pane>
            ),
        },
    ];

    
    return (
        <Tab className ="tabs-game" panes={panes} />
        )
    }
    
    TabsGame.displayName = "TabsGame";

    export default TabsGame;