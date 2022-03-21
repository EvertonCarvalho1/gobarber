import styled from "styled-components";

import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 700px;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
        margin-bottom: 24px;
        }

       



        a{
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: 0.2s;
                &:hover{
                    color: ${shade(0.2, '#F4EDE8')};
                }
        }

    }

    > a {
        color: #f4ede8;
        display: block;
        text-decoration: none;

        display: flex;
        align-items: center;
        transition: 0.2s;
        svg{
            margin-right: 16px;
        }
        &:hover{
            color: ${shade(0.2, '#f4ede8')};
        }
    }

`;

export const Background = styled.div`
    flex: 1;
    background: url(${signUpBackgroundImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

`;