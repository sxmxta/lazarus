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
const core = __importStar(require("@actions/core"));
const inst = __importStar(require("./Installer"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // `lazarus-version` input defined in action metadata file
            let lazarusVersion = core.getInput('lazarus-version') || '2.2.6';
            // `include-packages` input defined in action metadata file
            let includePackages = core.getInput('include-packages');
            // `with-cache` input defined in action metadata file
            let withCache = core.getInput('with-cache') == 'true';
            // 'os-arch' Installing 32-bit(i386) Lazarus on Windows 64
            let osArch = core.getInput('os-arch') || 'i386'; // all:x64, windows:i386, linux:arm64
            let Installer = new inst.Installer(lazarusVersion, includePackages.split(','), withCache, osArch);
            yield Installer.install();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
exports.default = run;
