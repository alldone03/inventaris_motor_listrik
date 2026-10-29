import GovernorLayout from '@/Pages/Instrument/Governor/GovernorLayout';
import React from 'react';



const GovernorDashboard = () => {
    const recentWorkOrders = [
        { id: 'WO-001', type: 'Kalibrasi', area: 'Panel P321-A', date: '2023-10-27', status: 'Selesai', priority: 'Medium' },
        { id: 'WO-002', type: 'Trouble Shooting', area: 'Turbin #2', date: '2023-10-26', status: 'Pending', priority: 'High' },
        { id: 'WO-003', type: 'Inspeksi', area: 'Governor P123', date: '2023-10-26', status: 'Selesai', priority: 'Low' },
        { id: 'WO-004', type: 'Maintenance', area: 'Governor #1', date: '2023-10-25', status: 'Selesai', priority: 'Medium' },
    ];

    const criticalIssues = [
        { id: 'CI-001', name: 'Governor P321-A', governorType: 'Mark VI', lastMaintenance: '2023-10-15', downtime: '4 Jam', priority: 'High', status: 'Critical' },
        { id: 'CI-002', name: 'Governor #2', governorType: 'Woodward', lastMaintenance: '2023-09-20', downtime: '12 Jam', priority: 'Medium', status: 'Warning' },
    ];

    const calibrationData = [
        { name: 'Jan', value: 2 },
        { name: 'Feb', value: 3 },
        { name: 'Mar', value: 1 },
        { name: 'Apr', value: 4 },
        { name: 'Mei', value: 2 },
        { name: 'Jun', value: 5 },
        { name: 'Jul', value: 3 },
        { name: 'Agu', value: 6 },
        { name: 'Sep', value: 4 },
        { name: 'Okt', value: 7 },
    ];

    const maintenanceData = [
        { name: 'Jan', preventive: 10, corrective: 3 },
        { name: 'Feb', preventive: 8, corrective: 5 },
        { name: 'Mar', preventive: 12, corrective: 2 },
        { name: 'Apr', preventive: 9, corrective: 4 },
        { name: 'Mei', preventive: 11, corrective: 3 },
        { name: 'Jun', preventive: 7, corrective: 6 },
    ];

    const alerts = [
        { id: 'A-001', message: 'Governor #1 - Over Speed Trip Warning', date: '2023-10-27 10:30', severity: 'High' },
        { id: 'A-002', message: 'Calibration Due: Governor P123', date: '2023-10-26 14:00', severity: 'Medium' },
        { id: 'A-003', message: 'Low Oil Pressure: Governor #2', date: '2023-10-25 09:15', severity: 'High' },
    ];

    return (
        <GovernorLayout>
            <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Governor Dashboard</h2>
                        <p className="text-muted-foreground">Overview of governor performance and maintenance operations</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700">
                            <div className="h-4 w-4 mr-2" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="hover:shadow-md transition-shadow bg-amber-600 rounded-3xl pt-8 p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium text-muted-foreground bg-amber-200 text-center w-full">Total Governors</div>
                            <div className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold bg-amber-100 text-center">12</div>
                        <p className="text-xs text-muted-foreground mt-2 bg-amber-200 text-center w-full md:text-left">Operational Governors</p>

                    </div>

                    <div className="hover:shadow-md transition-shadow">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium text-muted-foreground">Active Work Orders</div>
                            <div className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-2">Pending Maintenance</p>

                    </div>

                    <div className="hover:shadow-md transition-shadow">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium text-muted-foreground">Completed Today</div>
                            <div className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground mt-2">Work orders completed</p>

                    </div>

                    <div className="hover:shadow-md transition-shadow">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium text-muted-foreground">Critical Alerts</div>
                            <div className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground mt-2">High severity issues</p>

                    </div>

                    <div className="hover:shadow-md transition-shadow">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium text-muted-foreground">On Time Rate</div>
                            <div className="text-2xl font-bold text-green-600">92%</div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Maintenance completed on schedule</p>

                    </div>
                </div>
            </div>
        </GovernorLayout>
    );
};

export default GovernorDashboard;