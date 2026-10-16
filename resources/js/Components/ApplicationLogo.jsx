export default function ApplicationLogo({ className = 'h-20 w-auto', invert = false, ...props }) {
    return (
        <img
            src="/logo_pkc_white.webp"
            alt="Logo Pupuk Kujang"
            className={`${className} object-contain ${invert ? 'invert' : ''}`}
            {...props}
        />
    );
}
