import { FC } from "react";
import { useRecorderContext } from "../../../context/useContext";
import styled from "styled-components";
import generalOptionIcon from "../../assets/settingsIcons/general.svg";
import audioOptionIcon from "../../assets/settingsIcons/audio.svg";
import instantReplayOptionIcon from "../../assets/settingsIcons/replay.svg";
import videoConfigurationOptionIcon from "../../assets/settingsIcons/video.svg";
import notificationsOptionIcon from "../../assets/settingsIcons/notification.svg";
import hotkeysOptionIcon from "../../assets/settingsIcons/hotkeys.png";
import othersOptionIcon from "../../assets/settingsIcons/others.svg";
import SettingButton from "./common/SettingButton";
import BooleanSelect from "./common/BooleanSelect";

const SettingsContainer = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 2em;
    user-select: none;
`
const SettingsButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    user-select: none;
    cursor: pointer;
`
const SettingsPanelContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 30em;
    height: 31.42em;
    background-color: #242A30;
    border-top: solid 4px #71A227;
    padding: 1em;
`
const SettingsPanel_Section = styled.div`
    padding: 0.5em 1em;
    background-color: #191D20;
    margin-bottom: 0.6em;

    p{
        font-size: 0.9em;
    }
    
`
const SettingsPanel_Option_Container = styled.div`
    display: flex;
    gap: 1em;
`
const SettingsPanel_Option = styled.div<{ $column: boolean }>`
    display: flex;
    flex-direction: ${({ $column }) => $column ? 'column' : 'row'};
    margin-top: 0.4em;

    button{
        width: 9em;
        background-color: #0B0F12;
        border: none;
        color: white;
        text-align: start;
        padding-left: 0.5em;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    select{
        border: none;
        padding-left: 0.2em;
        background-color: #0B0F12;
        color: white;
    
        &:focus{
            outline: none;
        }
    }

    input{
        &:focus{
            outline: none;
            border: none;
        }
    }
    input[type="number"]{
        display: inline;
        width: 2em;
        background-color: #0B0F12;
        border: none;
        padding-left: 0.2em;
        color: white;
    }
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    span{
        padding: 0 0.3em 0 0.1em;
        background-color: #0B0F12;
        font-size: 0.8em;
    }
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 6px;
        background: #0B0F12;
        outline: none;
        cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 12px;
        height: 12px;
        background: #d1d0d0;
        border: 2px solid #0B0F12;
        cursor: pointer;
    }
`

const SettingsOverlay: FC = () => {

    const {
        isModifyingSettings,
        changeKeyboardHotkey,
        currentSettingPage,
        settings,
        updateSetting,
        handleSelectDirectory
    } = useRecorderContext();

    const validateNumbers = (input: HTMLInputElement): void => {
        let value: string = input.value;

        if (isNaN(Number(value)) || value === "") {
            input.value = "";
        }
        if (Number(value) < 1) {
            input.value = "";
        } else if (Number(value) > 999) {
            input.value = "999";
        }
    }

    const renderSettingPageCategory = () => {

        const renderGeneral = () => (
            <>
                <SettingsPanel_Section>
                    <h4>Directories</h4>

                    <SettingsPanel_Option_Container>

                        <SettingsPanel_Option $column={true}>
                            <p>Save Directory:</p>
                            <button onClick={() => handleSelectDirectory()}>{settings.general.saveDirectory}</button>
                        </SettingsPanel_Option>

                    </SettingsPanel_Option_Container>
                </SettingsPanel_Section>

                <SettingsPanel_Section>
                    <h4>File e Startup</h4>

                    <SettingsPanel_Option_Container>

                        <SettingsPanel_Option $column={true}>
                            <p>File Format:</p>
                            <select
                                value={settings.general.fileFormat}
                                onChange={(e) => updateSetting('general.fileFormat', e.target.value)}
                            >
                                <option value="mp4">mp4</option>
                                <option value="mkv">mkv</option>
                                <option value="webm">webm</option>
                                <option value="avi">avi</option>
                            </select>
                        </SettingsPanel_Option>
                        <SettingsPanel_Option $column={true}>
                            <p>Startup Boot:</p>
                            <BooleanSelect
                                value={settings.general.systemStartup}
                                onChange={(e) => updateSetting('general.systemStartup', e)}
                            />
                        </SettingsPanel_Option>

                    </SettingsPanel_Option_Container>
                </SettingsPanel_Section>
            </>
        )

        switch (currentSettingPage) {
            case 'General':
                return renderGeneral();
            case 'Audio':
                return (
                    <>
                        <SettingsPanel_Section>
                            <h4>Audio Settings</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>System Audio:</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                                        <BooleanSelect
                                            value={settings.audio.systemAudio}
                                            onChange={(e) => updateSetting('audio.systemAudio', e)}
                                        />
                                        <input
                                            type="range"
                                            value={settings.audio.systemVolume}
                                            onChange={(e) => updateSetting('audio.systemVolume', e.target.value)}
                                        />
                                    </div>
                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>Microphone audio:</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                                        <BooleanSelect
                                            value={settings.audio.microphoneAudio}
                                            onChange={(e) => updateSetting('audio.microphoneAudio', e)}
                                        />
                                        <input
                                            type="range"
                                            value={settings.audio.microphoneVolume}
                                            onChange={(e) => updateSetting('audio.microphoneVolume', e.target.value)}
                                        />
                                    </div>
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>
                    </>
                )
            case 'Replay':
                return (
                    <>
                        <SettingsPanel_Section>
                            <h4>Instant Replay</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Replay Duration:</p>
                                    <div style={{ display: 'flex', marginTop: '0.2em' }}>
                                        <input
                                            type="number"
                                            value={settings.replay.replayDuration}
                                            min={0}
                                            max={999}
                                            step={1}
                                            onChange={(e) => {
                                                validateNumbers(e.target);
                                                updateSetting('replay.replayDuration', e.target.value)
                                            }}
                                        />
                                        <span>s</span>
                                    </div>
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>
                    </>
                )
            case 'Video':
                return (
                    <>
                        <SettingsPanel_Section>
                            <h4>Video Configuration</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Frame Rate:</p>
                                    <select
                                        value={settings.video.framerate}
                                        onChange={(e) => updateSetting('video.framerate', e.target.value)}
                                    >
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                        <option value="60">60</option>
                                        <option value="75">75</option>
                                        <option value="90">90</option>
                                        <option value="120">120</option>
                                        <option value="noLimit">No Limit</option>
                                    </select>
                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>BitRate:</p>
                                    <select
                                        value={settings.video.bitrate}
                                        onChange={(e) => updateSetting('video.bitrate', e.target.value)}
                                    >
                                        <option value="2000kbps">2000 kbps</option>
                                        <option value="4000kbps">4000 kbps</option>
                                        <option value="8000kbps">8000 kbps</option>
                                        <option value="13000kbps">13000 kbps</option>
                                        <option value="15000kbps">15000 kbps</option>
                                        <option value="18000kbps">18000 kbps</option>
                                        <option value="20000kbps">20000 kbps</option>
                                        <option value="22000kbps">22000 kbps</option>
                                        <option value="25000kbps">25000 kbps</option>
                                    </select>
                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>Codec:</p>
                                    <select
                                        value={settings.video.codec}
                                        onChange={(e) => updateSetting('video.codec', e.target.value)}
                                    >
                                        <option value="h.264">H.264</option>
                                        <option value="h.265">H.265</option>
                                        <option value="vp9">VP9</option>
                                        <option value="av1">AV1</option>
                                    </select>
                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>Auto-Save Interval:</p>
                                    <select
                                        value={settings.video.autoSave}
                                        onChange={(e) => updateSetting('video.autoSave', e.target.value)}
                                    >
                                        <option value="off">Off</option>
                                        <option value="1min">1min</option>
                                        <option value="3min">3min</option>
                                        <option value="5min">5min</option>
                                        <option value="10min">10min</option>
                                        <option value="25min">25min</option>
                                        <option value="40min">40min</option>
                                        <option value="60min">60min</option>
                                    </select>
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section >
                    </>
                )
            case 'Notifications':
                return (
                    <>
                        <SettingsPanel_Section>
                            <h4>Instant Replay</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Start/Stop Instant-Replay:</p>
                                    <BooleanSelect
                                        value={settings.notifications.startReplay}
                                        onChange={(e) => updateSetting('notifications.startReplay', e)}
                                    />                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>Saving Instant-Replay:</p>
                                    <BooleanSelect
                                        value={settings.notifications.saveReplay}
                                        onChange={(e) => updateSetting('notifications.saveReplay', e)}
                                    />                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>

                        <SettingsPanel_Section>
                            <h4>Recorder</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Start/Stop Recording:</p>
                                    <BooleanSelect
                                        value={settings.notifications.startRecording}
                                        onChange={(e) => updateSetting('notifications.startRecording', e)}
                                    />                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>Saving Recording:</p>
                                    <BooleanSelect
                                        value={settings.notifications.saveRecording}
                                        onChange={(e) => updateSetting('notifications.saveRecording', e)}
                                    />                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>

                        <SettingsPanel_Section>
                            <h4>Others</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Closing Screen-Recorder:</p>
                                    <BooleanSelect
                                        value={settings.notifications.closingRecorder}
                                        onChange={(e) => updateSetting('notifications.closingRecorder', e)}
                                    />
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>
                    </>
                )
            case 'Hotkeys':
                return (
                    <>
                        <SettingsPanel_Section>
                            <h4>Instant Replay</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Start/Stop Instant-Replay:</p>
                                    <button
                                        onClick={() => changeKeyboardHotkey('startReplay')}>{settings.hotkeys.startReplay}
                                    </button>
                                </SettingsPanel_Option>

                                <SettingsPanel_Option $column={true}>
                                    <p>Save Instant-Replay:</p>
                                    <button
                                        onClick={() => changeKeyboardHotkey('saveReplay')}>{settings.hotkeys.saveReplay}
                                    </button>
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>

                        <SettingsPanel_Section>
                            <h4>Recorder</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Start/Stop Recording:</p>
                                    <button
                                        onClick={() => changeKeyboardHotkey('startRecording')}>{settings.hotkeys.startRecording}
                                    </button>
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>
                        </SettingsPanel_Section>
                    </>
                )
            case 'Others':
                return (
                    <>
                        <SettingsPanel_Section>
                            <h4>Others</h4>
                            <SettingsPanel_Option_Container>

                                <SettingsPanel_Option $column={true}>
                                    <p>Theme-Color:</p>
                                    <select
                                        value={settings.others.themeColor}
                                        onChange={(e) => updateSetting('others.themeColor', e.target.value)}>
                                        <option value="green">Green</option>
                                        <option value="blue">Blue</option>
                                        <option value="red">Red</option>
                                        <option value="pink">Pink</option>
                                    </select>
                                </SettingsPanel_Option>
                                <SettingsPanel_Option $column={true}>
                                    <p>Show Cursor:</p>
                                    <BooleanSelect
                                        value={settings.others.showCursor}
                                        onChange={(e) => updateSetting('others.showCursor', e)} />
                                </SettingsPanel_Option>

                            </SettingsPanel_Option_Container>

                        </SettingsPanel_Section>
                    </>
                )
            default:
                return renderGeneral();
        }
    }

    return (
        isModifyingSettings &&
        <>
            <SettingsContainer>
                <SettingsButtons>
                    <SettingButton img={generalOptionIcon} text="General" />
                    <SettingButton img={audioOptionIcon} text="Audio" />
                    <SettingButton img={instantReplayOptionIcon} text="Replay" />
                    <SettingButton img={videoConfigurationOptionIcon} text="Video" />
                    <SettingButton img={notificationsOptionIcon} text="Notifications" fontsize="0.55em" />
                    <SettingButton img={hotkeysOptionIcon} text="Hotkeys" />
                    <SettingButton img={othersOptionIcon} text="Others" />
                </SettingsButtons>
                <SettingsPanelContainer>
                    {renderSettingPageCategory()}
                </SettingsPanelContainer>
            </SettingsContainer>
        </>
    )
}

export default SettingsOverlay;