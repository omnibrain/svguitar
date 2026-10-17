"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PatrickHand_Regular_woff2_1 = __importDefault(require("../../../fonts/PatrickHand-Regular.woff2"));
/**
 * Embeds the font in the SVG, so the diagram looks right wherever it's opened.
 */
exports.default = "\n    @font-face {\n      font-family: 'Patrick Hand';\n      font-style: normal;\n      font-weight: 400;\n      font-display: swap;\n      src: local('Patrick Hand'), local('PatrickHand-Regular'), url(data:font/woff2;base64,".concat(PatrickHand_Regular_woff2_1.default, ") format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n");
//# sourceMappingURL=defs.js.map