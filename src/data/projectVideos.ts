interface ProjectVideo {
    id: string;
    title: string;
}

interface ProjectVideos {
    [projectKey: string]: ProjectVideo;
}

// Replace these placeholders with actual YouTube video IDs for your projects
export const projectVideos: ProjectVideos = {
    radiant: {
        id: "hbkQmt4pJks", // Replace with actual YouTube video ID
        title: "Radiant App Demo"
    },
    dreamrs: {
        id: "fybf3xWydI4", // Replace with actual YouTube video ID
        title: "Dreamrs App Demo"
    },
    "daily-short": {
        id: "L7uV5htpmds", // Replace with actual YouTube video ID
        title: "Daily Short App Demo"
    },
    lectura: {
        id: "TcYAcj02d6s", // Replace with actual YouTube video ID
        title: "Lectura App Demo"
    }
}; 