import { FC } from "react";
import { useRecorderContext } from "../../../../context/useContext";
import styled from "styled-components";

const ActionButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 210px;
    height: 210px;
    border: 3px solid transparent;
    background-color: #0000007d;
    padding: 0.5em 0;

    &:hover{
        background-color: #000000e6;
        border: 3px solid red;
    }

    img{
        width: 6em;
    }

    p{
        font-size: 0.85em;
    }
`

const RecorderButton:
    FC<{ img: string, title: string, textOn: string, textOff?: string, onClick?: () => void, }> =
    ({ img, title, textOn, textOff, onClick }) => {

        const { isRecording } = useRecorderContext();

        return (
            <ActionButtons onClick={onClick}>
                <h4>{title}</h4>
                <img src={img} alt={title + " Icon"} />
                <p>{isRecording ? textOn : textOff}</p>
            </ActionButtons>
        )
    }

export default RecorderButton;