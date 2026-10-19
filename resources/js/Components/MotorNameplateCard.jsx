import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function MotorNameplateCard({ motor, className = '', id, style = {}, ...props }) {
    if (!motor) return null;

    return (
        <div
            id={id}
            style={{
                width: '8.5cm',
                height: '5cm',
                boxSizing: 'border-box',
                ...style,
            }}
            className={`bg-white border-2 border-black p-2 flex flex-col justify-between text-black font-sans select-none overflow-hidden print-nameplate-item ${className}`}
            {...props}
        >
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 items-center justify-around border-b border-black'>
                    <div className='text-5xl font-bold '>5</div>
                    <div className='flex flex-col justify-center items-center '>
                        <div className='text-sm font-bold'>PT PUPUK KUJANG</div>
                        <div className='text-sm font-bold'>Bengkel Listrik</div>
                    </div>
                    <div className='text-5xl font-bold '>5</div>
                </div>
                <div className='flex gap-4 items-center justify-around border-b border-black'>
                    <div>item: {motor.item}</div>
                    <div>Daya: {motor.daya}</div>
                    <div>Mounting: {motor.mounting}</div>
                </div>
                <div className='flex gap-4 items-center justify-around border-b border-black'>
                    <div>alamat: {motor.alamat}</div>
                    <div>volt: </div>
                    <div>frame: </div>
                </div>
                <div className='flex gap-4 items-center justify-around border-b border-black'>
                    <div>status: </div>
                    <div>ampere: </div>
                    <div>RPM: </div>
                </div>


            </div>


        </div>




    );
}
