"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotPutable = void 0;
var NotPutable = (function (_super) {
    __extends(NotPutable, _super);
    function NotPutable() {
        var _this = _super.call(this) || this;
        _this.name = 'Entity Putability Is False.';
        _this.message =
            "Can not persist entity. Some of it's required attributes are missing.";
        return _this;
    }
    return NotPutable;
}(Error));
exports.NotPutable = NotPutable;
//# sourceMappingURL=not-putable.js.map