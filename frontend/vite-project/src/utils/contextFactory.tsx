import { createContext, useContext, useMemo, useState, type JSX } from "react";
//useContext 的最佳实践
interface IStore {
    key: string;
    store: Record<string, any>;
    setStore: (payload: Record<string, any>) => void
}

interface IProp {
    children: React.ReactNode,
}

const getCxtProvider = (
    key: string,
    defaultValue: Record<string, any>,
    AppContext: React.Context<IStore>
) => {
    // 返回一个 React 组件，该组件是 Provider
    return ({ children }: IProp) => {
        const [store, setStore] = useState(defaultValue);

        const value = useMemo(() => ({
            key, store, setStore
        }), [store])

        return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
    };
};


const ctxCache: Record<string, Cxt> = {};

class Cxt {
    defaultStore: IStore;
    AppContext: React.Context<IStore>;
    Provider: ({ children }: IProp) => JSX.Element;

    constructor(key: string, defaultValue: Record<string, any>) {
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: () => { }
        };

        this.AppContext = createContext(this.defaultStore);
        this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
        ctxCache[key] = this;
    };
}

export const useAppContext = (key: string) => {
    const ctx = ctxCache[key];
    const app = useContext(ctx.AppContext);

    return {
        store: app.store,
        setStore: app.setStore,
    }
}

export const connectFactory = (key: string, defaultValue: Record<string, any>) => {
    const ctx = ctxCache[key];
    let CxtProvider :Cxt;
    if (ctx) {
        CxtProvider = ctx;
    } else {
        CxtProvider = new Cxt(key, defaultValue);
    }

    return (Child:React.FunctionComponent<any>)=>(props:any) => {
        return(
        <CxtProvider.Provider>
            <Child {...props}/>
        </CxtProvider.Provider>)
    }
}


