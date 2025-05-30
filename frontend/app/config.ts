import { auth } from "../firebase";
import FormData from "form-data";
import { Configuration } from "./api/configuration";
import { useAuth } from "./context/AuthContext";

interface SwaggerConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    apiKey?: string;
    username?: string;
    password?: string;
    accessToken?: string;
    useFormData?: boolean;
}

//const BASE_URL = "http://127.0.0.1:5001/cortexre-home-task/us-central1/api/v1";
const BASE_URL = "https://api-phsasxwj4q-uc.a.run.app/api/v1";

const isNode = typeof window === "undefined";
const formDataCtor = isNode ? FormData : window?.FormData;

export class Config {
    public config: Configuration;

    public constructor(config: Configuration) {
        this.config = config;
    }

    static create(config?: SwaggerConfig): Config {
        const headers: Record<string, string> = {
            "Content-Type": config?.useFormData ? "multipart/form-data" : "application/json",
            ...config?.headers,
        };

        const user = useAuth();
        if (user?.token) {
            headers["Authorization"] = `Bearer ${user.token}`;
        }

        if (config?.apiKey) {
            headers["X-API-KEY"] = config.apiKey;
        }

        if (config?.username && config?.password) {
            headers["Authorization"] = "Basic " + btoa(`${config.username}:${config.password}`);
        }

        const configuration = new Configuration({
            basePath: config?.baseURL || BASE_URL,
            baseOptions: {
                headers,
            },
            formDataCtor: config?.useFormData ? formDataCtor : undefined,
        });

        return new Config(configuration);
    }
    
}