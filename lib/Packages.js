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
exports.Packages = void 0;
const core = __importStar(require("@actions/core"));
const http = __importStar(require("@actions/http-client"));
const tc = __importStar(require("@actions/tool-cache"));
const exec_1 = require("@actions/exec/lib/exec");
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const assert_1 = require("assert");
class Packages {
    constructor(LazarusVersion, BaseURL, ParamJSON) {
        this._Platform = os.platform();
        this._Items = new Array();
        this._LazarusVersion = LazarusVersion;
        this._BaseURL = BaseURL;
        this._ParamJSON = ParamJSON;
    }
    installPackages(includePackages) {
        return __awaiter(this, void 0, void 0, function* () {
            core.info(`Requested Lazarus packages:`);
            core.info(includePackages.join(', '));
            this._Items = yield this._getPackageList(`${this._BaseURL}/${this._ParamJSON}`);
            core.info(`installPackages -- Got ${this._Items.length} package items`);
            try {
                let pkgsToInstall = [];
                let pkgsToInstallStrings = [];
                for (const sPKG of includePackages) {
                    for (const PKG of this._Items) {
                        if (sPKG.trim() == PKG.DisplayName) {
                            const deps = yield this._getDependencies(PKG);
                            for (const dep of deps) {
                                pkgsToInstall.push(dep);
                                pkgsToInstallStrings.push(dep.DisplayName);
                            }
                            pkgsToInstall.push(PKG);
                            pkgsToInstallStrings.push(PKG.DisplayName);
                        }
                    }
                }
                core.info(`Installing Lazarus packages(with found dependencies):`);
                core.info(pkgsToInstallStrings.join(', '));
                for (const pkg of pkgsToInstall) {
                    // Download the package
                    const pkgFile = yield this._download(pkg.RepositoryFileName);
                    // Unzip the package
                    const pkgFolder = yield this._extract(pkgFile, path.join(this._getTempDirectory(), pkg.RepositoryFileHash));
                    core.info(`installPackage -- Unzipped to "${pkgFolder}/${pkg.PackageBaseDir}"`);
                    // Clean up, no need for the file to lay around any more
                    yield (0, exec_1.exec)(`rm ${pkgFile}`);
                    for (const fpkg of pkg.Packages) {
                        const pkgLPKFile = path.join(pkgFolder, pkg.PackageBaseDir, fpkg.RelativeFilePath, fpkg.PackageFile);
                        switch (fpkg.PackageType) {
                            case 0:
                            case 1:
                                // Making Lazarus aware of the package
                                if (this._Platform != 'darwin') {
                                    core.info(`installPackages -- executing lazbuild --add-package "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild --add-package "' + pkgLPKFile + '"');
                                }
                                else {
                                    core.info(`installPackages -- executing lazbuild --ws=cocoa --add-package "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild --ws=cocoa --add-package "' + pkgLPKFile + '"');
                                }
                                // Compiling the package
                                if (this._Platform != 'darwin') {
                                    core.info(`installPackages -- executing lazbuild "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild "' + pkgLPKFile + '"');
                                }
                                else {
                                    core.info(`installPackages -- executing lazbuild --ws=cocoa "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild --ws=cocoa "' + pkgLPKFile + '"');
                                }
                                break;
                            case 2:
                                // Making Lazarus aware of the package
                                if (this._Platform != 'darwin') {
                                    core.info(`installPackages -- executing lazbuild --add-package-link "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild --add-package-link "' + pkgLPKFile + '"');
                                }
                                else {
                                    core.info(`installPackages -- executing lazbuild --ws=cocoa --add-package-link "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild --ws=cocoa --add-package-link "' + pkgLPKFile + '"');
                                }
                                // Compiling the package
                                if (this._Platform != 'darwin') {
                                    core.info(`installPackages -- executing lazbuild "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild "' + pkgLPKFile + '"');
                                }
                                else {
                                    core.info(`installPackages -- executing lazbuild --ws=cocoa "${pkgLPKFile}"`);
                                    yield (0, exec_1.exec)('lazbuild --ws=cocoa "' + pkgLPKFile + '"');
                                }
                                break;
                            default:
                                throw new Error(`installPackage -- PackageType "${fpkg.PackageType}" not implemented`);
                                break;
                        }
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    _getDependencies(Package) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (const file of Package.Packages) {
                const deps = file.DependenciesAsString.split(',');
                for (const dep of deps) {
                    for (const pkg of this._Items) {
                        if (Package.Name == pkg.Name) {
                            continue;
                        }
                        if (pkg.containsPackage(dep)) {
                            //console.log(`   Found dependency ${pkg.Name} for ${Package.Name}`);
                            const pdeps = yield this._getDependencies(pkg);
                            for (const pdep of pdeps) {
                                result.push(pdep);
                            }
                            result.push(pkg);
                        }
                    }
                }
            }
            return result;
        });
    }
    _extract(file, dest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield tc.extractZip(file, dest);
            return result;
        });
    }
    _download(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempDir = this._getTempDirectory();
            core.info(`_download -- Going to download "${this._BaseURL}/${filename}" to "${tempDir}"`);
            let pkgFilename = yield tc.downloadTool(`${this._BaseURL}/${filename}`, path.join(this._getTempDirectory(), filename));
            return pkgFilename;
        });
    }
    _getPackageList(repoURL) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = new Array();
            let httpClient = new http.HttpClient();
            let httpResponse;
            let packageList;
            try {
                httpResponse = yield httpClient.get(repoURL);
                packageList = JSON.parse(yield httpResponse.readBody());
            }
            catch (error) {
                throw new Error(`getPackageList -- ${error.message}`);
            }
            let pkgCount = Object.keys(packageList).length / 2;
            //core.info(`_getPackageList -- We have ${pkgCount} packages from repo`);
            for (let dIndex = 0; dIndex < pkgCount; dIndex++) {
                let _pkgData = packageList[`PackageData${dIndex}`];
                let pkgData = new PackageData();
                pkgData.Name = _pkgData['Name'];
                pkgData.DisplayName = _pkgData['DisplayName'];
                pkgData.RepositoryFileName = _pkgData['RepositoryFileName'];
                pkgData.RepositoryFileHash = _pkgData['RepositoryFileHash'];
                pkgData.PackageBaseDir = _pkgData['PackageBaseDir'];
                let _pkgFiles = packageList[`PackageFiles${dIndex}`];
                for (let fIndex = 0; fIndex < _pkgFiles.length; fIndex++) {
                    let _pkgFile = _pkgFiles[fIndex];
                    let pkgFile = new PackageFile();
                    pkgFile.PackageFile = _pkgFile['Name'];
                    pkgFile.RelativeFilePath = _pkgFile['RelativeFilePath'];
                    pkgFile.LazCompatibility = _pkgFile['LazCompatibility'];
                    pkgFile.FPCCompatability = _pkgFile['FPCCompatability'];
                    pkgFile.DependenciesAsString = _pkgFile['DependenciesAsString'];
                    pkgFile.PackageType = _pkgFile['PackageType'];
                    pkgData.Packages.push(pkgFile);
                }
                result.push(pkgData);
            }
            return result;
        });
    }
    _getTempDirectory() {
        const tempDirectory = process.env['RUNNER_TEMP'] || '';
        (0, assert_1.ok)(tempDirectory, 'Expected RUNNER_TEMP to be defined');
        return tempDirectory;
    }
}
exports.Packages = Packages;
class PackageData {
    constructor() {
        this.Name = '';
        this.DisplayName = '';
        this.RepositoryFileName = '';
        this.RepositoryFileHash = '';
        this._PackageBaseDir = '';
        this.Packages = new Array();
    }
    get PackageBaseDir() {
        return this._PackageBaseDir;
    }
    set PackageBaseDir(value) {
        this._PackageBaseDir = value.replace(/\\/gi, '');
    }
    containsPackage(Needle) {
        let name = '';
        let version = '';
        if (Needle.includes('(')) {
            const parts = Needle.split('(');
            name = parts[0].trim() + '.lpk';
            version = parts[1].trim();
            version = version.substr(0, version.length - 1);
        }
        for (const file of this.Packages) {
            if (file.PackageFile == name) {
                return true;
            }
        }
        return false;
    }
}
class PackageFile {
    constructor() {
        this.PackageFile = '';
        this._RelativeFilePath = '';
        this.LazCompatibility = new Array();
        this.FPCCompatability = new Array();
        this.DependenciesAsString = '';
        this.PackageType = -1;
    }
    get RelativeFilePath() {
        return this._RelativeFilePath;
    }
    set RelativeFilePath(value) {
        this._RelativeFilePath = value.replace(/\\/gi, '');
    }
}
