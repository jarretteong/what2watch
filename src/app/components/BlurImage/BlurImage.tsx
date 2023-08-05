"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import classNames from "classnames";
import styles from "./styles/BlurImage.module.scss";

type CustomImageProps = ImageProps & {
    id: string;
};

const BlurImage: React.FunctionComponent<CustomImageProps> = ({
    src,
    alt,
    id,
    className,
    onClick,
    placeholder,
}) => {
    const [isLoading, setLoading] = useState(true);
    const [blurDataURL, setBlurDataURL] = useState("");

    const fetchBlurURL = useCallback(async (imageId: string) => {
        const data = await fetch(`/api/images/${imageId}`);
        const imageData = await data.json();
        console.log(imageData)
        setBlurDataURL(imageData.blurDataURL);
        setLoading(false);
    }, []);

    useEffect(() => {
        const imageId = id.replace("/", "");
        fetchBlurURL(imageId);
    }, [id]);

    return isLoading ? null : (
        <div>
            <Image
                alt={alt}
                src={src}
                fill
                objectFit="cover"
                className={
                    classNames({
                        [styles.loading]: isLoading,
                        [styles.blur]: isLoading,
                        [styles.grayscale]: isLoading,
                    }) +
                    " " +
                    className
                }
                onClick={onClick}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
            />
        </div>
    );
};

export default BlurImage;
