import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout';

export default function Game() {
    const {query} = useRouter();
    
    //aqui voy capitulo 104
    return (
        <BasicLayout className="game">
            <h1>Estamos en GAME: {query.game}</h1>
        </BasicLayout>
    )
}
