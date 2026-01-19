"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Phone360AnimationProps {
    frameCount?: number;
    className?: string;
    autoPlay?: boolean;
    speed?: number; // lower is faster
}

const Phone360Animation: React.FC<Phone360AnimationProps> = ({
    frameCount = 192,
    className = "",
    autoPlay = true,
    speed = 42,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const requestRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(0);

    // Load all images
    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImage = (index: number) => {
            const img = new Image();
            const paddedIndex = index.toString().padStart(3, '0');
            img.src = `/images/animation/frame_${paddedIndex}.jpg`;
            img.onload = () => {
                if (!isMounted) return;
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoading(false);
                }
            };
            loadedImages[index] = img;
        };

        for (let i = 0; i < frameCount; i++) {
            loadImage(i);
        }

        return () => {
            isMounted = false;
        };
    }, [frameCount]);

    // Animation logic
    const animate = (time: number) => {
        if (time - lastUpdateRef.current >= speed) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % frameCount);
            lastUpdateRef.current = time;
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (autoPlay && !isLoading) {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [autoPlay, isLoading, frameCount, speed]);

    // Draw current frame to canvas
    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const img = images[currentIndex];
                if (img) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;

                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
            }
        }
    }, [currentIndex, images]);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Loading Experience</span>
                    </div>
                </div>
            )}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
            <canvas
                ref={canvasRef}
                className={`w-full h-full object-cover relative z-10 transition-opacity duration-1000 grayscale brightness-[1.2] contrast-[1.1] ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                width={1920}
                height={1080}
            />
        </div>
    );
};

export default Phone360Animation;
