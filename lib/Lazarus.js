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
const StableVersion = '3.6';
const pkgs = {
    "win32": {
        "3.6": "lazarus-3.6-fpc-3.2.2-win32.exe",
        "3.4": "lazarus-3.4-fpc-3.2.2-win32.exe",
        "3.2": "lazarus-3.2-fpc-3.2.2-win32.exe",
        "3.0": "lazarus-3.0-fpc-3.2.2-win32.exe",
        "2.2.6": "lazarus-2.2.6-fpc-3.2.2-win32.exe",
        "2.2.4": "lazarus-2.2.4-fpc-3.2.2-win32.exe",
        "2.2.2": "lazarus-2.2.2-fpc-3.2.2-win32.exe"
    },
    "win64": {
        "3.6": "lazarus-3.6-fpc-3.2.2-win64.exe",
        "3.4": "lazarus-3.4-fpc-3.2.2-win64.exe",
        "3.2": "lazarus-3.2-fpc-3.2.2-win64.exe",
        "3.0": "lazarus-3.0-fpc-3.2.2-win64.exe",
        "2.2.6": "lazarus-2.2.6-fpc-3.2.2-win64.exe",
        "2.2.4": "lazarus-2.2.4-fpc-3.2.2-win64.exe",
        "2.2.2": "lazarus-2.2.2-fpc-3.2.2-win64.exe"
    },
    "linux": {
        "3.6": {
            "laz": "lazarus-project_3.6.0-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "3.4": {
            "laz": "lazarus-project_3.4.0-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "3.2": {
            "laz": "lazarus-project_3.2.0-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "3.0": {
            "laz": "lazarus-project_3.0.0-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "2.2.6": {
            "laz": "lazarus-project_2.2.6-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "2.2.4": {
            "laz": "lazarus-project_2.2.4-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        },
        "2.2.2": {
            "laz": "lazarus-project_2.2.2-0_amd64.deb",
            "fpc": "fpc-laz_3.2.2-210709_amd64.deb",
            "fpcsrc": "fpc-src_3.2.2-210709_amd64.deb"
        }
    },
    "linuxARM64": {
        "3.6": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-3.6-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        },
        "3.4": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-3.4-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        },
        "3.2": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-3.2-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        },
        "3.0": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-3.0-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        },
        "2.2.6": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-2.2.6-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        },
        "2.2.4": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-2.2.4-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        },
        "2.2.2": {
            "fpcversion": "3.2.2",
            "laz": "lazarus-2.2.2-0.tar.gz",
            "fpc": "fpc-3.2.2.aarch64-linux.tar",
            "fpcsrc": "fpc-3.2.2.source.tar.gz"
        }
    },
    "darwin": {
        "3.6": {
            "laz": "Lazarus-3.6-macosx-x86_64.pkg",
            "fpcsrclaz": "fpc-src-3.2.2-2-laz.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "3.4": {
            "laz": "Lazarus-3.4-macosx-x86_64.pkg",
            "fpcsrclaz": "fpc-src-3.2.2-2-laz.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "3.2": {
            "laz": "Lazarus-3.2-macosx-x86_64.pkg",
            "fpcsrclaz": "fpc-src-3.2.2-2-laz.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "3.0": {
            "laz": "Lazarus-3.0-macosx-x86_64.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "2.2.6": {
            "laz": "Lazarus-2.2.6-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "2.2.4": {
            "laz": "Lazarus-2.2.4-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        },
        "2.2.2": {
            "laz": "Lazarus-2.2.2-0-x86_64-macosx.pkg",
            "fpc": "fpc-3.2.2.intelarm64-macosx.dmg",
            "fpcsrc": "fpc-src-3.2.2-20210709-macosx.dmg"
        }
    }
};
class Lazarus {
    constructor(LazarusVersion, WithCache, OsArch) {
        this._Platform = os.platform(); // os
        this._Arch = os.arch(); // arch
        this._LazarusVersion = '';
        this._LazarusVersion = LazarusVersion;
        this._Cache = new Cache_1.Cache(WithCache);
        this._Cache.Key = this._LazarusVersion + '-' + this._Arch + '-' + this._Platform;
        if (OsArch != '') {
            this._Arch = OsArch;
        }
    }
    installLazarus() {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`installLazarus -- Installing Lazarus ${this._LazarusVersion} on platform: "${this._Platform}"; arch: "${this._Arch}"`);
            switch (this._LazarusVersion) {
                // Special case named version that installs the repository pakages on Ubuntu
                // but installs stable version under Windows
                // Special case named version that installs the latest stable version
                case 'stable':
                    this._LazarusVersion = StableVersion;
                    this._Cache.Key = this._LazarusVersion + '-' + this._Arch + '-' + this._Platform;
                    yield this._downloadLazarus();
                    break;
                case '3.6':
                case '3.4':
                case '3.2':
                case '3.0':
                case '2.2.6':
                case '2.2.4':
                case '2.2.2':
                    yield this._downloadLazarus();
                    break;
                default:
                    throw new Error(`getLazarus - Version not available: ${this._LazarusVersion}`);
            }
            yield this._Cache.save();
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
                        if (this._Arch == 'x64') {
                            let parts = pkgs['win64'][this._LazarusVersion].split('-');
                            let fpc_version = parts[3];
                            let fpcDir = path.join(lazarusDir, 'fpc', fpc_version, 'bin', 'x86_64-win64');
                            core.addPath(fpcDir);
                            core.info(`_downloadLazarus - Adding '${fpcDir}' to PATH`);
                        }
                        else {
                            let parts = pkgs['win32'][this._LazarusVersion].split('-');
                            let fpc_version = parts[3];
                            let fpcDir = path.join(lazarusDir, 'fpc', fpc_version, 'bin', 'i386-win32');
                            core.addPath(fpcDir);
                            core.info(`_downloadLazarus - Adding '${fpcDir}' to PATH`);
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                    break;
                case 'linux':
                    // Perform a repository update
                    yield (0, exec_1.exec)('sudo apt update');
                    if (this._Arch == 'x64') {
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
                    }
                    else if (this._Arch == 'arm64') {
                        core.info(`linux arm64`);
                        yield this.linuxARM64(cacheRestored);
                    }
                    break;
                case 'darwin':
                    if (this._Arch == 'x64') {
                        let downloadPath_DAR;
                        // Get the URL for Free Pascal Source
                        let downloadFPCSRCURLDAR = this._getPackageURL('fpcsrc');
                        core.info(`_downloadLazarus - Downloading ${downloadFPCSRCURLDAR}`);
                        try {
                            // Decide what the local download filename should be
                            let downloadName = downloadFPCSRCURLDAR.endsWith('.dmg') ? 'fpcsrc.dmg' : 'fpcsrc.pkg';
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
                                let fpcsrc = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('fpcsrc'));
                                let loc = fs.readdirSync('/Volumes/' + fpcsrc[0]).filter(fn => fn.endsWith('.pkg'));
                                if (loc === undefined || loc[0] === undefined) {
                                    loc = fs.readdirSync('/Volumes/' + fpcsrc[0]).filter(fn => fn.endsWith('.mpkg'));
                                }
                                let full_path = '/Volumes/' + fpcsrc[0] + '/' + loc[0];
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
                            let downloadName = downloadFPCURLDAR.endsWith('.dmg') ? 'fpc.dmg' : 'fpc.pkg';
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
                                let fpc = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('fpc'));
                                let loc = fs.readdirSync('/Volumes/' + fpc[0]).filter(fn => fn.endsWith('.pkg'));
                                if (loc === undefined || loc[0] === undefined) {
                                    loc = fs.readdirSync('/Volumes/' + fpc[0]).filter(fn => fn.endsWith('.mpkg'));
                                }
                                let full_path = '/Volumes/' + fpc[0] + '/' + loc[0];
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
                        // Lazarus 3.2 fpcsrclaz
                        if (this._LazarusVersion === "3.2") {
                            // Get the URL for the fpcsrclaz
                            let downloadFPCSrcLazURLDAR = this._getPackageURL('fpcsrclaz');
                            core.info(`_downloadFPCSrcLaz - Downloading ${downloadFPCSrcLazURLDAR}`);
                            try {
                                // Decide what the local download filename should be
                                let downloadName = downloadFPCSrcLazURLDAR.endsWith('.dmg') ? 'fpcsrclaz.dmg' : 'fpcsrclaz.pkg';
                                if (cacheRestored) {
                                    // Use the cached version
                                    downloadPath_DAR = path.join(this._getTempDirectory(), downloadName);
                                    core.info(`_downloadFPCSrcLaz - Using cache restored into ${downloadPath_DAR}`);
                                }
                                else {
                                    // Perform the download
                                    downloadPath_DAR = yield tc.downloadTool(downloadFPCSrcLazURLDAR, path.join(this._getTempDirectory(), downloadName));
                                    core.info(`_downloadFPCSrcLaz - Downloaded into ${downloadPath_DAR}`);
                                }
                                // Download could be a pkg or dmg, handle either case
                                if (downloadName == 'fpcsrclaz.dmg') {
                                    // Mount DMG and intall package
                                    yield (0, exec_1.exec)(`sudo hdiutil attach ${downloadPath_DAR}`);
                                    // There MUST be a better way to do this
                                    let laz = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('fpcsrclaz'));
                                    let loc = fs.readdirSync('/Volumes/' + laz[0]).filter(fn => fn.endsWith('.pkg'));
                                    if (loc === undefined || loc[0] === undefined) {
                                        loc = fs.readdirSync('/Volumes/' + laz[0]).filter(fn => fn.endsWith('.mpkg'));
                                    }
                                    let full_path = '/Volumes/' + laz[0] + '/' + loc[0];
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
                        }
                        // Get the URL for the Lazarus IDE
                        let downloadLazURLDAR = this._getPackageURL('laz');
                        core.info(`_downloadLazarus - Downloading ${downloadLazURLDAR}`);
                        try {
                            // Decide what the local download filename should be
                            let downloadName = downloadLazURLDAR.endsWith('.dmg') ? 'lazarus.dmg' : 'lazarus.pkg';
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
                                let laz = fs.readdirSync('/Volumes').filter(fn => fn.startsWith('lazarus'));
                                let loc = fs.readdirSync('/Volumes/' + laz[0]).filter(fn => fn.endsWith('.pkg'));
                                if (loc === undefined || loc[0] === undefined) {
                                    loc = fs.readdirSync('/Volumes/' + laz[0]).filter(fn => fn.endsWith('.mpkg'));
                                }
                                let full_path = '/Volumes/' + laz[0] + '/' + loc[0];
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
                    }
                    else if (this._Arch == 'arm64') {
                        core.info(`macos arm64`);
                        yield this.macOSARM64(cacheRestored);
                    }
                    break;
                default:
                    throw new Error(`_downloadLazarus - Platform not implemented: ${this._Platform}`);
            }
        });
    }
    macOSARM64(cacheRestored) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempDir = this._getTempDirectory();
            let workspace = this._getWorkspace();
            core.info("_workspace: " + workspace);
        });
    }
    /**
     * @private
     * linux arm 64单独安装
     * 该安装模式依赖于github actions: uraimo/run-on-arch-action
     * 在这里手动编译安装lazarus
     */
    linuxARM64(cacheRestored) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempDir = this._getTempDirectory();
            let workspace = this._getWorkspace();
            core.info("_workspace: " + workspace);
            let arm64 = pkgs['linuxARM64'];
            let version = arm64[this._LazarusVersion];
            let fpcVersion = version['fpcversion'];
            // lazarus source, tar.gz
            let lazarusDownloadURL = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Zip%20_%20GZip/Lazarus%20${this._LazarusVersion}/`;
            lazarusDownloadURL += version['laz'];
            // fcp, tar
            let fpcDownloadURL = `https://sourceforge.net/projects/freepascal/files/Linux/${fpcVersion}/`;
            fpcDownloadURL += version['fpc'];
            // fpc source, tar.gz
            let fpcsrcDownloadURL = `https://sourceforge.net/projects/freepascal/files/Source/${fpcVersion}/`;
            fpcsrcDownloadURL += version['fpcsrc'];
            let lazarusPath = path.join(workspace, "lazarus");
            let downloadPath_LIN;
            core.info(`_downloadLazarus - Downloading ${lazarusDownloadURL}`);
            try {
                let fileName = version['laz'];
                if (cacheRestored) {
                    // 使用缓存
                    downloadPath_LIN = path.join(tempDir, fileName);
                    core.info(`_downloadLazarus - Using cache restored into ${downloadPath_LIN}`);
                }
                else {
                    // 下载
                    downloadPath_LIN = yield tc.downloadTool(lazarusDownloadURL, path.join(tempDir, fileName));
                    core.info(`_downloadLazarus - Downloaded into ${downloadPath_LIN}`);
                }
                // 解压lazarus
                yield (0, exec_1.exec)(`tar -xvf ${downloadPath_LIN} -C ${workspace}`);
            }
            catch (error) {
                throw error;
            }
            core.info(`_downloadFPC - Downloading ${fpcDownloadURL}`);
            try {
                let fileName = version['fpc'];
                if (cacheRestored) {
                    // 使用缓存
                    downloadPath_LIN = path.join(tempDir, fileName);
                    core.info(`_downloadFPC - Using cache restored into ${downloadPath_LIN}`);
                }
                else {
                    // 下载
                    downloadPath_LIN = yield tc.downloadTool(fpcDownloadURL, path.join(tempDir, fileName));
                    core.info(`_downloadFPC - Downloaded into ${downloadPath_LIN}`);
                }
                // 解压fpc
                yield (0, exec_1.exec)(`tar -xvf ${downloadPath_LIN} -C ${lazarusPath}`);
            }
            catch (error) {
                throw error;
            }
            core.info(`_downloadFPCSrc - Downloading ${fpcsrcDownloadURL}`);
            try {
                let fileName = version['fpcsrc'];
                if (cacheRestored) {
                    // 使用缓存
                    downloadPath_LIN = path.join(tempDir, fileName);
                    core.info(`_downloadFPCSrc - Using cache restored into ${downloadPath_LIN}`);
                }
                else {
                    // 下载
                    downloadPath_LIN = yield tc.downloadTool(fpcsrcDownloadURL, path.join(tempDir, fileName));
                    core.info(`_downloadFPCSrc - Downloaded into ${downloadPath_LIN}`);
                }
                // 解压fpcsrc
                yield (0, exec_1.exec)(`tar -xvf ${downloadPath_LIN} -C ${lazarusPath}`);
            }
            catch (error) {
                throw error;
            }
        });
    }
    _getPackageURL(pkg) {
        let result = '';
        // Replace periods with undescores due to JSON borking with periods or dashes
        switch (this._Platform) {
            case "win32":
                if (this._Arch == 'x64') {
                    // win64
                    result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Windows%2064%20bits/Lazarus%20${this._LazarusVersion}/`;
                    result += pkgs['win64'][this._LazarusVersion];
                }
                else {
                    // win32
                    result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Windows%2032%20bits/Lazarus%20${this._LazarusVersion}/`;
                    result += pkgs[this._Platform][this._LazarusVersion];
                }
                break;
            case "linux":
                result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20Linux%20amd64%20DEB/Lazarus%20${this._LazarusVersion}/`;
                result += pkgs[this._Platform][this._LazarusVersion][pkg];
                break;
            case "darwin":
                result = `https://sourceforge.net/projects/lazarus/files/Lazarus%20macOS%20x86-64/Lazarus%20${this._LazarusVersion}/`;
                // pkgs[darwin][version][fileName]
                result += pkgs[this._Platform][this._LazarusVersion][pkg];
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
    _getWorkspace() {
        let workspace = process.env['RUNNER_WORKSPACE'] || '';
        (0, assert_1.ok)(workspace, 'Expected RUNNER_WORKSPACE to be defined');
        return workspace;
    }
}
exports.Lazarus = Lazarus;
