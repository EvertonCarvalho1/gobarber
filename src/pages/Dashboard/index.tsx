import React from "react";
import { useAuth } from "../../hooks/auth";

import { FiClock, FiPower } from "react-icons/fi";
import { Container, Header, HeaderContent, Profile, Content , Schedule, NextAppointment, Calendar, Section, Appointment } from "./styles";

import logoImage from '../../assets/logo.svg';
import firstImage from '../../assets/enzo (2).jpg';
import secondImage from '../../assets/john.jpg';

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
            <Content>
                <Schedule>
                    <h1>Horarios agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars.githubusercontent.com/u/87612078?v=4" alt="Jolielton Carvalho" />

                            <strong>Jolielton Carvalho</strong>
                            <span>
                                <FiClock/>
                                08:00
                            </span>
                        </div>
                    </NextAppointment>
                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock/>
                                08:00
                            </span>
                            <div>
                                <img src={secondImage} alt="John Santos" />

                                <strong>John Santos</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        <Appointment>
                            <span>
                                <FiClock/>
                                08:00
                            </span>
                            <div>
                                <img src={firstImage} alt="Enzo Grabriel" />

                                <strong>Enzo Grabriel</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar/>
            </Content>
        </Container>
    )
}

export default Dashboard;

