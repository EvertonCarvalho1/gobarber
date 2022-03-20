import React from "react";
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';


const Signin: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="gobarber" />

                <form>
                    <h1>Faça seu logon</h1>
                    <input placeholder="E-mail" />
                    <input placeholder="Senha" />

                    <button type="submit">Entrar</button>

                    <a href="forgot">Esqueci minha senha</a>

                    <a href="">
                        <FiLogIn/>
                        Criar conta
                    </a>
                </form>

            </Content>
            <Background />
        </Container>
    )
};

export default Signin;