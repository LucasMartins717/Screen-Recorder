import { FC } from "react";
import { useRecorderContext } from "../../../../context/useContext";
import styled from "styled-components";

const SettingsButtons_Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 65px;
    max-width: 65px;
    min-height: 65px;
    max-height: 65px;
    padding: 0.7em 0.2em 0.2em;
    background-color: #71A227;
    user-select: none;

    img{
        width: 2em;
        user-select: none;
    }
    
    h3{
        font-size: 0.7em;
        user-select: none;
    }
`

const SettingButton: FC<{ img: string, text: string, fontsize?: string }> = ({ img, text, fontsize }) => {
    
    const {setCurrentSettingPage} = useRecorderContext();

    return (
        <SettingsButtons_Option onClick={() => setCurrentSettingPage(text)}>
            <img src={img} alt={text + " Icon"}/>
            <h3 style={{fontSize: fontsize ? fontsize : ""}}>{text}</h3>
        </SettingsButtons_Option>
    )
}

export default SettingButton;