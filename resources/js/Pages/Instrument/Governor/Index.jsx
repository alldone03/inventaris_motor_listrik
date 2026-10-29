import { Link } from "@inertiajs/react";
import GovernorLayout from "./GovernorLayout";
import { router } from '@inertiajs/react';

export default function GovernorsIndex({ governors, filters }) {
    console.log(governors);

    return (
        <GovernorLayout>
            <div className="flex items-center justify-between ">
                <div className="flex items-center w-full justify-center">

                    <div className="  rounded-xl font-bold text-3xl text-center">
                        Governor Data

                    </div>
                </div>
                <Link href={route('governor.create')} className="btn btn-primary">
                    Tambah Governor
                </Link>
            </div>
            <div className="">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Item No</th>
                            <th>Governor Type</th>
                            <th>Rotation</th>
                            <th>Speed Range RPM</th>
                            <th>Part No</th>
                            <th>Serial No</th>
                            <th>Ket</th>
                            <th>Stock Code</th>
                            <th>Area</th>
                            <th>Pabrik</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {governors.map((governor) => (
                            <tr key={governor.id}>
                                <td>{governor.id}</td>
                                <td>{governor.item_no}</td>
                                <td>{governor.governor_type}</td>
                                <td>{governor.rotation}</td>
                                <td>{governor.speed_range_rpm}</td>
                                <td>{governor.part_no}</td>
                                <td>{governor.serial_no}</td>
                                <td>{governor.ket}</td>
                                <td>{governor.stock_code}</td>
                                <td>{governor.area}</td>
                                <td>{governor.pabrik}</td>
                                <td className="flex gap-2">
                                    <Link href={route('governor.edit', governor.id)} className="btn btn-primary">
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (confirm('Yakin ingin menghapus data governor ini?')) {
                                                router.delete(route('governor.delete', governor.id));
                                            }
                                        }}
                                        className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GovernorLayout>
    );
}
