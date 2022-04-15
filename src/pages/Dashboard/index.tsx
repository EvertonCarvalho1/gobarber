import React from "react";

import { FiPower } from "react-icons/fi";
import { Container, Header, HeaderContent, Profile, } from "./styles";


import logoImage from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImage} alt="Gobarber" />
                    <Profile>
                        <img src="https://avatars.githubusercontent.com/u/82480230?v=4" alt="Everton" />
                        <div>
                            <span>Bem vindo</span>
                            <strong>Everton Carvalho</strong>
                        </div>
                    </Profile>

                    <button type="button">
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    )
}

export default Dashboard;

