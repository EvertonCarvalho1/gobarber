import React from "react";
import { useAuth } from "../../hooks/auth";

import { FiPower } from "react-icons/fi";
import { Container, Header, HeaderContent, Profile, } from "./styles";


import logoImage from '../../assets/logo.svg';

const Dashboard: React.FC = () => {

    const {signOut, user} = useAuth();
    console.log(user)

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImage} alt='Gobarber' />
                    <Profile>
                        <img src={user.avatar_url === null ? 'https://avatars.githubusercontent.com/u/82480230?v=4' : user.avatar_url} alt={user.name}/>
                        <div>
                            <span>Bem vindo</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    )
}

export default Dashboard;

