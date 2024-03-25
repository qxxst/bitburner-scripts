// env.js by qxxst

interface env {
    imQxxst: boolean;
}

const env: env = {
    imQxxst: false
}

export function getEnv(): env {
    return env;
}