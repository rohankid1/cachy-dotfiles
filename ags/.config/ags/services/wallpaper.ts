import { pywalDir, scriptsDir } from "utils";

class WallpaperService extends Service {
    static {
        Service.register(
            this,
            {
                "wallpaper-changed": ['string']
            },
            {
                'wallpaper-path': ['string', 'r'],
            }
        );
    }

    #wallpaperPath = Utils.exec(`${scriptsDir}/current-wallpaper.sh`);

    get wallpaper_path() {
        return this.#wallpaperPath;
    }

    constructor() {
        super();

        Utils.monitorFile(`${pywalDir}/wal`, () => this.#onChange());

        this.#onChange();
    }

    #onChange() {
        this.#wallpaperPath = Utils.exec(`${scriptsDir}/current-wallpaper.sh`);
        this.changed("wallpaper-path");
        this.emit("wallpaper-changed", this.#wallpaperPath);
    }

    connect(signal: string | undefined = "wallpaper-changed", callback: (_: this, ...args: any[]) => void): number {
        return super.connect(signal, callback);
    }
}

const wallpaper = new WallpaperService;

export default wallpaper;