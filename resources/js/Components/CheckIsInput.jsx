
import { usePage } from '@inertiajs/react';

export default function CheckIsInput({
    allowed = null,
    children,
}) {
    const { auth } = usePage().props;
    const user = auth?.user;

    if (allowed && user) {
        const allowedRoles = allowed.split(',').map(r => r.trim());

        const hasAccess = allowedRoles.some(roleGroup => {
            const [targetJabatan, targetBagian] = roleGroup.split('|');

            const matchJabatan =
                targetJabatan === '*' ||
                targetJabatan === user.jabatan;

            const matchBagian =
                !targetBagian ||
                targetBagian === '*' ||
                targetBagian === user.bagian;

            return matchJabatan && matchBagian;
        });

        if (!hasAccess) {
            return null;
        }
    }

    return <>{children}</>;
}
