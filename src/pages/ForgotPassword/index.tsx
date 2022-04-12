import React, { useCallback, useRef, useContext, useState } from "react";
import { FiLogIn, FiMail, FiCircle } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web'
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from "../../hooks/toast";
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer, Background } from './styles';
import api from "../../services/apiClient";

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true)
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/password/forgot', {
                email: data.email,
            })
            console.log(loading)
            addToast({
                type: 'success',
                title: 'Email de recuperação enviado',
                description: 'Enviamos um email para confirmar a recuperação de senha'
            })
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                console.log(err)
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realiazar a recuperação de senha, tente novamente.'
            });
        } finally{
            setLoading(false)
        }
    }, [ addToast])
    //toda variavel que é de fora do useCallback, deve ser inserida no array de dependencias do mesmo.


    return (
        <Container>

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="gobarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>

                        <Input icon={FiMail} name='email' placeholder="E-mail" />
    
                        <Button loading={loading} type="submit">Recuperar</Button>

                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
};

export default ForgotPassword;