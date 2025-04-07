import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface RecorderInterface {

    //Recorder Context
    isRecording: boolean;
    setIsRecording: (isRecording: boolean) => void;
    isReplaying: boolean;
    setIsReplaying: (isReplaying: boolean) => void;

    //UI State
    currentSettingPage: string;
    setCurrentSettingPage: (currentSettingPage: string) => void;
    isModifyingSettings: boolean;
    setIsModifyingSettings: (isModifyingSettings: boolean) => void;

    //Settings State
    settings: {
        general: {
            saveDirectory: string,
            fileFormat: 'mp4' | 'mkv' | 'webm' | 'avi',
            systemStartup: boolean
        },
        audio: {
            systemAudio: boolean,
            systemVolume: string,
            microphoneAudio: boolean,
            microphoneVolume: string
        },
        replay: {
            replayDuration: string
        },
        video: {
            framerate: '15' | '30' | '45' | '60' | '75' | '90' | '120' | 'No Limit',
            bitrate: string,
            codec: 'H.264' | 'H.265' | 'VP9' | 'AV1',
            autoSave: string
        },
        notifications: {
            startReplay: boolean,
            saveReplay: boolean,
            startRecording: boolean,
            saveRecording: boolean,
            closingRecorder: boolean
        },
        hotkeys: {
            startReplay: string,
            saveReplay: string,
            startRecording: string
        },
        others: {
            themeColor: string,
            showCursor: boolean
        }
    }
    setSettings: React.Dispatch<React.SetStateAction<RecorderInterface['settings']>>

    //Hotkeys State
    keyboardHotkey: { startReplay: string, saveReplay: string, startRecording: string };
    setKeyboardHotkey: (keyboardHotkey: { startReplay: string, saveReplay: string, startRecording: string }) => void;

    //Functions State
    changeKeyboardHotkey: (action: 'startReplay' | 'saveReplay' | 'startRecording') => void;

    handleSelectDirectory: () => void;

    updateSetting: <K1 extends keyof RecorderInterface['settings']>(
        path: K1 | `${K1}.${string & keyof RecorderInterface['settings'][K1]}`,
        value:
            | RecorderInterface['settings'][K1]
            | RecorderInterface['settings'][K1][keyof RecorderInterface['settings'][K1]]
    ) => void;
}

const Context = createContext<RecorderInterface | null>(null);
Context.displayName = "screen-recorder-context"

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    //Recorder Context
    const [isRecording, setIsRecording] = useState<RecorderInterface['isRecording']>(false);
    const [isReplaying, setIsReplaying] = useState<RecorderInterface['isReplaying']>(false);

    //UI Context
    const [currentSettingPage, setCurrentSettingPage] = useState<RecorderInterface["currentSettingPage"]>("General");
    const [isModifyingSettings, setIsModifyingSettings] = useState<RecorderInterface["isModifyingSettings"]>(false);

    //Settings Context
    const [settings, setSettings] = useState<RecorderInterface['settings']>(() => {
        const savedSettings = localStorage.getItem('recorderSettings');
        return savedSettings ? JSON.parse(savedSettings) : {
            general: {
                saveDirectory: '',
                fileFormat: 'mp4',
                systemStartup: true
            },
            audio: {
                systemAudio: true,
                systemVolume: '100',
                microphoneAudio: true,
                microphoneVolume: '100'
            },
            replay: {
                replayDuration: '60'
            },
            video: {
                framerate: '60',
                bitrate: '22000 kbps',
                codec: 'H.264',
                autoSave: 'Off'
            },
            notifications: {
                startReplay: true,
                saveReplay: true,
                startRecording: true,
                saveRecording: true,
                closingRecorder: true
            },
            hotkeys: {
                startReplay: 'Alt+F9',
                saveReplay: 'Alt+F10',
                startRecording: 'Alt+F11'
            },
            others: {
                themeColor: 'Green',
                showCursor: true
            }
        }
    })
    useEffect(() => {
        localStorage.setItem('recorderSettings', JSON.stringify(settings));
    }, [settings]);

    //Hotkeys
    const [keyboardHotkey, setKeyboardHotkey] = useState<RecorderInterface['keyboardHotkey']>({
        startReplay: settings.hotkeys.startReplay,
        saveReplay: settings.hotkeys.saveReplay,
        startRecording: settings.hotkeys.startRecording
    });

    //Functions
    const changeKeyboardHotkey = (action: 'startReplay' | 'saveReplay' | 'startRecording') => {
        updateSetting(`hotkeys.${action}`, 'Pressione uma tecla...');
    
        const pressedKeys = new Set<string>();
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            if (e.altKey) pressedKeys.add('Alt');
            if (e.ctrlKey) pressedKeys.add('Ctrl');
            if (e.shiftKey) pressedKeys.add('Shift');
            if (e.metaKey) pressedKeys.add('Cmd');
            if (!['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
                pressedKeys.add(e.key.toUpperCase());
            }
        };
    
        const handleKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();
            const combination = Array.from(pressedKeys).join('+');
            if (combination) {
                updateSetting(`hotkeys.${action}`, combination);
                setKeyboardHotkey(prev => ({ ...prev, [action]: combination }));
                if (typeof (window as any).hotkeyAPI?.updateHotkey === 'function') {
                    (window as any).hotkeyAPI.updateHotkey(action, combination);
                }
            }
            cleanup();
        };
    
        const cleanup = () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return cleanup;
    };

    const updateSetting = <K1 extends keyof RecorderInterface['settings']>(
        path: K1 | `${K1}.${string & keyof RecorderInterface['settings'][K1]}`,
        value:
            | RecorderInterface['settings'][K1]
            | RecorderInterface['settings'][K1][keyof RecorderInterface['settings'][K1]]
    ) => {
        setSettings(prev => {
            const [category, key] = path.split('.') as [K1, keyof RecorderInterface['settings'][K1] | undefined];

            return key
                ? { ...prev, [category]: { ...prev[category], [key]: value } }
                : { ...prev, [category]: value };
        });
    };

    const handleSelectDirectory = async () => {
        const selectedPath = await (window as any).directoryAPI.selectDirectory();
        if (selectedPath) {
            updateSetting('general.saveDirectory', selectedPath);
        }
    }
    useEffect(() => {
        const fetchDefaultDirectory = async () => {
            if (!settings.general.saveDirectory) {
                try {
                    const defaultDir = await window.directoryAPI.getDefaultDirectory();
                    updateSetting('general.saveDirectory', defaultDir);
                } catch (error) {
                    console.error('Erro ao obter diretório padrão:', error);
                }
            }
        };
        fetchDefaultDirectory();
    }, [settings.general.saveDirectory]);

    return (
        <Context.Provider value={{
            currentSettingPage,
            setCurrentSettingPage,
            isModifyingSettings,
            setIsModifyingSettings,
            keyboardHotkey,
            setKeyboardHotkey,
            settings,
            setSettings,
            isRecording,
            setIsRecording,
            isReplaying,
            setIsReplaying,

            updateSetting,
            changeKeyboardHotkey,
            handleSelectDirectory,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useRecorderContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context error!");
    }
    return context;
}