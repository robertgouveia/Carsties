'use client'

import Image from "next/image";
import {useState} from "react";

export default function CarImage({imageUrl}: {imageUrl: string}) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            onLoad={() => setLoading(false)}
            src={imageUrl}
            alt="Image"
            fill
            className={`object-cover group-hover:opacity-75 group-hover:scale-110 duration-700 ease-in-out ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
    );
}