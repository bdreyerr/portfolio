import React from 'react';

interface VideoPlayerProps {
    videoId: string;
    title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title }) => {
    return (
        <div className="video-container mb-8">
            {title && <h2 className="text-xl font-bold mb-3">{title}</h2>}
            <div className="relative w-full pb-[56.25%]">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title || "YouTube video player"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
            </div>
        </div>
    );
};

export default VideoPlayer; 