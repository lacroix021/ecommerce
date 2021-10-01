import React, {useState, useEffect} from "react";
import {Icon} from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import {getMeApi} from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";

export default function Account() {
    const [user, setUser] = useState(undefined);
    const {auth, logout, setReloadUser} = useAuth();
    const router = useRouter();
    
    //solo usuarios logueados pueden ver la pagina
    useEffect(() => {
        (async () =>{
            const response = await getMeApi(logout);
            setUser(response || null);
        })();
    }, [auth]);
    
    if(user === undefined) return null;
    if(!auth && !user){
        router.replace("/");
        return null;
    }
    //

    return (
        <BasicLayout className="account">
            <Configuration 
                user={user} 
                logout={logout} 
                setReloadUser={setReloadUser}
            />
            <Addresses />
        </BasicLayout>
    )
}


function Configuration (props){
    const { user, logout, setReloadUser } = props;
    return(
        <div className ="account__configuration">
            <div className="title">Configuracion</div>
            <div className="data">
                <ChangeNameForm 
                    user={user} 
                    logout={logout} 
                    setReloadUser={setReloadUser}
                />
                <ChangeEmailForm 
                    user ={user}
                    logout={logout} 
                    setReloadUser={setReloadUser}
                />
                <ChangePasswordForm 
                    user ={user}
                    logout={logout}
                />
            </div>
        </div>
    );
}

function Addresses(){
    const [showModal, setshowModal] = useState(false);
    const [titleModal, settitleModal] = useState("");
    const [formModal, setformModal] = useState(null);

    const openModal = (title) =>{
        settitleModal(title);
        setformModal(<AddressForm />);
        setshowModal(true);
    }

    return(
        <div className="account__addresses">
            <div className="title">
                Direcciones 
                <Icon name="plus" link onClick={() => openModal("Nueva Direccion")}/>
            </div>
            <div className="data">
                <p>Lista de Direcciones...</p>
            </div>

            <BasicModal show={showModal} setShow={setshowModal} title={titleModal}>
                {formModal}
            </BasicModal>
        </div>
    )
}