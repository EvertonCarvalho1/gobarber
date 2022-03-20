import React from "react";
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background } from './styles';

const Signin: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="gobarber" />

                <form>
                    <h1>Faça seu logon</h1>
                    <Input name='email' placeholder="E-mail" />
                    <Input name='password' type="password" placeholder="Senha" />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </form>

                <a href="">
                    <FiLogIn />
                    Criar conta
                </a>

            </Content>
            <Background />
        </Container>
    )
};

export default Signin;