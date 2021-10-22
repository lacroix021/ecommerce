import React from 'react';
import {Tab} from "semantic-ui-react";
import InfoGame from '../InfoGame';

export default function TabsGame(props) {
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

    TabsGame.displayName = "TabsGame";
    
    return (
        <Tab className ="tabs-game" panes={panes} />
    )
}
