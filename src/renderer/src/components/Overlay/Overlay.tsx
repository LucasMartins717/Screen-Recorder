import { FC } from "react";
import { useRecorderContext } from "../../../context/useContext";
import styled from "styled-components";
import instantReplayIcon from "../../assets/mainIcons/instant-replay.png";
import recordIcon from "../../assets/mainIcons/record.png";
import settingsIcon from "../../assets/mainIcons/settings.png";
import SettingsOverlay from "./SettingsOverlay";
import RecorderButton from "./common/RecorderButton";
import OverlayHeader from "./header/OverlayHeader";

const OverlayContainer = styled.main`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #00000096;
    color: white;
    z-index: 9999;
    user-select: none;
`
const RecorderButtonsContainer = styled.section`
    display: flex;
    margin-top: 12em;
`

const Overlay: FC = () => {

    const { isModifyingSettings, setIsModifyingSettings } = useRecorderContext();

    return (
        <OverlayContainer>
            <OverlayHeader />
            {!isModifyingSettings &&
                <RecorderButtonsContainer>
                    <RecorderButton
                        title="Instant Replay"
                        img={instantReplayIcon}
                        textOn="On"
                        textOff="Off"
                    />
                    <RecorderButton
                        title="Record"
                        img={recordIcon}
                        textOn="Recording"
                        textOff="Not recording" />
                    <RecorderButton
                        onClick={() => setIsModifyingSettings(true)}
                        title="Settings"
                        img={settingsIcon}
                        textOn="Acess Settings"
                        textOff="Acess Settings" />
                </RecorderButtonsContainer>
            }
            <SettingsOverlay />
        </OverlayContainer >
    )
}
export default Overlay;