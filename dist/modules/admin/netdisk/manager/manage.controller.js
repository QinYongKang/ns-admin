"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetDiskManageController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const api_exception_1 = require("../../../../common/exceptions/api.exception");
const admin_user_decorator_1 = require("../../core/decorators/admin-user.decorator");
const admin_constants_1 = require("../../admin.constants");
const manage_class_1 = require("./manage.class");
const manage_dto_1 = require("./manage.dto");
const manage_service_1 = require("./manage.service");
let NetDiskManageController = class NetDiskManageController {
    manageService;
    constructor(manageService) {
        this.manageService = manageService;
    }
    async list(dto) {
        return await this.manageService.getFileList(dto.path, dto.marker, dto.key);
    }
    async mkdir(dto) {
        const result = await this.manageService.checkFileExist(`${dto.path}${dto.dirName}/`);
        if (result) {
            throw new api_exception_1.ApiException(20001);
        }
        await this.manageService.createDir(`${dto.path}${dto.dirName}`);
    }
    async token(user) {
        return {
            token: this.manageService.createUploadToken(`${user.uid}`),
        };
    }
    async info(dto) {
        return await this.manageService.getFileInfo(dto.name, dto.path);
    }
    async mark(dto) {
        await this.manageService.changeFileHeaders(dto.name, dto.path, {
            mark: dto.mark,
        });
    }
    async download(dto) {
        return this.manageService.getDownloadLink(`${dto.path}${dto.name}`);
    }
    async rename(dto) {
        const result = await this.manageService.checkFileExist(`${dto.path}${dto.toName}${dto.type === 'dir' ? '/' : ''}`);
        if (result) {
            throw new api_exception_1.ApiException(20001);
        }
        if (dto.type === 'file') {
            await this.manageService.renameFile(dto.path, dto.name, dto.toName);
        }
        else {
            await this.manageService.renameDir(dto.path, dto.name, dto.toName);
        }
    }
    async delete(dto) {
        await this.manageService.deleteMultiFileOrDir(dto.files, dto.path);
    }
    async cut(dto) {
        if (dto.originPath === dto.toPath) {
            throw new api_exception_1.ApiException(20002);
        }
        await this.manageService.moveMultiFileOrDir(dto.files, dto.originPath, dto.toPath);
    }
    async copy(dto) {
        await this.manageService.copyMultiFileOrDir(dto.files, dto.originPath, dto.toPath);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '??????????????????' }),
    (0, swagger_1.ApiOkResponse)({ type: manage_class_1.SFileList }),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.GetFileListDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "list", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '??????????????????????????????' }),
    (0, common_1.Post)('mkdir'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.MKDirDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "mkdir", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????????Token??????Token??????????????????' }),
    (0, swagger_1.ApiOkResponse)({ type: manage_class_1.UploadToken }),
    (0, common_1.Get)('token'),
    __param(0, (0, admin_user_decorator_1.AdminUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "token", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????????????????????' }),
    (0, swagger_1.ApiOkResponse)({ type: manage_class_1.SFileInfoDetail }),
    (0, common_1.Post)('info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileInfoDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '??????????????????' }),
    (0, common_1.Post)('mark'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.MarkFileDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "mark", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '?????????????????????????????????????????????' }),
    (0, swagger_1.ApiOkResponse)({ type: String }),
    (0, common_1.Post)('download'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileInfoDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "download", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '???????????????????????????' }),
    (0, common_1.Post)('rename'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.RenameDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "rename", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '????????????????????????' }),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.DeleteDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '???????????????????????????????????????' }),
    (0, common_1.Post)('cut'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileOpDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "cut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '???????????????????????????????????????' }),
    (0, common_1.Post)('copy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_dto_1.FileOpDto]),
    __metadata("design:returntype", Promise)
], NetDiskManageController.prototype, "copy", null);
NetDiskManageController = __decorate([
    (0, swagger_1.ApiSecurity)(admin_constants_1.ADMIN_PREFIX),
    (0, swagger_1.ApiTags)('??????????????????'),
    (0, common_1.Controller)('manage'),
    __metadata("design:paramtypes", [manage_service_1.NetDiskManageService])
], NetDiskManageController);
exports.NetDiskManageController = NetDiskManageController;
//# sourceMappingURL=manage.controller.js.map