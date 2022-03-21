import React from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import {Form} from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {

    function handleSubmit(data: object): void{
        console.log(data)
    }

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="gobarber" />

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <Input
                        icon={FiUser}
                        name='nome'
                        placeholder="Nome"
                    />

                    <Input 
                        icon={FiMail} 
                        name='email' 
                        placeholder="E-mail" 
                    />
                    <Input 
                        icon={FiLock} 
                        name='password' 
                        type="password" 
                        placeholder="Senha" 
                    />

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <a href="">
                    <FiArrowLeft />
                    Voltar para logon
                </a>

            </Content>
        </Container>
    )
};

export default SignUp;