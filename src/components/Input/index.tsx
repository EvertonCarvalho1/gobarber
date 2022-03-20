import React, {InputHTMLAttributes} from "react";
import { Container } from "./styles";

interface inputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
}

const Input: React.FC<inputProps> = (props) => {
    return(
        <Container>
            <input {...props} />
        </Container>
    )
};

export default Input;

