import Image from 'next/image';

interface CustomFillImageProps {
	src: string;
	alt: string;
	className: string;
}

export function CustomFillImage({ src, alt, className }: CustomFillImageProps) {
	return <Image src={src} alt={alt} fill priority={true} quality={100} className={className} />;
}
