import React, {ChangeEvent} from "react";
import classNew from './OptionalSettings.module.scss'

type OptionalSettingsPropsType = {
    title: string
    status: boolean
    changeStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

const OptionalSettings: React.FC<OptionalSettingsPropsType> = ({title, status, changeStatusHandler}) => {
    return <div className={classNew.setting}>
        <input type={'checkbox'}
               checked={status}
               onChange={changeStatusHandler}/>
        {title}
    </div>
}

export {OptionalSettings}
