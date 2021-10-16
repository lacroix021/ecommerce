import React, {useState, useEffect} from 'react';
import { Loader } from "semantic-ui-react";
import BasicLayout from "../../layouts/BasicLayout";
import {useRouter} from "next/router";
import {size} from "lodash";
import {getGamesPlatformApi, getTotalGamesPlatformApi} from "../../api/game";
import ListGames from "../../components/ListGames";
import Pagination from '../../components/Pagination/Pagination';
import Seo from '../../components/Seo';

const limitPerPage = 10;

export default function Platform() {
    const { query } = useRouter();
    const [games, setGames] = useState(null);
    const [totalGames, setTotalGames] = useState(null);
    
    //paginacion
    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if(!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage;
    }

    useEffect(() => {
        (async () => {
            if(query.platform){
                const response = await getGamesPlatformApi(
                    query.platform, 
                    limitPerPage, 
                    getStartItem()
                );
                setGames(response);
            }
        })();
    }, [query]);

    //paginacion
    useEffect(() => {
        (async () => {
            const response = await getTotalGamesPlatformApi(query.platform);
            setTotalGames(response);
        })()
    }, [query])

    return (
        
        <BasicLayout className="platform">
            <Seo title={query.platform}/>
            {!games && <Loader active>Cargando Juegos</Loader>}
            {games && size(games)=== 0 && (
                <div>
                    <h3>No hay Juegos</h3>
                </div>
            )}
            {size(games) > 0 && <ListGames games={games}/>}
            {totalGames ? (
            <Pagination 
                totalGames={totalGames} 
                page={query.page ? parseInt(query.page) : 1}
                limitPerPage={limitPerPage}
            />
            ):null}
        </BasicLayout>
    )
}
