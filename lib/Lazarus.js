"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lazarus = void 0;
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const exec_1 = require("@actions/exec/lib/exec");
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const assert_1 = require("assert");
const fs = __importStar(require("fs"));
const Cache_1 = require("./Cache");
const StableVersion = '2.2.6';
const pkgs = {
    "win32": {
        "v2_2_6": "lazarus-2.2.6-fpc-3.2.2-win32.exe",
        "v2_2_4": "lazarus-2.2.4-fpc-3.2.2-win32.exe",
        "v2_2_2": "lazarus-2.2.2-fpc-3.2.2-win32.exe",
        "v2_2_0": "lazarus-2.2.0-fpc-3.2.2-win32.exe",
        "v2_0_12": "lazarus-2.0.12-fpc-3.2.0-win32.exe",
        "v2_0_10": "lazarus-2.0.10-fpc-3.2.0-win32.exe",
        "v2_0_8": "lazarus-2.0.8-fpc-3.0.4-win32.exe",
        "v2_0_6": "lazarus-2.0.6-fpc-3.0.4-win32.exe",
        "v2_0_4": "lazarus-2.0.4-fpc-3.0.4-win32.exe",
        "v2_0_2": "lazarus-2.0.2-fpc-3.0.4-win32.exe",
        "v2_0_0": "lazarus-2.0.0-fpc-3.0.4-win32.exe",
        "v1_8_4": "lazarus-1.8.4-fpc-3.0.4-win32.exe",
        "v1_8_2": "lazarus-1.8.2-fpc-3.0.4-win32.exe",
        "v1_8_0": "lazarus-1.8.0-fpc-3.0.4-win32.exe",
        "v1_6_4": "lazarus-1.6.4-fpc-3.0.2-win32.exe",
        "v1_6_2": "lazarus-1.6.2-fpc-3.0.0-win32.exe",
        "v1_6": "lazarus-1.6.0-fpc-3.0.0-win32.exe",
        "v1_4_4": "lazarus-1.4.4-fpc-2.6.4-win32.exe",
        "v1_4_2": "lazarus-1.4.2-fpc-2.6.4-win32.exe",
        "v1_4": "lazarus-1.4.0-fpc-2.6.4-win32.exe",
        "v1_2_6": "lazarus-1.2.6-fpc-2.6.4-win32.exe",
        "v1_2_4": "lazarus-1.2.4-fpc-2.6.4-win32.exe",
        "v1_2_2": "lazarus-1.2.2-fpc-2.6.4-win32.exe",
        "v1_2": "lazarus-1.2.0-fpc-2.6.2-win32.exe",
        "v1_0_14": "lazarus-1.0.14-fpc-2.6.2-win32.exe",
        "v1_0_12": "lazarus-1.0.12-fpc-2.6.2-win32.exe"
    },
    "win64": {
        "v2_2_6": "lazarus-2.2.6-fpc-3.2.2-win64.exe",
        "v2_2_4": "lazarus-2.2.4-fpc-3.2.2-win64.exe",
        "v2_2_2": "lazarus-2.2.2-fpc-3.2.2-win64.exe",
        "v2_2_0": "lazarus-2.2.0-fpc-3.2.2-win64.exe",
        "v2_0_12": "lazarus-2.0.12-fpc-3.2.0-win64.exe",
        "v2_0_10": "lazarus-2.0.10-fpc-3.2.0-win64.exe",
        "v2_0_8": "lazarus-2.0.8-fpc-3.0.4-win64.exe",
        "v2_0_6": "lazarus-2.0.6-fpc-3.0.4-win64.exe",
        "v2_0_4": "lazarus-2.0.4-fpc-3.0.4-win64.exe",
        "v2_0_2": "lazarus-2.0.2-fpc-3.0.4-win64.exe",
        "v2_0_0": "lazarus-2.0.0-fpc-3.0.4-win64.exe",
        "v1_8_4": "lazarus-1.8.4-fpc-3.0.4-win64.exe",
        "v1_8_2": "lazarus-1.8.2-fpc-3.0.4-win64.exe",
        "v1_8_0": "lazarus-1.8.0-fpc-3.0.4-win64.exe",
        "v1_6_4": "lazarus-1.6.4-fpc-3.0.2-win64.exe",
        "v1_6_2": "lazarus-1.6.2-fpc-3.0.0-win64.exe",
        "v1_6": "lazarus-1.6.0-fpc-3.0.0-win64.exe",
        "v1_4_4": "lazarus-1.4.4-fpc-2.6.4-win64.exe",
        "v1_4_2": "lazarus-1.4.2-fpc-2.6.4-win64.exe",
        "v1_4": "lazarus-1.4.0-fpc-2.6.4-win64.exe",
        "v1_2_6": "lazarus-1.2.6-fpc-2.6.4-win64.exe",
        "v1_2_4": "lazarus-1.2.4-fpc-2.6.4-win64.exe",
        "v1_2_2": "lazarus-1.2.2-fpc-2.6.4-win64.exe",
        "v1_2": "lazarus-1.2.0-fpc-2.6.2-win64.exe",
        "v1_0_14": "lazarus-1.0.14-fpc-2.6.2-win64.exe",
        "v1_0_12": "lazarus-1.0.12-fpc-2.6.2-win64.exe"
    },
    "linux": {
        "v2_2_6": {
            "laz": "lazarus-project_2.2.6-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "v2_2_4": {
            "laz": "lazarus-project_2.2.4-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "v2_2_2": {
            "laz": "lazarus-project_2.2.2-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "v2_2_0": {
            "laz": "lazarus-project_2.2.0-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "v2_0_12": {
            "laz": "lazarus-project_2.0.12-0_amd64.deb",
            "fpc": "fpc-laz_3.2.0-1_amd64.deb",
            "fpcsrc": "fpc-src_3.2.0-1_amd64.deb"
        },
        "v2_0_10": {
            "laz": "lazarus-project_2.0.10-0_amd64.deb",
            "fpc": "fpc-laz_3.2.0-1_amd64.deb",
            "fpcsrc": "fpc-src_3.2.0-1_amd64.deb"
        },
        "v2_0_8": {
            "laz": "lazarus-project_2.0.8-0_amd64.deb",
            "fpc": "fpc-laz_3.0.4-1_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v2_0_6": {
            "laz": "lazarus-project_2.0.6-0_amd64.deb",
            "fpc": "fpc-laz_3.0.4-1_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v2_0_4": {
            "laz": "lazarus-project_2.0.4-0_amd64.deb",
            "fpc": "fpc-laz_3.0.4-1_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v2_0_2": {
            "laz": "lazarus-project_2.0.2-0_amd64.deb",
            "fpc": "fpc-laz_3.0.4-1_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v2_0_0": {
            "laz": "lazarus-project_2.0.0-0_amd64.deb",
            "fpc": "fpc-laz_3.0.4-1_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v1_8_4": {
            "laz": "lazarus-project_1.8.4-0_amd64.deb",
            "fpc": "fpc_3.0.4-3_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v1_8_2": {
            "laz": "lazarus-project_1.8.2-0_amd64.deb",
            "fpc": "fpc_3.0.4-2_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v1_8_0": {
            "laz": "lazarus-project_1.8.0-1_amd64.deb",
            "fpc": "fpc_3.0.4-2_amd64.deb",
            "fpcsrc": "fpc-src_3.0.4-2_amd64.deb"
        },
        "v1_6_4": {
            "laz": "lazarus-project_1.6.4-0_amd64.deb",
            "fpc": "fpc_3.0.2-170225_amd64.deb",
            "fpcsrc": "fpc-src_3.0.2-170225_amd64.deb"
        },
        "v1_6_2": {
            "laz": "lazarus-project_1.6.2-1_amd64.deb",
            "fpc": "fpc_3.0.0-151205_amd64.deb",
            "fpcsrc": "fpc-src_3.0.0-151205_amd64.deb"
        },
        "v1_6": {
            "laz": "lazarus_1.6-0_amd64.deb",
            "fpc": "fpc_3.0.0-151205_amd64.deb",
            "fpcsrc": "fpc-src_3.0.0-151205_amd64.deb"
        },
        "v1_4_4": {
            "laz": "lazarus_1.4.4-0_amd64.deb",
            "fpc": "fpc_2.6.4-150228_amd64.deb",
            "fpcsrc": "fpc-src_2.6.4-150228_amd64.deb"
        },
        "v1_4_2": {
            "laz": "lazarus_1.4.2-0_amd64.deb",
            "fpc": "fpc_2.6.4-150228_amd64.deb",
            "fpcsrc": "fpc-src_2.6.4-150228_amd64.deb"
        },
        "v1_4": {
            "laz": "lazarus_1.4.0-0_amd64.deb",
            "fpc": "fpc_2.6.4-150228_amd64.deb",
            "fpcsrc": "fpc-src_2.6.4-150228_amd64.deb"
        },
        "v1_2_6": {
            "laz": "lazarus_1.2.6-0_amd64.deb",
            "fpc": "fpc_2.6.4-140420_amd64.deb",
            "fpcsrc": "fpc-src_2.6.4-140420_amd64.deb"
        },
        "v1_2_4": {
            "laz": "lazarus_1.2.4-0_amd64.deb",
            "fpc": "fpc_2.6.4-140420_amd64.deb",
            "fpcsrc": "fpc-src_2.6.4-140420_amd64.deb"
        },
        "v1_2_2": {
            "laz": "lazarus_1.2.2-0_amd64.deb",
            "fpc": "fpc_2.6.4-140420_amd64.deb",
            "fpcsrc": "fpc-src_2.6.4-140420_amd64.deb"
        },
        "v1_2": {
            "laz": "lazarus_1.2.0-0_amd64.deb",
            "fpc": "fpc_2.6.2-0_amd64.deb",
            "fpcsrc": "fpc-src_2.6.2-0_amd64.deb"
        },
        "v1_0_14": {
            "laz": "lazarus_1.0.14-0_amd64.deb",
            "fpc": "fpc_2.6.2-0_amd64.deb",
            "fpcsrc": "fpc-src_2.6.2-0_amd64.deb"
        },
        "v1_0_12": {
            "laz": "lazarus_1.0.12-0_amd64.deb",
            "fpc": "fpc_2.6.2-0_amd64.deb",
            "fpcsrc": "fpc-src_2.6.2-0_amd64.deb"
        }
    },
    "darwin": {
        "v2_2_6": {
            "laz": "Lazarus-2.2.6-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "v2_2_4": {
            "laz": "Lazarus-2.2.4-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "v2_2_2": {
            "laz": "Lazarus-2.2.2-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "v2_2_0": {
            "laz": "Lazarus-2.2.0-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "v2_0_12": {
            "laz": "Lazarus-2.0.12-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.0.intel-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.0-2-laz.pkg"
        },
        "v2_0_10": {
            "laz": "Lazarus-2.0.10-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.0.intel-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.0-2-laz.pkg"
        },
        "v2_0_8": {
            "laz": "LazarusIDE-2.0.8-macos-x86_64.pkg",
            "fpc": "fpc-3.0.4-macos-x86_64-laz-2.pkg",
            "fpcsrc": "fpc-src-3.0.4-laz.pkg"
        }
    }
};
class Lazarus {
    constructor(LazarusVersion, WithCache) {
        this._Platform = os.platform();
        this._Arch = os.arch();
        this._LazarusVersion = '';
        this._LazarusVersion = LazarusVersion;
        this._Cache = new Cache_1.Cache(WithCache);
        this._Cache.Key = this._LazarusVersion + '-' + this._Arch + '-' + this._Platform;
    }
    installLazarus() {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`installLazarus -- Installing Lazarus ${this._LazarusVersion} on platform: "${this._Platform}"; arch: "${this._Arch}"`);
            switch (this._LazarusVersion) {
                // Special case named version that installs the repository pakages on Ubuntu
                // but installs stable version under Windows
                case "dist":
                    switch (this._Platform) {
                        case 'linux':
                            // Perform a repository update
                            yield (0, exec_1.exec)('sudo apt update');
                            // Install Lazarus from the Ubuntu repository
                            yield (0, exec_1.exec)('sudo apt install -y lazarus');
                            break;
                        case 'darwin':
                            // Perform a repository update
                            yield (0, exec_1.exec)('brew update');
                            // Install Lazarus using homebrew
                            yield (0, exec_1.exec)('brew install lazarus');
                            // For 2.0.10 and older, lazbuild symlink is /Library/Lazarus/lazbuild
                            // For 2.0.12, lazbuild symlink is /Applications/Lazarus/lazbuild
                            // Update the symlink to lazbuild
                            const lazLibPath = '/Library/Lazarus/lazbuild';
                            const lazAppPath = '/Applications/Lazarus/lazbuild';
                            try {
                                if (fs.existsSync(`${lazLibPath}`)) {
                                    core.info(`installLazarus - Do not need to update lazbuild symlink`);
                                }
                                else if (fs.existsSync(`${lazAppPath}`)) {
                                    core.info(`installLazarus - Updating lazbuild symlink to ${lazAppPath}`);
                                    // Remove bad symlink
                                    yield (0, exec_1.exec)(`rm -rf /usr/local/bin/lazbuild`);
                                    // Add good symlink
                                    yield (0, exec_1.exec)(`ln -s ${lazAppPath} /usr/local/bin/lazbuild`);
                                }
                                else {
                                    throw new Error(`Could not find lazbuild in ${lazLibPath} or ${lazAppPath}`);
                                }
                            }
                            catch (error) {
                                throw error;
                            }
                            break;
                        case 'win32':
                            this._LazarusVersion = StableVersion;
                            this._Cache.Key = this._LazarusVersion + '-' + this._Arch + '-' + this._Platform;
                            yield this._downloadLazarus();
                            break;
                        default:
                            throw new Error(`getLazarus - Platform not supported: ${this._Platform}`);
                    }
                    break;
                // Special case named version that installs the latest stable version
                case 'stable':
                    this._LazarusVersion = StableVersion;
                    this._Cache.Key = this._LazarusVersion + '-' + this._Arch + '-' + this._Platform;
                    yield this._downloadLazarus();
                    break;
                case '2.2.6':
                case '2.2.4':
                case '2.2.2':
                case '2.2.0':
                case '2.0.12':
                case '2.0.10':
                case '2.0.8':
                    yield this._downloadLazarus();
                    break;
                case '2.0.6':
                case '2.0.4':
                case '2.0.2':
                case '2.0.0':
                case '1.8.4':
                case '1.8.2':
                case '1.8.0':
                case '1.6.4':
                case '1.6.2':
                case '1.6':
                case '1.4.4':
                case '1.4.2':
                case '1.4':
                case '1.2.6':
                case '1.2.4':
                case '1.2.2':
                case '1.2':
                case '1.0.14':
                case '1.0.12':
                    if (this._Platform == 'darwin') {
                        throw new Error('GitHub runners do not support Lazarus below 2.0.8 on macos');
                    }
                    else {
                        yield this._downloadLazarus();
                    }
                    break;
                default:
                    throw new Error(`getLazarus - Version not available: ${this._LazarusVersion}`);
            }
        });
    }
    _downloadLazarus() {
        return __awaiter(this, void 0, void 0, function* () {
            // Try to restore installers from cache
            let cacheRestored = false;
            if (this._Platform != 'win32') {
                cacheRestored = yield this._Cache.restore();
            }
            switch (this._Platform) {
                case 'win32':
                    // Get the URL of the file to download
                    let downloadURL = this._getPackageURL('laz');
                    core.info(`_downloadLazarus - Downloading ${downloadURL}`);
                    let downloadPath_WIN;
                    try {
                        if (cacheRestored) {
                            // Use cached version
                            downloadPath_WIN = path.join(this._getTempDirectory(), `lazarus-${this._LazarusVersion}.exe`);
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_WIN}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_WIN = yield tc.downloadTool(downloadURL, path.join(this._getTempDirectory(), `lazarus-${this._LazarusVersion}.exe`));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_WIN}`);
                        }
                        // Run the installer
                        let lazarusDir = path.join(this._getTempDirectory(), 'lazarus');
                        yield (0, exec_1.exec)(`${downloadPath_WIN} /VERYSILENT /SP- /DIR=${lazarusDir}`);
                        // Add this path to the runner's global path
                        core.addPath(lazarusDir);
                        core.info(`_downloadLazarus - Adding '${lazarusDir}' to PATH`);
                        // Add the path to fpc.exe to the runner's global path
                        // TODO: This is very sketchy and may break in the future. Needs better implementation!
                        let lazVer = 'v' + this._LazarusVersion.replace(/\./gi, '_');
                        let parts = pkgs['win64'][lazVer].split('-');
                        let fpc_version = parts[3];
                        let fpcDir = path.join(lazarusDir, 'fpc', fpc_version, 'bin', 'x86_64-win64');
                        core.addPath(fpcDir);
                        core.info(`_downloadLazarus - Adding '${fpcDir}' to PATH`);
                    }
                    catch (error) {
                        throw error;
                    }
                    break;
                case 'linux':
                    // Perform a repository update
                    yield (0, exec_1.exec)('sudo apt update');
                    let downloadPath_LIN;
                    // Get the URL for Free Pascal Source
                    let downloadFPCSRCURL = this._getPackageURL('fpcsrc');
                    core.info(`_downloadLazarus - Downloading ${downloadFPCSRCURL}`);
                    try {
                        if (cacheRestored) {
                            // Use cached version
                            downloadPath_LIN = path.join(this._getTempDirectory(), 'fpcsrc.deb');
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_LIN}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_LIN = yield tc.downloadTool(downloadFPCSRCURL, path.join(this._getTempDirectory(), 'fpcsrc.deb'));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_LIN}`);
                        }
                        // Install the package
                        yield (0, exec_1.exec)(`sudo apt install -y ${downloadPath_LIN}`);
                    }
                    catch (error) {
                        throw error;
                    }
                    // Get the URL for Free Pascal's compiler
                    let downloadFPCURL = this._getPackageURL('fpc');
                    core.info(`_downloadLazarus - Downloading ${downloadFPCURL}`);
                    try {
                        if (cacheRestored) {
                            // Use cached version
                            downloadPath_LIN = path.join(this._getTempDirectory(), 'fpc.deb');
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_LIN}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_LIN = yield tc.downloadTool(downloadFPCURL, path.join(this._getTempDirectory(), 'fpc.deb'));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_LIN}`);
                        }
                        // Install the package
                        yield (0, exec_1.exec)(`sudo apt install -y ${downloadPath_LIN}`);
                    }
                    catch (error) {
                        throw error;
                    }
                    // Get the URL for the Lazarus IDE
                    let downloadLazURL = this._getPackageURL('laz');
                    core.info(`_downloadLazarus - Downloading ${downloadLazURL}`);
                    try {
                        if (cacheRestored) {
                            // Use cached version
                            downloadPath_LIN = path.join(this._getTempDirectory(), 'lazarus.deb');
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_LIN}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_LIN = yield tc.downloadTool(downloadLazURL, path.join(this._getTempDirectory(), 'lazarus.deb'));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_LIN}`);
                        }
                        // Install the package
                        yield (0, exec_1.exec)(`sudo apt install -y ${downloadPath_LIN}`);
                    }
                    catch (error) {
                        throw error;
                    }
                    break;
                case 'darwin':
                    let downloadPath_DAR;
                    // Get the URL for Free Pascal Source
                    let downloadFPCSRCURLDAR = this._getPackageURL('fpcsrc');
                    core.info(`_downloadLazarus - Downloading ${downloadFPCSRCURLDAR}`);
                    try {
                        // Decide what the local download filename should be
                        var downloadName = downloadFPCSRCURLDAR.endsWith('.dmg') ? 'fpcsrc.dmg' : 'fpcsrc.pkg';
                        if (cacheRestored) {
                            // Use cached version
                            downloadPath_DAR = path.join(this._getTempDirectory(), downloadName);
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_DAR}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_DAR = yield tc.downloadTool(downloadFPCSRCURLDAR, path.join(this._getTempDirectory(), downloadName));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_DAR}`);
                        }
                        // Download could be a pkg or dmg, handle either case
                        if (downloadName == 'fpcsrc.dmg') {
                            // Mount DMG and intall package
                            yield (0, exec_1.exec)(`sudo hdiutil attach ${downloadPath_DAR}`);
                            // There MUST be a better way to do this
                            var fpcsrc = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('fpcsrc'));
                            var loc = fs.readdirSync('/Volumes/' + fpcsrc[0]).filter(fn => fn.endsWith('.pkg'));
                            if (loc === undefined || loc[0] === undefined) {
                                loc = fs.readdirSync('/Volumes/' + fpcsrc[0]).filter(fn => fn.endsWith('.mpkg'));
                            }
                            var full_path = '/Volumes/' + fpcsrc[0] + '/' + loc[0];
                            yield (0, exec_1.exec)(`sudo installer -package ${full_path} -target /`);
                        }
                        else {
                            // Install the package
                            yield (0, exec_1.exec)(`sudo installer -package ${downloadPath_DAR} -target /`);
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                    // Get the URL for Free Pascal's compiler
                    let downloadFPCURLDAR = this._getPackageURL('fpc');
                    core.info(`_downloadLazarus - Downloading ${downloadFPCURLDAR}`);
                    try {
                        // Decide what the local download filename should be
                        var downloadName = downloadFPCURLDAR.endsWith('.dmg') ? 'fpc.dmg' : 'fpc.pkg';
                        if (cacheRestored) {
                            // Use cached version
                            downloadPath_DAR = path.join(this._getTempDirectory(), downloadName);
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_DAR}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_DAR = yield tc.downloadTool(downloadFPCURLDAR, path.join(this._getTempDirectory(), downloadName));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_DAR}`);
                        }
                        // Download could be a pkg or dmg, handle either case
                        if (downloadName == 'fpc.dmg') {
                            // Mount DMG and intall package
                            yield (0, exec_1.exec)(`sudo hdiutil attach ${downloadPath_DAR}`);
                            // There MUST be a better way to do this
                            var fpc = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('fpc'));
                            var loc = fs.readdirSync('/Volumes/' + fpc[0]).filter(fn => fn.endsWith('.pkg'));
                            if (loc === undefined || loc[0] === undefined) {
                                loc = fs.readdirSync('/Volumes/' + fpc[0]).filter(fn => fn.endsWith('.mpkg'));
                            }
                            var full_path = '/Volumes/' + fpc[0] + '/' + loc[0];
                            yield (0, exec_1.exec)(`sudo installer -package ${full_path} -target /`);
                        }
                        else {
                            // Install the package
                            yield (0, exec_1.exec)(`sudo installer -package ${downloadPath_DAR} -target /`);
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                    // Get the URL for the Lazarus IDE
                    let downloadLazURLDAR = this._getPackageURL('laz');
                    core.info(`_downloadLazarus - Downloading ${downloadLazURLDAR}`);
                    try {
                        // Decide what the local download filename should be
                        var downloadName = downloadLazURLDAR.endsWith('.dmg') ? 'lazarus.dmg' : 'lazarus.pkg';
                        if (cacheRestored) {
                            // Use the cached version
                            downloadPath_DAR = path.join(this._getTempDirectory(), downloadName);
                            core.info(`_downloadLazarus - Using cache restored into ${downloadPath_DAR}`);
                        }
                        else {
                            // Perform the download
                            downloadPath_DAR = yield tc.downloadTool(downloadLazURLDAR, path.join(this._getTempDirectory(), downloadName));
                            core.info(`_downloadLazarus - Downloaded into ${downloadPath_DAR}`);
                        }
                        // Download could be a pkg or dmg, handle either case
                        if (downloadName == 'lazarus.dmg') {
                            // Mount DMG and intall package
                            yield (0, exec_1.exec)(`sudo hdiutil attach ${downloadPath_DAR}`);
                            // There MUST be a better way to do this
                            var laz = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('lazarus'));
                            var loc = fs.readdirSync('/Volumes/' + laz[0]).filter(fn => fn.endsWith('.pkg'));
                            if (loc === undefined || loc[0] === undefined) {
                                loc = fs.readdirSync('/Volumes/' + laz[0]).filter(fn => fn.endsWith('.mpkg'));
                            }
                            var full_path = '/Volumes/' + laz[0] + '/' + loc[0];
                            yield (0, exec_1.exec)(`sudo installer -package ${full_path} -target /`);
                        }
                        else {
                            // Install the package
                            yield (0, exec_1.exec)(`sudo installer -package ${downloadPath_DAR} -target /`);
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                    // For 2.0.10 and older, lazbuild symlink is /Library/Lazarus/lazbuild
                    // For 2.0.12, lazbuild symlink is /Applications/Lazarus/lazbuild
                    // Update the symlink to lazbuild
                    const lazLibPath = '/Library/Lazarus/lazbuild';
                    const lazAppPath = '/Applications/Lazarus/lazbuild';
                    try {
                        if (fs.existsSync(`${lazLibPath}`)) {
                            core.info(`_downloadLazarus - Do not need to update lazbuild symlink`);
                        }
                        else if (fs.existsSync(`${lazAppPath}`)) {
                            core.info(`_downloadLazarus - Updating lazbuild symlink to ${lazAppPath}`);
                            // Remove bad symlink
                            yield (0, exec_1.exec)(`rm -rf /usr/local/bin/lazbuild`);
                            // Add good symlink
                            yield (0, exec_1.exec)(`ln -s ${lazAppPath} /usr/local/bin/lazbuild`);
                        }
                        else {
                            throw new Error(`Could not find lazbuild in ${lazLibPath} or ${lazAppPath}`);
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                    break;
                default:
                    throw new Error(`_downloadLazarus - Platform not implemented: ${this._Platform}`);
            }
        });
    }
    _getPackageURL(pkg) {
        let result = '';
        // Replace periods with undescores due to JSON borking with periods or dashes
        let lazVer = 'v' + this._LazarusVersion.replace(/\./gi, '_');
        switch (this._Platform) {
            case "win32":
                if (this._Arch == 'x64') {
                    result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Windows%2064%20bits/Lazarus%20${this._LazarusVersion}/`;
                    result += pkgs['win64'][lazVer];
                }
                else {
                    result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Windows%2032%20bits/Lazarus%20${this._LazarusVersion}/`;
                    result += pkgs[this._Platform][lazVer];
                }
                break;
            case "linux":
                result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Linux%20amd64%20DEB/Lazarus%20${this._LazarusVersion}/`;
                result += pkgs[this._Platform][lazVer][pkg];
                break;
            case "darwin":
                result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20macOS%20x86-64/Lazarus%20${this._LazarusVersion}/`;
                result += pkgs[this._Platform][lazVer][pkg];
                break;
            default:
                throw new Error(`getPackageName - Platform not implemented yet ${this._Platform}`);
        }
        return result;
    }
    _getTempDirectory() {
        let tempDirectory = process.env['RUNNER_TEMP'] || '';
        (0, assert_1.ok)(tempDirectory, 'Expected RUNNER_TEMP to be defined');
        tempDirectory = path.join(tempDirectory, 'installers');
        return tempDirectory;
    }
}
exports.Lazarus = Lazarus;