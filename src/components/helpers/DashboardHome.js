import React from 'react';
import { toggleState } from './../../atoms/sidebarState';
import { useRecoilState } from 'recoil';

const DashboardBookings = () => {
    const [isToggled, setIsToggled] = useRecoilState(toggleState);
    return (
        <div className={isToggled ? "col bg-white mh-db dashboard-margin--toggle" : "col bg-white mh-db dashboard-margin"}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 dbBookings">
                    <h1 className='dbBookings__title'>Dashboard</h1>
                </div>
            </div>
        </div>
    )
}

export default DashboardBookings