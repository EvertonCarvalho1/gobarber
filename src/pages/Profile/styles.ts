import styled from "styled-components";

import { shade } from 'polished';



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
    margin: 0 auto;

    form{
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1{
        margin-bottom: 20px;
        text-align: left;
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
        input[name=old_password]{
            margin-top: 24px;
        }
    }
`;


