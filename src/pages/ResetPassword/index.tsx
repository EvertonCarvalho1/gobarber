import React, { useCallback, useRef, useContext } from "react";
import {  FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web'
import * as Yup from 'yup';
import {  useHistory } from 'react-router-dom';

import { useToast } from "../../hooks/toast";
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg';

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password'), ],
                    'Confirmação incorreta',
                )
                
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            history.push('/signin')
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                console.log(err)
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha.'
            });
        }
    }, [ addToast, history])
    //toda variavel que é de fora do useCallback, deve ser inserida no array de dependencias do mesmo.


    return (
        <Container>

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="gobarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar senha</h1>
                        <Input icon={FiLock} name='password' type="password" placeholder="Nova senha" 
                        />
                        <Input icon={FiLock} name='password_confirmation' type="password" 
                        placeholder="Confirmação da senha" 
                        />

                        <Button type="submit">Alterar senha</Button>

                    </Form>

                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
};

export default ResetPassword;