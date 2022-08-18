import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {PasswordStateType} from "../App";
import classNew from './PasswordGenerator.module.scss'
import {OptionalSettings} from "./OptionalSettings/OptionalSettings";
import clipboardImg from '../assets/clipboard/clipboard.png'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import ModalNotification from "../ModalNotification/ModalNotification";

type PropsType = {
    mainState: PasswordStateType[]
    setMainState: Dispatch<SetStateAction<PasswordStateType[]>>
    createPassword: (types: Array<string>, passwordLength: number) => string
    modalMode: boolean
    setModalMode: Dispatch<SetStateAction<boolean>>
}

const PasswordGenerator: React.FC<PropsType> = ({mainState, setMainState, modalMode, setModalMode, createPassword}) => {
    let [passwordLength, setPasswordLength] = useState(8)
    let [passwordContainer, setPasswordContainer] = useState('')
    let [countOfChosenOptions, setCountOfInclusions] = useState(0)

    const clipboard = {
        backgroundImage: `url(${clipboardImg})`,
    }

    function changeCheckMark(optionId: string, value: boolean) {
        let checkMarkToChange = mainState.find(t => t.id === optionId)
        if (checkMarkToChange) {
            checkMarkToChange.needOrNot = value
            setMainState([...mainState])
        }
        countOfChosenOptions = mainState.filter(n => n.needOrNot).length
        setCountOfInclusions(countOfChosenOptions)
    }

    const onValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordLength(Number(e.currentTarget.value))
        console.log(passwordLength)
    }

    const onGeneratorButtonClick = () => {
        let num: number = passwordLength
        if (countOfChosenOptions < 1) {
            setPasswordContainer('select some values')
            return;
        }
        const filteredState = mainState.filter(s => s.needOrNot)
        const types = filteredState.map(t => t.type)
        setPasswordContainer(createPassword(types, num))
    }
    const setModalModeHandler = () => {
        if (passwordContainer) {
            setModalMode(true)
            setTimeout(() => {
                setModalMode(false)
            }, 1500)
        }
    }

    return (
        <div className={classNew.container}>
            <h2 className={classNew.title}>Password Generator</h2>

            <div className={classNew.spaceForPassword}>
                <div className={classNew.passwordValue}>{passwordContainer}</div>
                <CopyToClipboard text={passwordContainer}>
                    <div className={classNew.clipboardButton} style={clipboard}
                         onClick={setModalModeHandler}
                         onBlur={() => setModalMode(false)}>
                    </div>
                </CopyToClipboard>
            </div>
            <div className={classNew.copiedField}>
                {modalMode && <ModalNotification/>}
            </div>
            <div className={classNew.options}>
                {mainState.map(t => {
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeCheckMark(t.id, e.currentTarget.checked)
                    }

                    return <OptionalSettings key={t.id}
                                             title={t.title}
                                             status={t.needOrNot}
                                             changeStatusHandler={changeStatusHandler}/>
                })}
            </div>
            <div className={classNew.passwordLengthArea}>
                <div className={classNew.passwordLength}>Password length</div>
                <div className={classNew.rangeWrap}>
                    <div className={classNew.inputArea}><input type="range"
                                                               className={classNew.rangeArea}
                                                               min="3" max="15"
                                                               value={passwordLength}
                                                               onChange={onValueChangeHandler}
                                                               step="1"/></div>
                    <div className={classNew.rangeValues}>{passwordLength}</div>
                </div>
            </div>

            <div className={classNew.buttonArea}>
                <button className={classNew.button} onClick={onGeneratorButtonClick}>Generate password</button>
            </div>
        </div>

    )
}


export default PasswordGenerator;