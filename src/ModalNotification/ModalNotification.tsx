import React from 'react';
import classNew from './ModalNotification.module.css'

const ModalNotification = () => {
    return (
        <div className={classNew.modalBackground}>
            <div className={classNew.modalContainer}>
                Your password has been copied
            </div>
        </div>
    );
};

export default ModalNotification;