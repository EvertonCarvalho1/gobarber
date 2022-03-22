import React from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {

    async function handleSubmit(data: object): void {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data);
        } catch (err) {
            console.log(err);
        }

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
                        name='name'
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