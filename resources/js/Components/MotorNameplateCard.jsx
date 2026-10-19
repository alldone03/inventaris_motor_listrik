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
                    <div className='text-4xl font-bold '>{motor.label_ke}  </div>
                    <div className='flex flex-col justify-center items-center '>
                        <div className='text-sm font-bold'>PT PUPUK KUJANG</div>
                        <div className='text-sm font-bold'>Bengkel Listrik</div>
                    </div>

                </div>


                <table className='w-full text-sm  '>
                    <tr className=''>
                        <td className=''>
                            <div className='text-[12px]'>
                                Item:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.item}
                            </div>

                        </td>
                        <td className=''>
                            <div className='text-[12px]'>
                                Daya:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.hp_kw}
                            </div>
                        </td>
                        <td className=''  >
                            <div className='text-[12px]'>
                                Mounting:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.mounting}
                            </div>
                        </td>
                    </tr>
                    <tr className=''>
                        <td className=''>
                            <div className='text-[12px]'>
                                Alamat:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.alamat_motor}
                            </div>
                        </td>
                        <td className=''>
                            <div className='text-[12px]'>
                                Volt:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.voltage}
                            </div>
                        </td>
                        <td className=''>
                            <div className='text-[12px]'>
                                frame:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.frame}
                            </div>
                        </td>
                    </tr>
                    <tr className=''>
                        <td className=''>
                            <div className='text-[12px]'>
                                Status:
                            </div>
                            <div className='text-[12px] font-bold'>
                                {motor.status}
                            </div>
                        </td>
                        <td className=''>
                            <div className='text-[12px]'>
                                Ampere:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.ampere}
                            </div>
                        </td>
                        <td className=''>
                            <div className='text-[12px]'>
                                RPM:
                            </div>
                            <div className='text-[18px] font-bold'>
                                {motor.rpm}
                            </div>
                        </td>
                    </tr>
                </table>

            </div>


        </div>




    );
}
