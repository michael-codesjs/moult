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
exports.MutateImmutable = void 0;
var MutateImmutable = (function (_super) {
    __extends(MutateImmutable, _super);
    function MutateImmutable() {
        var _this = _super.call(this) || this;
        _this.name = 'Attempt To Mutate Immutable';
        _this.message = 'Attempting to mutate an immutable attribute';
        return _this;
    }
    return MutateImmutable;
}(Error));
exports.MutateImmutable = MutateImmutable;
//# sourceMappingURL=mutate-immutable.js.map