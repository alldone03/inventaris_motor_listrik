import { usePage } from '@inertiajs/react';

export default function CheckIsInput({
    allowed = null, // Contoh: "VP|DeptHarListrikInstrumentAlatBerat,AVP|WLI"
    children,
}) {
    // Ambil data user dari Inertia shared props secara otomatis
    const { auth } = usePage().props;
    const user = auth?.user;

    // Jika prop 'allowed' diisi, lakukan pengecekan hak akses
    if (allowed && user) {
        // Pisahkan beberapa aturan dengan koma (sama seperti middleware Laravel)
        const allowedRoles = allowed.split(',').map(r => r.trim());

        const hasAccess = allowedRoles.some(roleGroup => {
            const [targetJabatan, targetBagian] = roleGroup.split('|');
            const matchJabatan = targetJabatan === '*' || targetJabatan === user.jabatan;
            const matchBagian = targetBagian === '*' || targetBagian === user.bagian;
            return matchJabatan && matchBagian;
        });

        // Jika user tidak memenuhi syarat, jangan render apa pun
        if (!hasAccess) {
            return null;
        }
    }

    // Jika lolos (atau jika prop 'allowed' tidak diisi), tampilkan children
    return <>{children}</>;
}