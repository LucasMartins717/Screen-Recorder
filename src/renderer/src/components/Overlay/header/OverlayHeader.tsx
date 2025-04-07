import { FC } from "react";
import styled from "styled-components";
import logoImage from "../../../assets/mainIcons/logo.png";
import closeIcon from "../../../assets/mainIcons/close.svg";
import { useRecorderContext } from "../../../../context/useContext";

const Header = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4em;
    padding: 0 1em;
    background-color: #000000ba;

    h1{
        font-size: 1.6em;
    }

    img:first-child{
        min-width: 2.7em;
        max-width: 2.7em;
        min-height: 2.7em;
        max-height: 2.7em;
    }

    img:last-child{
        min-width: 1.5em;
        max-width: 1.5em;
        min-height: 1.5em;
        max-height: 1.5em;
        border: 1px solid transparent;
        padding: 0.1em;
        
        &:hover{
            border: 1px solid red;
        }
    }
`

const OverlayHeader: FC = () => {

    const { isModifyingSettings, setIsModifyingSettings } = useRecorderContext();

    const handleClose = () => {
        window.electron.ipcRenderer.send('close-window');
        setIsModifyingSettings(false);
    }

    return (
        <Header>
            <img src={logoImage} alt="Screen-Recorder-Logo" />
            <h1>Screen-Recorder</h1>
            <img onClick={() => isModifyingSettings
                ? setIsModifyingSettings(false)
                : handleClose()} src={closeIcon}
                alt="Close Button"
            />
        </Header>
    )
}

export default OverlayHeader;